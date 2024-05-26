"use client";
import React, { useState } from "react";

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface EmployeeListProps {
  employees: Employee[];
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees }) => {
  const [loading, setLoading] = useState(false);
  const onDelete = async (id: string) => {
    setLoading(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        id,
      });

      const requestOptions: RequestInit = {
        method: "DELETE",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch("http://localhost:3000/api/employee", requestOptions);
      alert("Employee Deleted!");
    } catch (error) {
      console.log("error while deleting", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <table className="min-w-full bg-white mt-4">
      <thead>
        <tr className="bg-gray-200">
          <th className="py-2 px-4 border-b border-gray-300 text-left">
            Employee ID
          </th>
          <th className="py-2 px-4 border-b border-gray-300 text-left">
            First Name
          </th>
          <th className="py-2 px-4 border-b border-gray-300 text-left">
            Last Name
          </th>
          <th className="py-2 px-4 border-b border-gray-300 text-left">
            Email
          </th>
          <th className="py-2 px-4 border-b border-gray-300 text-left">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td className="py-2 px-4 border-b border-gray-300">
              {employee.id}
            </td>
            <td className="py-2 px-4 border-b border-gray-300">
              {employee.firstName}
            </td>
            <td className="py-2 px-4 border-b border-gray-300">
              {employee.lastName}
            </td>
            <td className="py-2 px-4 border-b border-gray-300">
              {employee.email}
            </td>
            <td className="py-2 px-4 border-b border-gray-300 flex gap-4">
              <button className="py-2 px-4 bg-green-400 rounded-lg font-bold">
                Update
              </button>
              <button
                onClick={() => onDelete(employee.id)}
                className="py-2 px-4 bg-red-400 rounded-lg font-bold"
              >
                {loading ? "loading..." : "Delete"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeList;
