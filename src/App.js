import { useEffect, useState } from "react";
import "./App.css";
import Formpage from "./components/Formpage";
import Navbar from "./components/Navbar";

function App() {
  const student = [];
  let [students, setStudents] = useState(student);

  let getstudent = async () => {
    let response = await fetch("https://backend-mmsk.onrender.com/getallstudents", {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": true,
        "Content-Type": "application/json",
      },
    });
    let studnets = await response.json();
    setStudents(studnets);
  };

  useEffect(() => {getstudent()});

  return (
    <div>
      <Navbar />
      <Formpage students={students} setStudents={setStudents} />
    </div>
  );
}

export default App;
