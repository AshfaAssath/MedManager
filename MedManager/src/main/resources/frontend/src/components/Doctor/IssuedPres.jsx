import React,{useEffect,useState} from 'react';
// import Form, { TableBody, TableCell, TableRow ,TableHead} from '@material-ui/core/';
import {Table,TextField} from '@material-ui/core';
// import doctorService from '../../services/doctor.service';
// import Table from '@material-ui/core/Table';
import DoctorService from '../../services/doctor.service';
import {Button,Paper} from '@material-ui/core'
import Moment from 'react-moment';
// import { toDate } from 'date-fns';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

function IssuedPres(props) {

    const [pe,setPe]= useState([]);
    const [details,setDetails]= useState([]);
    const [searchId,setSearchId]= useState("");

    useEffect(()=>{
        fetchData();
        
    },[])

     const fetchData =()=>{
        DoctorService.getPrescription().then((res)=>{
            setDetails(res.data);
            setPe(res.data);
            // console.log(details);
        })
        
     }

     const handleView =(id) =>{
        props.history.push(`/doctor/student/prescription/${id}`);
    }
        
    const handleSearch =(e)=>{
        e.preventDefault();
        console.log(searchId);
        
        DoctorService.getPrescriptionByStudentId(searchId).then((res)=>{
            setDetails(res.data);
            console.log(res.data);
        })
    }

    const searchHandle=(e)=>{
        setSearchId(e.target.value);
    }

    const handleClose=(e)=>{
        setSearchId("");
        setDetails(pe);
    }

    return (
        <>
        <Paper elevation={4} style={{margin:'120px 20px 0px 20px'}}>

        <div style={{width:300,float:'right',padding:'15px',display:'flex'}}>
                            

                 <InputBase
                    // className={classes.input}
                    placeholder="Enter Student Id"
                    name="searchBox"
                    value={searchId}
                    onChange={searchHandle}
                     />
                 <IconButton type="button" 
                 aria-label="search"
                 onClick={handleSearch}
                 >
                    <SearchIcon />
                </IconButton>
                <IconButton type="button" 
                 aria-label="close"
                 onClick={handleClose}
                 >
                    <CloseIcon />
                </IconButton>
                   
                </div>
          <center><h3 style={{padding:'20px'}}>Issued Prescription</h3></center>
        <div style={{margin:'35px'}}>
        <Table>
                <thead>
                    <tr>
                        <th>Student Id</th>
                        <th>Issued Date</th>
                        <th>Diagnosis</th>
                        <th>Treatment</th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>
       {     
               details.map((detail)=>
                    <tr key={detail.id}>
                        <td>{detail.student.id}</td>
                        <td>
                        <Moment format="YYYY/MM/DD">
                            {detail.issuedDate}
                        </Moment>
                        </td>
                        <td>{detail.diagnosis}</td>
                        <td>{detail.treatment}</td>
                        <td>
                        <button className="btn btn-primary" type="button" onClick={()=>handleView(detail.id)}>View</button>
                        </td>
                    </tr>
         )}
             </tbody>
            </Table>
        </div>
        </Paper>
        </>
    )
}

export default IssuedPres

