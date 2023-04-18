
import React from "react";
import { Routes, Route } from 'react-router-dom';
import { NotePage } from "./pages/Notes/NotePage";
import { AddPage } from './pages/Notes/AddPage'
import { AboutPage } from "./pages/About/AboutPage"
import { Page404 } from "./pages/Page404"
import { BirthdayList } from "./pages/Birthdays/BirthdayList";
import { BirthdayPage } from "./pages/Birthdays/BirthdayPage";
import { AddBirthday } from "./pages/Birthdays/AddBirthday";
import { NotesList } from "./pages/Notes/NotesList";

function App() {
  return (
    <Routes>
      <Route path="/notes" Component={NotesList} />
      <Route path="/note/:id" Component={NotePage} />
      <Route path="/birthday/:id" Component={BirthdayPage} />
      <Route path="/create_note" Component={AddPage} />
      <Route path="/create_birthday" Component={AddBirthday} />
      <Route path="/about" Component={AboutPage} />
      <Route path="/birthdays" Component={BirthdayList} />
      <Route path='*' element={<Page404 />} />

    </Routes>
  );
}

export default App;
