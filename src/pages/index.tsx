import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@src/components/Link";
import ProTip from "@src/components/ProTip";
import Copyright from "@src/components/Copyright";
import ThemeSwitcher from "@src/components/ThemeSwitcher";
export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ThemeSwitcher></ThemeSwitcher>
        <Typography variant="h4" component="h1" gutterBottom>
          MUI v5 + Next.js with TypeScript example
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <Link href="/signin" color="secondary">
          Go to the signIn page
        </Link>
        <Link href="/messages" color="secondary">
          Go to the chat page
        </Link>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
