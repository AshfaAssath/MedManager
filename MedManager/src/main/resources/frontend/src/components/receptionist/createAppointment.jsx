import React ,{ useState,useEffect }from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ReceptionistService from '../../services/receptionist.service';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Card} from '@material-ui/core';

const useStyles= makeStyles((theme)=>({
    root:{
        width:400,
        height:700,
        marginTop:120,
        marginLeft:60,
        marginRight:40,
        paddingLeft:50,
       paddingTop:20
       
    },
}))


function CreateAppointment(props) {

    const [date,setDate] =           useState("");
    const [symptoms,setSymptoms]=    useState("");
    const [comment,setComment]=      useState("");
    const [consultTime,setConsultTime]=useState("");
    const [studentId,setStudentId]=   useState("");
    const [acedemicYear,setAcedemicYear]=   useState("");
    const [faculty,setFaculty]=   useState("");
    const [x,setX]= useState([]);
   

    useEffect(()=>{
       fetchData();

    },[])

    const fetchData= ()=>{
        
        let toDaay= new Date();
        let toDay = toDaay.getFullYear() + '-' + (toDaay.getMonth() + 1) + '-' + toDaay.getDate();
        setDate(toDay);

        ReceptionistService.getAvailableSlots().then((res)=>{
            res.data.map((time)=>{
                time.booked==false?
                x.push(time.timeAllocated):void 0
            })
        })
        console.log(x);
    } 

    const saveAppointment=(e)=>{
        e.preventDefault();

        let appointment={
               date: date,
               symptoms: symptoms,
               comment: comment,
               timeAllocated:consultTime,
               currentStatus: false, 
               faculty:faculty,
               acedemicYear:acedemicYear,
               student:{
                   id:studentId
                },
                entered:false
            };


           
          console.log('appointment =>' +JSON.stringify(appointment));

        ReceptionistService.createAppointment(appointment).then(res=>{
            props.history.push('/receptionist/appoint/');
        }).catch(error =>{
            console.log(error);
        })
    }

    const cancelAppointment=()=>{
        props.history.push('/receptionist/appoint/');
    }

    const studentIdHandler=(e)=>{
        // let sid= parseInt(e.target.value)
       setStudentId(e.target.value);
    }

    const symptomsHandler=(e)=>{
       setSymptoms(e.target.value);
    }

    const consultTimeHandler=(e)=>{
        setConsultTime(e.target.value);
        console.log("time is "+ consultTime);
    }

    const commentHandler=(e)=>{
        setComment(e.target.value);
    }


    const acedemicYearHandler=(e)=>{
            setAcedemicYear(e.target.value);
    }

    const facultyHandler=(e)=>{
        setFaculty(e.target.value);
    }

    // const handleAceYear=(e)=>{
    //     setStdAceYea(e.target.value);
    // }
    //  const handleFac=(e)=>{
    //     setStdFac(e.target.value);
    //  }

    const classes= useStyles();

    return (
        <Card elevation={4} className={classes.root}>
            <center><h3 >Add Appointment</h3></center>
                    <div style={{width:'300px',padding:'20px'}}>
                        
                    <form>
                            <div style={{padding:'10px'}}>
                            {/* <TextField id="outlined-basic" label="faculty" variant="outlined" value={stdFac} onChange={handleFac} style={{width:'400px',padding:'10px'}}/>
                            <TextField id="outlined-basic" label="year" variant="outlined" value={stdAceYea} onChange={handleAceYear} style={{width:'400px',padding:'10px'}} /> */}
                            <TextField id="outlined-basic" label="Student Id" variant="outlined"value={studentId} onChange={studentIdHandler} style={{width:'240px'}} />
                                
                            </div>
                            <div style={{padding:'10px'}}>
                            <TextField id="outlined-basic" label="Acedemic Year" variant="outlined" value={acedemicYear} onChange={acedemicYearHandler} style={{width:'240px'}} />
                                
                            </div>
                            <div style={{padding:'10px'}}>
                            <TextField id="outlined-basic" label="Faculty" variant="outlined" value={faculty} onChange={facultyHandler} style={{width:'240px'}} />
                                
                            </div>
                            <div style={{padding:'10px'}}>
                            <TextField id="outlined-basic" label="Symptoms" variant="outlined" value={symptoms} onChange={symptomsHandler} style={{width:'240px'}} />
                               
                            </div>
                            <div style={{padding:'10px'}}>
                            <TextField id="outlined-basic" label="Comment" variant="outlined" value={comment} onChange={commentHandler} style={{width:'240px'}} />
                                
                            </div>
                            <div style={{padding:'10px'}}>
                                    <Autocomplete
                                            id="controllable-states-demo"
                                            value={consultTime}
                                            onChange={(event, newValue) => {
                                            setConsultTime(newValue);
                                            }}
                                            
                                            options={x.map((time) => time)}
                                            renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Consult time"
                                                variant="outlined"
                                                margin="normal"
                                            />
                                            )}
                                        />
                                </div>
                            <div style={{textAlign:'center',margin:'10px 0 0 0'}}>
                                <button className="btn btn-success" onClick={saveAppointment}>Save</button>
                                <button className="btn btn-danger" onClick={cancelAppointment} style={{marginLeft:"15px"}}>Cancel</button>
                            </div>                    
                        </form>
                    </div>
               
        </Card>
    )
}

export default CreateAppointment



  

