import React, { PureComponent } from 'react';
import ReceptionistService from '../../services/receptionist.service';

class UpdateAppointment extends PureComponent {
    
    constructor(props) {
        super(props)

        this.state = {
            id:this.props.match.params.id,
            date:"",
            symptoms:"",
            comment:"",
            consultTime:"",
            student:{
                id:""
                }
            }
            
    }

    componentDidMount(){
        const timestamp = new Date().toLocaleString();
        this.setState({date:timestamp});
        
        ReceptionistService.getAppointmentById(this.state.id).then( (res)=>{
            let appointment=res.data;
            console.log(res.data);
            this.setState({
               date:appointment.date,
               symptoms:appointment.symptoms,
               comment: appointment.comment,
               consultTime: appointment.consultTime,
               currentStatus:appointment.currentStatus, 
               student:{
                   id:appointment.student.id
                }
            })
        })
    }

    updateAppointment=(e)=>{
        e.preventDefault();

        let appointment={
               date: "2020-11-12",
               symptoms: this.state.symptoms,
               comment: this.state.comment,
               consultTime:  "2020-11-12",
               currentStatus: this.state.currentStatus, 
               student:{
                   id:this.state.student.id
                }};
        console.log('appointment =>' +JSON.stringify(appointment));

    
        ReceptionistService.updateAppointment(appointment,this.state.id).then((res)=>{
            this.props.history.push('/receptionist/appoint/');
        });
    }

    cancelAppointment=()=>{
        this.props.history.push('/');
    }

    studentIdHandler=(e)=>{
        const sid= parseInt(e.target.value)
        this.setState({student:{id:sid}});
    }

    symptomsHandler=(e)=>{
        this.setState({symptoms:e.target.value});
    }

    consultTimeHandler=(e)=>{
        this.setState({consultTime:e.target.value});
    }

    commentHandler=(e)=>{
        this.setState({comment:e.target.value});
    }

    render() {
        return (
           <div >
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3 ">
                            <h3 className="text-center">Update Appointment</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Student Id :</label>
                                        <input placeholder="Student Id" name="studentId" className="form-control" value={this.state.student.id} onChange={this.studentIdHandler} disabled/>
                                    </div>
                                    <div className="form-group">
                                        <label>Symptoms :</label>
                                        <input placeholder="Symptoms" name="symptoms" className="form-control" value={this.state.symptoms} onChange={this.symptomsHandler} disabled/>
                                    </div>
                                    <div className="form-group">
                                        <label>Comments :</label>
                                        <input placeholder="Comment" name="comment" className="form-control" value={this.state.comment} onChange={this.commentHandler} disabled/>
                                    </div>
                                    <div className="form-group">
                                        <label>Consult time :</label>
                                        <input type="date" placeholder="Consult time" name="consultTime" className="form-control" value={this.state.consultTime} onChange={this.consultTimeHandler} />
                                    </div>
                                    <button className="btn btn-success" onClick={this.updateAppointment}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancelAppointment} style={{marginLeft:"10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
        )
    }
}

export default UpdateAppointment;