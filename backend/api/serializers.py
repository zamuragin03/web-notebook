from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username')

class CatSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True,)
    name = serializers.CharField()
    color = serializers.CharField()

    class Meta:
        model = Category
        fields = '__all__'

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'

class BirthdaySerializer(serializers.ModelSerializer):
    updated_at = serializers.DateTimeField(read_only=True,)
    created_at = serializers.DateTimeField(read_only=True,)

    class Meta:
        model = Birthday
        fields = "__all__"

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "password",)
        extra_kwargs = {"password": {"write_only": True},}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data["username"],
            password=validated_data["password"],)
        return user


# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = "__all__"
