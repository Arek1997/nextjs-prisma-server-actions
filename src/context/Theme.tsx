import useLocalStorage from "@/hooks/useLocalStorage";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "dark" | "light";
type Context = {
  theme: Theme;
  switchThemeHandler: () => void;
} | null;

const ThemeContext = createContext<Context>(null);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const { getValue, setValue } = useLocalStorage<Theme>();
  const [theme, setTheme] = useState<Theme>(getValue("theme") || "dark");

  const switchThemeHandler = () => {
    setTheme((prevState) => (prevState === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    document.documentElement.className = theme;
    setValue("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, switchThemeHandler }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error(
      "useTheme can only be used inside a theme context provider"
    );
  }

  return theme;
};
