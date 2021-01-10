import React from 'react'
import{ BrowserRouter,Route,Switch,Link} from 'react-router-dom';
import HeaderDoc from './headerDoc';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme"
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Welcome from './../common/Welcome';
import Appointment from './appointment';
import Pres from './pres';
import StudentProfile from './studentProfile';
import PrescrMain from './PrescrMain';
import Medicals from './medicals';
import IssuedPres from './IssuedPres';
import ViewMed from './viewMed';
import ViewPres from './viewPres';
import PersoMed from './persoMed';
import PersoPres from './persoPres';
import GeneralDetails from './generalDetails';
import IssuMed from './IssuMed';
import {CssBaseline, Grid} from '@material-ui/core';
import SideMenu from './sideMenu';
import {makeStyles} from '@material-ui/core/styles'
import HeaderBar from '../common/headerBar';
import Home from '../Welcome';
import Profile from './../Profile';

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
  root:{
    marginTop:300
  },
      sectionDesktop: {
          display: 'none',
              [theme.breakpoints.up('lg')]: {
              display: 'flex',
          },
      }
  }));

function DoctorMain(props) {

const classes=useStyles();

    return (
                    // {/* <HeaderDoc /> */}
                   <BrowserRouter>
                      {/* <HeaderBar/> */}

                     <Grid container>
                   <ThemeProvider theme={theme}>
                     <Grid className={classes.sectionDesktop} container spacing={3} direction="row" justify="center" alignItems="flex-start" >
                        <Grid item md={3}>
                         <SideMenu/>
                        </Grid>
                    <Grid item md={9}> 
                    <Grid direction="column" justify="space-between" alignItems="center" position="fixed">
                      <Switch>
                        <Route path="/doctor/addPres/" exact  component={Pres }></Route> 
                        <Route path="/presTable" exact component={PrescrMain}></Route>
                         <Route path="/doctor/student/" exact component={StudentProfile }></Route>    
                        <Route path="/doctor/appoint/" exact component={Appointment }></Route>     
                        <Route path="/doctor/" exact component={Welcome }></Route>
                        <Route path="/doctor/medical" exact component={Medicals }></Route>
                        <Route exact path="/doctor/student/general/"  component={GeneralDetails} />
                        <Route path="/doctor/student/prescription/" exact component={IssuedPres} />
                        <Route path="/doctor/student/prescription/:id" exact exact component={ViewPres} />
                        <Route path="/doctor/student/prescription/pres/:id" exact component={PersoPres}/>
                        <Route path="/doctor/student/prescription/med/:id" exact component={PersoMed}/>
                        <Route path="/doctor/student/medical/" exact component={IssuMed} />
                        <Route path="/doctor/student/medical/:id" exact component={ViewMed} />
                        <Route path="/home" exact component={Home}/>
                        <Route path="/profile" exact component={Profile}/>
                    </Switch> 
                    </Grid>
                    </Grid>
                    </Grid>
                    </ThemeProvider>
                    </Grid> 
                    <CssBaseline/>
                    </BrowserRouter> 
                // </div>
    )
}

export default DoctorMain;
