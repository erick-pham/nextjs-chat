import Head from "next/head";
import { getCsrfToken } from "next-auth/react";
import { useRouter } from "next/router";
import { getProviders, signIn, useSession } from "next-auth/react";
import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  Paper,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { FacebookIcon, GoogleIcon } from "src/components/icons";
import NextLinkComposed from "src/components/NextLinkComposed";
import Copyright from "src/components/Copyright";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "src/pages/api/auth/[...nextauth]";
import useTrans from "@src/hooks/useTrans";

export default function SignIn({
  providers,
  csrfToken,
}: {
  providers: any;
  csrfToken: string | "";
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const trans = useTrans();
  if (session) {
    if (router.query["callbackUrl"]) {
      router.push(router.query["callbackUrl"] + "");
    }
    router.push("/");
  }

  const error = router.query["error"];
  const errorMsg =
    error && error.includes("OAuthAccountNotLinked")
      ? trans.signIn.OAuthAccountNotLinked
      : "";
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={5}
          md={7}
          sx={{
            backgroundImage: "url('/static/images/login-page-bg.jpg')",
            // backgroundRepeat: "no-repeat",
            // backgroundColor: (t) =>
            //   t.palette.mode === "light"
            //     ? t.palette.grey[50]
            //     : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Grid>

        <Grid item xs={12} sm={7} md={5}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              // onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              {/* <TextField
                disabled
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                disabled
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                disabled
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button> */}
              {errorMsg && (
                <Typography component="h1" variant="body1" color={"error"}>
                  {errorMsg}
                </Typography>
              )}
              <Button
                color="error"
                fullWidth
                startIcon={<GoogleIcon />}
                onClick={() => signIn(providers.google.id)}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login with Google
              </Button>

              <Button
                color="info"
                fullWidth
                startIcon={<FacebookIcon />}
                onClick={() => signIn(providers.facebook.id)}
                variant="contained"
                sx={{ mb: 2 }}
              >
                Login with Facebook
              </Button>
              <Grid container>
                <Grid item>
                  <NextLinkComposed
                    href="/"
                    variant="body2"
                    color={"text.primary"}
                  >
                    {"Go back to Home"}
                  </NextLinkComposed>
                </Grid>
              </Grid>
              <Copyright />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: { providers, csrfToken: csrfToken || "" },
  };
}
