import React from 'react'
import { useState,useEffect } from 'react';
import doctorService from '../../services/doctor.service';
import {Card,Table} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme=>({
    root:{
        width:600,
        height:400
    }
}))

function PersoPres(props) {


    const [details,setDetails]= useState([]);

    useEffect(()=>{
        fetchData();
    },[])
    
    const fetchData =()=>{
      doctorService.getPrescriptionByStudentId(props.id).then((res)=>{
          setDetails(res.data);
      })
    }

    const classes= useStyles();

    return (
        <>
        <Card elevation={3} className={classes.root}>
            <Table>
                <tr>
                <td>Prescription Id</td>
                <td>Issued date</td>
                <td>Diagnosis</td>
                <td>Treatment</td>
                </tr>
            {
                details.map((pres,index)=>
                
                     <tr style={{padding:'25px'}} key={index}>
                         <td> {pres.id} </td>
                         <td>{pres.issuedDate}</td>
                         <td>{pres.diagnosis}</td>
                         <td>{pres.treatment}</td>
                    </tr>                      
                )
            }
            </Table>
        </Card>
    </>
    )
}

export default PersoPres
