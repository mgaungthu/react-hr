import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate  } from 'react-router-dom';
import { logout  } from "../actions/auth";


export const Setting = () => {

    const dispatch = useDispatch();
    let navigate = useNavigate();


    const LeaveOut = () => {
        // alert("ok");
        dispatch(logout());
        navigate("/login");
    }
    

    return(
       <>
        <div id="mobilewrapper" className="none-bg">
    <div className="nav-panel">
        <div className="row valign-wrapper" style={{"marginBottom": "0px"}}>
             <Link to="/">
                <img src="/images/back-arrow.png" className="f-left margin-10px-lr" alt=""/>
            </Link>
            <div className="nav-title">
                <p className="white-text">Settings</p>
            </div>
        </div>

    </div>
    <div className="attendance-box z-depth-2">
        <div className="row">
            <ul className="collection">
   
                <li className="collection-item">
                    <div className="lime-text" > <a href="#" onClick={LeaveOut}>Logout</a></div>
                </li>
          
            </ul>
        </div>
    </div>
</div>
       </>
    )
};
