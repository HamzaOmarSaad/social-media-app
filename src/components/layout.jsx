import React from "react";
import AppNav from "./appNav";
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";

function Layout() {
  return (
    <main className="min-h-screen bg-zinc-200 dark:bg-gray-700">
      <AppNav />
      <Outlet />
      <Toaster />
    </main>
  );
}

export default Layout;
