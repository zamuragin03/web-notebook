import json


class UserDTO:
    def __init__(self, username, password):
        self.username = username
        self.password = password 

    def __str__(self) -> str:
        return json.dumps(self.__dict__, ensure_ascii=False)
