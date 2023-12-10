import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Play from "./pages/Play";
import Leaderboard from "./pages/Leaderboard";
import { ThemeProvider } from "styled-components";

const theme = {
  font: "Roboto",
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<Play />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
