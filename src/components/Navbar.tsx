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
import { usePathname } from 'next/navigation';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Logo from './Logo';
import SearchBar from './SearchBar';

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
    const pathname = usePathname();
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
                {pages.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <ListItem key={item.name} disablePadding>
                            <ListItemButton
                                component={Link}
                                href={item.path}
                                selected={isActive}
                                sx={{
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                    fontWeight: isActive ? 'bold' : 'normal',
                                }}
                            >
                                <ListItemText
                                    primary={item.name}
                                    sx={{ textAlign: 'center' }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );

    return (
        <>
            {/* Skip to content link for screen readers */}
            <Link
                href="#main-content"
                style={{
                    position: 'absolute',
                    left: '-9999px',
                    zIndex: 999,
                    padding: '1rem',
                    backgroundColor: '#1976d2',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '4px',
                }}
                onFocus={(e) => {
                    e.currentTarget.style.left = '10px';
                    e.currentTarget.style.top = '10px';
                }}
                onBlur={(e) => {
                    e.currentTarget.style.left = '-9999px';
                }}
            >
                Skip to main content
            </Link>
            <AppBar position="sticky" color="default" elevation={1} sx={{ top: 0, zIndex: 1100 }} component="nav" aria-label="Main Navigation">

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

                        {/* Logo Link (Single implementation with Responsive sizing) */}
                        <Box
                            component={Link}
                            href="/"
                            aria-label="Fat2Fit Home"
                            sx={{
                                mr: 2,
                                display: 'flex',
                                alignItems: 'center',
                                flexGrow: { xs: 1, sm: 0 },
                            }}
                        >
                            <Logo sx={{ fontSize: { xs: 45, sm: 60 } }} />
                        </Box>


                        {/* Desktop Menu */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, justifyContent: 'center' }} role="menubar">
                            {pages.map((item) => {
                                const isActive = pathname === item.path;
                                return (
                                    <Button
                                        key={item.name}
                                        component={Link}
                                        href={item.path}
                                        variant="outlined"
                                        aria-current={isActive ? 'page' : undefined}
                                        role="menuitem"
                                        sx={{
                                            my: 2,
                                            mx: 1,
                                            px: 2,
                                            borderRadius: 4,
                                            fontWeight: isActive ? 'bold' : 'normal',
                                            color: isActive ? 'primary.main' : 'text.primary',
                                            borderColor: isActive ? 'primary.main' : 'divider',
                                            bgcolor: isActive ? (theme) => theme.palette.mode === 'dark' ? 'rgba(138, 180, 248, 0.1)' : 'rgba(25, 118, 210, 0.05)' : 'transparent',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                borderColor: 'primary.main',
                                                bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                                            }
                                        }}
                                    >


                                        {item.name}
                                    </Button>
                                );
                            })}
                        </Box>

                        {/* Theme Toggle & Search */}
                        <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
                            <SearchBar />
                            <IconButton
                                onClick={colorMode.toggleColorMode}
                                color="inherit"
                                aria-label={`Switch to ${theme.palette.mode === 'dark' ? 'light' : 'dark'} mode`}
                            >
                                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
                <Box component="nav" aria-label="Mobile navigation menu">
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        aria-label="Navigation menu"
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
        </>
    );
}
