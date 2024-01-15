import { createContext, useReducer } from "react";

interface ThemeProviderProps {
  children: JSX.Element | JSX.Element[];
}

interface IThemeContext {
  color: string;
  changeColor: (color: string) => void;
  mode: string;
  changeMode: (mode: string) => void;
}

interface Action {
  type: string;
  payload?: any;
}

export const ThemeContext = createContext<IThemeContext>(null!);

const themeReducer = (state: IThemeContext, action: Action) => {
  switch (action.type) {
    case "CHANGE_COLOR":
      return { ...state, color: action.payload };
    case "CHANGE_MODE":
      return { ...state, mode: action.payload };
    default:
      return state;
  }
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const changeColor = (color: string) => {
    dispatch({ type: "CHANGE_COLOR", payload: color });
  };

  const changeMode = (mode: string) => {
    dispatch({ type: "CHANGE_MODE", payload: mode });
  };

  const [state, dispatch] = useReducer(themeReducer, {
    color: "#58249c",
    mode: "light",
    changeColor,
    changeMode,
  });

  return (
    <ThemeContext.Provider value={{ ...state }}>
      {children}
    </ThemeContext.Provider>
  );
};
