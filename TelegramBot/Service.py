from API import NoteAPI
from DTO.NoteDTO import NoteDTO
from DTO.CategoryDTO import CategoryDTO
from DTO.UserDTO import UserDTO
from aiogram.utils.markdown import *
import jwt
SECRET_KEY = "django-insecure-tet*&pf*pj97xtryjv_d^gwn-4t2bu*piu_b@k-pqszp_bdikn"
ALGORITHM ='HS256'

class NoteService:
    def get_all_notes(tokens):
        notes = NoteAPI.get_all_notes(tokens=tokens)
        if notes.status_code == 401:
            return "Пожалуйста авторизуйтесь"
        print('pizda1')
        cats = NoteAPI.get_cats()
        print('pizda2')

        print(notes)
        notes = notes.json()
        print(notes)
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
        encoded_data = jwt.decode(tokens['access'], SECRET_KEY,algorithms= ALGORITHM)
        user_id = encoded_data['user_id']
        note = NoteDTO(category=category, body=body, user=user_id)
        return NoteAPI.create_new_note(noteDTO=note)

    def update_note(index, **kwargs):
        body = kwargs.get("body", None)
        category = kwargs.get("category", None)
        data = {}
        if body is not None:
            data["body"] = body
        if category is not None:
            data["category"] = NoteService.__get_concrete_cat(category_name=category)[
                "id"
            ]
        return NoteAPI.update_note(index=index, data=data)

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
