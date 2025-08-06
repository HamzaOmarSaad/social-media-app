import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { Aave, LogoutCurve } from "iconsax-reactjs";
import { useContext, useEffect } from "react";
import {Link, NavLink} from "react-router";
import { UserContext } from "../context/UserContext";

export default function AppNav() {
   const { userData ,getUserData ,logout } = useContext(UserContext);
   
   useEffect(()=>{
    if (localStorage.getItem("token"))
      getUserData(localStorage.getItem("token"))
   })

  return (
    <Navbar>
      <NavbarBrand as={Link} to={"/"}>
        <Aave size="32" color="#FF8A65"/>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        {userData ? (
          <div className="flex gap-4 items-center">
            <div className="rounded-2xl overflow-hidden size-10 bg-zinc-400">
              <img src={userData?.user?.photo} alt="" />
            </div>
            <div className="dark:text-white">
              <span className="font-bold">hello</span> {userData?.user?.name}
            </div>
            <LogoutCurve onClick={logout} size="32" color="#FF8A65"  className="cursor-pointer hover:text-red-700"/>
          </div>
        ) : (
          <NavbarLink as={NavLink} to={"/login"}>
            login
          </NavbarLink>
        )}
      </NavbarCollapse>
    </Navbar>
  );
}