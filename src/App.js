import React, { useState, useEffect } from "react";
import "./App.css";
import db from "./firebase";
//import ReactTable from "react-table";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

function App() {
  const [newName, setNewname] = useState("");
  const [newAge, setNewage] = useState(0);
  const [users, setUsers] = useState([]);
  const usersCollectionref = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionref, { name: newName, age: Number(newAge) });
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };
  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionref);
      setUsers(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getUsers();
  }, [usersCollectionref]);
  return (
    <div className="App">
      <h1>React with firebase CRUD</h1>
      <label className="label"> Name: </label>{" "}
      <input
        type="text"
        placeholder="Name"
        onChange={(event) => {
          setNewname(event.target.value);
        }}
      />
      <label className="label">Age:</label>{" "}
      <input
        type="number"
        placeholder="Age"
        onChange={(event) => {
          setNewage(event.target.value);
        }}
      />
      <button onClick={createUser}>Create</button>
      {users.map((users) => {
        return (
          <div className="flex-content">
            {""}

            <h4>{users.name}</h4>
            <h4>{users.age}</h4>
            <button
              className="btn-increase"
              onClick={() => {
                updateUser(users.id, users.age);
              }}
            >
              IncreaseAge
            </button>
            <button
              className="btn-delete"
              onClick={() => {
                deleteUser(users.id);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
