import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PersonIcon from "@mui/icons-material/Person";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import { useState, useEffect } from "react";
import { styled } from "@mui/system";

import { NextLinkComposed } from "./NextLinkComposed.tsx";
import { useRouter } from "next/router";
const BottomNavbar = () => {
  const { pathname } = useRouter();
  const [value, setValue] = useState(0);
  useEffect(() => {
    switch (pathname) {
      case "/profile":
        setValue(2);
        break;
      case "/meatstickers":
        setValue(1);
        break;
      case "/activity":
        setValue(0);
        break;

      default:
        setValue(null);
        break;
    }
  }, [pathname]);

  const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
  return (
    <>
      <Offset />
      <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Активность"
            icon={<LocalActivityIcon />}
            component={NextLinkComposed}
            to="/news"
          />
          <BottomNavigationAction
            label="Участники"
            icon={<EmojiEventsIcon />}
            component={NextLinkComposed}
            to="/meatstickers"
          />

          <BottomNavigationAction
            label="Профиль"
            icon={<PersonIcon />}
            component={NextLinkComposed}
            to="/profile"
          />
        </BottomNavigation>
      </Paper>
    </>
  );
};
export default BottomNavbar;
