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
import { Icon, ThemeProvider, createMuiTheme } from '@mui/material';
import logo from '../images/logo.png'

const drawerWidth = 240;
const navItems = ['Home', 'Meals', 'Planner'];

function DrawerAppBar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <svg width="200" height="40" viewBox="0 0 370 80.04033809215585" class="css-1j8o68f"><defs id="SvgjsDefs1443"></defs><g id="SvgjsG1444" featurekey="symbolFeature-0" transform="matrix(0.9070944561495645,0,0,0.9070944561495645,-16.113201978060374,-4.535472280747823)" fill="#FFFFFF"><path xmlns="http://www.w3.org/2000/svg" d="M56.411,21.984C56.411,21.984,66.6,5,73.393,5l1.133,1.132c0,0-13.586,11.322-13.586,14.719L56.411,21.984z"></path><path xmlns="http://www.w3.org/2000/svg" d="M73.773,82.981c0,0,15.101,9.904,20.68,7.211l0.48-1.381c0,0-15.646-3.908-16.992-6.698L73.773,82.981z"></path><path xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-miterlimit="10" d="M24.197,57.618c0,0,2.6-1.558,2.604-1.561  c0.957-0.577,1.681-3.614,2.502-4.579c7.2-8.451,21.473-5.477,29.313,0.182c7.298,5.265,10.088,15.289,17.652,20.02  c0,0,6.249,7.81,1.041,9.373c0,0,0.521,2.082-1.041,2.082c0,0-1.563,0.52-1.043,1.562c0,0,0.524,1.044-1.039,1.044  c0,0,3.123,5.205-4.687,6.246c-14.775,1.971-36.298,3.306-46.938-9.709c-2.265-2.769-4.437-7.125-4.756-10.746  c-0.191-2.174,0.286-4.239,1.259-6.184c0.834-1.671,2.364-2.781,3.412-4.286C22.895,60.461,23.73,57.897,24.197,57.618z"></path><g xmlns="http://www.w3.org/2000/svg"><path d="M78.122,80.354c0,0-1.267,0.432-1.122,1.286c0.428-0.417,0.837-0.853,1.225-1.304   C78.187,80.34,78.163,80.354,78.122,80.354z"></path><path d="M79.967,77.932c-0.231,0.134-0.497,0.249-0.805,0.342c0,0,0.083,0.353,0.078,0.766   C79.496,78.681,79.738,78.311,79.967,77.932z"></path><path d="M77.426,57.047c-2.765-5.154-3.52-9.26-3.653-15.1c-0.248-10.635-6.454-25.632-19.978-20.372   c-5.827,2.267-8.463,7.785-10.142,13.423c-0.947,3.179-1.9,6.007-3.136,8.685c6.874-1.079,14.801,1.48,19.953,5.198   c7.297,5.265,10.087,15.288,17.652,20.02c0,0,2.936,3.671,3.104,6.482c0.48-1.228,0.825-2.532,1.001-3.917   C82.927,65.967,79.888,61.639,77.426,57.047z"></path></g><path xmlns="http://www.w3.org/2000/svg" d="M50.268,67.09c-0.622,0.833-1.246-0.936-2.786-2.088c-1.539-1.152-3.414-1.253-2.789-2.086c0,0,2.537-0.788,4.077,0.366  C50.31,64.434,50.268,67.09,50.268,67.09z"></path><path xmlns="http://www.w3.org/2000/svg" d="M47.064,73.174c0.459-0.934-1.397-0.691-3.123-1.546c-1.724-0.851-2.659-2.476-3.121-1.542c0,0,0.444,2.62,2.167,3.473  C44.714,74.409,47.064,73.174,47.064,73.174z"></path><g xmlns="http://www.w3.org/2000/svg"><path d="M25.518,57.345c4.262,1.676,8.43,3.541,12.564,5.477c4.139,1.925,8.221,3.964,12.285,6.039   c4.047,2.108,8.076,4.253,12.033,6.537c1.984,1.132,3.944,2.308,5.888,3.517c0.964,0.617,1.931,1.229,2.876,1.88   c0.472,0.326,0.941,0.655,1.402,0.999c0.229,0.176,0.454,0.354,0.674,0.54c0.11,0.094,0.218,0.189,0.321,0.292   c0.083,0.104,0.243,0.207,0.213,0.356c0.006-0.141-0.163-0.214-0.262-0.299c-0.116-0.081-0.237-0.154-0.36-0.227   c-0.245-0.143-0.496-0.276-0.748-0.408c-0.502-0.267-1.01-0.524-1.521-0.775l-3.071-1.5l-6.144-2.997   c-4.097-1.999-8.159-4.063-12.217-6.139c-4.042-2.108-8.081-4.221-12.073-6.43C33.379,62.011,29.408,59.76,25.518,57.345z"></path></g><g xmlns="http://www.w3.org/2000/svg"><path d="M32.922,58.826c2.251-1.805,5.344-2.538,8.309-2.269c3,0.249,5.826,1.539,8.216,3.252c2.383,1.75,4.393,3.909,6.06,6.265   c1.674,2.353,3.042,4.891,4.069,7.561c-1.752-2.261-3.453-4.502-5.293-6.592c-1.849-2.074-3.802-4.036-6.008-5.614   c-2.18-1.603-4.628-2.808-7.258-3.331C38.394,57.595,35.572,57.764,32.922,58.826z"></path></g><g xmlns="http://www.w3.org/2000/svg"><path d="M31.441,61.788c-0.735,1.632-1.139,3.397-1.009,5.082c0.104,1.688,0.832,3.222,1.955,4.401   c1.135,1.175,2.578,2.078,4.14,2.75c1.555,0.69,3.212,1.21,4.907,1.602c3.384,0.832,6.899,1.254,10.425,1.612   c3.533,0.337,7.094,0.547,10.681,0.842c-3.56,0.537-7.157,0.765-10.766,0.717c-3.608-0.046-7.236-0.388-10.811-1.228   c-1.777-0.453-3.549-1.012-5.236-1.835c-1.665-0.839-3.308-1.905-4.519-3.446c-1.244-1.505-1.894-3.516-1.753-5.414   C29.601,64.975,30.326,63.204,31.441,61.788z" ></path></g></g></svg>
            <Typography variant="h6" sx={{
                my: 2, fontFamily: 'monospace',
                fontWeight: 700, letterSpacing: '.3rem',
            }}>
                Bulkinator
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

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
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <a href="./" style={{ display: 'flex', alignItems: 'center' }}>
                        <svg class="svg-standalone-icon" width="40px" viewBox="202.66064399439546 114.99999999999997 144.67871201120903 144.67871201120906"><g data-paper-data="{&quot;isIcon&quot;:&quot;true&quot;,&quot;iconType&quot;:&quot;icon&quot;,&quot;rawIconId&quot;:&quot;3592574&quot;,&quot;selectedEffects&quot;:{&quot;container&quot;:&quot;&quot;,&quot;transformation&quot;:&quot;&quot;,&quot;pattern&quot;:&quot;&quot;},&quot;isDetailed&quot;:false,&quot;fillRule&quot;:&quot;evenodd&quot;,&quot;bounds&quot;:{&quot;x&quot;:202.66064399439546,&quot;y&quot;:114.99999999999997,&quot;width&quot;:144.67871201120903,&quot;height&quot;:144.67871201120906},&quot;iconStyle&quot;:&quot;standalone&quot;,&quot;suitableAsStandaloneIcon&quot;:true}" fill-rule="evenodd"><path d="M344.13959,208.68473c-10.2879,3.34154 -21.60865,7.91845 -34.24576,13.6092c-48.09635,21.65746 -73.51193,-2.92334 -73.89429,-3.31643c15.15157,16.46308 55.42851,33.73258 95.88772,13.03729c-4.00985,5.10345 -8.66776,9.63985 -13.89272,13.50794c-25.6185,5.89327 -41.84018,-0.32403 -41.84018,-0.32403c6.33881,3.46305 16.84948,7.16913 32.03831,6.41981c-9.94362,5.14395 -21.22387,8.06021 -33.19267,8.06021c-39.95676,0 -72.33936,-32.3826 -72.33936,-72.33936c0,-39.95676 32.3826,-72.33936 72.33936,-72.33936c39.95676,0 72.33936,32.3826 72.33936,72.33936c0,7.43241 -1.11385,14.60153 -3.19978,21.34538zM271.96225,130.49261c-26.7121,0 -48.3815,21.68965 -48.3815,48.40175c0,26.73235 21.66941,48.40175 48.3815,48.44226c9.74111,0 18.8139,-2.87575 26.40832,-7.85769c-4.59715,1.66064 -9.57909,2.59223 -14.7838,2.59223c-23.83635,0 -43.15654,-19.3202 -43.15654,-43.15654c0,-23.83635 19.3202,-43.15654 43.15654,-43.15654c5.20471,0 10.18665,0.91133 14.7838,2.59223c-7.59442,-4.98194 -16.66721,-7.85769 -26.40832,-7.85769zM312.68857,196.73618c3.66557,-5.56924 5.77175,-12.23207 5.77175,-19.38095c0,-19.60372 -15.9179,-35.52162 -35.54187,-35.52162c-19.64423,0 -35.54187,15.89764 -35.54187,35.52162c0,7.14888 2.10618,13.81172 5.77175,19.38095c-1.21511,-3.38205 -1.90367,-7.04762 -1.90367,-10.85495c0,-17.49754 14.17624,-31.67378 31.67378,-31.67378c17.49754,0 31.67378,14.17624 31.67378,31.67378c0,3.82758 -0.66831,7.47291 -1.90367,10.85495z" data-paper-data="{&quot;isPathIcon&quot;:true}" style={{ fill: 'rgb(255, 255, 255)' }}></path></g></svg>
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
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Button key={item} sx={{ color: '#fff' }} onClick={() => {
                                location.href = item == 'Home' ? `./` : `./${item.toLowerCase()}`
                            }}>
                                {item}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}

DrawerAppBar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default DrawerAppBar;