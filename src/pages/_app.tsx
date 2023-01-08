// import "../styles/globals.css";
import { useReducer } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "@src/theme/createEmotionCache";
import { lightTheme, darkTheme } from "@src/theme";
import {
  ThemeContext,
  themeReducer,
  themeInitialState,
} from "@src/context/themeContext";
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
  const [state, dispatch] = useReducer(themeReducer, themeInitialState);
  // const { state, dispatch } = usePersistedReducer(
  //   themeReducer,
  //   themeInitialState,
  //   "persistedTheme"
  // );
  return (
    <ThemeContext.Provider
      value={{ darkMode: state.darkMode, changeMode: dispatch }}
    >
      <CacheProvider value={emotionCache}>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1, width=device-width, minimum-scale=1, maximum-scale=1, user-scalable=no"
          />
        </Head>
        <ThemeProvider theme={state.darkMode ? darkTheme : lightTheme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </ThemeContext.Provider>
  );
}
