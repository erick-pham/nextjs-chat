import { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
const MessageTextbox = ({
  onSendMessage,
}: {
  onSendMessage: (msg: string) => void;
}) => {
  const [messageText, setMessageText] = useState("");

  const submitOnEnter = (event: any) => {
    // Watch for enter key
    if (event.keyCode === 13) {
      onSendMessage(messageText);
      setMessageText("");
    }
  };

  return (
    <FormControl
      variant="standard"
      fullWidth
      sx={{
        px: 1,
      }}
    >
      <TextField
        fullWidth
        size="small"
        placeholder="Send a message"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyDown={(e) => submitOnEnter(e)}
      />
    </FormControl>
  );
};

export default MessageTextbox;
