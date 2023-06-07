import { useRef, useState } from "react";
import React from "react";

const Table = (props) => {
  let [name, setName] = useState("");
  let [age, setAge] = useState("");
  let [gender, setGender] = useState("");
  let [marks, setMarks] = useState("");
  let [email, setEmail] = useState("");
  let [batch, setBatch] = useState("");
  let [section, setSection] = useState("");
  let [id, setId] = useState("");

  let handledelete = async (id) => {
    let response = await fetch(`https://backend-mmsk.onrender.com/deleteastudent/${id}`, {
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": true,
        "Content-Type": "application/json",
      },
    });
    await response.json();
    props.setStudents(
      props.students.filter((student) => {
        return student._id !== id;
      })
    );
  };

  
  const ref = useRef(null);
  const refclose = useRef(null);
  let handleedit = (id, name, age, gender, marks, email, batch, section) => {
    ref.current.click();
    setName(name);
    setAge(age);
    setSection(section);
    setBatch(batch);
    setGender(gender);
    setMarks(marks);
    setEmail(email);
    setId(id);
  };

  let handleupdate = async () => {
    refclose.current.click();
    let response = await fetch(`https://backend-mmsk.onrender.com/update_student/${id}`, {
      method: "PUT",   
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
        section: section
      }),
    });
    await response.json();
    props.setStudents(
      props.students.map((s) => {
        if (s._id === id) {
          s.name = name;
          s.age = age;
          s.email = email;
          s.gender = gender;
          s.marks = marks;
          s.batch = batch;
          s.section = section;
        }
        return s;
      })
    );
  };

  return (
    <>
      <div className="overflow-x-scroll">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col">Gender</th>
              <th scope="col">Marks</th>
              <th scope="col">Email</th>
              <th scope="col">Batch</th>
              <th scope="col">Section</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {props.students.map((student) => {
              return (
                <tr>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>{student.gender}</td>
                  <td>{student.marks}</td>
                  <td>{student.email}</td>
                  <td>{student.batch}</td>
                  <td>{student.section}</td>
                  <td
                    onClick={() => handleedit(student._id,student.name,student.age,student.gender,student.marks,student.email, student.batch,student.section)}
                    style={{ cursor: "pointer", color: "blue" }}>
                    Edit
                  </td>
                  <td
                    onClick={() => handledelete(student._id)}
                    style={{ cursor: "pointer", color: "red" }}
                  >
                    Delete
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          hidden={true}
          ref={ref}
        ></button>

        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Modal title
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  ref={refclose}
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
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
                    Age
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
                    Gender
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
                    Marks
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
                    Email
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
                    Batch
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
                    Section
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    id="section"
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={handleupdate}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
