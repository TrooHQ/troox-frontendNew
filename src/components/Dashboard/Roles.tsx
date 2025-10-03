import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_DOMAIN } from "../../Api/Api";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from "../../slices/rolesSlice";
import { AppDispatch } from "../../store/store";
import Modal from "../Modal";
import Loader from "../Loader";

const Roles = () => {
  const dispatch = useDispatch<AppDispatch>();
  const roles = useSelector((state: any) => state.roles.roles);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  // Clone
  const [saveLoading, setSaveLoading] = useState(false);
  const handleClone = async (role: any) => {
    try {
      console.log(role);
      setSaveLoading(true);

      const headers = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      // 1. Create a new role with the cloned data
      const clonedRoleName = `${role.name}_clone`; // or append any suffix/prefix to make it unique
      const roleResponse = await axios.post(
        `${SERVER_DOMAIN}/role/createRole/`,
        {
          role_name: clonedRoleName,
          description: role.description,
        },
        headers
      );

      toast.success("Role cloned successfully.");

      const { _id: role_id, name: role_name } = roleResponse.data.data;

      // 2. Assign the same permissions to the cloned role
      await axios.post(
        `${SERVER_DOMAIN}/role/assignPermtoRole`,
        {
          role_name,
          role_id,
          permissions: role.permissions,
        },
        headers
      );

      // Handle success
      toast.success("Role cloned and permissions assigned successfully.");
    } catch (error: any) {
      // Handle errors
      console.error("Error cloning role or assigning permissions:", error);
      toast.error(error.response?.data?.message || "Failed to clone role.");
    } finally {
      setSaveLoading(false);
    }
  };


  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<any | null>(null);

  const deleteRoleFunction = async () => {

    setSaveLoading(true);
    // delete-/role/deleteRole/
    const payload = {
      "role_name": roleToDelete.name
    }

    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    try {
      const response = await axios.delete(`${SERVER_DOMAIN}/role/deleteRole`, { data: payload, ...headers });
      toast.success(response.data.message);
      dispatch(fetchRoles());
      setShowDeleteModal(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete role.");
    } finally {
      setSaveLoading(false);
    }
  };

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
          <p className="col-span-2">
            {role.description || "No description available"}
          </p>
          <div className="flex items-center justify-end col-span-2 px-3 py-2">
            <div className="text-[14px] flex gap-2 items-center border rounded-md border-grey200">
              {["Edit", "Clone", "Delete"].map((action, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (action === "Clone") {
                      handleClone(role);
                    } else if (action === "Edit") {
                      window.location.href = `/edit-role?_id=${role._id}`;
                    } else if (action === "Delete") {
                      setShowDeleteModal(true);
                      setRoleToDelete(role);
                    }
                    // You can add handlers for "Edit" and "Delete" actions here if needed
                  }}
                  className={`px-3 py-2 ${action === "Delete" ? "text-[#B61C1C]" : "text-black"
                    } ${index > 0 ? "border-l border-grey200" : ""}`}
                >
                  {saveLoading && action === "Clone" ? "Loading..." : action}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
      <DeleteModal _isOpen={showDeleteModal} _onClose={() => setShowDeleteModal(false)} _onDelete={deleteRoleFunction} _saveLoading={saveLoading} />
    </div>
  );
};

export default Roles;


const DeleteModal = ({ _isOpen, _onClose, _onDelete, _saveLoading }: any) => {
  return (
    <Modal isOpen={_isOpen} onClose={_onClose}>
      <div className="p-6 rounded-lg w-[400px]">
        <h4 className="text-2xl font-semibold ">Are you sure you want to delete this role?</h4>

        {_saveLoading && <Loader />}
        <div className="flex justify-end gap-4 mt-4">
          <button onClick={_onClose} className="w-full px-6 py-2 border border-black rounded-md">Cancel</button>
          <button onClick={_onDelete} className="w-full px-6 py-2 text-white bg-black rounded-md" disabled={_saveLoading}>Delete</button>
        </div>
      </div>
    </Modal>
  )
}