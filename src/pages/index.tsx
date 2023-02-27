import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@src/components/Link";
import ProTip from "@src/components/ProTip";
import Copyright from "@src/components/Copyright";
import ThemeSwitcher from "@src/components/ThemeSwitcher";
import type { GetServerSideProps, NextPage } from "next";
import useTrans from "@src/hooks/useTrans";
import LangSelector from "@src/components/LangSelector";

const Home: NextPage = () => {
  const trans = useTrans();
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
        <LangSelector></LangSelector>
        <Typography variant="h4" component="h1" gutterBottom>
          {trans.home.title}
        </Typography>
        <Link href="/about" color="secondary">
          {trans.home.visits[0]}
        </Link>
        <Link href="/sign-in" color="secondary">
          {trans.home.visits[1]}
        </Link>
        <Link href="/messages" color="secondary">
          {trans.home.visits[2]}
        </Link>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};
export default Home;
