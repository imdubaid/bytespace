import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

export default function Home() {
    return (
        <Stack alignItems='center' justifyContent='center' height='100vh'>
            <Typography variant='h1' component='h1' fontWeight='500' gutterBottom>
                Welcome to ByteSpace!
            </Typography>
        </Stack>
    );
}
