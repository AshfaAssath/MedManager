import React from "react";
import "./loginPage.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

import { Button } from 'react-bootstrap';

function loginPage() {

    // const handleLoginClick = e => {
    //     e.preventDefault();
    //     <Router>
    //         <App />
    //     </Router>
    // };

        return(
            <Router>
                <div className="login container-xl">
                    <form>
                        <h2 className="Topic">Sign In</h2><br/><br/>
    
                        <input type="text" name="username" placeholder="Username"/>
                        <br/><br/>
    
                        <input type="password" name="pwd" placeholder="Password"/>
                        <br/><br/><br/><br/>
                        
                        <Link to="/">
                            <input type="button" value="Log In"/>    
                        </Link>
                        <br/><br/>
    
                        <div className="container">
                            <Link to="">Reset password</Link>
                        </div>
                    </form>
                </div>
            </Router>
        );
}

export default loginPage