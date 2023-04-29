import json


class CategoryDTO:
    def __init__(self, id, name, color):
        self.id = id
        self.name = name
        self.color = color

    def __str__(self) -> str:
        return json.dumps({"id": self.id, 'name': self.name, "color": self.color}, ensure_ascii=False)
