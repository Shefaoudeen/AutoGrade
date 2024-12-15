import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Homepage from "./Pages/Homepage";
import Login from "./Pages/Login";
import ProfessorDashboard from "./Pages/ProfessorDashboard";
import StudentDashboard from "./Pages/StudentDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="/professor/:id" element={<ProfessorDashboard />} />
          <Route path="/student/:id" element={<StudentDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
