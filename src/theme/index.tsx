'use client';

import React, { useMemo } from 'react';
import { CssBaseline, ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import { components } from '@/theme/components';

interface ThemeProviderProps {
    children: React.ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {
    const theme = useMemo(
        () =>
            createTheme({
                cssVariables: true,
                palette: {
                    mode: 'light',
                },
                typography: {
                    fontFamily: '"Google Sans Flex", "Google Sans", Roboto, Arial, sans-serif;',
                    h5: {
                        fontSize: 28,
                        fontWeight: 500,
                        lineHeight: 1.3,
                        letterSpacing: 'normal',
                    },
                },
                components,
            }),
        [],
    );

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {props.children}
        </MuiThemeProvider>
    );
};

export default ThemeProvider;
