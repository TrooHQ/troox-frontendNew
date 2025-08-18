import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Paper, Popper } from '@mui/material';
import { CustomAutocomplete } from '../Overview';
import { ArrowDropDown, Search } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../../store/store";
import {
  userSelectedBranch,
} from "../../../slices/branchSlice";



export default function BranchDropDown() {

  const dispatch = useDispatch();

  const { branches, selectedBranch } = useSelector(
    (state: RootState) => state.branches
  );
  const { userData } = useSelector(
    (state: RootState) => state.user
  );

  const transformedBranches = branches.map((branch: any) => ({
    label: branch.branch_name,
    id: branch._id,
  }));

  const [isAutoOpen, setIsAutoOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOutlet, setSelectedOutlet] = useState(
    selectedBranch
      ? selectedBranch
      : {
        label: "All outlets",
        id: "",
      }
  );

  useEffect(() => {
    if (userData?.user_role === "admin") {
      const defaultBranch = transformedBranches[0];
      (selectedBranch === null || selectedBranch === undefined) &&
        dispatch(userSelectedBranch(defaultBranch as any));
    } else if (userData?.user_role === "employee") {
      dispatch(userSelectedBranch(userData?.branch_id));
    }
  }, [dispatch, transformedBranches, selectedBranch]);


  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsAutoOpen((prev) => !prev);
  };

  const handleSelect = (event: any, value: any) => {
    event.preventDefault();
    setSelectedOutlet(value ?? { label: "All outlets" });
    dispatch(userSelectedBranch(value));
    setIsAutoOpen(false);
  };


  return (
    <div>
      <Button
        onClick={handleButtonClick}
        sx={{
          backgroundColor: "transparent",
          border: "none",
          color: "#121212",
          fontSize: "14px",
          fontWeight: 500,
          ml: 0,
          "&:hover": {
            backgroundColor: "transparent",
            color: "#121212",
            fontSize: "14px",
            fontWeight: 500,
          },
          "&:focus": {
            outline: "none",
          },
        }}
      >
        {selectedBranch?.label} <ArrowDropDown />
      </Button>

      <Popper
        open={isAutoOpen}
        anchorEl={anchorEl}
        placement="bottom-start"
        sx={{ zIndex: 10, boxShadow: 3 }}
      >
        <Paper sx={{ boxShadow: 3 }}>
          <CustomAutocomplete
            disablePortal
            options={transformedBranches}
            value={
              selectedBranch
                ? selectedBranch.label
                : selectedOutlet.label
            }
            onChange={handleSelect}
            open // ✅ forces the dropdown list to render
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search outlet"
                variant="outlined"
                style={{ width: "220px", marginLeft: "0px" }}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      <Search
                        style={{ color: "gray", marginRight: "4px" }}
                      />
                      {params.InputProps.startAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        </Paper>
      </Popper>
    </div>
  );
}