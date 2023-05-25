import { createContext } from "react";

type ThemeContextProp = {
  darkMode: boolean | null;
  changeMode: (value: any) => void;
};
export const themeInitialState = {
  darkMode: null,
  changeMode: (value: any) => {},
};

export const ThemeContext = createContext<ThemeContextProp>(themeInitialState);

// export const themeReducer = (state: any, action: { type: string }) => {
//   switch (action.type) {
//     case "LIGHT_MODE":
//       return { darkMode: false };
//     case "DARK_MODE":
//       return { darkMode: true };
//     default:
//       throw new Error(`Unknown action type: ${action.type}`);
//   }
// };

// export function ThemeContextProvider(props) {
//   const [state, dispatch] = useReducer(themeReducer, initialState);

//   return (
//     <ThemeContext.Provider value={{ state: state, dispatch: dispatch }}>
//       {props.children}
//     </ThemeContext.Provider>
//   );
// }
