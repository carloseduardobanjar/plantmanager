import { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { lightColors, darkColors } from '../styles/colorsLightDark';

export const ThemeContext = createContext({
    dark: false,
    colors: lightColors,
    setScheme: (arg: string) => {},
});

export const ThemeProvider : React.FC = ({ children } ) => {
    const colorScheme = useColorScheme();
    const [isDark, setIsDark] = useState(colorScheme == 'dark');
    const defaultTheme = {
        dark: isDark,
        colors: isDark ? darkColors : lightColors,
        setScheme: (scheme : string) => setIsDark(scheme == 'dark')
    };

    useEffect(() => {
        setIsDark(colorScheme == 'dark');
    },[]);
    
    return (
        <ThemeContext.Provider value={defaultTheme}>
            {children}
        </ThemeContext.Provider> 
    )
}

export const useTheme = () => useContext(ThemeContext);