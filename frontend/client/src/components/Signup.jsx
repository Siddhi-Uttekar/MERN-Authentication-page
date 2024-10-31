import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Signup = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
        username: "",
      });
      const { email, password, username } = inputValue;

      const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
          ...inputValue,
          [name]: value,
        });
      };

    const handleError = (err) =>
        toast.error(err, {
          position: "bottom-left",
        });
      const handleSuccess = (msg) =>
        toast.success(msg, {
          position: "bottom-right",
        });

        const handlesubmit = async (e)=>{
            e.preventDefault();
            
            try{
                const {data} = await axios.post(
                    "http://localhost:4000/signup",
                    {...inputValue},
                    {withCredentials: true},
                )
                console.log(data);
                const{success, message} = data;
                if(success){
                    handleSuccess(message);
                    setTimeout(()=>{
                       navigate("/");
                    }, 4000);

                }else{
                    handleError(message);
                }


            }
            catch(error){
                console.log(error);
            }

            //clear value fields after
            // setInputValue({
            //     ...inputValue,
            //     email:"",
            //     password: "",
            // })
        }

  return (
    <div className="form_container">
        <h2>Signup</h2>
        <form onSubmit={handlesubmit}>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={email} placeholder="Enter your email" onChange={handleOnChange}></input>
            </div>
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" value={username} placeholder="Enter your username" onChange={handleOnChange} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={password} placeholder="Enter your password" onChange={handleOnChange} />
            </div>
            <button type="submit">Submit</button>
            <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>

        </form>
        <ToastContainer/>

    </div>
  )
};

export default Signup;
