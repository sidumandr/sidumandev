"use client";

import { useTheme } from "../ThemeProvider/ThemeProvider";
import Navbar from "./Navbar";

const NavbarWrapper = () => {
  const { theme, toggleTheme } = useTheme();
  return <Navbar theme={theme} toggleTheme={toggleTheme} />;
};

export default NavbarWrapper;
