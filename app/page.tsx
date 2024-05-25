import { employees } from "@prisma/client";
import Button from "./components/Button";
import EmployeeList from "./components/EmployeeList";
import { prisma } from "./config/prisma";

const fetchEmployees = async () => {
  try {
    const employees = await prisma.employees.findMany();
    return employees;
  } catch (error) {
    console.log("error", error);
    return [];
  }
};
export default async function Home() {
  // {
  //   id: 1,
  //   firstName: "Ahmad",
  //   lastName: "raza",
  //   email: "fowbaz.com",
  // }
  const employees = await fetchEmployees();
  return (
    <>
      <div
        className="
      bg-slate-700
      py-6
      px-2
      "
      >
        <h1
          className="
        text-2xl
        font-bold
        text-white
        "
        >
          Employee Mangement App
        </h1>
      </div>
      <h1 className="text-center my-4 text-3xl font-extrabold">
        List Employees
      </h1>

      <div className="max-w-4xl mt-10  mx-auto">
        <Button />
        <EmployeeList employees={employees} />
      </div>
    </>
  );
}
