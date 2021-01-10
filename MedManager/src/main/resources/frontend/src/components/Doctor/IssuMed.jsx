import React ,{useEffect, useState} from 'react'
import Form, { TableBody, TableCell, TableRow ,Table,TableHead,TextField} from '@material-ui/core/';
import {Button,Paper} from '@material-ui/core'
import  DoctorService  from "../../services/doctor.service";
import Moment from 'react-moment';

import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

function IssuMed(props) {

    const [details,setDetails]= useState([]);
    const [searchId,setSearchId]= useState("");
    // const [searchYear,setSearchYear]= useState("");
    // const [searchFaculty,setSearchFaculty]= useState("");

    const [me,setMe]= useState([]);

    useEffect(()=>{
        fetchData();
        
    },[])

    const fetchData =()=>{
        DoctorService.getMedicals().then((res)=>{
            setDetails(res.data);
            setMe(res.data);
        })
        
    }

const handleView =(id) =>{
    props.history.push(`/doctor/student/medical/${id}`);
}

const handleSearch =(e)=>{
    e.preventDefault();
    console.log(searchId);
    
    DoctorService.getMedicalsByStudentId(searchId).then((res)=>{
        setDetails(res.data);
        console.log(res.data);
    })
}

const changeId=(e)=>{
        setSearchId(e.target.value);
        console.log(searchId)
}

// const changeFaculty=(e)=>{
//     setSearchFaculty(e.target.value);
//     console.log(searchFaculty)
// }

// const changeYear=(e)=>{
//     setSearchYear(parseInt(e.target.value));
//     console.log(searchYear)
// }
const handleClose=(e)=>{
        setSearchId("");
        // setSearchYear("");
        // setSearchFaculty("");
        setDetails(me);
}

    return (
        <>
        <Paper elevation={4} style={{margin:'120px 20px 0px 20px'}}>
                
        <div style={{width:500,padding:'15px',float:'right',display:'flex'}}>
          
                    {/* <TextField
                    id="outlined-name"
                    placeholder="Faculty"
                    onChange={changeFaculty}
                    value={searchFaculty}
                    margin="normal"
                    variant="outlined"
                    />
                     <TextField
                    id="outlined-name"
                    placeholder="Year"
                    onChange={changeYear}
                    value={searchYear}
                    margin="normal"
                    variant="outlined"
                    /> */}
                     <TextField
                    id="outlined-name"
                    placeholder="Id"
                    onChange={changeId}
                    value={searchId}
                    margin="normal"
                    variant="outlined"
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
        <center><h3 style={{padding:'20px'}}>Issued Medicals</h3></center>
        <div style={{margin:'35px'}}>
            <Table>
                <thead>
                    <tr>
                        <th>Medical Id</th>
                        <th>Student Id</th>
                        <th>Issued Date</th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>
       {     
               details.map((detail,index)=>
                    <tr key={index}>
                        <td>{detail.id}</td>
                        <td>{detail.student.id}</td>
                        <td><Moment format="YYYY/MM/DD">
                            {detail.datOfIssue}
                            </Moment>
                        </td>
                        <td>
                        <button className="btn btn-primary" onClick={()=>handleView(detail.id)}>View</button>
                        
                        </td>
                    </tr>
         )}
             </tbody>
            </Table>
        </div>
        </Paper >
        </>
    )
}

export default IssuMed
