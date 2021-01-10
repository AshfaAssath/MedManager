import React, {useEffect, useState} from 'react'
import * as DrugSaveLocal from '../../services/DrugSaveLocal';
import DoctorService from '../../services/doctor.service';
// import DrugIssuingService from '../../services/DrugIssuingService';
import Pres from './pres';
import Control from '../controls/control'
import {Snackbar} from '@material-ui/core'
import{ Alert} from '@material-ui/lab';

import {Input,Select,MenuItem, FormControl,TextField, InputLabel} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Table,Grid,Paper, TableBody, TableCell, TableRow, TableHead, Toolbar, InputAdornment,Button} from '@material-ui/core'
import  TablePagination  from '@material-ui/core/TablePagination';
import  Search from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import PopUp from './popUp';
//  import Select from './../controls/select';
import { dosage } from './../../services/DrugSaveLocal';


const useStyles = makeStyles(theme=>({

    pageContent:{
        marginTop:150,
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
        // position:'absolute',
        marginTop:10,
        right:'10px'
    }
}))



function PrescrMain(props) {

const classes=useStyles();

    
    const[issuDruList,setIssuDruList]=useState(DrugSaveLocal.getAllDrugs());
    // const[filterDr,setFilterDr] =useState([]);
    const pages=[5,10,25];
    const [page,setPage]=useState(0);
    const [rowsPerPage,setRowsPerPage]= useState(pages[page]);
    const[openPopup,setOpenPopup]=useState(false)
    const [num,setNum]=useState([]);
    const[numOfPres,setNumOfPres]=useState(0);
    const [dosageList,setDosageList]=useState(DrugSaveLocal.dosage);
    const [notify,setNotify] =useState({isOpen:false,message:'',type:''})
    // const[afterPaging,setAfterPaging]=useState([]);
    const handleChangePage =(e,newPage) =>{
        setPage(newPage);
    }
    
    const handleChangeRowsPerPage =e =>{
        setRowsPerPage(parseInt(e.target.value,10));
        setPage(0);
    }
    
    const recordsAfterPagingAndPaging =() =>{
      return issuDruList.slice(page*rowsPerPage,(page+1)*rowsPerPage);
    }
    
    useEffect(()=>{
        fetchData();
        
    },[])
    
    const fetchData =()=>{
        DoctorService.getPrescription().then((res)=>{
        //    console.log(res.data);
         const numberId= res.data[res.data.length-1].id;
        setNumOfPres(numberId);
            console.log("id is "+numOfPres);

        })

    }

    const handleChangeInput =(id,event)=>{       
       let i;
       const nameA= event.target.name;
        const valueA= event.target.value;

        for( i=0;i<issuDruList.length;i++){
        
           if(issuDruList[i].id==id)
           {
        
                issuDruList[i][nameA]=valueA;
            //    console.log(issuDruList[i]);       
           }
       }
    }
       
   
    const handleSubmit =(e)=>{
        e.preventDefault();
        console.log("this is aftre submission"+ JSON.stringify(issuDruList));

        issuDruList.map((dru,no)=>{
/*
            const newDrug={
                drug:{
                    drugCode:dru.id,
                },
                dosage:dru.dosage,
                description:dru.description,
                quantity:parseInt(dru.qty),
                prescription:{
                    id:numOfPres
                },
               
            }
    */ 
   console.log(num);       
   const newDrug={
    drug:{
        drugCode:issuDruList[no].drugCode,
    },
    dosage:dru.dosage,
    description:dru.description,
    quantity:parseInt(dru.qty),
    prescription:{
        id:numOfPres
    },
   
}
           
        

            DoctorService.createDrugIssuing(newDrug).then(res=>{
                    // alert('sent');
                    // props.history.push('/presTable');
                }).catch(error=>{
                    console.log(console.error);
                }        
                )
                // alert("The drug successfully added ");
                setNotify({
                    isOpen:true,
                    message:"Prescription has sent to the pharmacist",
                    type:'success'
                })
                console.log("prescription sent");
            // props.history.push('/home');

        
            }
        )
      
        }

    // const handleDrugForm =item=>{
    //    DoctorService.getPrescription().then(res=>
    //        setNum(res.data)
    //    );
    //     console.log("num of pres is"+num.length);
    //  const  newDrug={
    //        stock:{
    //            id:2
    //        },
    //        dosage:"1-0-1",
    //        quantity:6,
    //        prescription:{
    //            id:num.length
    //        }
    // }
    // console.log("the new drug"+JSON.stringify(newDrug));
    
    
    // DoctorService.createDrugIssuing(newDrug).then(res=>{
    //     alert("The drug successfully added ");
    //     // props.history.push('/presTable');
    // }).catch(error=>{
    //     console.log(console.error);
    // }        
    // )

    //    }
    
    //  {recordsAfterPagingAndPaging();}
    return (
        
        <>

    <Paper className={classes.pageContent}>
          
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


             </Toolbar> */}
                
                {/* <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Drug Name</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Dosage</TableCell>
                            <TableCell>Action</TableCell>
                            </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            recordsAfterPagingAndPaging().map((item,id)=>(
                                // <form onSubmit={handleDrugForm}>
                                    <TableRow key={id}>
                                       
                                         <TableCell>{item.drugName}</TableCell>
                                         <TableCell>
                                             <Input 
                                            
                                              name="quantity"
                                              label="Quantity"
                                            
                                             />
                                         </TableCell>
                                        <TableCell>
                                           <FormControl > 
                                            <Select 
                                            name="Dosage"
                                            label="Dosage"
                                            >
                                                <MenuItem value="1-1-1">1-1-1</MenuItem>
                                               <MenuItem value= "1-0-1">1-0-1</MenuItem>
                                               <MenuItem value="0-0-1">0-0-1</MenuItem>
                                               <MenuItem value= "0-1-1">0-1-1</MenuItem>
                                                <MenuItem value="1-0-0">1-0-0</MenuItem>
                                            </Select>
                                        </FormControl>
                                            
                                        </TableCell>
                                         <TableCell> <Button color="primary" variant="outlined"  onClick={()=>{handleDrugForm(item)}}>Send</Button></TableCell>
                                        
                                    </TableRow>
                                    // </form>
                                   
                                )
                                
                            )
                        }
                    </TableBody>
                </Table> */}

                <form onSubmit={handleSubmit}>
                    {
                        
                        recordsAfterPagingAndPaging().map((item)=>(
		 
                            <div key= {item.id}>
                                    <TextField
                                        name="drugName"
                                        label="Drug Name"
                                        variant="filled"
                                        value={item.drugName}
                                        onChange={event=>handleChangeInput(item.id,event)}
                                        disabled
                                    />

                                    <TextField
                                        name="qty"
                                        label="Quantity"
                                        variant="filled"
                                        placeholder="0"
                                        value={item.qty}
                                        onChange={event=>handleChangeInput(item.id,event)}
                                    />

                                    <TextField
                                        name="description"
                                        label="Description"
                                        variant="filled"
                                        placeholder="Before/After meals"
                                        value={item.description}
                                        onChange={event=>handleChangeInput(item.id,event)}
                                    />
{/* 
                                    <FormControl>
                                        <InputLabel id="demo-simple-select-filled-label">Dosage</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-filled-label"
                                            id="demo-simple-select-filled"
                                            value={item.dosage}
                                            onChange={event=>handleChangeInput(item.id,event)}
                                            name="dosage"
                                        >
                                            {
                                                dosageList.map((dosage,index)=>(
                                                    <MenuItem key={index} value={dosage} >{dosage}</MenuItem>
                                                ))
                                            }

                                        </Select>
                                    </FormControl> */}
				

                                    <TextField
                                        name="dosage"
                                        label="Dosage"
                                        variant="filled"
                                        placeholder="1-1-1"
                                        value={item.dosage}
                                        onChange={event=>handleChangeInput(item.id,event)}
                                    />
                            </div>
                        ))
                    }
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Send
                    </Button>
                </form>

                <TablePagination
                component="div"
                page={page}
                rowsPerPageOptions={pages}
                rowsPerPage={rowsPerPage}
                count={issuDruList.length}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                />
        </Paper>
        <PopUp
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}>
                <Pres />
        </PopUp>
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
export default PrescrMain;
