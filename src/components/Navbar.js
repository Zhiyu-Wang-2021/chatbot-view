import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit">About</Button>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        NHS Chat Assistant Generation Service
                    </Typography>
                    <Button color="inherit">Settings</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}