import React ,{ useState,useEffect }from 'react'
import {makeStyles} from '@material-ui/core/styles';
import doctorService from '../../services/doctor.service';
import { Card ,TextField} from '@material-ui/core';
import Medicals from './medicals';


const useStyles= makeStyles((theme)=>({
    root:{
        width:300,
        marginTop:120,
        marginLeft:50
    },
}))

function ViewMed(props) {

    const[medId,setMedId]=useState(props.match.params.id);
    const[medicals,setMedicals]=useState([]);

    useEffect(()=>{
        fetchData();
        
    },[])

    const fetchData =()=>{
      
        doctorService.getMedicalById(medId).then((res)=>{
           setMedicals(res.data);
            console.log(JSON.stringify(medicals));
        })
    }

    const classes= useStyles();

    const handleCancel= (e)=>{
        props.history.push(`/doctor/student/medical/`);
    }
    return (
        <>
        <Card elevation={4} className={classes.root}>
        <div>
            {/* <center> <h4 style={{padding:' 10 15px'}}>Prescription </h4></center> */}
             <form>
                 <div style={{padding:'10px 20px'}}> 
                    <p >Medical Id: </p>
                    
                        <TextField id="outlined-size-small" value={medicals.id} variant="outlined" disabled/>
                   
                 </div>
                 <div style={{padding:'10px 20px'}}> 
                    <p >Date of Issue </p>
                    
                        <TextField id="outlined-size-small" value={medicals.datOfIssue} variant="outlined" disabled/>
                   
                 </div>
                 <div style={{padding:'10px 20px'}}> 
                    <p>Diagnosis </p>
                    
                        <TextField id="outlined-size-small" value={medicals.diagnosis} variant="outlined" disabled/>
                   
                 </div>
                 <div style={{padding:'10px 20px'}}> 
                    <p >No:of Days </p>
                    
                        <TextField id="outlined-size-small" value={medicals.noOfDays} variant="outlined" disabled/>
                   
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

export default ViewMed
