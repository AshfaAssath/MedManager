import React, { Fragment } from 'react'
import receptionistService from '../../services/receptionist.service';
import { useState, useEffect, useCallback } from 'react';
import ReceptionistService from '../../services/receptionist.service';
import { Card ,Snackbar,Paper} from '@material-ui/core';
import {Button} from 'react-bootstrap'
import { Alert } from '@material-ui/lab';

function AvailableSlots() {

    const[availableTime,setAvailableTime]=useState([]);
    const[ongoingTokenNumber,setOngoingTokenNumber] =useState(0);
    const [notify,setNotify] =useState({isOpen:false,message:'',type:''})
    const[student,setStudent]=useState([]);
    const[studentId,setStudentId]=useState("");
    // const[result,setResult]=useState([]);
    let result=[];


const loadAvailableSlots =()=>{
    receptionistService.getAvailableSlots().then((res)=>{
        setAvailableTime(res.data);
        console.log(res.data);
    })
}

useEffect(()=>{
 setInterval(loadAvailableSlots,2000);
    
},[])

    const fetchData =useCallback(()=>{
      receptionistService.getTempDetailsById(1).then((res)=>{
          setOngoingTokenNumber(res.data.appointToken);
          setStudentId(res.data.studentId);
          console.log("ongoing appointment number"+res.data.appointToken);
        //   setOngoingTokenNumber()

        receptionistService.getStudentById(res.data.studentId).then((result)=>{
            setStudent(result.data);
            console.log(result.data);
        })
      })
    },[])


    useEffect(()=>{
        // setInterval(fetchData,2000);
        fetchData();
    },[fetchData])
    

    const handleResetSlots= ()=>{
        
       const upTime= {
            booked:false
        }
        // setOngoingTokenNumber(0);
     availableTime.map((res)=>{

            let x =res.timeAllocated;
            // console.log(JSON.stringify(x))

        ReceptionistService.updateTimeSlotAvailability(upTime,x).then((res)=>{
            console.log("allocated time updated");
        })
        })
        // alert('All slots have reset');
        setNotify({
            isOpen:true,
            message:"Allocated time slots have reset",
            type:'success'
        })

    } 

    return (
        <Fragment>

                <h2>Time Slots Availability </h2>
                
                    <Card style={{width:'400px',marginTop:'60px',marginLeft:'300px',paddingTop:'20px'}}>
                    <p style={{fontSize:'16px',fontWeight:'bold',textAlign:'center'}}> ONGOING APPOINTMENT NUMBER: <p style={{fontSize:'50px',fontWeight:'bold'}}>{ongoingTokenNumber}</p>
                    <p style={{fontSize:'17px',textAlign:'center',fontWeight:'bold'}}> Student Name: {student.firstName} {student.lastName}</p>
                    <p style={{fontSize:'13px',textAlign:'center',fontWeight:'bold'}}> Student ID: {studentId}</p>
                    <Button variant="primary" style={{margin:'10px' ,width:'150px'}} onClick={handleResetSlots}>Reset the slots</Button>
                    </p>
                    
                    </Card> 
                    
                
        
                <div style={{textAlign:'center'}}>
                   {
                       availableTime.map((time,index)=>
                        
                                time.booked ===false ?
                            <Button key={index} style={{margin:'10px',width:'130px'}}variant="success"  disabled>{time.timeAllocated}</Button>:
                            <Button key={index} style={{margin:'10px',width:'130px'}} variant="danger" disabled>{time.timeAllocated}</Button>

                         
                       )
                   }
                    

                </div>
        
                <Snackbar
        anchorOrigin={{vertical:'top',horizontal:'right'}}
            open={notify.isOpen}
            autoHideDuration={4000}
            // onClose={snackbarClose}
           
        >
            <Alert severity={notify.type}>
                {notify.message}
            </Alert>
        </Snackbar>
        </Fragment>
    )
}

export default AvailableSlots
