import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { BsCollectionPlay } from "react-icons/bs";
import { FiHeart, FiHome, FiUserCheck } from "react-icons/fi";
import { CgMenuBoxed } from "react-icons/cg";

import DrawerModal from "../../components/Modals/DrawerModal";
import { useSelector } from "react-redux";

function MobileFooter() {
  const { likedMovies } = useSelector((state) => state.userGetFavoriteMovies);
  const { userInfo } = useSelector((state) => state.userLogin);

  const [modalOpen, setModalOpen] = useState(false);

  const active = "bg-dryGray text-main";
  const hover = "hover:text-main hover:bg-white";
  const inActive =
    "transitions text-2xl flex-colo rounded  p-4 transitions flex gap-3 items-center rounded-md px-4 py-3";
  const Hover = ({ isActive }) =>
    isActive ? `${active} ${inActive}` : `${inActive} ${hover}`;

  return (
    <>
      <DrawerModal modalOpen={modalOpen} setModalOpen={setModalOpen} />

      <div className="flex flex-col h-full justify-between align-middle bg-white rounded cursor-pointer overflow-y-scroll flex-grow w-full "></div>
      <footer className="lg:hidden fixed z-50 bottom-0 w-full px-1">
        <div className="bg-dry rounded-md flex-btn w-full p-1">
          <NavLink to="/" className={Hover}>
            <FiHome />
          </NavLink>
          <NavLink to="/movies" className={Hover}>
            <BsCollectionPlay />
          </NavLink>
          <NavLink to="/favourite" className={Hover}>
            <div className="relative">
              <div className="w-5 h-5 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-2 -right-1  ">
                {likedMovies?.length > 0 ? likedMovies?.length : 0}
              </div>
            </div>

            <FiHeart />
          </NavLink>
          <NavLink
            className={Hover}
            to={
              userInfo
                ? userInfo.isAdmin
                  ? "/dashboard"
                  : "/profile"
                : "/login"
            }
          >
            <FiUserCheck />
          </NavLink>
          <button onClick={() => setModalOpen(true)} className={inActive}>
            <CgMenuBoxed />
          </button>
        </div>
      </footer>
    </>
  );
}

export default MobileFooter;
