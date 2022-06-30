import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import Layout from "./components/Layout";
import Other from "./containers/Other";
import Home from "./containers/Home";

const container = document.getElementById("app");
const root = createRoot(container!);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="other" element={<Other />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
