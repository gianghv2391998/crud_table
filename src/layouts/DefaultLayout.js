import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AdbIcon from '@mui/icons-material/Adb';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';
import StoreIcon from '@mui/icons-material/Store';
import PersonIcon from '@mui/icons-material/Person';

const drawerWidth = 240;

/* eslint-disable react/prop-types */
export const DefaultLayout = ({children}) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    // Lấy dữ liệu từ localStorage và chuyển đổi thành đối tượng JavaScript
    const isLogin = localStorage.getItem("user")
    const user = JSON.parse(isLogin);
    console.log(isLogin)
    // const {user} = React.useContext(ThemeContext)
    // console.log({user})

    // const token = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('tokenExpiration');
    const now = new Date().getTime();

    const isTokenExpired = () => {
        if (now >= parseInt(expirationTime)) {
            return true;
        }
        return false;
    };

    React.useEffect(() => {
        if (isTokenExpired()) {
            localStorage.clear()
            navigate('/login'); // Điều hướng đến component Login nếu token hết hạn
        }
    });

    const navigate = useNavigate();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const handleLoginClick = () => {
        navigate('/login'); // Điều hướng đến component Login
    };

    const handleRegisterClick = () => {
        navigate('/register'); // Điều hướng đến component Register
    };

    const handleLogoutClick = () => {
        localStorage.clear()
        handleLoginClick()
    }

    const handleProfileClick = () => {
        navigate('/profile'); // Điều hướng đến component Register
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <ListItem disablePadding button onClick={() =>navigate("/product")}>
                    <ListItemIcon>
                        <StoreIcon />
                    </ListItemIcon>
                    <ListItemText primary="Product" />
                </ListItem>
                <ListItem disablePadding button onClick={() => navigate("/user")}>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="User" />
                </ListItem>
            </List>
            <Divider />
        </div>
    );

    return <>
    <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO

                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    {isLogin ? <>
                        <h5 style={{ marginRight: '10px', color: 'white'}}>{user.email}</h5>
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        
                                        <Avatar alt="" src={user.avatar} />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                        <MenuItem  onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center" onClick={handleProfileClick}>Profile</Typography>
                                        </MenuItem>
                                        <MenuItem  onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">Account</Typography>
                                        </MenuItem>
                                        <MenuItem  onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">Dashboard</Typography>
                                        </MenuItem>
                                        <MenuItem  onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center" onClick={handleLogoutClick}>Logout</Typography>
                                        </MenuItem>
                                </Menu>
                            </Box>
                        </> :  <Box sx={{ flexGrow: 0 }}>
                            <button onClick={handleRegisterClick} style={{ marginRight: '10px'}}>Register</button>
                            <button onClick={handleLoginClick}>Login</button>
                        </Box>}
                </Toolbar>
            </AppBar>

            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box >
                <Toolbar />
                {children}
            </Box>
        </Box>
    
    </>
}