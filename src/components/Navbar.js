import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Navbar({setSettingOpen}) {

    const handleLinkToOurSite = () => {
        window.open('https://students.cs.ucl.ac.uk/2022/group12/index.html')
    }

    const handleLinkToOurGitHub = () => {
        window.open('https://github.com/Zhiyu-Wang-2021/chatbot-view')
    }

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">

                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            NHS Chat Assistant Generation Service
                        </Typography>
                        <div style={{ flexGrow: 5 }}></div>
                        <div style={{ flexGrow: 1 }}>
                            <Button color="inherit" onClick={handleLinkToOurSite}>About</Button>
                            <Button color="inherit" onClick={handleLinkToOurGitHub}>Help</Button>
                            <Button color="inherit" onClick={() => setSettingOpen(true)}>Settings</Button>
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>

        </div>
    );
}