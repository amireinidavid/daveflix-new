import React, { Children } from "react";
import Drawer from "rc-drawer";
import MenuDrawer from "./MenuDrawer";

function MainDrawer({ children, DrawerOpen, toggleDrawer }) {
  return (
    <Drawer
      open={DrawerOpen}
      onClose={toggleDrawer}
      level={null}
      handler={false}
      placement="right"
    >
      {children}
    </Drawer>
  );
}

export default MainDrawer;
