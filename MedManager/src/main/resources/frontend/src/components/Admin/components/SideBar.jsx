import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
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

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    //display: 'flex',
    marginTop: '90px',
    marginLeft: '20px',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    //flexShrink: 0,
    borderStyle: 'none',
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#ffffff",
    borderStyle: 'none',
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    // flexGrow: 1,
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function SideBar() {

  const classes = useStyles();
  const [openPatient, setOpenPatient] = React.useState(false);
  const [openStaffM, setOpenStaffM] = React.useState(false);
  const [openAppointment, setOpenAppointment] = React.useState(false);
  const [openReport, setOpenReport] = React.useState(false);
  const [openSetting, setOpenSetting] = React.useState(false);

  const handleClickPatient = () => {
    setOpenPatient(!openPatient);
  };

  const handleClickStaff = () => {
    setOpenStaffM(!openStaffM);
  };

  const handleClickAppointment = () => {
    setOpenAppointment(!openAppointment);
  };

  const handleClickReport = () => {
    setOpenReport(!openReport);
  };

  const handleClickSetting = () => {
    setOpenSetting(!openSetting);
  };

  return (
    // <div className={classes.root} position="fixed">
    <Card className={classes.root}>
      <CssBaseline />
      
      <Drawer
        className={classes.drawer}
        style={{backgroundColor: "#ffffff00"}}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>

            <ListItem button onClick={handleClickPatient}>
              <ListItemIcon>
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText primary="Patients" />
              {openPatient ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openPatient} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <GroupAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Patients" />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <ViewListIcon />
                  </ListItemIcon>
                  <ListItemText primary="View Patients" />
                </ListItem>
              </List>
            </Collapse>


            <ListItem button onClick={handleClickStaff}>
              <ListItemIcon>
                <RecentActorsIcon />
              </ListItemIcon>
              <ListItemText primary="Staff Members" />
              {openStaffM ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openStaffM} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Staff Members" />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <ViewListIcon />
                  </ListItemIcon>
                  <ListItemText primary="View Staff Members" />
                </ListItem>
              </List>
            </Collapse>


            <ListItem button onClick={handleClickAppointment}>
              <ListItemIcon>
                <EventNoteIcon />
              </ListItemIcon>
              <ListItemText primary="Appointments" />
              {openAppointment ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openAppointment} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <PostAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Appointments" />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <ViewListIcon />
                  </ListItemIcon>
                  <ListItemText primary="View Appointments" />
                </ListItem>
              </List>
            </Collapse>

            <ListItem button onClick={handleClickReport}>
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
            
            {/* <ListItem button>
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
      </Drawer>
    </Card>
    // </div>
  );
}

export default SideBar;


          // <List>
          //   {['Dashboard', 'Patients', 'Staff Members', 'Appointments', 'Reports'].map((text, index) => (
          //     <ListItem button key={text}>
          //       <ListItemIcon>
          //         {index % 5 === 0 ? <DashboardIcon /> 
          //         : index % 5 === 1 ? <PeopleAltIcon /> 
          //         : index % 5 === 2 ? <RecentActorsIcon/>
          //         : index % 5 === 3 ? <AssignmentIcon /> 
          //         : <DescriptionIcon/>}
          //       </ListItemIcon>
          //       <ListItemText primary={text} />
          //     </ListItem>
          //   ))}
          // </List>
          // <Divider />
          // <List>
          //   {['Settings', 'Profile', 'Logout'].map((text, index) => (
          //     <ListItem button key={text}>
          //       <ListItemIcon>{index % 3 === 0 ? <SettingsIcon /> : index % 3 === 1 ? <AccountCircleIcon /> : <ExitToAppIcon />}</ListItemIcon>
          //       <ListItemText primary={text} />
          //     </ListItem>
          //   ))}
          // </List>
