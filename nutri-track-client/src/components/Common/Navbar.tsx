import React, { useContext } from "react";
import {
  Drawer,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logout } from "../../queries/auth";
import { mainMenu, secondaryMenu } from "./menuData";
import { UserContext } from "../../context/UserContext";

interface DrawerListProps {
  navWidth: string;
}

const DrawerList = () => {
  const navigate = useNavigate();
  const { resetConnectedUser, connectedUser } = useContext(UserContext);

  const logoutUser = async () => {
    try {
      const refreshToken = connectedUser?.refreshToken;

      if (!refreshToken) {
        console.log("No refresh token found");
        return;
      }

      const response = await logout(refreshToken);

      if (response.status === 200) {
        resetConnectedUser();
        console.log("Logged out");
        navigate("/login");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <Box role='presentation'>
      <List>
        {mainMenu.map((menuItem, index) => (
          <ListItem key={menuItem.title} disablePadding>
            <ListItemButton onClick={() => navigate(menuItem.navigate)}>
              {/* <ListItemIcon>
               TODO: add icon
              </ListItemIcon> */}
              <ListItemText
                primary={menuItem.title}
                style={{ color: "white" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ backgroundColor: "grey" }} />
      <List>
        {secondaryMenu.map((menuItem, index) => (
          <ListItem key={menuItem.title} disablePadding>
            <ListItemButton onClick={logoutUser}>
              {/* <ListItemIcon>
               TODO: add icon
               </ListItemIcon> */}
              <ListItemText
                primary={menuItem.title}
                style={{ color: "white" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const NavbarDrawer: React.FC<DrawerListProps> = ({ navWidth }) => {
  return (
    <Drawer
      open={true}
      variant='persistent'
      PaperProps={{ sx: { width: navWidth } }}>
      <div style={{ backgroundColor: "#113537", height: "100%" }}>
        <DrawerList />
      </div>
    </Drawer>
  );
};

export default NavbarDrawer;
