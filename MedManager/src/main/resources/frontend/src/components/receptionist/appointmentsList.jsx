import React, { useState,useEffect } from 'react'
import ReceptionistService from '../../services/receptionist.service';
// import SmsService from '../../services/SmsService';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import authHeader from '../../services/auth-header';
import { Table, Card, Snackbar, IconButton } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

function AppointmentsList(props) {

    const [appointments,setAppointments]=useState([]);
    const [currentPage,setCurrentPage]=useState(1);
    const [appointPerPage,setAppointPerPage]=useState(5);
    const[search,setSearch]=useState("");
    const [temp,setTemp]=useState([]);
    const [notify,setNotify] =useState({isOpen:false,message:'',type:''})
  
    const addAppointment=()=>{
        props.history.push('/receptionist/addAppoint');
    }

    const URL="http://localhost:8080/api/test/receptionist/appoint/"
    useEffect(()=>{


        setInterval(fetchData,5000);
        
    },[])
    
    const updateData = async (object,id)=>{
        try{
            let res =await axios.put(URL+id,object, {headers:authHeader() });
            // let appointmentList=res.data
            //  setAppointments(appointmentList);
            // alert('update success');
        }catch(err){
            console.log(err)
        }
        
        }

    const fetchData= ()=>{

        let toDaay= new Date();

        let toDay = toDaay.getFullYear() + '-' + (toDaay.getMonth() + 1) + '-' + toDaay.getDate();
        console.log(toDay);
        ReceptionistService.getAppointmentsByDate(toDay).then((res)=>{
            setAppointments(res.data);
        })
    }

        const checkAvali=(time,id)=>{
            let ava=false;
            let tokenid=0
            let newAppoint={};
            let d;

            ReceptionistService.getAvailableSlotsByAllocatedTime(time).then((res)=>{
               let response= res.data;
                ava= response.booked;
                tokenid=response.id;
            })
            
             ReceptionistService.getAppointmentById(id).then((app)=>{
                    d =app.data;
                    // console.log("appoint"+d.availability);
            
           if ( ava===false){     
             newAppoint={ 
                            date: d.date,
                            symptoms:d.symptoms,
                            comment: d.comment,
                            timeAllocated:  d.timeAllocated,
                            currentStatus:d.currentStatus, 
                            appointToken:tokenid,
                            availability:"Available",
                            student:{
                                id:d.student.id
                            }};

                            updateData(newAppoint,id);
                        
           }
           else{
            
             newAppoint={   
                date: d.date,
                symptoms:d.symptoms,
                comment: d.comment,
                timeAllocated:  d.timeAllocated,
                currentStatus:d.currentStatus, 
                appointToken:tokenid,
                availability:"Not Available",
                student:{
                    id:d.student.id
                }};
                updateData(newAppoint,id);
              }
            }
         
            )
            // updateData(newAppoint,id);
            // setTemp(newAppoint);
            // console.log(temp);
            // console.log(JSON.stringify(newAppoint))
            // ReceptionistService.updateAppointment(newAppoint,id).then((res)=>{
            //             alert('updated');
            // })
    }
    

   const handleQueue=(appoId,stdFac,stdAceYea,stdId,appToken,symp)=>{

        
        ReceptionistService.getAppointmentById(appoId).then((res)=>{
           let m=res.data;
        

        let x = {
            id: appoId,
            date:m.date,
            symptoms:symp,
            comment:m.comment,
            timeAllocated:m.timeAllocated,
            currentStatus:m.currentStatus,
            appointToken:m.appointToken,
            availabillity:m.availability,
            student:{
                id:stdId
            },
            entered:true
        }

       
        ReceptionistService.updateAppointment(x,appoId).then((res)=>{
            console.log('Entered')
            setNotify({
                isOpen:true,
                message:"Student entered",
                type:'success'
            })
        
        })
        })

        let y ={
                appointmentId: appoId,
                appointToken: appToken,
                faculty: stdFac,
                acedemicYear: stdAceYea,
                studentId: stdId
            }

            ReceptionistService.updateTempDetails(1,y).then((res)=>{
                console.log('updated');
            })
            console.log(JSON.stringify(y));
            props.history.push('/receptionist/appoint/'); 

        }

 const snackbarClose=(e)=>{
     setNotify({isOpen:false,message:'',type:''})
 }

    const deleteHandler=(e)=>{
        // ReceptionistService.deleteAppointment(id).then( (res)=>{
        //     this.setState({appointments:this.state.appointments.filter(appoint=>appoint.id !==id)});
        // });
        e.preventDefault();

        const data = new FormData(e.target);
        
        let msg="Sorry! Today you cannot have the appointment because of an unavoidable reason. Medical Center- UOR";
        let number=data.get('contactNumber');
        let Aid =data.get('appointId')

        let SMS={
           phoneNumber :number,
            message:msg
        }

        console.log(JSON.stringify(SMS));
        ReceptionistService.createSms(SMS).then(res=>{
            // alert("REJECTION NOTICIFACTION sent");

            setNotify({
                isOpen:true,
                message:"Appointment cancelled SMS sent",
                type:'success'
            })
        
        }).catch(error =>{
            console.log(error);
        })


        ReceptionistService.deleteAppointment(Aid).then( (res)=>{
            // this.setState({appointments:this.state.appointments.filter(appoint=>appoint.id !==Aid)});
            setAppointments(appointments.filter(appoint=>appoint.id !== Aid));
        });
        props.history.push('/receptionist/appoint/'); 
    }

    const acceptHandler =(e)=>{
        e.preventDefault();

        const data = new FormData(e.target);
        
        let appointId=data.get('appointId');
        let alloTime=data.get('consultTime');


            console.log("consult time  is =>"+data.get('consultTime'));
            console.log("contact Number is =>"+data.get('phoneNumber'));
            console.log("appointment token is =>"+ data.get('appointToken'))

           
            console.log("Appointment Id is =>"+appointId);

            ReceptionistService.getAppointmentById(data.get('appointId')).then( (res)=>{
                let appo=res.data;
                // console.log(res.data);
                let newAppoint= {
                   date:appo.date,
                   symptoms:appo.symptoms,
                   comment: appo.comment,
                   timeAllocated: appo.timeAllocated,
                   currentStatus:true, 
                   appointToken:appo.appointToken,
                   availability:appo.availability,
                   student:{
                       id:appo.student.id
                    }
                }

                
                console.log("Update appointment is =>"+JSON.stringify(newAppoint));
                        //change the status of the appointment
                    ReceptionistService.updateAppointment(newAppoint,appointId).then((res)=>{
                        // this.props.history.push('/');
                        console.log(newAppoint);
                        console.log("appointment accepted");
                       
                        setNotify({
                            isOpen:true,
                            message:"Appointment reminder has sent ",
                            type:'success'
                        })
                    
                    }).catch(error =>{
                        console.log(error);
                    })
            })
          
            //change the slot
            
                    let upTime= {
                        booked:true
                }

                ReceptionistService.updateTimeSlotAvailability(upTime,alloTime).then((res)=>{
                    console.log("allocated time updated");
                })
            
                //change in receptionist interface

                checkAvali(alloTime,appointId)

        let msg="you have an appointment today at "+ data.get('consultTime')+ " .Your Appointment Token is "+data.get('appointToken')+".  Please be on time. Medical Center- UOR";
        let number=data.get('contactNumber');

        let SMS={
           phoneNumber :number,
            message:msg
        }

        console.log(JSON.stringify(SMS));
        ReceptionistService.createSms(SMS).then(res=>{
            // alert("sms reminder sent");
        }).catch(error =>{
            console.log(error);
        })
        
    }


    const changePage = e =>{
            setCurrentPage(e.target.value);
        };
    

    const firstPage = () => {
        if(currentPage >1){
            setCurrentPage(1)
        }
    };

   const prevPage = () => {
    if(currentPage >1){
        setCurrentPage(currentPage-1)
    }
   }

   const  lastPage = () => {
        if(currentPage < Math.ceil(appointments.length /appointPerPage)) {
            setCurrentPage(Math.ceil(appointments.length / appointPerPage))
        }
    };

   const  nextPage = () => {
        if(currentPage < Math.ceil(appointments.length / appointPerPage)) {
            setCurrentPage(currentPage + 1)
        }
    };

    const searchChange = e => {
        setSearch(e.target.value)
       }

    const cancelSearch = () => {
        setSearch("")
    }


        // const {appointments,currentPage,appointPerPage,search} =this.state;
        const lastIndex = currentPage* appointPerPage;
        const firstIndex = lastIndex-appointPerPage;
        const currentAppoint = appointments.slice(firstIndex,lastIndex);
        const totalPages = Math.ceil(appointments.length /appointPerPage);

        const pageNumCss= {
            width:"45px",
            border:"1px solid #17A288",
            color:"#17A2B8",
            textAlign:"center",
            fontWeight:"bold"
        };


    return (
        <React.Fragment>
            
        <Card style={{padding:'15px',marginTop:'120px',marginLeft:'30px',marginRight:'30px'}}  elevation={4}>
               
                    <div style={{display:'flex'}}>

                    <Button variant="primary" size="sm m-2" onClick={addAppointment}>Add Appointment</Button>
                   <center> <h3 > Appointment List</h3></center>

                    </div>
                    {/* <div style={{"float":"right"}}>
                        <InputGroup size="sm">
                            <FormControl placeholder="Search" name="search" value={search} onChange={searchChange} />
                            <InputGroup.Append>
                                <Button size="sm" variant="outline-info" type="button">
                                        search
                                </Button>
                                <Button size="sm" variant="outline-info" type="button" onClick={cancelSearch}>
                                    cancel
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </div> */}

               
                    <Table style={{padding:'10px'}}>
                        <thead style={{padding:'5px',margin:'20px'}}>
                            <tr >
                                <th>Student id</th>
                                <th>Consult date</th>
                                <th>Symptoms</th>
                                <th>Comment</th>
								{/* <th>Availabilty of the time</th> */}
                                <th>Current status</th>
                                <th>Actions</th>                               
                            </tr>
                        </thead>
                        <tbody>
                                {appointments.length ===0 ? 
                                <tr align="center">
                                    <td colSpan="6">No Appointments.</td>
                                </tr>:
                                    currentAppoint.map(appointment =>
									appointment.entered==false?
                                        <tr key= {appointment.id}>
                                            <td>{appointment.student.id}</td>
                                            <td>{appointment.timeAllocated}</td>
                                            <td>{appointment.symptoms}</td>
                                            <td>{appointment.comment}</td>
                                            
                                                     {appointment.availability==null | appointment.availability==""?
                                                      checkAvali(appointment.timeAllocated,appointment.id ):
                                                      void 0 }  
													  {/*     {appointment.availability}    */}
                                            
                                            <td>{appointment.currentStatus===false?

                                                <div style={{display:'flex',flexWrap:'wraps'}}>
                                        
                                        <form onSubmit={acceptHandler}>  
                                                <input type="hidden" name="appointId" value={appointment.id} />
                                                <input type="hidden" name="appointToken" value={appointment.appointToken} />
                                                 <input type="hidden" name="contactNumber" value={appointment.student.contactNumber} />
                                                <input type="hidden" name="consultTime" value={appointment.timeAllocated} />
                                                <Button variant="secondary"  type="submit"  style={{margin:'10px'}}            >Accept</Button>
                                                
                                                </form> 

                                                <form onSubmit={deleteHandler}>  
                                                <input type="hidden" name="appointId" value={appointment.id} />
                                                 <input type="hidden" name="contactNumber" value={appointment.student.contactNumber} />
                                                <input type="hidden" name="consultTime" value={appointment.timeAllocated} />
                                                <Button variant="danger"
                                               type="submit"     style={{margin:'10px'}}           >Reject</Button>
                                                
                                                </form> 
                                                
                                               
                                                </div>:
                                                <h3>
                                                    <Button variant="success"  style={{margin:'10px'}} disabled> Accepted </Button>
                                                    {/* <span className="badge badge-success ">Accepted</span> */}
                                                </h3>
                                                
                                                }
                                            
                                            </td>
                                            <td>
											{/*  <button variant="primary" onClick={()=>editAppointment(appointment.id)}>Update</button>*/}
											<Button variant="secondary"  style={{margin:'10px'}}  onClick={()=>handleQueue(appointment.id,appointment.student.faculty,appointment.student.acedemicYear,appointment.student.id,appointment.appointToken,appointment.symptoms)}> Enter</Button>

                                            </td>
                                        </tr>:void 0
                                        ) 
                                }
                        </tbody>

                    </Table>
                
                <div>
                <div style={{float:"left",padding:'10px'}}>
                            Showing Page {currentPage} of {totalPages}
                </div>
                <div style={{float:"right",padding:'10px'}}>
                        <InputGroup size="sm">
                                <InputGroup.Prepend>

                                    <Button type="button" variant="outline-info" disabled={currentPage===1 ?true :false}
                                    onClick={firstPage}>
                                        First
                                    </Button>

                                    <Button type="button" variant="outline-info" disabled={currentPage===1 ?true :false}  onClick={prevPage}>
                                        Prev
                                    </Button>
                                </InputGroup.Prepend>
                                    <FormControl style={pageNumCss} className={"bg"} name="currentPage" value={currentPage} onChange={changePage} />
                                <InputGroup.Append>
                                <Button type="button" variant="outline-info" disabled={currentPage=== totalPages ?true :false}  onClick={nextPage}>
                                        Next
                                    </Button>
                                <Button type="button" variant="outline-info" disabled={ currentPage=== totalPages ?true :false}  onClick={lastPage}>
                                        Last
                                    </Button>
                                </InputGroup.Append>
                        </InputGroup>
                </div>
                </div>
         </Card>
         <Snackbar
        anchorOrigin={{vertical:'top',horizontal:'right'}}
            open={notify.isOpen}
            autoHideDuration={4000}
            onClose={snackbarClose}
            // action={
            //     [
            //         <IconButton
            //         key="close"
            //         arial-label="Close"
            //         color="inherit"
            //         onClick={snackbarClose}>
            //             x
            //         </IconButton>

            //     ]
            // }
        >
            <Alert severity={notify.type}>
                {notify.message}
            </Alert>
        </Snackbar>
    </React.Fragment>
    )
}

export default AppointmentsList






