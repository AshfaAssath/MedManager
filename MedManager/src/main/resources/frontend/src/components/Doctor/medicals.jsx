import React,{useState,useEffect} from 'react'
import TextField from '@material-ui/core/TextField';
import  Card from '@material-ui/core/Card';
import Paper  from  '@material-ui/core/Paper';
import {Form } from './useForm';
// import Control from './../controls/control';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import  {MuiPickersUtilsProvider ,KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import DoctorService from '../../services/doctor.service';
import {Snackbar} from '@material-ui/core'
import{ Alert} from '@material-ui/lab';
import {v4 as uuidv4 } from 'uuid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// import Notification from '../controls/notification'





const useStyles = makeStyles(theme=>({

    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(0.5),
         
          width: 200,
        },

        marginTop:90,
        marginLeft:30,
        marginRight:30,
        padding:30
      }



}))

function Medicals(props) {

    useEffect(()=>{
        fetchData();
        
    },[])

    const fetchData =()=>{

    DoctorService.getTempDetailsById(1).then((res)=>{
        let n= res.data;
        console.log(n.studentId);
        setStudentId(n.studentId);
     })

     
    }


    const classes = useStyles();

    const medicalForm= {
        studentId:"",
        dateOfConsult:new Date(),
        diagnosis:"",
        noOfDays:0
    }

const[studentId,setStudentId]= useState("");
const[dateOfConsult,setDateOfConsult]=useState(new Date('2020-12-18T21:11:54'));
const[diagnosis,setDiagnosis]=useState([]);
const[noOfDays,setNoOfDays]=useState(0);
const[details,setDetails] =useState([]);
// const [notify,setNotify] =useState(false);
const [notify,setNotify] =useState({isOpen:false,message:'',type:''})

const handleSubmit =(e)=>{
    e.preventDefault();

    // alert("handle sub,it called");
    //generate a medical 
    let randomId= uuidv4();
    console.log(randomId);

   const medical={
       id:randomId,
       datOfIssue:dateOfConsult,
       noOfDays:parseInt(noOfDays,10),
       doctorName:"Dr.Gavindya Fernando",
       medicalStatus:false,
       diagnosis:diagnosis,
       student:{
           id:studentId
       }
    }

        console.log(JSON.stringify(medical));

    DoctorService.getStudentById(studentId).then((res)=>{
        let data= res.data.contactNumber;
        let msg="You have got the medical ,you requested. You can edit it. Use "+randomId +" as the medical id.Thank you. UOR-Medical Center"
        
        let SMS={
            phoneNumber :data,
             message:msg
         }
         console.log(JSON.stringify(SMS));
     
         DoctorService.createSms(SMS).then(res=>{
           
                
       
            // alert("Medical Edit Request sent");
         }).catch(error =>{
             console.log(error);
         })
 
    

    DoctorService.createMedical(medical).then(res=>{
        // alert("The medical is issued");
        // props.history.push('/doctor/');
        
    }).catch(error=>{
        console.log(console.error);
    })

   
   
})
    setNotify({
        isOpen:true,
        message:"Medical Issued and Form Edit SMS sent",
        type:'success'
    })


    setStudentId("");
    setDiagnosis('');
    setNoOfDays('');
// props.history.push('/');
}

    // props.history.push('/doctor/addPres/');
        //get the student id 
        //find the number
    //send an sms to inform the about the medical


const handleDateChange= (e)=>{
    setDateOfConsult(e);
    console.log(e);
   
}

const handleId=(e)=>{
    setStudentId(e.target.value);
}


const handleNoOfDays =(e)=>{
    setNoOfDays(e.target.value);
}

const handleDiagnosis=(e)=>{
    setDiagnosis(e.target.value);
}

const snackbarClose=(e)=>{
    setNotify({isOpen:false,message:'',type:''})
}
    
    return (
        <>
        <Paper className={classes.root}>
       

        <center><h2>Medical Certificate</h2></center>
        <center><h5>Medical Center- University of Ruhuna</h5></center>
        

        <Form onSubmit={handleSubmit} >
           <div style={{textAlign:'justfy'}}>
           
                <p>To whom it may concern,</p><br/>

                <p>This is to certify that Student with the index number
                 <TextField required id="outlined-required" variant="outlined" name="studentId" value={studentId} label="Student Id" size="small" onChange={handleId}/>
             
               was examined by me on (date of the first consultation)   .</p><br/>
              <p>This student referred to above will not be fit for his/her normal studies from
                                
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker disableToolbar variant="inline" inputVariant="outlined"
                    label="Consulted date"
                    formate="MMM/dd/yyyy"
                    name="dateOfConsult"
                    value={dateOfConsult}
                    onChange={handleDateChange}
                     />  
                 </MuiPickersUtilsProvider>

                   upto  <TextField  required id="outlined-required" variant="outlined" placeholder="No. of days" size="small" value={noOfDays} name="noOfDays" onChange={handleNoOfDays}/> days as a result of illness.</p>
                
                <p>Reasons for illness:</p>

                <TextField 
                    type="text"
                    id="outlined-multiline-static"
                    name="diagnosis"
                    value={diagnosis}
                    label="Diagnosis" 
                    placeholder="Diagnosis" 
                    size="medium"
                    // multiline
                    // rowsMax={4}
                    onChange={handleDiagnosis}
                    />
                
               
                <p >
                    <br/>
                    DR.Gavindya Fernando 
                    &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     <span style={{textAlign:'right'}}> {dateOfConsult.toDateString()}</span> 
                    <br/>
                    M.B.B.S(Sri Lanka)
                    &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    .....................................
                    <br/>
                    RegNo: 8782
                    &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Date
                </p>   
                <p style={{textAlign:'right',paddingRight:'50px'}}></p>    
                 <Button variant="outlined" type="submit" onSubmit={handleSubmit}>submit</Button>
                <div>
                    {/* <button type="submit" onSubmit={handleSubmit}>Submit</button> */}
                    {/* <Button variant="outlined" type="submit" onSubmit={handleSubmit}>Submit</Button>
                    <Button variant="outlined">Cancel</Button> */}
                </div>
               
            </div>
            
        </Form>
        {/* <Alert onClose={() => {}}>This is a success alert — check it out!</Alert> */}
        </Paper>
        <Snackbar
        anchorOrigin={{vertical:'top',horizontal:'right'}}
            open={notify.isOpen}
            autoHideDuration={4000}
            onClose={snackbarClose}
        >
            <Alert severity={notify.type}>
                {notify.message}
            </Alert>
        </Snackbar>
        </>
    )
}

export default Medicals;

