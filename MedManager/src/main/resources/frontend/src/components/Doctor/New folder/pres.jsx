import React, { useEffect,useState} from 'react'
// import { Table,Grid,Paper, TableBody, TableCell, TableRow, TableHead, Toolbar, InputAdornment} from '@material-ui/core'
import{Grid,Paper} from '@material-ui/core'
import {UseForm,Form} from './useForm'
import { makeStyles } from '@material-ui/core/styles';
import Control from '../controls/control'
import DoctorService from '../../services/doctor.service'
// import PrescriptionService from '../../services/PrescriptionService';
import * as DrugSaveLocal from '../../services/DrugSaveLocal';

// import useTable from './useTable';
// import  TablePagination  from '@material-ui/core/TablePagination';
// import  Search from '@material-ui/icons/Search';
// import AddIcon from '@material-ui/icons/Add';
// import PopUp from './popUp';
// import DrugSaveLocal from '../../services/DrugSaveLocal';


const useStyles = makeStyles(theme=>({

    pageContent:{
        margin:theme.spacing(5),
        padding:theme.spacing(3)
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


       
//get the  drugList 
useEffect(()=>{
    fetchData();
},[])

const classes= useStyles();

//get the drugList and the number of the prescription
const fetchData =()=>{

    DoctorService.getStock().then((res) =>{
        setDrugs( res.data);
    })

    DoctorService.getPrescription().then((res)=>{
        setPresNo(res.data.length);
    })

}

//validations
const validate=(fieldValues=values)=>{
    let temp={...errors}
    if('studentId' in fieldValues)
        temp.studentId=fieldValues.studentId?"":"This field is required."
    if('diagnosis' in fieldValues)
        temp.diagnosis=fieldValues.diagnosis?"":"This field is required."
    if('treatment' in fieldValues)
        temp.treatment=fieldValues.treatment?"":"This field is required."  
    if('lastSelectedDr' in fieldValues)
        temp.lastSelectedDr=fieldValues.issuDruList.length !== 0 ? "" : "This field is required."    
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

//handle sub,it => create a prescription and drug issuings
const handleSubmit = e =>{
    e.preventDefault();

    if(validate()){
    let presc={
    
        diagnosis:values.diagnosis,
        issuedDate:values.issuedDate,
        treatment:values.treatment,
        student:{
            id:parseInt(values.studentId)
        }
    };

        console.log(JSON.stringify(presc));

    DoctorService.createPrescription(presc).then(res=>{
        alert("The prescription sent");
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
const[openPopup,setOpenPopup]=useState(false)

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

    return (
<>
         <Paper className={classes.pageContent}> 
            <Form onSubmit = {handleSubmit} >
                <Grid container>
                    <Grid item xs={6}>

                        <Control.Input 
                        name="studentId"
                        label="Student registration number"
                        value={values.studentId}
                        onChange={handleInputChange}
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

                    </Grid>
                    <Grid item xs={6}>
                        <Control.Select
                    
                        name="DrugIssuingList"
                        label="Drugs"
                        value={values.lastSelectedDr}
                        onChange={handleDrugList}
                        options={drugs}
                        error={errors.lastSelectedDr}
                        />

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
                    </Grid>
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

                <Control.Button
                className={classes.newButton}
                text="Add New"
                variant="outlined"
                startIcon={<AddIcon/>}
                onClick={()=>setOpenPopup(true)}
                />


             </Toolbar>
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
        </Paper> */}
        {/* <PopUp
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}>

        </PopUp> */}
        </Paper>
    </>
    )
}

export default Pres;
