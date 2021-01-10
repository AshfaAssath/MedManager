import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { CssBaseline, Grid } from '@material-ui/core';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme"
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import {makeStyles} from "@material-ui/core/styles";

import HeaderBar from "./components/HeaderBar";
import Footer from './components/Footer';
import Welcome from './components/welocme/Welcome';
import SideMenu from './components/SideMenu';

import Student from './components/students/Student';
import User from './components/users/User';
import Appointment from './components/appointments/Appointment';
import Reports from './components/reports/Reports';
import Notifications from './components/Notifications';
import Emails from './components/Emails';
import Profile from './components/Profile';
import Search from './components/Search';
import News from './components/welocme/News';
import AddStudent from './components/students/AddStudent';
import ListStudents from './components/students/ListStudents';
import AddUser from './components/users/AddUser';
import ListUser from './components/users/ListUser';
import WelcomePage from './components/welocme/WelcomePage';
import Charts from './components/dashboard/Charts';
import receptionistMain from '../Profile';




const theme = createMuiTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1160,
            xl: 1920,
        },
    },
})

const useStyles = makeStyles(theme => ({
//     root: {
//         [theme.breakpoints.up('md')]: {
//             backgroundColor: 'red',
//         },
//     },
    sectionDesktop: {
        display: 'none',
            [theme.breakpoints.up('lg')]: {
            display: 'flex',
        },
    },

    sectionMobile: {
        display: 'flex',
            [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
    },
}));


function MainPage() {

    const classes = useStyles();

    return (
        <Router>
            {/* <HeaderBar /> */}
                <ThemeProvider theme={theme}>

                    {/*Desktop Section*/}
                    <Grid container spacing={3} direction="row" justify="center" alignItems="flex-start" className={classes.sectionDesktop}>
                        <Grid item md={3}>
                            <SideMenu />
                        </Grid>
                        <Grid item md={9}>
                            <Grid direction="column" justify="space-between" alignItems="center" position="fixed">
                                <Switch>
                                    <Route path="/" exact component={WelcomePage} />
                                    <Route path="/Dashboard" exact component={Charts}/>
                                    <Route path="/Student" exact component={Student} />
                                    <Route path="/AddStudent" exact component={AddStudent} />
                                    <Route path="/ListStudents" exact component={ListStudents} />
                                    <Route path="/User" exact component={User} />
                                    <Route path="/AddUser" exact component={AddUser} />
                                    <Route path="/ListUser" exact component={ListUser} />
                                    <Route path="/Appointment" exact component={Appointment} />
                                    <Route path="/Reports" exact component={Reports} />
                                    <Route path="/Notifications" exact component={Notifications} />
                                    <Route path="/Emails" exact component={Emails} />
                                    
                                    <Route path="/Profile" exact component={receptionistMain} />
                                </Switch>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/*mobile section*/}
                    <Grid container spacing={3} direction="row" justify="center" alignItems="flex-start" className={classes.sectionMobile}>
                        {/*<Grid item md={3}>*/}
                        {/*    <SideMenu />*/}
                        {/*</Grid>*/}
                        <Grid item md={12}>
                            <Grid direction="column" justify="space-around" alignItems="center" position="fixed" style={{marginLeft: '40px'}}>
                                <Switch>
                                    <Route path="/" exact component={WelcomePage} />
                                    <Route path="/Student" exact component={Student} />
                                    <Route path="/AddStudent" exact component={AddStudent} />
                                    <Route path="/ListStudents" exact component={ListStudents} />
                                    <Route path="/User" exact component={User} />
                                    <Route path="/AddUser" exact component={AddUser} />
                                    <Route path="/ListUser" exact component={ListUser} />
                                    <Route path="/Appointment" exact component={Appointment} />
                                    <Route path="/Reports" exact component={Reports} />
                                    <Route path="/Notifications" exact component={Notifications} />
                                    <Route path="/Emails" exact component={Emails} />
                                    <Route path="/Profile" exact component={Profile} />
                                </Switch>
                            </Grid>
                        </Grid>
                    </Grid>
                </ThemeProvider>
            {/* <Footer /> */}
            <CssBaseline />
        </Router>
    );
}

export default MainPage;

