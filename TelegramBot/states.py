from aiogram.dispatcher.filters.state import State, StatesGroup


class FSMUser(StatesGroup):
    beginning = State()
    choose_action = State()
    set_cat = State()
    set_body = State()

    typing_index = State()
    typing_text = State()
    typing_cat = State()

    typing_username = State()
    typing_password = State()