from django.urls import *
from api.views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

urlpatterns = [
    path('drf-auth', include('rest_framework.urls')),
    path('drf-auth/register', RegisterApi.as_view()),
    path('create_note/', CreateNoteView.as_view()),

    path('get_note/<int:pk>', GetNote.as_view()),
    path('get_notes', GetNotes.as_view()),

    path('update_note/<int:pk>', UpdateNote.as_view()),
    path('delete_note/<int:pk>', DeleteNote.as_view()),

    path('create_birthday/', CreateBirthday.as_view()),

    path('get_birthday/<int:pk>', GetBirthday.as_view()),
    path('get_birthdays', GetBirthdays.as_view()),

    path('update_birthday/<int:pk>', UpdateBirthday.as_view()),
    path('delete_birthday/<int:pk>', DeleteBirthday.as_view()),

    path('get_cat/<int:pk>', GetCat.as_view()),
    path('get_cats', GetCats.as_view()),
    path('create_cat', CreateCat.as_view()),
    path('delete_cat/<int:pk>', DeleteCat.as_view()),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
