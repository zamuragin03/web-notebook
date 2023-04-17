
import NotesList from "./pages/NotesList"
import React from "react";
import { Routes, Route } from 'react-router-dom';
import { NotePage } from "./pages/NotePage";
import { AddPage } from "./pages/AddPage"
import { AboutPage } from "./pages/AboutPage"
import { Page404 } from "./pages/Page404"
import { BirthdayList } from "./pages/BirthdayList";
import { BirthdayPage } from "./pages/BirthdayPage";
import { AddBirthday } from "./pages/AddBirthday";

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
