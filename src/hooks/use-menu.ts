'use client';

import { useCallback, useState } from 'react';

export type OpenMenu = {
    (e: React.MouseEvent<HTMLElement>): void;
};

export type MenuProps = {
    onMenuOpen?: (e: React.MouseEvent<HTMLElement>) => void;
    onMenuClose?: () => void;
};

function useMenu(props: MenuProps = {}) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const { onMenuOpen, onMenuClose } = props;

    const openMenu = useCallback(
        function (e: React.MouseEvent<HTMLElement>) {
            setAnchorEl(e.currentTarget);
            if (onMenuOpen) onMenuOpen(e);
        },
        [onMenuOpen]
    );

    const closeMenu = useCallback(
        function () {
            setAnchorEl(null);
            if (onMenuClose) onMenuClose();
        },
        [onMenuClose]
    );

    return { anchorEl, openMenu, closeMenu };
}

export default useMenu;
