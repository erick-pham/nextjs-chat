import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HouseIcon from "@mui/icons-material/House";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "@src/components/Link";
import { BellIcon, UsersIcon } from "../Icons";
import { useRouter } from "next/router";
import { supabase } from "@src/lib/supabase";

const MessageNavbarRoot = styled(AppBar)(({ theme }: { theme: any }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export const DashboardNavbar = (props: any) => {
  const { onSidebarOpen, currentUser, ...other } = props;
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    router.push("/sign-in");
  };

  return (
    <>
      <MessageNavbarRoot
        sx={
          {
            // left: {
            //   lg: 280,
            // },
            // width: {
            //   lg: "calc(100% - 280px)",
            // },
          }
        }
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Link href="/">
            <Tooltip title="Home Page">
              <IconButton sx={{ ml: 1 }}>
                <HouseIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </Link>

          <Box sx={{ flexGrow: 1 }} />
          <Typography color={"text.secondary"}>
            Hi {currentUser.email}
          </Typography>
          <Tooltip title="Contacts">
            <IconButton sx={{ ml: 1 }}>
              <UsersIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 1 }}>
              <Badge badgeContent={4} color="primary" variant="dot">
                <BellIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="SignOut">
            <IconButton sx={{ ml: 1 }} onClick={handleSignOut}>
              <LogoutIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Avatar
            sx={{
              height: 40,
              width: 40,
              ml: 1,
            }}
            src={""}
          >
            U
          </Avatar>
        </Toolbar>
      </MessageNavbarRoot>
    </>
  );
};

export default DashboardNavbar;
