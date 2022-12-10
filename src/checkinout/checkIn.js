import React, { Component, useEffect } from "react";
import { Link } from "react-router-dom";
import GoToTop from "../GoToTop";
import { Navigate } from 'react-router-dom';
import { useSelector,connect } from "react-redux";
import MapContainer from "./MapContainer";
import CheckInOutBtn from "./CheckInOutBtn";
// import initialize from "./checkinout/checkIn"
// import $ from 'jquery';
      



class CheckIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Lat:0,
            Lng:0,
           
        }
        
    }



    componentDidMount() {
        setInterval(this.time, 1000);
       this.GetLatLng();  
        
        
       
    }
      

    
     CheckLoggedIn = () => {

        
                const {isLoggedIn}  = useSelector((state) => state.auth);
                // console.log(data)
                //  this.setState({username:data.user.username})
                if (!isLoggedIn) {
                    // console.log(user);
                    return <Navigate to="/login" />;
                }
                        
                        // console.log(user.userInfo.user.name);
         
                
          
            
        }


   
    
     time = () => {

        const span = document.getElementById('clock');
        // console.log(span);
        if(span != null){
        const d = new Date();
        const s = d.getSeconds();
        const m = d.getMinutes();
        const h = d.getHours() >= 12 ? d.getHours() - 12 : d.getHours() ;
        const ampm = d.getHours( ) >= 12 ? ' PM' : ' AM';
        
            span.textContent = 
          ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2) + ampm;
        }
        
      }


      

    //   componentDidUpdate() {
        
    //     return true;
    //   }

    GetLatLng = () => {
       
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.success, this.errorHandler);
      } else {
          console.log('html 5 not support');
      }

    }

    success = position => {
        let lat = position.coords.latitude;
        let lgn = position.coords.longitude;
        this.setState({Lat:lat,Lng:lgn});
    }

    errorHandler = (error) => {
        switch (error.code) {
            case error.TIMEOUT:
                console.log('TIMEOUT');
                break;
            case error.POSITION_UNAVAILABLE:
                console.log('POSITION_UNAVAILABLE');
                break;
            case error.PERMISSION_DENIED: //拒絕
            console.log('PERMISSION_DENIED');
                break;
            case error.UNKNOWN_ERROR:
                console.log('UNKNOWN_ERROR');
                break;
        }
    } //end errorHandler


 


    render() {

        // alert(user);


        return (
            <>  
               
                <this.CheckLoggedIn/>
                <GoToTop />
                <div id="mobilewrapper" className="none-bg">
                    <div className="nav-panel">
                        <div className="row valign-wrapper" style={{ marginBottom: 0 }}>
                            <Link to="/">
                                <img
                                    src="images/back-arrow.png"
                                    className="f-left margin-10px-lr"
                                    alt=""
                                />
                            </Link>
                            <div className="nav-title">
                                <p className="white-text">Check In/Out</p>
                            </div>
                        </div>
                    </div>
                   <MapContainer Lat={this.state.Lat} Lng={this.state.Lng} />
                    <div className="container padding-20px-bottom">
                        <div className="row">
                            <div className="col s12 center-align">
                                <h3 className="curtime" id="clock">
                                    00:00:00 AM
                                </h3>
                                <p className="checkin-date">Monday, 21 Nov 2022</p>
                                
                                <CheckInOutBtn Lat={this.state.Lat} Lng={this.state.Lng} Status={this.props.status}/>
                                <p className="red-text lighten-5">Open GPS to check in/out</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}


const mapStateToProps = (state) => {
    // console.log(state); 
    if(state.auth.isLoggedIn){
        if(state.auth.user.userInfo.todayOfficeShift !=null){
            return  {status:state.auth.user.userInfo.todayOfficeShift.time_in_status == 0 ? true :false};
        }
    }
    
    return {status:false};
	
};

export default connect(mapStateToProps)(CheckIn);;
