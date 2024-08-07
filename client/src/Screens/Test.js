import React, { useState } from "react";
import MainDrawer from "../components/Drawer/MainDrawer";
import { FaSearch } from "react-icons/fa";
import Layout from "../Layout/Layout";

function Test() {
  const [visible, setVisible] = useState(false);
  const toggleDrawer = () => {
    setVisible(!visible);
  };
  return (
    <>
      <Layout>
        <div className="col-span-3">
          <MainDrawer Visible={visible} onClose={toggleDrawer} />
          <div className="w-full text-sm bg-dryGray rounded flex-btn gap-4">
            <button
              type="submit "
              className="bg-subMain w-12 flex-colo h-12 rounded text-white"
              onClick={toggleDrawer}
              onAbort={visible}
            >
              <FaSearch />
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Test;
