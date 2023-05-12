from django.contrib import admin
from api.models import *
# Register your models here.
class NotesAdmin(admin.ModelAdmin):
    fields = [field.name for field in Note._meta.get_fields()]
    list_display=fields
    list_filter=fields
    search_fields = fields
    readonly_fields= ['id','updated_at','created_at']
class CategoriesAdmin(admin.ModelAdmin):
    fields = (
        'name',
        'color'
    )
    list_display= fields

# class CartAdmin(admin.ModelAdmin):
#     list_display =[field.name for field in Cart._meta.get_fields()]

admin.site.register(Category, CategoriesAdmin)
admin.site.register(Note,NotesAdmin)