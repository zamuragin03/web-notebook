import requests
import configparser
from pathlib import Path
from DTO.NoteDTO import NoteDTO
from DTO.UserDTO import UserDTO
import json
config = configparser.ConfigParser()
PATH = Path(__file__).resolve().parent
config.read(str(PATH) + "/config.ini")
URL = config["Telegram"]["PROXY"]


class NoteAPI:
    def get_all_notes(tokens):
        access = NoteAPI.update_token(tokens)
        return requests.get(
            URL + "get_notes", headers={"Authorization": f"Bearer {access}"}
        )

    def create_new_note(tokens, noteDTO: NoteDTO):
        access = NoteAPI.update_token(tokens)
        return requests.post(
            URL + "create_note/",
            data=str(noteDTO).encode("utf-8"),
            headers={
                "Content-type": "application/json",
                "Authorization": f"Bearer {access}",
            },
        ).json()

    def get_cats():
        return requests.get(URL + "get_cats").json()

    def update_note(tokens, index, data):
        access = NoteAPI.update_token(tokens)
        return requests.patch(
            URL + f"update_note/{index}",
            data=json.dumps(data),
            headers={
                "Content-type": "application/json",
                "Authorization": f"Bearer {access}",
            },
        ).json()

    def update_token(tokens):
        refresh = tokens.get("refresh", None)
        token = requests.post(
            URL + "token/refresh/",
            data={"refresh": str(refresh)},
        ).json()
        return token.get("access", None)

    def authorize(user: UserDTO):
        return requests.post(
            URL + "token/",
            data=str(user).encode("utf-8"),
            headers={"Content-type": "application/json"},
        ).json()

    def get_note(tokens,id):
        access = NoteAPI.update_token(tokens)
        return requests.get(
            URL + f"get_note/{id}", headers={"Authorization": f"Bearer {access}"}
        )
    
    def register_user(user:UserDTO):
        return requests.post(
            URL + "drf-auth/register",
            data=str(user).encode('utf-8'),
            headers={"Content-type": "application/json"},
        )
    