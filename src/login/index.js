import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate  } from 'react-router-dom';
import { useForm } from "react-hook-form";

import { login as LoginAuth  } from "../actions/auth";


export const Login = () => {
  // let navigate = useNavigate();
  const dispatch = useDispatch();
  const {isLoggedIn} =  useSelector(state => state.auth);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  // const [loading, setLoading] = useState(false);
  // const { user } = useSelector(state => state.auth);

  const {
      register,
      handleSubmit,
      watch,
      formState: {errors}
  } = useForm();

  const onSubmit = (data) => {
    
    // console.log(data);
    // setLogged(true);

    dispatch(LoginAuth("U4116437", 123456))
        .then(() => {
          
          // navigate("/");
          // window.location.reload();
        })
        .catch(() => {
          // setLoading(false);
        });

  };


  if(isLoggedIn) {

    return <Navigate to="/" />;
  }

  


    return (
        <div id="mobilewrapper">
  <div className="container">
    <div className="row valign-wrapper padding-20px-top">
      <div className="col s12">
        <img
          src="images/logo/tm_logo_slogan_white.png"
          className="responsive-img"
          alt=""
        />
        <p className="title1 white-text center margin-20px-bottom">
          Fill below information to Log in
        </p>
        <div className="login-box z-depth-3 padding-20px-tb padding-20px-lr">
          <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <h3 className="title1 center">Login Account</h3>
                </div>
                <div className="row">
                  <input
                    {...register("email", { required: "Email Address is required" })}
                    type="email"
                    className="form-control"
                    defaultValue=""
                    autoComplete="false"
                    placeholder="Email"
                  />
                  
                    <span className="helper-text">   {errors.email && <strong>{errors.email?.message}</strong>}</span>
                  
                </div>
                <div className="row">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    autoComplete="false"
                    {...register("password",{required:true})}
                  />
                  <span className="helper-text">
                    {/* console.log(error); */}
                   {errors?.password?.type === "required" && <strong>Password is required</strong>}
                   
                  </span>
                </div>
                <div className="center">
                  <button
                    type="submit"
                    className="btn-large my-btn waves-effect waves-light"
                  >
                    Sign In
                  </button>
                </div>
              </form>
          </div>
        </div>
        <div className="center margin-30px-top">
          <div className="col-xs-8">
            <div className="checkbox icheck">
              <label>
                <input type="checkbox" name="remember" />
                <span>Remember Me</span>
              </label>
            </div>
          </div>
        </div>
        <div className="center padding-20px-tb">
          <a href="#" className="">
            I forgot my password
          </a>
        </div>
      </div>
    </div>
  </div>
 
</div>

    );
}