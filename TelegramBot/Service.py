from API import NoteAPI
from DTO.NoteDTO import NoteDTO
from DTO.CategoryDTO import CategoryDTO
from DTO.UserDTO import UserDTO
from aiogram.utils.markdown import *
import jwt

SECRET_KEY = "django-insecure-tet*&pf*pj97xtryjv_d^gwn-4t2bu*piu_b@k-pqszp_bdikn"
ALGORITHM = "HS256"


class NoteService:
    def get_all_notes(tokens):
        notes = NoteAPI.get_all_notes(tokens=tokens)
        if notes.status_code == 401:
            return "Пожалуйста авторизуйтесь"
        cats = NoteAPI.get_cats()
        notes = notes.json()
        s = ""
        for note in notes:
            cat = NoteService.__get_concrete_cat_by_id(cats=cats, id=note["category"])
            s += text(
                str(note["id"])
                + ") "
                + note["body"]
                + " "
                + "("
                + bold(cat["name"])
                + ")"
                + "\n"
            )
        if s=="":
            return 'У вас нет заметок'
        return s

    def __get_concrete_cat(category_name):
        cats = NoteAPI.get_cats()
        for cat in cats:
            if cat["name"] == category_name:
                return cat

    def __get_concrete_cat_by_id(cats, id):
        for cat in cats:
            if cat["id"] == id:
                return cat

    def create_note(tokens, body, category_name):
        cat = NoteService.__get_concrete_cat(category_name=category_name)
        category = CategoryDTO(**cat)
        encoded_data = jwt.decode(tokens["access"], SECRET_KEY, algorithms=ALGORITHM)
        user_id = encoded_data["user_id"]
        note = NoteDTO(category=category, body=body, user=user_id)
        return NoteAPI.create_new_note(tokens=tokens, noteDTO=note)

    def update_note(tokens, index, **kwargs):
        body = kwargs.get("body", None)
        category = kwargs.get("category", None)
        data = {}
        if body is not None:
            data["body"] = body
        if category is not None:
            data["category"] = NoteService.__get_concrete_cat(category_name=category)[
                "id"
            ]
        return NoteAPI.update_note(tokens=tokens, index=index, data=data)

    def get_cat_names():
        cats = NoteAPI.get_cats()
        a = []
        for el in cats:
            a.append(el["name"])
        return a

    def auth(username, password):
        user = UserDTO(username=username, password=password)
        response = NoteAPI.authorize(user=user)
        access = response.get("access", False)
        refresh = response.get("refresh", False)
        if not access:
            return "Неверный логин или пароль"
        return {"access": access, "refresh": refresh, "msg": "Успешно авторизован"}

    def isNoteOwner(tokens, id):
        response = NoteAPI.get_note(tokens=tokens,id=id).json()
        note = response.get("body", False)
        print(note)
        if not note:
            return False
        return True


    def registerUser(username, password):
        user = UserDTO(username=username, password=password)
        response = NoteAPI.register_user(user=user)
        if response.status_code==201:
            return True