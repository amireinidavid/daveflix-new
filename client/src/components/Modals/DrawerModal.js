import React from "react";
import { Link, NavLink } from "react-router-dom";
import { BsCollectionPlay } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BiHome, BiPhoneCall } from "react-icons/bi";
import MainModal from "./MainModal";
import { FaFacebook, FaTelegram, FaTwitter } from "react-icons/fa";
import { MdMail } from "react-icons/md";

function DrawerModal({ modalOpen, setModalOpen }) {
  const active = "bg-dry text-subMain";
  const hover = "hover:bg-dry";
  const inActive =
    "rounded sm:gap-10 font-medium text-sm transitions flex gap-6 items-center sm:px-8 py-4 px-4 ";
  const Hover = ({ isActive }) =>
    isActive ? `${active} ${inActive}` : `${inActive} ${hover}`;

  const Links = [
    {
      name: "Home",
      link: "/",
      icon: BiHome,
    },
    {
      name: "Movies",
      link: "/movies",
      icon: BsCollectionPlay,
    },
    {
      name: "About Us",
      link: "/about-us",
      icon: HiOutlineUserGroup,
    },
    {
      name: "Contact Us",
      link: "/contact-us",
      icon: BiPhoneCall,
    },
  ];

  const LinkDatas = [
    {
      icon: FaFacebook,
      link: "https://www.facebook.com/zpunet",
    },
    {
      icon: FaTwitter,
      link: "https://t.me/zpunet",
    },
    {
      icon: FaTelegram,
      link: "https://t.me/zpunet",
    },
    {
      icon: MdMail,
      link: "https://t.me/zpunet",
    },
  ];
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className=" inline-block sm:w-4/5 border border-border lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl ">
        <div className="w-full align-middle text-md mb-3 text-subMain ">
          <p>Navigation Menu</p>
        </div>
        <div className="w-full flex-btn h-16 mb-5 px-6 py-4  ">
          <Link to="/">
            <img src="/assets/log.png" alt="logo" className=" object-contain" />
          </Link>
        </div>
        {/* menu links */}
        <div className="w-full overflow-y-scroll max-height-full">
          <div className="pb-12 pt-4">
            {Links.map((link, index) => (
              <NavLink to={link.link} className={Hover} key={index}>
                <link.icon className="text-lg " /> {link.name}
              </NavLink>
            ))}
          </div>
          <div className="flex-rows gap-6 w-full">
            {LinkDatas.map((link, index) => (
              <a
                href={link.link}
                key={index}
                target="_blank"
                className="flex-colo w-12 h-12 transitions hover:bg-subMain text-lg bg-white rounded bg-opacity-30"
              >
                <link.icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </MainModal>
  );
}

export default DrawerModal;
