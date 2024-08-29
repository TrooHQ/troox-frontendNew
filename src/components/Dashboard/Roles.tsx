import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_DOMAIN } from "../../Api/Api";

const Roles = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const headers = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      try {
        const response = await axios.get(`${SERVER_DOMAIN}/role/getAllRolesByBusiness`, headers);
        console.log("Roles:", response.data);
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  return (
    <div className="">
      <div className="grid grid-cols-5 items-center border-b border-b-grey100 text-grey300 text-[16px]">
        <p className="px-3 py-2">Role Name</p>
        <p className="px-3 py-2">Description</p>
        <p className="col-span-2 px-3 py-2"></p>
      </div>
      {roles.map((role: any) => (
        <div
          key={role._id}
          className="grid grid-cols-5 items-center px-5 py-4 bg-[#F8F8F8] text-grey500 text-[16px] my-3"
        >
          <p className="px-3 py-2">{role.name}</p>
          <p className="col-span-2">{role.description || "No description available"}</p>
          <div className="px-3 py-2 flex items-center col-span-2 justify-end">
            <div className="text-[14px] flex gap-2 items-center border rounded-md border-grey200">
              {["Edit", "Clone", "Delete"].map((action, index) => (
                <button
                  key={index}
                  className={`px-3 py-2 ${
                    action === "Delete" ? "text-[#B61C1C]" : "text-purple500"
                  } ${index > 0 ? "border-l border-grey200" : ""}`}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Roles;
