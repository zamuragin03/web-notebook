from rest_framework import serializers
from .models import *

class NoteSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    body =serializers.CharField(max_length=255)
    updated_at=  serializers.DateTimeField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        return Note.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.body=validated_data.get('body', instance.body)
        instance.updated_at=validated_data.get('updated_at', instance.updated_at)
        instance.save()
        return instance


class BirthdaySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    description =  serializers.CharField()
    # birthday = serializers.DateField(format="%d-%m-%Y")
    birthday = serializers.DateField()
    updated_at = serializers.DateTimeField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        return Birthday.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.description=validated_data.get('description', instance.description)
        instance.birthday=validated_data.get('birthday', instance.birthday)

        instance.updated_at=validated_data.get('updated_at', instance.updated_at)
        instance.save()
        return instance