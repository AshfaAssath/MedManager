import { TextField ,Card, FormGroup} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import { Button } from 'bootstrap';
import React ,{ useState,useEffect }from 'react'
import doctorService from '../../services/doctor.service';

const useStyles= makeStyles((theme)=>({
    root:{
        width:300,
        marginTop:120,
        marginLeft:50

    },
}))


function ViewPres(props) {

    const classes= useStyles();

    const[presId,setPresId]=useState(props.match.params.id);
    const[prescrip,setPrescrip]=useState([]);

    useEffect(()=>{
        fetchData();
        
    },[])

    const fetchData =()=>{
        
        doctorService.getPrescriptionById(presId).then((res)=>{
            setPrescrip(res.data);
            console.log(JSON.stringify(prescrip));
        })
    }

    const handleCancel= (e)=>{
        props.history.push(`/doctor/student/prescription/`);
    }

    return (
        <>
        <Card elevation={4} className={classes.root}>
        <div>
            {/* <center> <h4 style={{padding:' 10 15px'}}>Prescription </h4></center> */}
             <form>
                 <div style={{padding:'10px 20px'}}> 
                    <p >Prescription Id: </p>
                    
                        <TextField id="outlined-size-small" value={prescrip.id} variant="outlined" disabled/>
                   
                 </div>
                 <div style={{padding:'10px 20px'}}> 
                    <p>Issued Date </p>
                    
                        <TextField id="outlined-size-small" value={prescrip.issuedDate} variant="outlined" disabled/>
                   
                 </div>
                 <div style={{padding:'10px 20px'}}> 
                    <p >Diagnosis </p>
                    
                        <TextField id="outlined-size-small" value={prescrip.diagnosis} variant="outlined" disabled/>
                   
                 </div> 
                 <div style={{padding:'10px 20px'}}> 
                    <p >Treatment </p>
                    
                        <TextField id="outlined-size-small" value={prescrip.treatment} variant="outlined" disabled/>
                   
                 </div>

                <div style={{padding:'10px 20px'}}>
                <button className="btn btn-primary" onClick={()=>handleCancel()}>Cancel</button>
                </div>
            
             </form>
        
        </div>
        </Card>
        </>
        
    )
}

export default ViewPres
