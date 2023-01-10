import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { MessageProps } from "@src/lib/supabase";
import { User } from "@supabase/supabase-js";
export default function Conversation({
  messages,
  currentUser,
}: {
  messages: MessageProps[];
  currentUser: User | null;
}) {
  return (
    <List sx={{ width: "100%" }}>
      {messages?.map((msg, index) =>
        msg.user_id === currentUser?.id ? (
          <ListItem key={index} alignItems="flex-start">
            <ListItemText
              primary={<Chip label={msg.message} color="primary" />}
              primaryTypographyProps={{
                align: "right",
              }}
            />
          </ListItem>
        ) : (
          <ListItem key={index} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={msg.user_id} src="">
                {msg.author?.username.substring(0, 2).toUpperCase()}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={msg.author?.username}
              secondary={
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {msg.message}
                </Typography>
              }
            />
          </ListItem>
        )
      )}
    </List>
  );
}
