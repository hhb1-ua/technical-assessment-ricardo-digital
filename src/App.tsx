import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Users } from "./pages/Users";
import { Companies } from "./pages/Companies";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/users" element={<Users />} />
        <Route path="/companies" element={<Companies />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
