import axios from "axios";
import userService from "./user.service";

const API_URL = "http://127.0.0.1:8000/api/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      "employee_id":username,
      "password":password,
    })
    .then((response) => {

      let user = response.data;
      // let addedData = {user,...addedUsername};
      user.username = username;
      
      // console.log(user);
      if (response.data.access_token) {
        localStorage.setItem("user", JSON.stringify(user));
        userService.GetUserInfo().then(
          (response) => {
              // user.todayOfficeShift = response.data.todayOfficeShift;
              // setcheckInTime(response.data.todayOfficeShift.check_in_time+ " AM");
              // setcheckOutTime(response.data.todayOfficeShift.check_out_time == null ? "00:00" +" PM" : response.data.todayOfficeShift.check_out_time + " PM" );
              // localStorage.setItem("user", JSON.stringify(user));
              // console.log(response);
              user.userInfo = response.data
              localStorage.setItem("user", JSON.stringify(user));
          },
          (error) => {
            console.log(error);
            
          }
      )
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
