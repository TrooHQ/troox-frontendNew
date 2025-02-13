import { AppDispatch, RootState } from "../../store/store";
import { getRooms, getTables } from "../../slices/TableSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchBranches } from "../../slices/branchSlice";
import { useEffect, useState } from "react";

const QRCodesAtTable = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [state, setState] = useState({
    qrEmpty: true,
    addNewQR: false,
    qrSavedSuccess: false,
    collapseBranchQR: true,
    editBranchQR: false,
    deleteBranchQR: false,
  });

  useEffect(() => {
    dispatch(getTables());
  }, [dispatch]);

  const { tables } = useSelector((state: RootState) => state.tables);
  console.log(tables, "table");

  return <div>QRCodesAtTable</div>;
};

export default QRCodesAtTable;
