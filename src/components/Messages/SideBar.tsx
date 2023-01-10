import { useEffect } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Drawer, useMediaQuery, Typography } from "@mui/material";
import ChannelItem from "./ChannelItem";
import { ChannelProps } from "@src/lib/supabase";

export const Sidebar = (props: {
  channels: ChannelProps[];
  activeChannelId: String;
  open: boolean;
  onClose: () => void;
}) => {
  const { open, onClose, channels, activeChannelId } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography color={"text.secondary"}>Channels</Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          {channels?.map((item) => (
            <ChannelItem
              key={item.id}
              id={item.id}
              // icon={item.icon}
              // href={item.href}
              activeChannelId={activeChannelId}
              title={item.slug}
            />
          ))}
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            top: 67, // 64 - Appbar boxShadow
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

Sidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  roomList: PropTypes.array,
};

export default Sidebar;
