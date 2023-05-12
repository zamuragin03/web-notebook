from .CategoryDTO import CategoryDTO
import json


class NoteDTO:
    def __init__(self, category: CategoryDTO, body, user):
        self.category = category
        self.body = body
        self.user = user

    def __str__(self) -> str:
        print(self.__dict__)
        return  json.dumps({'body': self.body, 'category':self.category.id, 'user':self.user}, ensure_ascii=False)
