# Generated by Django 4.1.7 on 2023-04-21 15:19

import colorfield.fields
from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0003_category_note_category"),
    ]

    operations = [
        migrations.AddField(
            model_name="category",
            name="color",
            field=colorfield.fields.ColorField(
                blank=True,
                default=None,
                image_field=None,
                max_length=18,
                null=True,
                samples=None,
            ),
        ),
    ]