"use client";

import { useState } from "react";
import CreateEmployee from "./CreateEmployee";

const Button = () => {
  const [isOpen, setiIsOpen] = useState(false);

  const HandleOpen = () => {
    setiIsOpen(true);
  };
  const HandleClose = () => {
    setiIsOpen(false);
  };
  return (
    <div>
      <button
        onClick={HandleOpen}
        className="py-2 px-6 rounded-sm font-bold bg-gray-500 text-white"
      >
        Create Employee
      </button>
      {isOpen && <CreateEmployee OnClose={HandleClose} />}
    </div>
  );
};

export default Button;
