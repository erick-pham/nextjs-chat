// import "../styles/globals.css";
import { useState, useEffect } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "@src/theme/createEmotionCache";
import { lightTheme, darkTheme } from "@src/theme";
import { ThemeContext } from "@src/context/themeContext";
import { SnackbarProvider } from "notistack";
import { SnackbarUtilsConfigurator } from "@src/components/Snackbar";
import { SessionProvider } from "next-auth/react";
// import { usePersistedReducer } from "@src/hooks/usePersistedReducer";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [darkMode, setDarkMode] = useState(prefersDarkMode);

  useEffect(() => {
    const mode = localStorage.getItem("theme");
    if (mode === "dark") {
      setDarkMode(true);
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{ darkMode: darkMode, changeMode: setDarkMode }}
    >
      <CacheProvider value={emotionCache}>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1, width=device-width, minimum-scale=1, maximum-scale=1, user-scalable=no"
          />
        </Head>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <SnackbarProvider
            maxSnack={4}
            autoHideDuration={2000}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <SnackbarUtilsConfigurator />
            <SessionProvider session={pageProps.session}>
              <Component {...pageProps} />
            </SessionProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </CacheProvider>
    </ThemeContext.Provider>
  );
}
