import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import LinearProgress from '@material-ui/core/LinearProgress';
import Fab from '@material-ui/core/Fab';
import './NavBar.css';

class NavBar extends Component {
    render() {
        return (
            <AppBar position="fixed" className="nav-root">
                <Toolbar>
                    <IconButton edge="start" className="menu-button" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className="app-title">
                        Book Ride
                    </Typography>
                    {this.props.user.authenticated &&
                        <List dense={true}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar alt="User Image" src={this.props.user.credentials.imageUrl} />
                                </ListItemAvatar>
                                <ListItemText primary={this.props.user.credentials.handle} secondary={<Typography
                                    component="p"
                                    variant="body2"
                                    className="secondary-text"
                                >
                                    {this.props.user.credentials.email}
                                </Typography>} />
                            </ListItem>
                        </List>
                    }
                    {this.props.user.authenticated &&
                        <Fab size="small" onClick={() => this.props.logoutUser()} aria-label="logout" color="secondary">
                            <PowerSettingsNew fontSize="small" />
                        </Fab>
                    }
                </Toolbar>
                {this.props.UI.loading && <LinearProgress color="secondary" />}
            </AppBar>


        )
    }
}

export default NavBar
