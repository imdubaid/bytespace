import { ListItemButtonVariants, MenuItemVariants, ListItemIconVariants, ButtonShape, ModalPlacement } from '@/types/constants';

import '@mui/material/styles';

// Extended theme interface definitions
declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xs: true;
        sm: true;
        md: true;
        xm: true;
        xxm: true;
        lg: true;
        xl: true;
        xxl: true;
    }

    interface TypeBackground {
        default: string;
        paper: string;
        surface: string;
    }

    interface TypeText {
        primary: string;
        secondary: string;
        tertiary: string;
        quaternary: string;
        disabled: string;
    }

    interface Palette {
        contrastColor: string;
        icon: string;
        avatar: string;
        invert: number;
        border: {
            project: string;
            input: string;
            quote: string;
        };
        hover: {
            snippet: string;
        };
    }

    interface PaletteOptions {
        contrastColor?: string;
        icon?: string;
        avatar?: string;
        invert?: number;
        border?: {
            project?: string;
            input?: string;
            quote?: string;
        };
        hover?: {
            snippet?: string;
        };
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        'highlight-1': true;
        'highlight-2': true;
    }
}

declare module '@mui/material/ListItemButton' {
    interface ListItemButtonBaseProps {
        variant?: (typeof ListItemButtonVariants)[number];
    }
}

declare module '@mui/material/ListItemIcon' {
    interface ListItemIconProps {
        variant?: (typeof ListItemIconVariants)[number];
    }
}

declare module '@mui/material/MenuItem' {
    interface MenuItemOwnProps {
        variant?: (typeof MenuItemVariants)[number];
    }
}

declare module '@mui/material/Button' {
    interface ButtonOwnProps {
        shape?: (typeof ButtonShape)[number];
    }
}

declare module '@mui/material/Modal' {
    interface ModalOwnProps {
        placement?: (typeof ModalPlacement)[number];
    }
}