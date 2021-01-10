import React, { useEffect,useState,useCallback} from 'react'
import { Table,Grid,Paper, TableBody, TableCell, TableRow, TableHead, Toolbar, InputAdornment,Checkbox, ButtonBase} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {UseForm,Form} from './useForm'
import { makeStyles } from '@material-ui/core/styles';
import Control from '../controls/control'
// import StockService from '../../services/StockService'
// import PrescriptionService from '../../services/PrescriptionService';
import * as DrugSaveLocal from '../../services/DrugSaveLocal';
import { Multiselect } from 'multiselect-react-dropdown';
// import useTable from './useTable';
import  TablePagination  from '@material-ui/core/TablePagination';
import  Search from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import PopUp from './popUp';
// import DrugSaveLocal from '../../services/DrugSaveLocal';
import Medicals from './medicals';
import doctorService from '../../services/doctor.service';
import SearchBox from './searchBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAddressCard} from '@fortawesome/free-solid-svg-icons';
import { Button } from '@material-ui/core';
import PersoPres from './persoPres';
import PersoMed from './persoMed';
import {Snackbar} from '@material-ui/core'
import{ Alert} from '@material-ui/lab';

const useStyles = makeStyles(theme=>({

    pageContent:{
        width:500,
        marginTop:120,
        margin:theme.spacing(5),
        padding:theme.spacing(3),
        float:'left'
        },
        pageContent1:{
            width:600,
            marginTop:120,
            margin:theme.spacing(5),
            padding:theme.spacing(3),
            float:'right'
            },
    
            
    table:{
        marginTop:theme.spacing(3),
        '& thead th':{
            fontWeight:'600',
            color:theme.palette.primary.main,
            backgroundColor:theme.palette.primary.light
        },
        '& tbody td':{
            fontWeight:'300'
        },
        '& tbody tr:hover':{
            backgroundColor:'#fffbf2',
            cursor:'pointer'
        }
    },
    searchInput:{
        width:'75%'
    },
    newButton:{
        position:'absolute',
        right:'10px'
    }
}))


const initialFormValues={
    id:0,
    diagnosis:'',
    treatment:'',
    issuedDate:new Date(),
    symptoms:'',
    doctorId:0,
    studentId:0,
    issuDruList:[],
    lastSelectedDr:[]
 }


function Pres(props) {

    const [details,setDetails]=useState([]);
   
const classes= useStyles();
// const drugsList=[
//     {id:1,drugName:"Vitamin C"}, 
//     {id:2,drugName:"Amoxilin"},
//     {id:3,drugName:"Panadol"},
//     {id:4,drugName:"Domperadon"}
// ];

       



const loadDrugs = useCallback(() => {

    doctorService.getStock().then((res) =>{
        setDrugs(res.data);
     // console.log("DRUG"+JSON.stringify(res.data));
     console.log(res.data);
                    })
     ;
},[])


useEffect (()=>{
    loadDrugs()
    },[loadDrugs]
    )

//get the drugList and the number of the prescription
const fetchData =()=>{
    
    doctorService.getPrescription().then((res)=>{
            setPresNo(res.data.length);
        })
       

    doctorService.getTempDetailsById(1).then((res)=>{
            let n= res.data;
            console.log(n.studentId);
            doctorService.getStudentById(n.studentId).then((res)=>{
                setDetails(res.data);
            })
    })
    console.log(details);
}

//get the  drugList 
useEffect(()=>{
    fetchData();
},[])




//validations
const validate=(fieldValues=values)=>{
    let temp={...errors}
    
    if('diagnosis' in fieldValues)
        temp.diagnosis=fieldValues.diagnosis?"":"This field is required."
    if('treatment' in fieldValues)
        temp.treatment=fieldValues.treatment?"":"This field is required."    
    setErrors({
        ...temp
    })       
    
    if(fieldValues===values)
    return Object.values(temp).every(x => x === "" )
}

const{
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
    drugs,
    setDrugs,
    presNo,
    setPresNo,
} = UseForm(initialFormValues,true,validate)



//handing the selected drug list
const handleDrugList= e =>{

    let name="";
    drugs.map(it=>
        it.id===e.target.value[0]?
        name=it.drugName:void 0
        )
    const newDrug={
        id:e.target.value,
        drugName:name,
        quantity:0
    }

values.issuDruList.push(newDrug);

DrugSaveLocal.insertDrug(values.issuDruList);
  
    console.log(values.issuDruList);


}

const handleMultiSelect =(selectedDrug)=>{
    console.log(selectedDrug);
       console.log("issu drugs "+ values.issuDruList);

    DrugSaveLocal.insertDrug(selectedDrug);
}

const handleMultiRemove= (removedDrug)=>{
    DrugSaveLocal.insertDrug(removedDrug);
}



//handle sub,it => create a prescription and drug issuings
const handleSubmit = e =>{
    e.preventDefault();

    if(validate()){
    let presc={
    
        diagnosis:values.diagnosis,
        issuedDate:values.issuedDate,
        treatment:values.treatment,
        presStatus:false,
        student:{
            id:details.id
        }
    };

        console.log(JSON.stringify(presc));

    doctorService.createPrescription(presc).then(res=>{
        // alert("The prescription sent");
        props.history.push('/presTable');
    }).catch(error=>{
        console.log(console.error);
    }        
    )

    
}

}

const pages=[5,10,25];
const [page,setPage]=useState(0);
const [rowsPerPage,setRowsPerPage]= useState(pages[page]);
const[openPopup1,setOpenPopup1]=useState(false);
const[openPopup2,setOpenPopup2]=useState(false);
const[openPopup3,setOpenPopup3]=useState(false);
const [notify,setNotify] =useState({isOpen:false,message:'',type:''})



const handleChangePage =(e,newPage) =>{
    setPage(newPage);
}

const handleChangeRowsPerPage =e =>{
    setRowsPerPage(parseInt(e.target.value,10));
    setPage(0);
}

const recordsAfterPagingAndPaging =() =>{
    return values.issuDruList.slice(page*rowsPerPage,(page+1)*rowsPerPage)
}

const handlePresView=(id)=>{
    props.history.push(`/doctor/student/prescription/pres/${id}`);
}

const handleMedView=(id)=>{
    props.history.push(`/doctor/student/prescription/pres/${id}`);
}

const handleId =(e)=>{
    setDetails({
        ...details,
        id:e.target.value
    })
}

    return (
<>
        <div style={{display:'flex'}}>
         <Paper className={classes.pageContent}> 
            <Form onSubmit = {handleSubmit} >
                <Grid container>
                    {/* <Grid item xs={6}> */}

                        <Control.Input 
                        name="studentId"
                        // label="Student registration number"
                        value={details.id}
                        onChange={handleId}
                        error={errors.studentId}
                        
                        />

                        <Control.Input 
                        name="diagnosis"
                        label="Diagnosis"
                        value={values.diagnosis}
                        onChange={handleInputChange}
                        error={errors.diagnosis}
                        />

                        <Control.Input 
                        name="treatment"
                        label="Treatment"
                        value={values.treatment}
                        onChange={handleInputChange}
                        error={errors.treatment}
                        />

                    {/* </Grid> */}
                    {/* <Grid item xs={6}> */}
                         
                        {/* <Control.Button
                            // className={classes.newButton}
                        text="Medicals"
                        variant="outlined"
                        startIcon={<AddIcon/>}
                        onClick={()=>setOpenPopup(true)}
                        /> */}

                        
                        <div style={{padding:'10px',width:'240px',height:'80px'}}>
                        <Multiselect
                        variant="primary"
                        options={drugs}
                        onSelect={handleMultiSelect}
                        onRemove={handleMultiRemove}
                        displayValue="drugName"
                        />
                        
                        </div>

                     

                        <Control.DatePicker
                        name="issuedDate"
                        label="Date"
                        value={values.issuedDate}
                        onChange={handleInputChange}
                        />

                        <div>
                            <Control.Button
                                type="submit"
                                text="Submit"/>

                            <Control.Button
                                text="Reset"
                                color="default"
                                onClick={resetForm}/>    

                        </div>
                    
                   
                    {/* </Grid> */}

                </Grid>
             </Form>

             {/* <Toolbar>

                 <Control.Input
                    label="Search drug"
                    className={classes.searchInput}
                    InputProps={{
                        startAdornment:(<InputAdornment position="start">
                            <Search/>
                        </InputAdornment>)
                    }}
                 />
                */}

                


           {/*
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Drug Name</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Action</TableCell>
                            </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            recordsAfterPagingAndPaging().map(item=>(
                        
                                    <TableRow key={item.id}>
                                         <TableCell>{item.drugName}</TableCell>
                                    </TableRow>
                                   
                                )
                                
                            )
                        }
                    </TableBody>
                </Table>

                <TablePagination
                component="div"
                page={page}
                rowsPerPageOptions={pages}
                rowsPerPage={rowsPerPage}
                count={values.issuDruList.length}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                /> 
            */}
        
        {/* <PopUp
            openPopup={openPopup1}
            setOpenPopup={setOpenPopup1}
            title="Medical Issuing">
                    <Medicals/>
        </PopUp> */}
        <PopUp
            openPopup={openPopup2}
            setOpenPopup={setOpenPopup2}
            title="Prescriptions">
                    <PersoPres id={details.id}/>
        </PopUp>
        <PopUp
            openPopup={openPopup3}
            setOpenPopup={setOpenPopup3}
            title="Medicals">
                    <PersoMed id={details.id}/>
        </PopUp>
        </Paper>

        <Paper elevation={4} className={classes.pageContent1} style={{float:'right'}} position="absolute">
           
            <div style={{padding:'5px',display:'flex'}}>
                <FontAwesomeIcon icon={faAddressCard} size="3x" /> 
                <h2 style={{margin:'0 20px '}}>{details.firstName} {details.lastName}</h2>
            </div>
            <div style={{padding:'10px'}}>
                <Table>
                    <tr style={{padding:'15px',width:'40px'}}>
                        <td>
                            Index No:
                        </td>
                        <td>
                        {details.id}
                        </td>
                    </tr>
                    <tr style={{padding:'15px'}}>
                        <td>
                        Age:
                
                        </td>
                        <td>
                        {details.age}
                        </td>
                    </tr>
                    <tr style={{padding:'15px'}}>
                        <td>
                        Gender:
                
                        </td>
                        <td>
                        {details.gender}
                        </td>
                    </tr>
                    <tr style={{padding:'15px'}}>
                        <td>
                        Blood Group: 
                        </td>
                        <td>
                        {details.bloodGroup}
                        </td>

                    </tr>
                    <tr style={{padding:'15px'}}>
                        <td>
                        Height: 
                        </td>
                        <td>
                        {details.height}
                        </td>

                    </tr>
                    <tr style={{padding:'15px'}}>
                        <td>
                        Weight: 
                        </td>
                        <td>
                        {details.weight}
                        </td>

                    </tr>
                    <tr style={{padding:'15px'}}>
                        <td>
                            Allergies:
                        </td>
                        <td>
                            {details.allergies}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Chronic diseases:
                        </td>
                        <td>
                            {details.chronicDisease}
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
        </Paper>
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
    </>
    )
}

export default Pres;
