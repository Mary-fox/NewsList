import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ArticlesPage from "./pages/ArticlesPage";
import ArticlePage from "./pages/ArticlePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ArticlesPage />} />
        <Route path="/article/:storyId" element={<ArticlePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
