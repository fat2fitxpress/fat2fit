'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from '@/theme/ThemeRegistry';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Logo from './Logo';

const pages = [
    { name: 'Home', path: '/' },
    { name: 'Workout Plan', path: '/workout-plan' },
    { name: 'Diet', path: '/diet' },
    { name: 'Tips', path: '/tips' },
    { name: 'Calculator', path: '/calculator' },
    { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Box sx={{ my: 2, display: 'flex', justifyContent: 'center' }}>
                <Logo sx={{ fontSize: 70 }} />
            </Box>
            <List>
                {pages.map((item) => (
                    <ListItem key={item.name} disablePadding>
                        <ListItemButton component={Link} href={item.path} sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <AppBar position="static" color="default" elevation={1}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Mobile Menu Icon */}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Desktop Logo */}
                    <Box
                        component={Link}
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', sm: 'flex' },
                            alignItems: 'center',
                        }}
                    >
                        <Logo sx={{ fontSize: 60 }} />
                    </Box>

                    {/* Mobile Logo */}
                    <Box
                        component={Link}
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', sm: 'none' },
                            flexGrow: 1,
                            alignItems: 'center',
                        }}
                    >
                        <Logo sx={{ fontSize: 45 }} />
                    </Box>

                    {/* Desktop Menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, justifyContent: 'center' }}>
                        {pages.map((item) => (
                            <Button
                                key={item.name}
                                component={Link}
                                href={item.path}
                                sx={{ my: 2, color: 'text.primary', display: 'block', mx: 1 }}
                            >
                                {item.name}
                            </Button>
                        ))}
                    </Box>

                    {/* Theme Toggle */}
                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
            <Box component="nav">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </AppBar>
    );
}
