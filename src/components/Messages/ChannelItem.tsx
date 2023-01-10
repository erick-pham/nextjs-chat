import NextLink from "next/link";
import { Box, Button, ListItem } from "@mui/material";

const MyStyledButton = (props: any) => {
  return (
    <Button
      {...props}
      sx={{
        backgroundColor: props.active && "rgba(255,255,255, 0.08)",
        borderRadius: 1,
        color: props.active ? "secondary.main" : "neutral.300",
        fontWeight: props.active && "fontWeightBold",
        justifyContent: "flex-start",
        px: 3,
        textAlign: "left",
        textTransform: "none",
        width: "100%",
        "& .MuiButton-startIcon": {
          color: props.active ? "secondary.main" : "neutral.400",
        },
        "&:hover": {
          backgroundColor: "rgba(255,255,255, 0.08)",
        },
      }}
    >
      {props.children}
    </Button>
  );
};

export const ChannelItem = (props: any) => {
  const { activeChannelId, id, icon, title, ...others } = props;
  const active = String(activeChannelId) === String(id) ? true : false;

  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        mb: 0.5,
        py: 0,
        px: 2,
      }}
      {...others}
    >
      <NextLink
        href={"/messages/" + String(id)}
        passHref
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <MyStyledButton
          // component="a"
          startIcon={icon}
          disableRipple
          active={active === true ? "true" : undefined}
          // onClick={title === "SignOut" ? () => void() : null}
        >
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
        </MyStyledButton>
      </NextLink>
    </ListItem>
  );
};

export default ChannelItem;
