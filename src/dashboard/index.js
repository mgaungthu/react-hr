import React,{useEffect, useState} from "react";
import { Link } from "react-router-dom";
import GoToTop from "../GoToTop";
import {  useSelector } from "react-redux";
import { Navigate  } from 'react-router-dom';
import Loading from "../components/Loading";
import userService from "../services/user.service";


export const Dashboard = props => {

    const  {isLoggedIn,user}  = useSelector(state => state.auth);
    const [checkInTime,setcheckInTime] = useState("00:00 AM");
    const [checkOutTime,setcheckOutTime] = useState("00:00 PM");
    const [userDetail,setuserDetail] = useState({user:{
        name:"",
        avator:"",
        company_name:"",
        department:"",
    }});
    const [ShowOff,setShowOff] = useState(true);
    
    
    useEffect(() => {
        
        if(isLoggedIn) {
            userService.GetUserInfo().then(
                (response) => {
                    
                    // user.userInfo = response.data;
                    
                    setuserDetail({
                        user:{
                            name:response.data.user.name,
                            company_name:response.data.user.company.name,
                            department:response.data.user.designation.name,
                        }});

                    user.userInfo.todayOfficeShift = null;
                    if(response.data.todayOfficeShift!=null){
                       
                        setcheckInTime(response.data.todayOfficeShift.check_in_time);
                        setcheckOutTime(response.data.todayOfficeShift.check_out_time == null ? "00:00" +" PM" : response.data.todayOfficeShift.check_out_time + " PM" );
                        // console.log(response.data.todayOfficeShift)
                        user.userInfo.todayOfficeShift = response.data.todayOfficeShift;
                        localStorage.setItem("user", JSON.stringify(user));
                    }
                    
                    setShowOff(false);
                    
                  
                },
                (error) => {
                //   console.log(error)
                  
                }
            );

            

          }

          
                
                
                // console.log(user.userInfo.user.name);
    
    }, []);
    
    if(!isLoggedIn) {
        return <Navigate to="/login" />;
      }
      

	return(
        
        <>
        
        { ShowOff ? <Loading /> : null }
        <GoToTop/>
        <div id="mobilewrapper">
            <div className="row valign-wrapper padding-20px-top">
                <div className="col s10">
                <img
                    src={"/images/circled_person_female.png"}
                    className="responsive-img author"
                    alt=""
                />
                <div className="desc">
                    <h5 className="name">{userDetail.user.name}</h5>
                     <span className="dept teal-text text-lighten-5">{userDetail.user.department}</span>
                     <span className="position">{userDetail.user.company_name}</span> 
                </div>
                </div>
                <div className="col s2">
                <a href="#">
                    <img src={"images/bell.png"} className="responsive-img" alt="" />
                </a>
                </div>
            </div>
            <div className="container">
                <div className="row">
                <div className="col s12">
                    <span className="teal-text text-lighten-5">Front Office Shift A</span>
                    <p className="white-text date">Monday, 21 Nov 2022</p>
                </div>
                </div>
                <div className="row">
                <div className="col s10 offset-s1">
                    <div className="row">
                    <div className="col s6">
                        <h5 className="title1 white-text">Check In</h5>
                        <p className="checkin-time">{checkInTime}</p>
                    </div>
                    <div className="col s6">
                        <h5 className="title1 white-text">Check Out</h5>
                        <p className="checkout-time">{checkOutTime}</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                <div className="col s6">
                    <div className="front-entry z-depth-3">
                    <Link to="checkin" className="waves-effect waves-light">
                        <img
                        src="images/ic_alarm_clock.png"
                        className="responsive-img"
                        alt=""
                        />
                        <p>Check In/Out</p>
                    </Link>
                    </div>
                </div>
                <div className="col s6">
                    <div className="front-entry z-depth-3">
                    <a href="#" className="waves-effect waves-light">
                        <img
                        src="images/ic_calendar_leave.png"
                        className="responsive-img"
                        alt=""
                        />
                        <p>Leave</p>
                    </a>
                    </div>
                </div>
                <div className="col s6">
                    <div className="front-entry z-depth-3">
                    <a href="#" className="waves-effect waves-light">
                        <img
                        src="images/ic_calendar_plus.png"
                        className="responsive-img"
                        alt=""
                        />
                        <p>Attendance</p>
                    </a>
                    </div>
                </div>
                <div className="col s6">
                    <div className="front-entry z-depth-3">
                    <a href="#" className="waves-effect waves-light">
                        <img
                        src="images/ic_calendar_timeline.png"
                        className="responsive-img"
                        alt=""
                        />
                        <p>Overtime</p>
                    </a>
                    </div>
                </div>
                <div className="col s6">
                    <div className="front-entry z-depth-3">
                    <a href="#" className="waves-effect waves-light">
                        <img
                        src="images/ic_calendar_edit.png"
                        className="responsive-img"
                        alt=""
                        />
                        <p>Approval</p>
                    </a>
                    </div>
                </div>
                <div className="col s6">
                    <div className="front-entry z-depth-3">
                    <Link to="settings" className="waves-effect waves-light">
                        <img
                        src="images/ic_settings.png"
                        className="responsive-img"
                        alt=""
                        />
                        <p>Settings</p>
                    </Link>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </>

    );
};
