'use client';

import React from 'react';
import ThemeProvider from '@/theme';
import { Toaster } from 'sonner';
import { IoCloseCircleSharp, IoCheckmarkCircle, IoInformationCircleSharp, IoWarningSharp } from 'react-icons/io5';

const Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider>
            <Toaster
                theme='dark'
                duration={5000}
                position='bottom-right'
                icons={{
                    error: <IoCloseCircleSharp fontSize={20} />,
                    success: <IoCheckmarkCircle fontSize={20} />,
                    info: <IoInformationCircleSharp fontSize={20} />,
                    warning: <IoWarningSharp fontSize={20} />,
                }}
            />
            {children}
        </ThemeProvider>
    );
};

export default Provider;
