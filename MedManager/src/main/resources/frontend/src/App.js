import React ,{useState,useEffect}from 'react'
import DoctorMain from './components/Doctor/doctorMain';
import ReceptionistMain from './components/receptionist/receptionistMain';
import MainPage from './components/Admin/MainPage';

import PharmacistMain from './components/Pharmacist/Main'
import { Link,Switch,Route } from 'react-router-dom';
import './App.css';
import { AppBar, Toolbar, Typography, Grid, IconButton, Badge } from '@material-ui/core';

import AuthService from './services/auth.service';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Welcome';
import Profile from './components/Profile';

import { fade} from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaptopMedical } from '@fortawesome/free-solid-svg-icons'

import Pres from './components/Doctor/pres';
import StudentProfile from './components/Doctor/studentProfile';
import PrescrMain from './components/Doctor/PrescrMain';
import CreateAppointment from './components/receptionist/createAppointment';
import UpdateAppointment from './components/receptionist/updateAppointment';
import AppointmentsList from './components/receptionist/appointmentsList';
import Medicals from './components/Doctor/medicals';
import AvailableSlots from './components/receptionist/availableSlots';
import ViewMed from './components/Doctor/viewMed';
import ViewPres from './components/Doctor/viewPres';
import GeneralDetails from './components/Doctor/generalDetails';
import IssuedPres from './components/Doctor/IssuedPres';
import IssuMed from './components/Doctor/IssuMed';
import Appointment from './components/Doctor/appointment';





// const classes= useStyles();
function App() {


  const [showAdminBoard,setShowAdminBoard] =useState(false);
  const [showDoctorBoard,setShowDoctorBoard] =useState(false);
  const [showPharmacistBoard,setShowPharmacistBoard] =useState(false);
  const [showReceptionistBoard,setShowReceptionistBoard] =useState(false);
  const [showPHIBoard,setShowPHIBoard] =useState(false);
  const [currentUser,setCurrentUser] =useState(undefined);


  useEffect(() =>{
    const user =AuthService.getCurrentUser();

    if(user){
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      setShowDoctorBoard(user.roles.includes("ROLE_DOCTOR"));
      setShowPharmacistBoard(user.roles.includes("ROLE_PHARMACIST"));
      setShowPHIBoard(user.roles.includes("ROLE_PHI"));
      setShowReceptionistBoard(user.roles.includes("ROLE_RECEPTIONIST"));
    }
  },[]);

  const logOut= () =>{
    AuthService.logout();
  }
  return (
    <div>
       <AppBar position="fixed" style={{backgroundColor:'#ffffff'}}  >
        <Toolbar>
            
              <Grid item >
                <Link to={"/"} style={{textDecoration: 'none'}}>     
                  <Typography  >
                    <FontAwesomeIcon icon={faLaptopMedical} />
                    {" "}MedManager
                  </Typography>
                </Link>
              </Grid>
{/* 
                <Grid item>
                
                <Link to={"/home"} className="nav-link">     
                  Home
                </Link>
                </Grid> */}


                {
           currentUser ?(
           
             <div className="navbar-nav ml-auto" style={{display:'flex'}}>
               {/* <li className="nav-item">
                   <Link to={"/profile"} className="nav-link">
                     {currentUser.username}
                   </Link>
               </li> */}
                 <li className="nav-item"> 
                   <a href="/login" className="nav-link" onClick={logOut}>
                     LogOut
                   </a>
                 </li>
             </div>
         

           ):(
            
             <div className="navbar-nav ml-auto" style={{display:'flex',color:'red'}}>
                 <li className="nav-item">
                     <Link to={"/login"} className="nav-link">
                       Login 
                     </Link>
                 </li>
                 {/* <li className="nav-item">
                     <Link to={"/register"} className="nav-link">
                       Sign Up
                     </Link>
                 </li> */}
             </div>
           )}
 </Toolbar>
 </AppBar>

     {
       showAdminBoard &&(
        
        <div>
        <MainPage/>
      </div>

       )}

       { showDoctorBoard &&(
       
       <div>
         <DoctorMain/>
       </div>
       
    
       )}
    <div>
       { showPharmacistBoard &&(
           <div>
           <PharmacistMain/>
         </div>
       )}

       { showPHIBoard &&(
         <li className="nav-item">
             <Link to={"/phi"} className="nav-link">
               PHI Board
             </Link>
         </li>
       )}

     { showReceptionistBoard &&(
          <div>
            <ReceptionistMain/>
          </div>
     )}

{/* <div>
       <ul className="mdc-list">
       
       <li style={{display:"inline-block"}} className="nav-item">
           <Link to={"/receptionist"} className="nav-link">
             Receptionist Board
           </Link>
       </li>
       <li style={{display:"inline-block"}} className="nav-item">
         <Link to={"/receptionist/appoint/"} className="nav-link">
           Appointments
         </Link>
       </li> */}
       
       {/* <li className="nav-item">
         <Link to={"/doctor/presTable/"} className="nav-link">
           Prescription Table
         </Link>
       </li> */}
       
     {/* </ul>

</div> */}
         
       {/* )} */}

       {/* {currentUser &&(
         <li className="nav-item">
             <Link to={"/user"} className="nav-link">
                 User
             </Link>
         </li>
       )} */}

      </div> 

        

   
    <div className="container mt-3"> 
             <Switch>
               {/* <Route exact path={["/" ,"/home"]} component={Home} /> */}
               <Route exact path="/login" component={Login} />
               <Route exact path="/register" component={Register} />
               {/* <Route exact path="/profile" component={Profile} /> */}
               {/* <Route exact path="/admin" component={BoardAdmin} />
               <Route exact path="/pharamacist" component={BoardPharmacist} /> */}
               <Route exact path="/doctor" component={DoctorMain} />
               {/* <Route path="/doctor/addPres/" component={Pres }></Route> 
               <Route path="/doctor/presTable" component={PrescrMain}></Route>
               <Route path="/doctor/student/" component={StudentProfile}></Route>    
               <Route path="/doctor/appoint/" exact component={Appointment }></Route>    
               <Route path="/doctor/medical/" exact component={Medicals }></Route>

               <Route path="/doctor/student/general/" component={GeneralDetails} />
               <Route path="/doctor/student/prescription/:id" exact component={ViewPres} />
               <Route path="/doctor/student/prescription/" exact component={IssuedPres} />
               <Route path="/doctor/student/medical/:id" exact component={ViewMed} />
               <Route path="/doctor/student/medical/"exact component={IssuMed} /> */}
               {/* <Route  path="/receptionist" exact component={AvailableSlots} />

                <Route path="/receptionist/addAppoint" component={CreateAppointment }></Route> 
                <Route path="/receptionist/updateAppoint/:id" component={UpdateAppointment }></Route>    
                <Route path="/receptionist/appoint/" exact component={AppointmentsList }></Route>      */}
                {/* <Route path="/" exact component={Welcome }></Route> */}
               {/* <Route exact path="/phi" component={BoardPHI} /> */}
             </Switch>
    </div>

 </div>
  )
}

export default App
