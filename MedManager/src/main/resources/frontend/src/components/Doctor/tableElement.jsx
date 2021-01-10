import React, { useEffect, useState } from 'react';
import SmsService from '../../services/SmsService';
import DoctorService from '../../services/doctor.service';


import { makeStyles } from '@material-ui/core/styles';
import {Table,TableHead,TableBody,TableCell,Toolbar,InputAdornment,TableRow,Paper,Button,TextField,FormControl} from '@material-ui/core';
// import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import{CloseIcon} from '@material-ui/icons/Close';
import Input from '@material-ui/core/Input';
import TablePagination from '@material-ui/core/TablePagination';
// import {Search,AddIcon} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search'
// import {createMuiTheme} from '@material-ui/core/styles';
// import grey from '@material-ui/core/colors/grey';




// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: grey[600],
//     },
//     secondary: {
//       main: '#f44336',
//     },
//   },
// });

const useStyles = makeStyles(theme=>({
  table: {
    marginTop: theme.spacing(3),
    '& thead th': {
        fontWeight:'600',
        color: theme.palette.primary.main,
        backgroundColor:  theme.palette.primary.light,

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
    searchInput:{
        width:'50%'
    }
  }
));




function TableElement () {

  
    const[appointments,setAppointments] =useState([]);
    const[currentPage,setCurrentPage]=useState(0);
    const[pages]=[4,10,15]
    const[appointPerPage,setAppointPerPage]=useState(pages[currentPage]);
    const[searchText,setSearchText]=useState("");
        
//   addAppointment= ()=>{
//         this.props.history.push('/addAppoint');
//     }

useEffect(()=>{
    DoctorService.getAppointments().then((res) =>{
        setAppointments(res.data);
    });
},[])

const searchChange = e => {
  this.setState({
      [e.target.name]: e.target.value
  })
}

const cancelSearch = () => {
  this.setState({search:""})
}

 const  editAppointment=(id)=>{
        this.props.history.push(`/updateAppoint/${id}`);
    }


  const  deleteHandler=(id)=>{
        DoctorService.deleteAppointment(id).then( (res)=>{
            setAppointments(appointments.filter(appoint=>appoint.id !==id));
        });
    }

 const  reminderHandler =(e)=>{
        e.preventDefault();

        const data = new FormData(e.target);


            console.log("email is =>"+data.get('consultTime'));
            console.log("contact Number is =>"+data.get('phoneNumber'));

        let msg="you have an appointment today at "+ data.get('consultTime')+ "  please be on time.";
        let number=data.get('contactNumber');

        let SMS={
           phoneNumber :number,
            message:msg
        }

        console.log(JSON.stringify(SMS));
        SmsService.createSms(SMS).then(res=>{
            alert("sms reminder sent");
        }).catch(error =>{
            console.log(error);
        })

        
    }
    

    const handleChangePage = (event, newPage) => {
      setCurrentPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
     setAppointPerPage(parseInt(event.target.value, 5));
      setCurrentPage(0);
    };
  
    const recordafterPaging=()=>{
        return appointments.slice(currentPage*appointPerPage,(currentPage+1)*appointPerPage)
    }  

 
     const classes = useStyles();
  

  return (
    <div>
      <Paper  className={classes.pageContent}></Paper>
          <Toolbar>
                       
            <TextField style={{margin:5}}
                variant='outlined'
                label='Search '
                className={classes.searchInput}
                value={searchText}
                InputProps={{
                endAdornment: (<InputAdornment position='start'>
                     <IconButton  style={{padding:10,left:10}}>
                     <SearchIcon />
                    </IconButton>

                    <IconButton  onClick={cancelSearch} style={{padding:10,left:10}}>
                    <CloseIcon fontsize='small'/>
                    </IconButton>
                    </InputAdornment>)
                }}
                onChange={searchChange}
           
            />
           
        </Toolbar>

            <Button
               style={{margin:10,right:5,position: 'absolute', top: 130}}     
                variant='contained'
                size='large'
                
              >
                  Create Appointment
            </Button>

    
      <Table className={classes.table} >
        <TableHead>
          <TableRow>
            <TableCell >Student Id</TableCell>
            <TableCell >Consult date/time</TableCell>
            <TableCell >Symptoms</TableCell>
            <TableCell >Comment</TableCell>
            <TableCell >Current Status</TableCell>
            <TableCell >Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recordafterPaging().map((appoint) => (
            <TableRow key={appoint.id}>
              <TableCell component="th" scope="row">
                {appoint.student.id}
              </TableCell>
              <TableCell >{appoint.consultTime}</TableCell>
              <TableCell >{appoint.symptoms}</TableCell>
              <TableCell >{appoint.comment}</TableCell>
              <TableCell >
              <Button >Accept</Button>
              <Button  onClick={()=>deleteHandler(appoint.id)}>Reject</Button>
              </TableCell>
              <TableCell >
              <Button onClick={()=>editAppointment(appoint.id)}>Update</Button>

<FormControl onSubmit={reminderHandler}>  
<Input type="hidden" name="contactNumber" value={appoint.student.contactNumber} />
<Input type="hidden" name="consultTime" value={appoint.consultTime} />
<Button type="submit">Reminder</Button>

</FormControl> 
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* <div style={{"float":"right"}}>
                            <InputGroup >
                                    <InputGroup.Prepend>

                                        <Button type="button"  disabled={currentPage===1 ?true :false}
                                        onClick={firstPage}>
                                            First
                                        </Button>

                                        <Button type="button"  disabled={currentPage===1 ?true :false}  onClick={prevPage}>
                                            Prev
                                        </Button>
                                    </InputGroup.Prepend>
                                        <FormControl style={pageNumCss}  name="currentPage" value={currentPage} onChange={changePage} />
                                    <InputGroup.Append>
                                    <Button type="button" disabled={currentPage=== totalPages ?true :false}  onClick={nextPage}>
                                            Next
                                        </Button>
                                    <Button type="button" disabled={ currentPage=== totalPages ?true :false}  onClick={lastPage}>
                                            Last
                                        </Button>
                                    </InputGroup.Append>
                            </InputGroup>
                    </div> */}

        <TablePagination
                component="div"
                count={appointments.length}
                page={currentPage}
                onChangePage={handleChangePage}
                rowsPerPage={appointPerPage}
                rowsPerPageOptions={pages}
                onChangeRowsPerPage={handleChangeRowsPerPage}
         />

    
    </div>
  )
    }

    export default TableElement;

 
    

