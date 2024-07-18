import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import { useEffect, useState } from "react";
import add from "../../assets/add.svg";
import { DeleteForeverOutlined } from "@mui/icons-material";
import BranchModal from "./components/BranchModal";
import { deleteBranch, fetchBranches } from "../../slices/branchSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/src/store/store";

const ManageBranches = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { branches, loading, error } = useSelector((state: RootState) => state.branches);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const handleAddMenu = () => {
    setIsModalOpen(true);
  };

  const handleDeleteBranch = (branchId: any) => {
    const reason = prompt("Please provide a reason for deleting this branch:");
    if (reason) {
      dispatch(deleteBranch({ branchId, reason }));
    }
  };

  return (
    <div>
      <DashboardLayout>
        <TopMenuNav pathName="Menu" />
        <div className="">
          <div className="my-[40px]">
            <div className="flex items-center justify-between">
              <div className=" flex items-center gap-[32px]">
                <div className="">
                  <p className=" font-[500] text-[16px] text-[#121212]">Filter by:</p>
                </div>
                <div className=" flex items-center gap-[8px]">
                  <div className="border border-purple500 bg-purple500  rounded-[5px] px-[16px] py-[8px] font-[400] text-[#ffffff]">
                    <button className="text-[12px] ">Add</button>
                  </div>
                  <div className="border border-[#B6B6B6]  rounded-[5px] px-[16px] py-[8px] font-[400] text-[121212]">
                    <button className="text-[12px] ">Branch Name</button>
                  </div>
                  <div className="border border-[#B6B6B6]  rounded-[5px] px-[16px] py-[8px] font-[400] text-[#121212]">
                    <button className="text-[12px] ">Address</button>
                  </div>
                  <div className="border border-[#B6B6B6]  rounded-[5px] px-[16px] py-[8px] font-[400] text-[#121212]">
                    <button className="text-[12px] ">Manager</button>
                  </div>
                  <div className="border border-[#B6B6B6]  rounded-[5px] px-[16px] py-[8px] font-[400] text-[#121212]">
                    <button className="text-[12px] ">City</button>
                  </div>
                </div>
              </div>
              <div className="border border-purple500 bg-purple500 w-[196px] rounded-[5px] px-[16px] py-[10px] font-[500] text-[#ffffff]">
                <button className="text-[14px] flex items-center gap-[8px]" onClick={handleAddMenu}>
                  <img src={add} alt="" /> Create New Branch
                </button>
              </div>
            </div>

            <div className="overflow-x-auto mt-6">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-[#606060] text-white text-center text-base font-normal">
                    <th className="py-2 px-4 text-base font-normal">Branch Name</th>
                    <th className="py-2 px-4 text-base font-normal">Address</th>
                    <th className="py-2 px-4 text-base font-normal">Manager</th>
                    <th className="py-2 px-4 text-base font-normal">City</th>
                    <th className="py-2 px-4 text-base font-normal">Email</th>
                    <th className="py-2 px-4 text-base font-normal">Actions</th>
                  </tr>
                </thead>

                <hr className="mb-2 text-[#E7E7E7]" />

                <tbody>
                  {branches.map((branch) => (
                    <tr
                      key={branch._id}
                      className={`${
                        branches.indexOf(branch) % 2 === 1 ? "bg-[#ffffff]" : "bg-[#F8F8F8]"
                      }`}
                    >
                      <td className="text-base font-medium py-2 px-4">{branch.branch_name}</td>
                      <td className="text-base font-medium py-2 px-4 break-words">
                        {branch.branch_address}
                      </td>
                      <td className="text-base font-medium py-2 px-4 break-words text-center">
                        {branch.branch_email}
                      </td>
                      <td className="text-base font-medium py-2 px-4 break-words text-center">
                        {branch.branch_phone_number}
                      </td>
                      <td className="text-base font-medium py-2 px-4 break-words text-center">
                        {branch.branch_email}
                      </td>
                      <td className=" text-center">
                        <DeleteForeverOutlined
                          className="text-red-700 cursor-pointer"
                          onClick={() => handleDeleteBranch(branch._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <BranchModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default ManageBranches;
