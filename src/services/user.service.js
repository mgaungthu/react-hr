import { wait } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://127.0.0.1:8000/api/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};
// authHeader() , 
const uploadCheckInOutImage = async (file,username,Lat,Lng,InOrOut) => {

  const access_token = authHeader();

  // console.log(access_token.Authorization);
  const config = {
      headers: {
        "Accept":"application/json",
        "Authorization":access_token.Authorization,
        "Content-Type": "multipart/form-data",
			}
  }

        const d = new Date();
        const m = d.getMinutes();
        const h = d.getHours() >= 12 ? d.getHours() - 12 : d.getHours() ;
        const ampm = d.getHours( ) >= 12 ? ' PM' : ' AM';
        let datalist = [];
        let today = new Date(),
        curDate = today.getFullYear() + '-' +  ("0" + (today.getMonth() + 1)).substr(-2) + '-' + ("0" + today.getDate()).substr(-2);
  console.log(curDate);
 
  if(InOrOut == "check-in") {
     datalist = {
      "employee_id":username,
      "type":InOrOut,
      "date":curDate,
      "checkIntime":("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ampm,
      "checkOuttime": "-",
      "latitude": Lat,
      "longitude":Lng,
      "in_image":file,
      "out_image":"-",
    }
  }else {
    


     datalist = {
      "employee_id":username,
      "type":InOrOut,
      "date":curDate, //    time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
      "checkIntime":'-',
      "checkOuttime": ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2),
      "latitude": Lat,
      "longitude":Lng,
      "in_image":file,
      "out_image":"-",
    }

  }

  // console.log(datalist);

  const response = await axios.post(API_URL + "user/attendance", datalist, config);
  return response.data;
};


const GetUserInfo = async () => {
       return await axios.post(API_URL + "user/get_user_info",null ,{ headers: authHeader() }); 
};

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  uploadCheckInOutImage,
  GetUserInfo
};