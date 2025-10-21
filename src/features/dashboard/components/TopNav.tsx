import React from 'react';
import { IconButton, Typography } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const TopNav: React.FC = () => {
    const [dark, setDark] = React.useState(false);

    const toggleTheme = () => {
        setDark(!dark);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <div className="flex justify-between items-center p-4 bg-white border-b">
            <Typography variant="h6">Dashboard</Typography>
            <div className="flex items-center gap-4">
                <IconButton onClick={toggleTheme}>
                    {dark ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
                <span className="font-medium">John Doe</span>
            </div>
        </div>
    );
};

export default TopNav;
