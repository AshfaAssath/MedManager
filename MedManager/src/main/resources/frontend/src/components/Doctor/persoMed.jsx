import React from 'react'
import { useState,useEffect } from 'react';
import doctorService from '../../services/doctor.service';
import {Card,Table} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme=>({
    root:{
        width:400,
        height:400
    }
}))

function PersoMed(props) {

        const [details,setDetails]= useState([]);

    useEffect(()=>{
        fetchData();
    },[])
    
    const fetchData =()=>{
        doctorService.getMedicalsByStudentId(props.id).then((res)=>{
            setDetails(res.data);
        })
    }
    const classes= useStyles();
    return (
        <>
            <Card elevation={3} className={classes.root}>
                <Table>
                    <tr>
                    <td>Medical Id</td>
                    <td>Issued date</td>
                    <td>No.of Days</td>
                    <td>Diagnosis</td>
                    </tr>
                {
                    details.map((med,index)=>
                    
                         <tr style={{ padding:'25px'}} key={index}>
                             <td> {med.id} </td>
                             <td>{med.datOfIssue}</td>
                             <td>{med.noOfDays}</td>
                             <td>{med.diagnosis}</td>
                        </tr>                      
                    )
                }
                </Table>
                
            </Card>
        </>
    )
}

export default PersoMed
