// src/App.js
import React from "react";
import Hero from "./components/Hero";
import "./index.css";
import StyleSection from "./components/StyleSection";
import EndingSection from "./components/EndingSection";

function App() {
  return (
    <div className="App">
      <Hero />
      <StyleSection/>
      <EndingSection/>
    </div>
  );
}

export default App;
