import React from "react";
import { createRoot } from "react-dom/client";
import "regenerator-runtime/runtime";
import Home from './components/Home';
import '../styles/app.css'
import { BrowserRouter , Route, Routes } from "react-router-dom";
import Userinfo from "./components/userinfo";
const container = document.getElementById("root");

const root = createRoot(container);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/userinfos/:id" element={<Userinfo/>}></Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>


)