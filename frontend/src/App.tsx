import {Routes, Route, Navigate} from "react-router";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";


function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element= {<Home />} />
        <Route path="/login" element= {<Login />} />
      </Route>
      <Route path="*" element={<Navigate to="/"/>} />
    </Routes>
  );
}

export default App
