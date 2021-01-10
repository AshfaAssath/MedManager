import React from 'react';
import SlideMenu from './Component/SlideMenu';
import HeaderBar from './Component/HeaderBar';
import {makeStyles,CssBaseline,Grid} from '@material-ui/core'
import Medicine from './pages/Medicine/Medicine';
import Drug from './pages/Drug/Drug';
import useTable from './Component/useTable';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Prescription from './pages/prescription/Prescription';
// import Profile from './pages/Profile/Profile';
import Record from './pages/Record/Record'
import Profile from '../Profile'
import BottomAppBar from './Component/BottomAppBar';
//import HeaderBar from '../../../../../Downloads/HeaderBar';
import Welcome from './Component/Welcome';
import WelcomePage from './pages/Wel/WelcomePage'
// import './App.css'
//import SlideMenu from './Component/SlideMenu'


const useStyles=makeStyles({
    appMain:{
      paddingLeft:'300px',
      width:'100%'
    }
})

export default function Main() {

  //const marginTop = {
    //marginTop:"20px",
  //};

 // const marginLeft = {
    //marginTop: "50px",
  //};

    // <Route path='/welcome'component={Welcome} />

  const classes=useStyles();
  return (
    <div>  
      
      <BrowserRouter>
      
          < HeaderBar/>
          <Grid container spacing={3} direction="row" justify="center" alignItems="flex-start">
              <Grid item md={3}>
                 <SlideMenu />
              </Grid>
                 <Grid item md={9}>
                  <Grid direction="column" justify="space-between" alignItems="center" position="fixed">
     
                    <Switch>
                          <Route path="/" exact component={WelcomePage} />
                          <Route path='/stock' component={Medicine}/>
                          <Route path='/drug' component={Drug}/>
                          <Route path='/prescription' component={Prescription}/>
                          <Route path='/reports' component={Record}/>
                          <Route path='/profile' component={Profile}/>
                      </Switch>

                  </Grid> 
                 </Grid>
        </Grid>
     

    {/*   <HeaderBar />
        <Grid container spacing={3} direction="row" justify="center" alignItems="flex-start">
          <Grid item md={3}>
            <SideMenu />
          </Grid>
          <Grid item md={9}>
            <Grid direction="column" justify="space-between" alignItems="center" position="fixed">
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
        </Grid>*/}
                       
     <CssBaseline />
      </BrowserRouter>
          {/* <BottomAppBar  style={{ Bottom:500}}/> */}
    </div>
  );
}

//export default Main;


