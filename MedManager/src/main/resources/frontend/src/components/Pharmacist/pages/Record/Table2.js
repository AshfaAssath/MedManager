import React,{useState} from 'react'
import {Select,InputLabel,MenuItem,FormControl,Paper,TextField,makeStyles, TableBody, TableRow, TableCell,Toolbar, InputAdornment,TableHead,Table,Button} from '@material-ui/core'
import {Search,AddIcon} from '@material-ui/icons';
import Re2 from './Re2'
import Popup from '../../Component/Popup';
import axios from 'axios';
import { MuiPickersUtilsProvider,KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'

const useStyles=makeStyles(theme=>({
    table: {
        marginTop: theme.spacing(3),
        '& thead th': {
            fontWeight:'600',
            color: '#b71c1c',
            backgroundColor: '#FEF2D1', 
            //theme.palette.primary.light,

        },
        '&  tbody td': { 
            fontWeight:'300',
        },

        '& tbody tr:hover':{
            backgroundColor: '£fffbf2',
            cursor:'pointer',
        },
    },
    pageContent:{
        
        width:'85%',
        margin:theme.spacing(5),
        padding:theme.spacing(3)

    },

    }
))
export default function Table2(props) {

    const [openPopup,setOpenPopup]=useState(false);
    const classes=useStyles();
   // const{datee,title}= props;
    return (
        <div>
            <h5 style={{left:500}}>Daily Report</h5>
           
        <Table className={classes.table} size='small'>
            <TableHead >
                <TableRow>
                <TableCell>Report Id</TableCell>
                <TableCell>Date</TableCell>
               
                <TableCell>Report</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                <TableCell>1</TableCell>
                <TableCell>02/08/2020</TableCell>
                <TableCell>
                            <Button color='primary'
                                   onClick={()=>setOpenPopup(true )}
                                    >
                           
                                View

                            </Button>
                 </TableCell>

                </TableRow>
            </TableBody>
            </Table>
           

            
            <Popup
               // title={'Reports'}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}>
                     <Re2 ></Re2>

            </Popup>
            
            
        </div>
    )
}

