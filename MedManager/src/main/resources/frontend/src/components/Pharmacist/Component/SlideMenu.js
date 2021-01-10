import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import ViewListIcon from '@material-ui/icons/ViewList';
import EventNoteIcon from '@material-ui/icons/EventNote';
import PostAddIcon from '@material-ui/icons/PostAdd';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import AddIcon from '@material-ui/icons/Add';
import DescriptionIcon from '@material-ui/icons/Description';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StoreIcon from '@material-ui/icons/Store';
import {Typography} from "@material-ui/core";

import { red } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '40px',
        width : '300px',
        marginLeft : '40px',
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    link: {
        color: '#606264',
        "&:hover": {
            color: '#8A8D91',
          },
          '&:focus': {
            color: 'red',
          },
          '&:active': {
              color: 'black',
          },
          fontWeight: 'italic',
    },

    avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        color: '#fff',
        backgroundColor: red[500],
    },
}));

export default function SlideMenu() {

    const classes = useStyles();
   
   

    return (
        <Card className={classes.root}>
            <CssBaseline/>
        
                {/*<AccountCircleIcon fontSize="large" />*/}
                <div alignItems="center" style={{padding:"30px"}} >
                    {/*<CardMedia*/}
                    {/*    component="img"*/}
                    {/*    alt="User"*/}
                    {/*    height="50"*/}
                    {/*    image={Avatar}*/}
                    {/*    title="User"*/}
                    {/*/>*/}
                    <Avatar alt="PHARMACIST" src="./avatar.png" className={classes.avatar} alignItems="center" />
                    <Typography textAlign="center">
                        PHARMACIST
                    </Typography>
                </div>
                <Divider />

            <div>
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                <Link to={"/drug"}  style={{textDecoration: "none"}} className={classes.link}>
                    <ListItem button>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Drug"/>
                    </ListItem>
                </Link>

                <Link to={"/stock"} style={{textDecoration: "none"}} className={classes.link}> 
                    <ListItem button >
                    <ListItemIcon>
                        <StoreIcon />
                    </ListItemIcon>
                    <ListItemText primary="Stock" />
                    {/* {openPatient ? <ExpandLess /> : <ExpandMore />} */}
                    </ListItem>
                </Link>
                
                <Link to={"/Prescription"} style={{textDecoration: "none", color:"inherit"}}>
                    <ListItem button >
                    <ListItemIcon>
                        <RecentActorsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Prescription" />
                    {/* {openStaffM ? <ExpandLess /> : <ExpandMore />} */}
                    </ListItem>
                </Link>

                <Link to={"/reports"} style={{textDecoration: "none", color:"inherit"}}>
                    <ListItem button >
                    <ListItemIcon>
                        <RecentActorsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Report" />
                    {/* {openStaffM ? <ExpandLess /> : <ExpandMore />} */}
                    </ListItem>
                </Link>

                <Divider></Divider>

                <ListItem button  className={classes.link}>
                <ListItemIcon>
                    <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
                </ListItem>

                <ListItem button  className={classes.link}>
                <ListItemIcon>
                    <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
                </ListItem>
                {/* <Collapse in={openStaffM} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <Link to={"/AddUSer"} style={{textDecoration: "none", color:"inherit"}}>
                        <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Add Staff Members" />
                        </ListItem>
                    </Link>
                    <Link to={"/ListUser"} style={{textDecoration: "none", color:"inherit"}}>
                        <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <ViewListIcon />
                        </ListItemIcon>
                        <ListItemText primary="View Staff Members" />
                        </ListItem>
                    </Link>
                </List>
                </Collapse> */}


                {/* <ListItem button onClick={handleClickAppointment}>
                <ListItemIcon>
                    <EventNoteIcon />
                </ListItemIcon>
                <ListItemText primary="Appointments" />
                {openAppointment ? <ExpandLess /> : <ExpandMore />}
                </ListItem> */}
               

                 {/*  <ListItem button onClick={handleClickReport}>
                <ListItemIcon>
                    <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="Reports" />
                {openReport ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openReport} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                    <ListItemIcon>
                        <NoteAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Medical Certificates" />
                    </ListItem>
                    <ListItem button className={classes.nested}>
                    <ListItemIcon>
                        <NoteAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Medical Reports" />
                    </ListItem>
                    <ListItem button className={classes.nested}>
                    <ListItemIcon>
                        <NoteAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Drug Reports" />
                    </ListItem>
                    <ListItem button className={classes.nested}>
                    <ListItemIcon>
                        <NoteAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Equipments Reports" />
                    </ListItem>
                </List>
                </Collapse>

                <Divider />

                <ListItem button onClick={handleClickSetting}>
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
                {openSetting ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openSetting} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="setting 1" />
                    </ListItem>
                    <ListItem button className={classes.nested}>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="setting 2" />
                    </ListItem>
                </List>
                </Collapse>

                <ListItem button>
                <ListItemIcon>
                    <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
                </ListItem>

                <ListItem button>
                <ListItemIcon>
                    <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
                </ListItem>

                <br /><br /><br />
                
              <ListItem button>
                <ListItemText primary="" />
                </ListItem>
                
                <ListItem button>
                <ListItemText primary="" />
                </ListItem>

                <ListItem button>
                <ListItemText primary="" />
                </ListItem> */}
            </List>
            </div>
        </Card>
    )
}

//export default SideMenu;
