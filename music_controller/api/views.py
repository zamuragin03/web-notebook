from django.shortcuts import render
from django.http import *
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *
from drf_yasg.utils import swagger_auto_schema

# Create your views here.


class GetNotes(APIView):
    serializer_class = NoteSerializer
    queryset = Note.objects.all()

    def get(self, request, *args, **kwargs):
        notes = Note.objects.all().order_by("-updated_at")
        return Response(NoteSerializer(notes, many=True).data)


class GetNote(APIView):
    serializer_class = NoteSerializer
    queryset = Note.objects.all()

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        try:
            note = Note.objects.get(pk=pk)
        except:
            return Response({"error": "instance not found"})
        return Response(NoteSerializer(note).data)


class DeleteNote(APIView):
    serializer_class = NoteSerializer
    queryset = Note.objects.all()

    def delete(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response()
        try:
            instance = Note.objects.get(pk=pk)
        except:
            return Response({"error": "instance not found"})
        instance.delete()
        return Response()


class UpdateNote(APIView):
    serializer_class = NoteSerializer
    queryset = Note.objects.all()

    @swagger_auto_schema(request_body=NoteSerializer)
    def put(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response()
        try:
            instance = Note.objects.get(pk=pk)
        except:
            return Response()
        # print(request.data)
        serializer = NoteSerializer(data=request.data, instance=instance)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class CreateNoteView(APIView):
    serializer_class = NoteSerializer

    @swagger_auto_schema(request_body=NoteSerializer)
    def post(self, request, format=None):
        serializer = NoteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class GetBirthdays(APIView):
    serializer_class = BirthdaySerializer
    queryset = Birthday.objects.all()

    def get(self, request, *args, **kwargs):
        notes = Birthday.objects.all().order_by("-birthday")
        return Response(BirthdaySerializer(notes, many=True).data)


class GetBirthday(APIView):
    serializer_class = BirthdaySerializer
    queryset = Birthday.objects.all()

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        try:
            note = Birthday.objects.get(pk=pk)
        except:
            return Response({"error": "instance not found"})
        return Response(BirthdaySerializer(note).data)


class DeleteBirthday(APIView):
    serializer_class = BirthdaySerializer
    queryset = Birthday.objects.all()

    def delete(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response()
        try:
            instance = Birthday.objects.get(pk=pk)
        except:
            return Response({"error": "instance not found"})
        instance.delete()
        return Response()


class UpdateBirthday(APIView):
    serializer_class = BirthdaySerializer
    queryset = Birthday.objects.all()

    @swagger_auto_schema(request_body=BirthdaySerializer)
    def put(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response()
        try:
            instance = Birthday.objects.get(pk=pk)
        except:
            return Response()
        serializer = BirthdaySerializer(data=request.data, instance=instance)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class CreateBirthday(APIView):
    serializer_class = BirthdaySerializer

    @swagger_auto_schema(request_body=BirthdaySerializer)
    def post(
        self,
        request,
    ):
        serializer = BirthdaySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class GetCats(APIView):
    serializer_class = CatSerializer
    queryset = Category.objects.all()

    def get(self, request, *args, **kwargs):
        cats = Category.objects.all()
        return Response(CatSerializer(cats, many=True).data)


class GetCat(APIView):
    serializer_class = CatSerializer
    queryset = Category.objects.all()

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        try:
            cat = Category.objects.get(pk=pk)
        except:
            return Response({"error": "instance not found"})
        return Response(CatSerializer(cat).data)

