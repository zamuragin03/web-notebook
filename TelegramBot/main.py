import configparser
from pathlib import Path
from aiogram.types import *
from aiogram import Bot, types, executor, Dispatcher
from aiogram.contrib.fsm_storage.memory import MemoryStorage
from aiogram.utils.markdown import *
from aiogram.dispatcher import FSMContext
import keyboards, states
from Service import NoteService

config = configparser.ConfigParser()
PATH = Path(__file__).resolve().parent

config.read(str(PATH) + "/config.ini")
BOT_TOKEN = config["Telegram"]["bot_token"]
URL = config["Telegram"]["PROXY"]

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher(bot, storage=MemoryStorage())


@dp.message_handler(commands=["start"], state="*")
async def help(message: types.Message):
    await bot.send_message(
        message.from_user.id, text="Выберите действие", reply_markup=keyboards.help_kb
    )
    await states.FSMUser.choose_action.set()


@dp.message_handler(commands=["auth"], state="*")
async def auth(message: types.Message, state: FSMContext):
    await bot.send_message(message.from_user.id, text="Введите логин")
    await states.FSMUser.typing_username.set()


@dp.message_handler(commands=["logout"], state="*")
async def logout(message: types.Message, state: FSMContext):
    async with state.proxy() as data:
        data["access"] = None
        data["refresh"] = None
    await bot.send_message(message.from_user.id, text="Вы вышли")
    await states.FSMUser.typing_username.set()


@dp.message_handler(state=states.FSMUser.typing_username)
async def typing_username(message: types.Message, state: FSMContext):
    async with state.proxy() as data:
        data["username"] = message.text
        await bot.send_message(
            message.from_user.id,
            text=text("Введите пароль", spoiler(message.text)),
            parse_mode=ParseMode.MARKDOWN_V2,
        )
    await bot.delete_message(message.chat.id, message.message_id)
    await states.FSMUser.typing_password.set()


@dp.message_handler(state=states.FSMUser.typing_password)
async def typing_password(message: types.Message, state: FSMContext):
    await bot.delete_message(message.chat.id, message.message_id)
    async with state.proxy() as data:
        data["password"] = message.text
        result = NoteService.auth(password=data["password"], username=data["username"])
    if type(result) is str:
        await bot.send_message(message.from_user.id, text=result)
        return
    async with state.proxy() as data:
        data["access"] = result["access"]
        data["refresh"] = result["refresh"]
        await bot.send_message(
            message.from_user.id,
            text=text(result["msg"], spoiler(message.text)),
            reply_markup=keyboards.help_kb,
            parse_mode=ParseMode.MARKDOWN_V2,
        )

    await states.FSMUser.choose_action.set()


@dp.message_handler(
    lambda c: c.text == "Просмотреть список заметок", state=states.FSMUser.choose_action
)
async def get_notes_list(message: types.Message, state: FSMContext):
    tokens = {"access": "", "refresh": ""}
    async with state.proxy() as data:
        if data:
            tokens["access"] = data["access"]
            tokens["refresh"] = data["refresh"]
        data = NoteService.get_all_notes(tokens=tokens)

    await bot.send_message(
        message.from_user.id,
        text=data,
        reply_markup=keyboards.help_kb,
        parse_mode=ParseMode.MARKDOWN,
    )


@dp.message_handler(
    lambda c: c.text == "Добавить заметку", state=states.FSMUser.choose_action
)
async def create_note(message: types.Message, state: FSMContext):
    async with state.proxy() as data:
        if not data:
            await bot.send_message(
                message.from_user.id,
                text="Пожалуйста авторизуйтесь",
                reply_markup=keyboards.ReplyKeyboardRemove(),
            )
            return
    await bot.send_message(
        message.from_user.id,
        text="Выберите категорию",
        reply_markup=keyboards.cat_names_kb,
    )
    await states.FSMUser.set_cat.set()


@dp.message_handler(lambda x: x.text in keyboards.cats, state=states.FSMUser.set_cat)
async def set_cat(message: types.Message, state: FSMContext):
    async with state.proxy() as data:
        data["cat_name"] = message.text
    await bot.send_message(
        message.from_user.id,
        text="Напишите текст заметки",
        reply_markup=keyboards.ReplyKeyboardRemove(),
    )
    await states.FSMUser.next()


@dp.message_handler(state=states.FSMUser.set_body)
async def set_cat(message: types.Message, state: FSMContext):
    async with state.proxy() as data:
        data["body"] = message.text
    await bot.send_message(
        message.from_user.id,
        text="Заметка добавлена",
        reply_markup=keyboards.ReplyKeyboardRemove(),
    )
    tokens = {"access": "", "refresh": ""}
    async with state.proxy() as data:
        if data:
            tokens["access"] = data["access"]
            tokens["refresh"] = data["refresh"]
        NoteService.create_note(
            tokens=tokens, body=data["body"], category_name=data["cat_name"]
        )
    await states.FSMUser.beginning.set()


@dp.message_handler(
    lambda c: c.text == "Изменить заметку", state=states.FSMUser.choose_action
)
async def change_note(message: types.Message, state: FSMContext):
    async with state.proxy() as data:
        if not data:
            await bot.send_message(
                message.from_user.id,
                text="Пожалуйста авторизуйтесь",
                reply_markup=keyboards.ReplyKeyboardRemove(),
            )
            return

    tokens = {"access": "", "refresh": ""}
    async with state.proxy() as data:
        if data:
            tokens["access"] = data["access"]
            tokens["refresh"] = data["refresh"]
        data = NoteService.get_all_notes(tokens=tokens)
    await bot.send_message(
        message.from_user.id,
        text=data,
        reply_markup=keyboards.ReplyKeyboardRemove(),
        parse_mode=ParseMode.MARKDOWN,
    )
    await bot.send_message(
        message.from_user.id,
        text="Выберите индекс заметки",
        reply_markup=keyboards.ReplyKeyboardRemove(),
    )
    await states.FSMUser.typing_index.set()


@dp.message_handler(state=states.FSMUser.typing_index)
async def typing_index(message: types.Message, state: FSMContext):
    index = message.text
    try:
        int(index)
        tokens = {"access": "", "refresh": ""}
        async with state.proxy() as data:
            if data:
                tokens["access"] = data["access"]
                tokens["refresh"] = data["refresh"]
        if not NoteService.isNoteOwner(tokens=tokens, id=index):
            await bot.send_message(
                message.from_user.id,
                text="Введите правильный индекс",
                reply_markup=keyboards.ReplyKeyboardRemove(),
            )
            return
    except:
        return
    async with state.proxy() as data:
        data["index"] = int(index)
    await bot.send_message(
        message.from_user.id,
        text="Введите новый текст заметки",
        reply_markup=keyboards.do_not_change_kb,
    )
    await states.FSMUser.typing_text.set()


@dp.message_handler(state=states.FSMUser.typing_text)
async def typing_text(message: types.Message, state: FSMContext):
    await bot.send_message(
        message.from_user.id,
        text="Введите категорию",
        reply_markup=keyboards.cat_names_kb,
    )
    if message.text == "Нe изменять":
        await states.FSMUser.typing_cat.set()
        return
    async with state.proxy() as data:
        if data:
            data["text"] = message.text

    await states.FSMUser.typing_cat.set()


@dp.message_handler(lambda x: x.text in keyboards.cats, state=states.FSMUser.typing_cat)
async def typing_cat(message: types.Message, state: FSMContext):
    tokens = {"access": "", "refresh": ""}
    async with state.proxy() as data:
        data["category_name"] = message.text
        if data:
            tokens["access"] = data["access"]
            tokens["refresh"] = data["refresh"]
        NoteService.update_note(
            tokens=tokens,
            index=data["index"],
            body=data["text"],
            category=data["category_name"],
        )
    await bot.send_message(
        message.from_user.id,
        text="Успешно изменео",
        reply_markup=keyboards.ReplyKeyboardRemove(),
    )



@dp.message_handler(commands=["register"], state="*")
async def register(message: types.Message, state: FSMContext):
    await bot.send_message(message.from_user.id, text="Введите логин")
    await states.FSMUser.typing_reg_username.set()


@dp.message_handler(state=states.FSMUser.typing_reg_username)
async def typing_username_(message: types.Message, state: FSMContext):
    async with state.proxy() as data:
        data["username"] = message.text
        await bot.send_message(
            message.from_user.id,
            text=text("Введите пароль",),
            parse_mode=ParseMode.MARKDOWN_V2,
        )
    await states.FSMUser.typing_reg_password.set()


@dp.message_handler(state=states.FSMUser.typing_reg_password)
async def typing_password_(message: types.Message, state: FSMContext):
    async with state.proxy() as data:
        data["password"] = message.text
        isRegistered = NoteService.registerUser(password=data["password"], username=data["username"])
    if isRegistered:
        await bot.send_message(
            message.from_user.id,
            text='Успешно зарегистрирован',
            parse_mode=ParseMode.MARKDOWN_V2,
        )
        return
    await bot.send_message(
            message.from_user.id,
            text='Этот никнейм уже занят',
            parse_mode=ParseMode.MARKDOWN_V2,
        )
    await states.FSMUser.choose_action.set()



if __name__ == "__main__":
    print("started")
    executor.start_polling(dp, skip_updates=False)
