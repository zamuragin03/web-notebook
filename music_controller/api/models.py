from django.db import models

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

    def __str__(self) -> str:
        return str(self.id)

class Birthday(models.Model):
    description =  models.TextField(
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