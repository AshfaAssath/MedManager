// import { TextField } from '@material-ui/core';
import React, { useState,useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { Route,NavLink } from 'react-router-dom';

import GeneralDetails from './generalDetails';
import IssuedPres from './IssuedPres';
import IssuMed from './IssuMed';
import DoctorService from '../../services/doctor.service';
import ViewMed from './viewMed';
import ViewPres from './viewPres';
import PersoPres from './persoPres';
import PersoMed from './persoMed';

const details={
    "general":{
        "name":"",
        "id":0,
        "Age":0,
        "Boarding/Hostels":"",
        "gender":"",
        "faculty":"",
        "acedemicYear":0
    },
     "health":{
        "bloodGroup":"",
        "allergies":"",
        "height":0,
        "weight":0
     }

}

function StudentProfile(props) {
    const[issuMedi,setIssuMedi]=useState([]);
    const[stuDetail,setStuDetail]=useState([]);
    const[presAll,setPresAll]=useState([]);


    useEffect(()=>{
        fetchData();
        
    },[])
    
    const fetchData =()=>{
        //medi
        // DoctorService.getMedicals().then((res)=>{
        //     setIssuMedi(res.data);
        //     // console.log("issued medi"+JSON.stringify(issuMedi));
        // })

        // //gene
        // DoctorService.getStudents().then((res)=>{
        //     setStuDetail(res.data);
        //     // console.log("details"+JSON.stringify(stuDetail));
        // })

        // //pres
        // DoctorService.getPrescription().then((res)=>{
        //     setPresAll(res.data);
        //     // console.log("pres"+JSON.stringify(presAll));
        // })

        // console.log(issuMedi);
    }


    return (
        <>
       
                {/* <h1>Student Profile</h1> */}
            <div>
                <center><div >             
                    <NavLink className="btn btn-primary m-2" to={"/doctor/student/general/"} role="button">Student details</NavLink>
                    <NavLink className="btn btn-primary m-2" to={"/doctor/student/medical/" }role="button">Issued Medicals</NavLink>
                    <NavLink className="btn btn-primary m-2" to={"/doctor/student/prescription/"} role="button">Issued Prescriptions</NavLink>
                 </div>
                </center>
                <Switch>
                    <Route exact path="/doctor/student/general/"  component={GeneralDetails} />
                    <Route path="/doctor/student/prescription/" exact component={IssuedPres} />
                    <Route path="/doctor/student/prescription/:id" exact exact component={ViewPres} />
                    <Route path="/doctor/student/prescription/pres/:id" exact component={PersoPres}/>
                    <Route path="/doctor/student/prescription/med/:id" exact component={PersoMed}/>
                    <Route path="/doctor/student/medical/" exact component={IssuMed} />
                    <Route path="/doctor/student/medical/:id" exact component={ViewMed} />
                    
                    
                </Switch>
                </div>
            
        </>        
    )
}

export default StudentProfile;




