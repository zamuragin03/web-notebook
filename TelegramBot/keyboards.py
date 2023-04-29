from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup
from aiogram.types import ReplyKeyboardMarkup, KeyboardButton, ReplyKeyboardRemove
from Service import NoteService

help_kb = ReplyKeyboardMarkup(one_time_keyboard=True, resize_keyboard=True)
options = ["Просмотреть список заметок", "Добавить заметку", 'Изменить заметку','']

for option in options:
    btn = KeyboardButton(text=option)
    help_kb.add(btn)


cat_names_kb = ReplyKeyboardMarkup(one_time_keyboard=True, resize_keyboard=True)
cats = NoteService.get_cat_names()

for option in cats:
    btn = KeyboardButton(text=option)
    cat_names_kb.add(btn)

do_not_change_kb = ReplyKeyboardMarkup(one_time_keyboard=True, resize_keyboard=True)
btn = KeyboardButton(text='Нe изменять')
do_not_change_kb.add(btn)
