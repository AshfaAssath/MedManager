import React from 'react'
import { useState ,useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import DoctorService from '../../services/doctor.service';
import { Card, TextField,Table ,Button} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAddressCard} from '@fortawesome/free-solid-svg-icons';
import PersoMed from './persoMed';
import PersoPres from './persoPres';
import PopUp from './popUp'

function GeneralDetails(props) {

    const [medDetails,setMedDetails]= useState([]);
    const [genDetails,setGenDetails]= useState([]);
    const [presDetails,setPresDetails]= useState([]);
    const [searchId,setSearchId]= useState("");
    const[openPopup2,setOpenPopup2]=useState(false);
    const[openPopup3,setOpenPopup3]=useState(false);
    // const [searchYear,setSearchYear]= useState("");
    // const [searchFaculty,setSearchFaculty]= useState("");

    const useEffect=(()=>{
        fetchData();
     },[])
 
     const fetchData =()=>{
     }


     const useStyles= makeStyles((theme)=>({
        root:{
             margin:20,
             width:800
        },
    }))
    
    
const handleSearch =(e)=>{
    e.preventDefault();
    console.log(searchId);
    
    // DoctorService.getMedicalsByFacultyAcedemicYearStudentId(searchFaculty,searchYear,searchId).then((res)=>{
    //     setDetails(res.data);
    //     console.log(res.data);
    // })
    DoctorService.getMedicalsByStudentId(searchId).then((res)=>{
        setMedDetails(res.data);
    })

    DoctorService.getPrescriptionByStudentId(searchId).then((res)=>{
        setPresDetails(res.data);
    })

    DoctorService.getStudentById(searchId).then((res)=>{
        setGenDetails(res.data);
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
        setGenDetails("");
        setPresDetails("");
        setMedDetails("");
}

    const classes= useStyles();

    return (
       
         <Card className={classes.root} elevation={4} style={{margin:'120px 120px 0px 20px'}}>

            
            <div style={{padding:'15px',float:'right',display:'flex'}}>
                            
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
                    <div>
                              <center><h3 style={{padding:'20px 0px 0px 0px'}}>Student Details</h3></center>

                    
                                     <div style={{padding:'5px',display:'flex' ,margin:'15px'}}>
                                     <FontAwesomeIcon icon={faAddressCard} size="7x" /> 
                            <h2 style={{margin:'15px 0 0 20px '}}>{genDetails.firstName} {genDetails.lastName}</h2>
                    </div>
                        <div style={{padding:'10px'}}>
                 <Table>
                        <tr style={{padding:'15px',margin:'15px'}}>
                            <td style={{margin:'30px'}}> 
                                Index No:
                            </td>
                            <td>
                            {genDetails.id}
                            </td>
                        </tr>
                        <tr style={{padding:'15px'}}>
                            <td>
                            Age:
                    
                            </td>
                            <td>
                            {genDetails.age}
                            </td>
                        </tr>
                        <tr style={{padding:'15px'}}>
                            <td>
                            Gender:
                    
                            </td>
                            <td>
                            {genDetails.gender}
                            </td>
                        </tr>
                        <tr style={{padding:'15px'}}>
                            <td>
                            Blood Group: 
                            </td>
                            <td>
                            {genDetails.bloodGroup}
                            </td>

                        </tr>
                          <tr style={{padding:'15px'}}>
                            <td>
                            Height: 
                            </td>
                            <td>
                            {genDetails.height}
                            </td>

                            </tr>
                        <tr style={{padding:'15px'}}>
                            <td>
                            Weight: 
                            </td>
                            <td>
                            {genDetails.weight}
                            </td>

                        </tr>
                        <tr style={{padding:'15px'}}>
                            <td>
                                Allergies:
                            </td>
                            <td>
                                {genDetails.allergies}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Chronic diseases:
                            </td>
                            <td>
                                {genDetails.chronicDisease}
                            </td>
                        </tr>
                        <tr>
                        <td  style={{padding:'40px'}}>
                            <Button 
                            // onClick={()=>handlePresView(details.id)} 
                            onClick={()=>setOpenPopup2(true)}
                            variant="outlined" color="primary" size="large" >
                                    PAST PRESCRIPTIONS
                            </Button>
                        </td>
                        <td  style={{padding:'40px'}}>
                            <Button 
                            // onClick={()=>handleMedView(details.id)} 
                            onClick={()=>setOpenPopup3(true)}
                            variant="outlined" color="primary" size="large">
                                    ISSUED MEDICALS
                            </Button>
                        </td>
                    </tr>
                       
                    </Table>     
                
                    </div>

                    </div>
                    <PopUp
            openPopup={openPopup2}
            setOpenPopup={setOpenPopup2}
            title="Prescriptions">
                    <PersoPres id={searchId}/>
        </PopUp>
        <PopUp
            openPopup={openPopup3}
            setOpenPopup={setOpenPopup3}
            title="Medicals">
                    <PersoMed id={searchId}/>
        </PopUp>
           </Card>
           
     
    )
}

export default GeneralDetails
