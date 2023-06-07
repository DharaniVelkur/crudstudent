import React, { useState } from "react";
import Table from "./Table";

const Formpage = (props) => {
  let [name, setName] = useState("");
  let [age, setAge] = useState("");
  let [gender, setGender] = useState("");
  let [marks, setMarks] = useState("");
  let [email, setEmail] = useState("");
  let [batch, setBatch] = useState("");
  let [section, setSection] = useState("");

  let handleadd = (e) => {
    e.preventDefault();
    addstudent(name, age, gender, marks, email, batch, section);
    setName("");
    setEmail("");
    setAge("");
    setGender("");
    setMarks("");
    setBatch("");
    setSection("");
  };

  let addstudent = async (name, age, gender, marks, email, batch, section) => {
    if(name==""||age==""||gender==""||marks==""||email==""||batch==""||section==""){
      alert("Empty fields are not allowed!!!!")
    }
    let response = await fetch("https://backend-mmsk.onrender.com/addStudent", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": true,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        gender: gender,
        age: age,
        marks: marks,
        batch: batch,
        section: section,
      }),
    });
    let newstudent = await response.json();
    props.setStudents([...props.students, newstudent]);
  };

  return (
    <>
      <div className="container mt-3">
        <h2 className="container mt-3 text-center">Student Form</h2>
        <form onSubmit={handleadd}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name :
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age :
            </label>
            <input
              type="text"
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              id="age"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">
              Gender :
            </label>
            <input
              type="text"
              className="form-control"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              id="gender"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="marks" className="form-label">
              Marks :
            </label>
            <input
              type="text"
              className="form-control"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              id="marks"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email :
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="batch" className="form-label">
              Batch :
            </label>
            <input
              type="text"
              className="form-control"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              id="batch"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="section" className="form-label">
              Section :
            </label>
            <input
              type="text"
              className="form-control"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              id="section"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
        <h2 className="text-center">Student data</h2>
        <Table
          students={props.students}
          setStudents={props.setStudents}
        />
      </div>
    </>
  );
};
export default Formpage;
