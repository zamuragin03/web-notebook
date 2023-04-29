import requests
import configparser
from pathlib import Path
from DTO.NoteDTO import NoteDTO
from DTO.UserDTO import UserDTO

config = configparser.ConfigParser()
PATH = Path(__file__).resolve().parent
config.read(str(PATH) + "/config.ini")
URL = config["Telegram"]["PROXY"]


class NoteAPI:
    def update_token(tokens):
        refresh = tokens.get("refresh", None)
        token = requests.post(
            URL + "token/refresh/",
            data={"refresh": str(refresh)},
        ).json()
        return token.get('access', None)
    
    def get_all_notes(tokens):
        access = NoteAPI.update_token(tokens)
        print(access)
        return requests.get(
            URL + "get_notes", headers={"Authorization": f"Bearer {access}"}
        )

    def create_new_note(noteDTO: NoteDTO):
        print(noteDTO)
        return requests.post(
            URL + "create_note/",
            data=str(noteDTO).encode("utf-8"),
            headers={"Content-type": "application/json"},
        ).json()

    def get_cats():
        return requests.get(URL + "get_cats").json()

    def update_note(index, data):
        return requests.patch(URL + f"update_note/{index}", data=data).json()

    def authorize(user: UserDTO):
        return requests.post(
            URL + "token/",
            data=str(user).encode("utf-8"),
            headers={"Content-type": "application/json"},
        ).json()
