import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Navbar({setSettingOpen}) {
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Button color="inherit">About</Button>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            NHS Chat Assistant Generation Service
                        </Typography>
                        <Button color="inherit" onClick={() => setSettingOpen(true)}>Settings</Button>
                    </Toolbar>
                </AppBar>
            </Box>

        </div>
    );
}