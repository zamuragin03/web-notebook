import json


class CategoryDTO:
    def __init__(self, id, name, color):
        self.id = id
        self.name = name
        self.color = color


    def __repr__(self) -> str:
        return json.dumps(self.__dict__ , ensure_ascii=False)