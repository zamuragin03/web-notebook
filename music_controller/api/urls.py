from django.urls import path
from api.views import *

urlpatterns = [
    path('create_note/', CreateNoteView.as_view()),
    path('get_note/<int:pk>', GetNote.as_view()),
    path('get_notes', GetNotes.as_view()),
    path('update_note/<int:pk>', UpdateNote.as_view()),
    path('delete_note/<int:pk>', DeleteNote.as_view()),

    path('create_birthday/', CreateBirthday.as_view()),
    path('get_birthday/<int:pk>', GetBirthday.as_view()),
    path('get_birthdays', GetBirthdays.as_view()),
    path('update_birthday/<int:pk>', UpdateBirthday.as_view()),
    path('delete_birthday/<int:pk>', DeleteBirthday.as_view())

]


