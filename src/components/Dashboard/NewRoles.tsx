import { useState, ChangeEvent, useEffect, useMemo } from "react";
import axios from "axios";
import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import RolesAndPermission from "../RolesAndPermissionCopy";
import { SERVER_DOMAIN } from "../../Api/Api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppDispatch } from "@/src/store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from "../../slices/rolesSlice";
import { accessLabels } from "../RolesandPerm";

interface FAQItem {
  question: string;
  inputValue?: string;
}

const NewRoles = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const params = new URLSearchParams(window.location.search);
  const roleId = params.get("_id");
  const roles = useSelector((state: any) => state.roles.roles);


  useEffect(() => {
    if (roleId) {
      dispatch(fetchRoles());
    }
  }, [roleId, dispatch]);


  // const role = roles.find((role: any) => role._id === roleId);

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [roleName, setRoleName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);


  useEffect(() => {
    if (roles.length > 0 && roleId) {
      const role = roles.find((role: any) => role._id === roleId);
      if (role) {
        // setRole(role);
        // console.log("something light")
        setRoleName(role.name);
        setDescription(role.description);
        setSelectedPermissions(role.permissions);
      }
      // setRole(role);
    }
  }, [roleId, dispatch, roles]);

  const faqData: FAQItem[] = [
    { question: "Level 1 User", inputValue: "Input 1" },
    { question: "Level 2 User", inputValue: "Input 2" },
    { question: "Level 3 User", inputValue: "Input 3" },
  ];

  const [checkedGeneral, setCheckedGeneral] = useState<string[]>([]);
  const [generalAccess, setGeneralAccess] = useState<string[]>([]);
  const [checkedInventory, setCheckedInventory] = useState<string[]>([]);
  const [inventoryAccess, setInventoryAccess] = useState<string[]>([]);
  const [checkedTickets, setCheckedTickets] = useState<string[]>([]);
  const [ticketsAccess, setTicketsAccess] = useState<string[]>([]);


  useEffect(() => {
    // Sync checked arrays with selectedPermissions (initial load)
    const general = accessLabels.find((l) => l.category?.toLocaleLowerCase() === "general")?.permissions || [];
    const inventory = accessLabels.find((l) => l.category?.toLocaleLowerCase() === "inventory")?.permissions || [];
    const ticket = accessLabels.find((l) => l.category?.toLocaleLowerCase() === "ticket")?.permissions || [];

    // console.log("general", general)
    // console.log("inventory", inventory)
    // console.log("ticket", ticket)

    setGeneralAccess(general);
    setInventoryAccess(inventory);
    setTicketsAccess(ticket);

  }, []);

  console.log("selected general", checkedGeneral)
  console.log("selected inventory", checkedInventory)
  console.log("selected tickets", checkedTickets)

  const filterSelectedFunction = (selected: string[], access: string[]) => {
    return access.filter((item) => selected.includes(item));
  }

  const checkedGeneralI = useMemo(() => {
    if (selectedPermissions.length > 0 && generalAccess.length > 0) {
      return selectedPermissions.filter(item => generalAccess.includes(item));
    }
    return [];
  }, [generalAccess]);
  console.log("selected general", checkedGeneralI)

  const checkedInventoryI = useMemo(() => {
    if (selectedPermissions.length > 0 && inventoryAccess.length > 0) {
      setCheckedInventory(filterSelectedFunction(selectedPermissions, inventoryAccess));
    } else {
      setCheckedInventory([]);
    }
  }, [inventoryAccess,]);
  console.log("selected inventory", checkedInventoryI)

  const checkedTicketsI = useMemo(() => {
    if (selectedPermissions.length > 0 && ticketsAccess.length > 0) {
      return selectedPermissions.filter(item => ticketsAccess.includes(item));
    }
    return [];
  }, [ticketsAccess]);
  console.log("selected tickets", checkedTicketsI)

  console.log("selectedPermissions", selectedPermissions)

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleRoleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoleName(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleSaveAndContinue = async () => {
    try {
      setSaveLoading(true);
      const headers = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      // 1. Create a new role
      const roleResponse = await axios.post(
        `${SERVER_DOMAIN}/role/createRole/`,
        {
          role_name: roleName,
          description,
        },
        headers
      );

      toast.success("Role created successfully.");
      navigate(-1);

      const { _id: role_id, name: role_name } = roleResponse.data.data;

      // 2. Assign permissions to the role
      await axios.post(
        `${SERVER_DOMAIN}/role/assignPermtoRole`,
        {
          role_name,
          role_id,
          permissions: selectedPermissions,
        },
        headers
      );

      // Handle success (e.g., redirect or display a message)
      toast.success("Role created and permissions assigned successfully.");
      setCheckedGeneral([]);
      setCheckedInventory([]);
      setCheckedTickets([]);
    } catch (error: any) {
      // Handle errors (e.g., display error message)
      console.error("Error creating role or assigning permissions:", error);
      toast.error(error.response.data.message);
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <TopMenuNav pathName="Manage Users" />
      <div className="  max-w-[897px] 2xl:max-w-[1070px]">
        <div className="my-10 ">
          <p className="text-[24px] font-[500] text-purple500">New Roles</p>
          <div className="w-full my-8">
            <div className=" grid gap-[48px]">
              <div className="flex items-start">
                <label
                  htmlFor=""
                  className="flex-shrink-0 mr-4  text-[16px] text-[#606060] font-[400]"
                >
                  Role Name
                </label>
                <div className="flex-1">
                  <input
                    type="text"
                    id="role-name"
                    value={roleName}
                    onChange={handleRoleNameChange}
                    className="px-2 w-full h-[48px] rounded-[5px] border border-grey100"
                  />
                </div>
              </div>
              <div className="flex items-start">
                <label
                  htmlFor=""
                  className="flex-shrink-0 mr-4  text-[16px] text-[#606060] font-[400]"
                >
                  Description
                </label>
                <div className="flex-1">
                  <textarea
                    id="description"
                    value={description}
                    onChange={handleDescriptionChange}
                    className="px-2 py-2 w-full h-[128px] rounded-[5px] border border-grey100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-10 ">
          <div className="flex items-center justify-between">
            <p className="text-[24px] font-[500] text-purple500">Permissions Setting</p>
          </div>
          <div className="w-full my-8">
            <div className=" grid gap-[48px]">
              <RolesAndPermission
                faqData={faqData}
                openIndex={openIndex}
                toggleAnswer={toggleAnswer}
                setSelectedPermissions={setSelectedPermissions}
                selectedPermissions={selectedPermissions}
                checkedGeneral={checkedGeneral}
                checkedInventory={checkedInventory}
                checkedTickets={checkedTickets}
                setCheckedGeneral={setCheckedGeneral}
                setCheckedInventory={setCheckedInventory}
                setCheckedTickets={setCheckedTickets}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          <div
            className="border border-purple500 rounded px-[24px] py-[13px] font-[600] text-purple500 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            Cancel
          </div>
          <div
            className="border border-purple500 bg-purple500 rounded px-[24px] py-[13px] font-[500] text-[#ffffff] cursor-pointer"
            onClick={handleSaveAndContinue}
          >
            {saveLoading ? "Saving..." : "Save"}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NewRoles;
