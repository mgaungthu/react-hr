import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userService from "../services/user.service";
import { useNavigate  } from 'react-router-dom';

const CheckInOutBtn = (props) => {

    const { isLoggedIn,user } = useSelector((state) => state.auth);
    const [checkStatus,setcheckStatus] = useState(props.Status);
    let navigate = useNavigate();
    console.log(props.Status);


    useEffect(() => {
        
        // if(isLoggedIn) {
        //      setcheckStatus(user.userInfo.todayOfficeShift != null && user.userInfo.todayOfficeShift.time_in_status == 1 ? true : false);
        //     // console.log(user.userInfo.todayOfficeShift != null && user.userInfo.todayOfficeShift.time_in_status);
        //   }
                
                
                // console.log(user.userInfo.user.name);
    
    }, []);

    const CheckedIn = (e) => {
        const file = e.target.files[0];
        const Lat = props.Lat;
        const Lng = props.Lng;
        // console.log(user.username);
        

        if (file) {
            userService.uploadCheckInOutImage(file, user.username, Lat, Lng,'check-in').then(
                (data) => {
                    if (data.status) {
                        // console.log(user);
                        if (data.status) {
                            user.checkIn = true;
                            localStorage.setItem("user", JSON.stringify(user));
                            navigate("/");
                            // window.location.reload();
                        }

                    }
                }
            );
        }
    }


    const CheckedOut = (e) => {
        const file = e.target.files[0];
        const Lat = props.Lat;
        const Lng = props.Lng;
        // console.log(user.username);

        if (file) {
            userService.uploadCheckInOutImage(file, user.username, Lat, Lng,'check-out').then(
                (data) => {
                    if (data.status) {
                        // console.log(user);
                        if (data.status) {
                            user.checkIn = true;
                            localStorage.setItem("user", JSON.stringify(user));
                            navigate("/");
                            // window.location.reload();
                        }

                    }
                }
            );
        }
    }



    if (!checkStatus) {
        return (
            <>
                <p className="checkin-text">
                    <i className="material-icons dp48 blue-text darken-4">date_range</i>
                    Front Office Shift A
                </p>
                <div className="check-btn margin-30px-tb waves-effect waves-light" id="check-btn">
                    <img src="images/cursor.png" alt="" />
                    <p> Check In </p>
                    <input type="file" onChange={e => { CheckedIn(e) }} id="checkin_image" style={{ padding: "1000px", position: "relative", top: "-171px" }} accept="image/*" capture="user" name="checkin_image" />
                </div>
            </>
        )
    }
    else {

        return (
            <>
                <p className="checkin-text">
                    <i className="material-icons dp48 blue-text darken-4">date_range</i>
                    Front Office Shift B
                </p>
                <div className="check-btn margin-30px-tb waves-effect waves-light" id="check-btn" style={{background:"#87AB5A"}}>
                    <img src="images/cursor.png" alt="" />
                    <p> Check Out </p>
                    <input type="file" onChange={e => { CheckedOut(e) }} id="checkin_image" style={{ padding: "1000px", position: "relative", top: "-171px" }} accept="image/*" capture="user" name="checkin_image" />
                </div>
            </>
        )

    }



}



export default CheckInOutBtn;