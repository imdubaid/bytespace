'use client';

import React, { useMemo } from 'react';
import { CssBaseline, ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
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
