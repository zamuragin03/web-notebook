from colorfield.fields import ColorField
from django.db import models
from django.contrib.auth.models import User


# Create your models here.


class Note(models.Model):
    body = models.TextField(
        null=True,
        blank=True,
    )
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(
        auto_now_add=True,
    )
    category = models.ForeignKey(to="Category", on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return str(self.id)


class Birthday(models.Model):
    description = models.TextField(
        blank=True,
        null=True,
    )
    birthday = models.DateField()
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    def __str__(self) -> str:
        return str(self.id)


class Category(models.Model):
    name = models.CharField(max_length=20)
    color = ColorField(format="hexa")

    def __str__(self) -> str:
        return self.name
