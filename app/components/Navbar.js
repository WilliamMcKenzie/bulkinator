import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { Avatar, Icon, ThemeProvider, createMuiTheme } from '@mui/material';
import logo from '../images/logo.png'
import axios from 'axios';

const drawerWidth = 240;
const navItems = ['Home', 'Meals', 'Planner'];

function DrawerAppBar(props) {

    const [username, setUsername] = useState("")

    const fetcher = (url, data) => {
        return axios.get(url, data).then(res => res.data);
    };

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }

    useEffect(() => {
        
        async function init() {
            var curUser = await fetcher(`/api/getUser?id=${getCookie("id")}`, false)
            setUsername(curUser.name)
        }
        init()

        return () => { }
    }, [])

    const lightTheme = createMuiTheme({
        palette: {
            type: "light",
            primary: {
                light: "#ff9d4d",
                main: "#2196f3",
                dark: "#b35000"
            }
        }
    });

    return (
        <ThemeProvider theme={lightTheme}>
            <AppBar component="nav">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <a href={`/?id=${props.id}`} style={{display: 'flex', alignItems: 'center'}}>
                        {/* <svg class="svg-standalone-icon" width="40px" viewBox="202.66064399439546 114.99999999999997 144.67871201120903 144.67871201120906"><g data-paper-data="{&quot;isIcon&quot;:&quot;true&quot;,&quot;iconType&quot;:&quot;icon&quot;,&quot;rawIconId&quot;:&quot;3592574&quot;,&quot;selectedEffects&quot;:{&quot;container&quot;:&quot;&quot;,&quot;transformation&quot;:&quot;&quot;,&quot;pattern&quot;:&quot;&quot;},&quot;isDetailed&quot;:false,&quot;fillRule&quot;:&quot;evenodd&quot;,&quot;bounds&quot;:{&quot;x&quot;:202.66064399439546,&quot;y&quot;:114.99999999999997,&quot;width&quot;:144.67871201120903,&quot;height&quot;:144.67871201120906},&quot;iconStyle&quot;:&quot;standalone&quot;,&quot;suitableAsStandaloneIcon&quot;:true}" fill-rule="evenodd"><path d="M344.13959,208.68473c-10.2879,3.34154 -21.60865,7.91845 -34.24576,13.6092c-48.09635,21.65746 -73.51193,-2.92334 -73.89429,-3.31643c15.15157,16.46308 55.42851,33.73258 95.88772,13.03729c-4.00985,5.10345 -8.66776,9.63985 -13.89272,13.50794c-25.6185,5.89327 -41.84018,-0.32403 -41.84018,-0.32403c6.33881,3.46305 16.84948,7.16913 32.03831,6.41981c-9.94362,5.14395 -21.22387,8.06021 -33.19267,8.06021c-39.95676,0 -72.33936,-32.3826 -72.33936,-72.33936c0,-39.95676 32.3826,-72.33936 72.33936,-72.33936c39.95676,0 72.33936,32.3826 72.33936,72.33936c0,7.43241 -1.11385,14.60153 -3.19978,21.34538zM271.96225,130.49261c-26.7121,0 -48.3815,21.68965 -48.3815,48.40175c0,26.73235 21.66941,48.40175 48.3815,48.44226c9.74111,0 18.8139,-2.87575 26.40832,-7.85769c-4.59715,1.66064 -9.57909,2.59223 -14.7838,2.59223c-23.83635,0 -43.15654,-19.3202 -43.15654,-43.15654c0,-23.83635 19.3202,-43.15654 43.15654,-43.15654c5.20471,0 10.18665,0.91133 14.7838,2.59223c-7.59442,-4.98194 -16.66721,-7.85769 -26.40832,-7.85769zM312.68857,196.73618c3.66557,-5.56924 5.77175,-12.23207 5.77175,-19.38095c0,-19.60372 -15.9179,-35.52162 -35.54187,-35.52162c-19.64423,0 -35.54187,15.89764 -35.54187,35.52162c0,7.14888 2.10618,13.81172 5.77175,19.38095c-1.21511,-3.38205 -1.90367,-7.04762 -1.90367,-10.85495c0,-17.49754 14.17624,-31.67378 31.67378,-31.67378c17.49754,0 31.67378,14.17624 31.67378,31.67378c0,3.82758 -0.66831,7.47291 -1.90367,10.85495z" data-paper-data="{&quot;isPathIcon&quot;:true}" style={{fill: 'rgb(255, 255, 255)'}}></path></g></svg> */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="40px" viewBox="0 0 820 860" version="1.1"><path d="M 0 430.001 L 0 860.002 410.250 859.751 L 820.500 859.500 820.751 429.750 L 821.002 -0 410.501 -0 L 0 0 0 430.001 M 0.495 430.500 C 0.495 667, 0.610 763.601, 0.750 645.168 C 0.890 526.736, 0.890 333.236, 0.750 215.168 C 0.610 97.101, 0.495 194, 0.495 430.500 M 587.744 60.756 L 568.007 80.511 668.759 181.259 L 769.511 282.008 789.256 262.245 C 800.115 251.375, 809 242.035, 809 241.489 C 809 240.181, 609.796 41, 608.489 41 C 607.935 41, 598.600 49.890, 587.744 60.756 M 474.634 71.970 L 446.500 99.939 598.273 251.720 L 750.046 403.500 778.023 375.398 C 793.410 359.941, 806 346.706, 806 345.986 C 806 344.344, 776.293 314.236, 656 193.962 C 533.951 71.932, 505.650 44, 504.058 44 C 503.349 44, 490.108 56.586, 474.634 71.970 M 404.442 142.128 L 375.935 170.428 436.215 230.716 L 496.496 291.003 378.749 408.749 L 261.003 526.496 200.716 466.215 L 140.428 405.935 112.128 434.442 L 83.827 462.949 86.128 466.224 C 89.139 470.511, 379.501 760.876, 383.776 763.875 L 387.051 766.173 415.558 737.872 L 444.065 709.572 383.785 649.284 L 323.504 588.997 441.251 471.251 L 558.997 353.504 619.284 413.785 L 679.572 474.065 707.872 445.558 L 736.173 417.051 733.879 413.776 C 730.877 409.488, 440.498 119.106, 436.224 116.118 L 432.949 113.827 404.442 142.128 M 41.166 505.424 C 26.225 520.506, 14 533.395, 14 534.064 C 14 534.733, 26.231 547.705, 41.180 562.890 C 85.878 608.297, 309.215 831.062, 312.715 833.732 L 315.955 836.203 319.728 833.168 C 321.802 831.498, 334.750 818.850, 348.499 805.059 L 373.499 779.986 222.486 628.993 C 139.429 545.947, 70.766 478, 69.903 478 C 69.039 478, 56.108 490.341, 41.166 505.424 M 30.308 618.216 C 19.689 628.785, 11 637.899, 11 638.468 C 11 639.804, 210.176 839, 211.511 839 C 212.065 839, 221.402 830.109, 232.258 819.242 L 251.998 799.484 151.737 699.242 C 96.594 644.109, 51.058 599, 50.547 599 C 50.035 599, 40.928 607.647, 30.308 618.216" stroke="none" fill="#2494f4" fill-rule="evenodd"/><path d="M 587.744 60.756 L 568.007 80.511 668.759 181.259 L 769.511 282.008 789.256 262.245 C 800.115 251.375, 809 242.035, 809 241.489 C 809 240.181, 609.796 41, 608.489 41 C 607.935 41, 598.600 49.890, 587.744 60.756 M 474.634 71.970 L 446.500 99.939 598.273 251.720 L 750.046 403.500 778.023 375.398 C 793.410 359.941, 806 346.706, 806 345.986 C 806 344.344, 776.293 314.236, 656 193.962 C 533.951 71.932, 505.650 44, 504.058 44 C 503.349 44, 490.108 56.586, 474.634 71.970 M 404.442 142.128 L 375.935 170.428 436.215 230.716 L 496.496 291.003 378.749 408.749 L 261.003 526.496 200.716 466.215 L 140.428 405.935 112.128 434.442 L 83.827 462.949 86.128 466.224 C 89.139 470.511, 379.501 760.876, 383.776 763.875 L 387.051 766.173 415.558 737.872 L 444.065 709.572 383.785 649.284 L 323.504 588.997 441.251 471.251 L 558.997 353.504 619.284 413.785 L 679.572 474.065 707.872 445.558 L 736.173 417.051 733.879 413.776 C 730.877 409.488, 440.498 119.106, 436.224 116.118 L 432.949 113.827 404.442 142.128 M 41.166 505.424 C 26.225 520.506, 14 533.395, 14 534.064 C 14 534.733, 26.231 547.705, 41.180 562.890 C 85.878 608.297, 309.215 831.062, 312.715 833.732 L 315.955 836.203 319.728 833.168 C 321.802 831.498, 334.750 818.850, 348.499 805.059 L 373.499 779.986 222.486 628.993 C 139.429 545.947, 70.766 478, 69.903 478 C 69.039 478, 56.108 490.341, 41.166 505.424 M 30.308 618.216 C 19.689 628.785, 11 637.899, 11 638.468 C 11 639.804, 210.176 839, 211.511 839 C 212.065 839, 221.402 830.109, 232.258 819.242 L 251.998 799.484 151.737 699.242 C 96.594 644.109, 51.058 599, 50.547 599 C 50.035 599, 40.928 607.647, 30.308 618.216" stroke="none" fill="#fcfcfc" fill-rule="evenodd"/></svg>
                        <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    flexGrow: 1, display: {
                                        xs: 'none', sm: 'block',
                                        fontWeight: 700, letterSpacing: '.3rem',
                                        marginLeft: 12
                                    }
                                }}
                            >
                                BULKINATOR
                            </Typography>
                        </a>
                        {props.id == null || props.id == "null" ? <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            {navItems.map((item) => (
                                <Button key={item} sx={{ color: '#fff' }} onClick={() => {
                                    location.href = item == 'Home' ? `/?id=null` : `/${item.toLowerCase()}?id=null`
                                }}>
                                    {item}
                                </Button>
                            ))}
                        </Box> : <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            {navItems.map((item) => (
                                <Button key={item} sx={{ color: '#fff' }} onClick={() => {
                                location.href = item == 'Home' ? `/?id=${props.id}` : `/${item.toLowerCase()}?id=${props.id}`
                                }}>
                                    {item}
                                </Button>
                            ))}
                        </Box>}
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                flexGrow: 1, display: {
                                    xs: 'none', sm: 'block',
                                    fontWeight: 700, letterSpacing: '.3rem',
                                    marginLeft: 12
                                }
                            }}
                        >
                        </Typography>
                        {props.id == null || props.id == "null" ? <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                <Button sx={{ color: '#fff' }} onClick={() => {
                                    location.href = '/login'
                                }}>
                                    Login
                                </Button>
                                <Button sx={{ color: '#fff' }} onClick={() => {
                                    location.href = '/register'
                                }}>
                                    Register
                                </Button>
                        </Box> :  <><Button sx={{ color: '#fff' }} onClick={() => {
                                    document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                                    location.href = '/'
                                }}>
                                    Logout
                                </Button>
                                <Avatar sx={{marginLeft:'5px', width:'30px', height:'30px'}}>{username[0] ? username[0].toUpperCase() : "A"}</Avatar></>}
                        
                    </Toolbar>
                </AppBar>
        </ThemeProvider>
    );
}

export default DrawerAppBar;