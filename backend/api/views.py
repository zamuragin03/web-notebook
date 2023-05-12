from rest_framework import generics
from .models import *
from .serializers import *
from rest_framework.response import *
from rest_framework.permissions import *
from .permissions import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class NoteModel:
    serializer_class = NoteSerializer
    queryset = Note.objects.all()


class BirthdayModel:
    serializer_class = BirthdaySerializer
    queryset = Birthday.objects.all()


class CatModel:
    serializer_class = CatSerializer
    queryset = Category.objects.all()


class GetNotes(NoteModel, generics.ListAPIView):
    permission_classes = (IsOwner,)

    def get(self, request, *args, **kwargs):
        if not request.user.is_staff:
            notes = Note.objects.filter(user_id=request.user.id)
        else:
            notes = Note.objects.all()
        ser = NoteSerializer(data=notes, many=True)
        ser.is_valid()
        return Response(ser.data)


class GetNote(NoteModel, generics.RetrieveAPIView):
    permission_classes = (IsOwner,)


class DeleteNote(NoteModel, generics.RetrieveDestroyAPIView):
    permission_classes = (IsOwner,)


class UpdateNote(NoteModel, generics.RetrieveUpdateAPIView):
    permission_classes = (IsOwner,)


class CreateNoteView(NoteModel, generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)


class GetBirthdays(BirthdayModel, generics.ListAPIView):
    ...


class GetBirthday(BirthdayModel, generics.RetrieveAPIView):
    ...


class DeleteBirthday(BirthdayModel, generics.DestroyAPIView):
    ...


class UpdateBirthday(BirthdayModel, generics.RetrieveUpdateAPIView):
    ...


class CreateBirthday(BirthdayModel, generics.ListCreateAPIView):
    ...


class GetCats(CatModel, generics.ListAPIView):
    ...


class GetCat(CatModel, generics.RetrieveAPIView):
    ...


class CreateCat(CatModel, generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)


class DeleteCat(CatModel, generics.RetrieveDestroyAPIView):
    permission_classes = (IsOwner,)


class RegisterApi(generics.CreateAPIView):
    serializer_class = RegisterSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["username"] = user.username
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
