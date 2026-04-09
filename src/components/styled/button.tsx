import Button from '@mui/material/Button';
import { IoAddOutline } from 'react-icons/io5';

export function NewButton() {
    return (
        <Button
            variant='contained'
            shape='rounded'
            disableElevation
            sx={{
                maxWidth: 115,
                width: '100%',
                minHeight: 56,
                backgroundColor: 'background.paper',
                color: 'text.primary',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.08)',

                '&:hover': {
                    backgroundColor: 'action.hover',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.08)',
                },
            }}
            startIcon={<IoAddOutline />}>
            New
        </Button>
    );
}
