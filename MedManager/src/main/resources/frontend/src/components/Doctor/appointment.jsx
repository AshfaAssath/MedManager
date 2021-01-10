import React, { Component } from 'react';
import DoctorService from '../../services/doctor.service';
import {Card, FormControl, InputGroup, Table,Button } from 'react-bootstrap';


class Appointment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            appointments:[],
            currentPage:1,
            appointPerPage:5,
            search:""
        }

       
    }

   
    componentDidMount(){
        DoctorService.getAppointments().then((res) =>{
            this.setState({appointments:res.data});
            console.log(res.data);
        });
    }



    changePage = event =>{
        this.setState({
            [event.target.name]:parseInt(event.target.value)
        });
    };

    firstPage = () => {
        if(this.state.currentPage >1){
            this.setState({
                currentPage:1
            })
        }
    };

   prevPage = () => {
    if(this.state.currentPage >1){
        this.setState({
            currentPage:this.state.currentPage-1
        })
    }
   }

    lastPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.appointments.length / this.state.appointPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.appointments.length / this.state.appointPerPage)
            })
        }
    };

    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.appointments.length / this.state.appointPerPage)) {
            this.setState({
                currentPage:this.state.currentPage + 1
            })
        }
    };

    searchChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    cancelSearch = () => {
        this.setState({search:""})
    }

    render() {

        const {appointments,currentPage,appointPerPage,search} =this.state;
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
            {/* <NavBar/> */}
            <Card style={{margin:'120px 0 0 50px', width:'900px'}}>
                    <Card.Header>
                        <div style={{"float": "left"}}>
                        <span style={{fontSize:"20px",fontWeight:"bold",color:'red'}}> Appointment List</span>

                        </div>
                        {/* <div style={{"float":"right"}}>
                            <InputGroup size="sm">
                                <FormControl placeholder="Search" name="search" value={search} onChange={this.searchChange} />
                                <InputGroup.Append>
                                    <Button size="sm" variant="outline-info" type="button">
                                            search
                                    </Button>
                                    <Button size="sm" variant="outline-info" type="button" onClick={this.cancelSearch}>
                                        cancel
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </div> */}

                    </Card.Header>
                
                    
                    <Card.Body>
                        
                        <Card.Title  className="text-center">
                        
                        </Card.Title>
                        <Table 
                        table bordered hover striped >
                            <thead>
                                <tr>
                                    <th>Student id</th>
                                    <th>Consult date</th>
                                    <th>Symptoms</th>
                                    <th>Comment</th>
                                                           
                                </tr>
                            </thead>
                            <tbody>
                                    {appointments.length ===0 ? 
                                    <tr align="center">
                                        <td colSpan="6">No Appointments.</td>
                                    </tr>:
                                        currentAppoint.map((appointment) =>
                                                appointment.currentStatus ===true ?
                                            <tr key= {appointment.id}>
                                                <td>{appointment.student.id}</td>
                                                <td>{appointment.timeAllocated}</td>
                                                <td>{appointment.symptoms}</td>
                                                <td>{appointment.comment}</td>
                                                
                                                
                                            </tr>:void 0
                                           
                                    )}
                                
                            </tbody>

                        </Table>
                    </Card.Body>
                <Card.Footer>
                    <div style={{"float":"left"}}>
                                Showing Page {currentPage} of {totalPages}
                    </div>
                    <div style={{"float":"right"}}>
                            <InputGroup size="sm">
                                    <InputGroup.Prepend>

                                        <Button type="button" variant="outline-info" disabled={currentPage===1 ?true :false}
                                        onClick={this.firstPage}>
                                            First
                                        </Button>

                                        <Button type="button" variant="outline-info" disabled={currentPage===1 ?true :false}  onClick={this.prevPage}>
                                            Prev
                                        </Button>
                                    </InputGroup.Prepend>
                                        <FormControl style={pageNumCss} className={"bg"} name="currentPage" value={currentPage} onChange={this.changePage} />
                                    <InputGroup.Append>
                                    <Button type="button" variant="outline-info" disabled={currentPage=== totalPages ?true :false}  onClick={this.nextPage}>
                                            Next
                                        </Button>
                                    <Button type="button" variant="outline-info" disabled={ currentPage=== totalPages ?true :false}  onClick={this.lastPage}>
                                            Last
                                        </Button>
                                    </InputGroup.Append>
                            </InputGroup>
                    </div>
                </Card.Footer>
             </Card>
        </React.Fragment>
        )
    }
}
 
export default Appointment;
