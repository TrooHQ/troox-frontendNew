import React, { useState } from "react";
import { MoreVert, EditOutlined, DeleteForeverOutlined } from "@mui/icons-material";
import { Popover, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

const ModifierActions = ({
  modifier,
  handleSaveClick,
  handleEditClick,
  handleModifierGroupDeleteClick,
}: any) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMoreVertClick = (event: any) => {
    setAnchorEl(event.currentTarget); // Open the popover when MoreVert is clicked
  };

  const handleClose = () => {
    setAnchorEl(null); // Close the popover
  };

  const open = Boolean(anchorEl); // Check if popover is open

  return (
    <div>
      <MoreVert onClick={handleMoreVertClick} className="text-purple500 mr-3 cursor-pointer" />

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <List>
          {editId === modifier._id ? (
            <ListItem
              button
              onClick={() => {
                handleSaveClick(modifier);
                handleClose();
              }}
            >
              <ListItemIcon>
                <span className="text-green-500 mr-3 cursor-pointer">💾</span>
              </ListItemIcon>
              <ListItemText primary="Save" />
            </ListItem>
          ) : (
            <ListItem
              button
              onClick={() => {
                handleEditClick(modifier);
                handleClose();
              }}
            >
              <ListItemIcon>
                <EditOutlined className="text-purple500 mr-3 cursor-pointer" />
              </ListItemIcon>
              <ListItemText primary="Edit" />
            </ListItem>
          )}
          <ListItem
            button
            onClick={() => {
              handleModifierGroupDeleteClick(modifier.modifier_group_name);
              handleClose();
            }}
          >
            <ListItemIcon>
              <DeleteForeverOutlined className="text-red-700 ml-3 cursor-pointer" />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </ListItem>
        </List>
      </Popover>
    </div>
  );
};

export default ModifierActions;
