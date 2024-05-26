"use client  ";
import React, { useState } from "react";
interface EmployeeProps {
  OnClose: () => void;
}
const CreateEmployee: React.FC<EmployeeProps> = ({ OnClose }) => {
  const [empolyeeFirstName, setEmpolyeeFirstName] = useState("");
  const [empolyeeLastName, setEmpolyeeLastName] = useState("");
  const [empolyeeEmailID, setEmpolyeeEmailID] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  async function HandleOnClick(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (!empolyeeFirstName || !empolyeeLastName || !empolyeeEmailID) {
        setError("Please fill in all fields.");
        return;
      }
      if (!validateEmail(empolyeeEmailID)) {
        setError("Invalid email address.");
        return;
      }
      setError("");
      setLoading(true);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        firstName: empolyeeFirstName,
        lastName: empolyeeLastName,
        email: empolyeeEmailID,
      });

      var requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch("/api/employee", requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setEmpolyeeFirstName("");
      setEmpolyeeLastName("");
      setEmpolyeeEmailID("");
      setLoading(false);
      OnClose();
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  }

  return (
    <div
      className="
       bg-black/50
         absolute
         inset-0 
         w-full 
         h-screen  
         flex
         items-center
         justify-center"
    >
      <div
        className="
      bg-white
     max-w-sm
     min-w-[500px]
     py-4
     px-2
     rounded-lg
     shadow-2xl
      
      "
      >
        <h1 className="text-center text-xl  text-red-500 font-bold leading-5">
          Create Employee
        </h1>
        <form onSubmit={HandleOnClick}>
          <div className="mt-4 flex flex-col mx-4">
            <label className="mb-1">Employee First Name:</label>
            <input
              type="text"
              value={empolyeeFirstName}
              onChange={(e) => setEmpolyeeFirstName(e.target.value)}
              className="focus:ring-1 ring-1 ring-slate-500  focus:ring-red-500 rounded-md outline-none"
            />
          </div>
          <div className="mt-4 flex flex-col mx-4 ">
            <label className="mb-1">Employee Last Name:</label>
            <input
              type="text"
              value={empolyeeLastName}
              onChange={(e) => setEmpolyeeLastName(e.target.value)}
              className="focus:ring-1 ring-1 ring-slate-500  focus:ring-red-500 rounded-md outline-none"
            />
          </div>
          <div className="mt-4 flex flex-col mx-4 ">
            <label className="mb-1">Employee Email ID:</label>
            <input
              type="email"
              value={empolyeeEmailID}
              onChange={(e) => setEmpolyeeEmailID(e.target.value)}
              className="focus:ring-1 ring-1 ring-slate-500  focus:ring-red-500 rounded-md outline-none"
              autoComplete="email"
            />
          </div>
          {error && (
            <p className="text-red-500 text-base italic mx-4 mt-2">{error}</p>
          )}

          <div className="flex justify-center items-center mt-4 gap-8 py-4">
            <button
              type="submit"
              className="py-2 px-4 font-bold rounded-md bg-green-400"
            >
              {loading ? "loading..." : "Add"}
            </button>
            <button
              onClick={OnClose}
              className="py-2 px-4 font-bold rounded-md bg-red-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployee;
