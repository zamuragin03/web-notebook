from Service import NoteService
from DTO.NoteDTO import NoteDTO
from DTO.CategoryDTO import CategoryDTO
from DTO.UserDTO import UserDTO

cat = CategoryDTO(1, "sd", "as")
note = NoteDTO(cat, "sd", 1)
user = UserDTO("123", "4456")
print(note)