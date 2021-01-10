import React,{useState,useRef} from 'react'
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

import AuthService from "../services/auth.service";
import { Card } from '@material-ui/core';


const required =(value) =>{
    if(!value) {
        return(
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const Login = (props) => {

    const form = useRef();
    const checkBtn= useRef();

    const [username,setUserName]= useState("");
    const [password ,setPassword] =useState("");
    const [loading,setLoading] = useState(false);
    const [message,setMessage] = useState("");


    const onChangeUsername =(e) =>{
        const username=e.target.value;
        setUserName(username);
    };

    const onChangePassword=(e) =>{
        const password= e.target.value;
        setPassword(password)
    }

    const handleLogin = (e) =>{
        e.preventDefault();
        
        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if(checkBtn.current.context._errors.length ===0){
            AuthService.login(username,password).then(
                ()=>{
                    props.history.push("/profile");
                    window.location.reload();
                },
                (error) =>{
                    const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString();

                        setLoading(false);
                        setMessage(resMessage)
                }
            );
        }else{
            setLoading(false)
        }
    };

    return (
        <Card style={{width:'700px',margin:'150px 0 0 200px',padding:'50px',height:'350px',backgroundColor:"rgb(44,62,80,0.7)"}}>
           
            <div>
                <Form onSubmit={handleLogin} ref={form} >
                    <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <Input 
                        type="text"
                        className="form-control"
                        name="username"
                        value={username}
                        onChange={onChangeUsername}
                        validation={[required]}
                    />
                    </div>
                      
                    <div >
                    <label htmlFor="password">Password</label>
                    <Input 
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                        validation={[required]}
                    />
                    </div>
                    <br/><br/>
                    <div  > 
                        <button className="btn btn-primary btn-block" disabled={loading}> 
                            {loading &&(
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            
                            <span>Login</span>
                        </button>
                    </div>

                {
                    message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )
                }
                <CheckButton style={{ display:"none"}} ref={checkBtn}/>
                </Form>
            </div>

        </Card>
    )
}

export default Login;
