import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { Aave, LogoutCurve } from "iconsax-reactjs";
import { useContext, useEffect } from "react";
import {Link, NavLink} from "react-router";
import { UserContext } from "../context/UserContext";

export default function AppNav() {
   const { userData ,getUserData ,logout,userToken  } = useContext(UserContext);
   
   useEffect(()=>{
    if (userToken)
      getUserData(userToken)
   },[userToken])

  return (
    <Navbar>
      <NavbarBrand as={Link} to={"/posts"}>
        <Aave size="32" color="#FF8A65" />
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        {userData ? (
          <div className="flex gap-4 items-center">
            <Link
              to={"/profile"}
              className="rounded-2xl overflow-hidden size-10 bg-zinc-400"
            >
              <img src={userData?.user?.photo} alt="this is the users image" className="size-full" />
            </Link>
            <div className="dark:text-white">
              <span className="font-bold">hello</span> {userData?.user?.name}
            </div>
            <LogoutCurve
              onClick={logout}
              size="32"
              color="#FF8A65"
              className="cursor-pointer hover:text-red-700"
            />
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