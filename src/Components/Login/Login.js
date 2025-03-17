import React, { useState, useContext } from 'react'
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

export default function Login() {
    // redirect
    const navigate = useNavigate();
    // form handel inputs
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const [errorMsg, setErrorMsg] = useState('');
    // form handel inputs
    const handleInputs = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    // login form submit
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!loginData.email || !loginData.password) {
            setErrorMsg('Email and password are required.');
            return
        }
        try {
            const response = await axios.post(process.env.REACT_APP_API_URL + '/auth/login/', loginData);
            if (response.data.success) {
                localStorage.setItem('token', response.data.jwToken);
                localStorage.setItem('user', JSON.stringify(response.data.user));

                navigate('/dashboard');
                console.log(response.data);
            }
            else {
                setErrorMsg(response.data.message);
                // console.log("response.data");
            }


        }
        catch (error) {
            if (error.response) {
                setErrorMsg(error.response.data.message);
            } else {
                // console.log(error.message);
            }
        }

    }

    return (
        <div>
            <div className="main-wrapper">
                <div className="container-fuild">
                    <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
                        <div className="row">
                            <div className="col-lg-5">
                                <div className="login-background position-relative d-lg-flex align-items-center justify-content-center d-none flex-wrap vh-100">
                                    <div className="bg-overlay-img">
                                        <img src="assets/img/bg/bg-01.png" className="bg-1" alt="Img" />
                                        <img src="assets/img/bg/bg-02.png" className="bg-2" alt="Img" />
                                        <img src="assets/img/bg/bg-03.png" className="bg-3" alt="Img" />
                                    </div>
                                    <div className="authentication-card w-100">
                                        <div className="authen-overlay-item border w-100">
                                            <h1 className="text-white display-1">
                                                Empowering people <br /> through seamless HR <br />{" "}
                                                management.
                                            </h1>
                                            <div className="my-4 mx-auto authen-overlay-img">
                                                <img src="assets/img/bg/authentication-bg-01.png" alt="Img" />
                                            </div>
                                            <div>
                                                <p className="text-white fs-20 fw-semibold text-center">
                                                    Efficiently manage your workforce, streamline <br />{" "}
                                                    operations effortlessly.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7 col-md-12 col-sm-12">
                                <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap">
                                    <div className="col-md-7 mx-auto vh-100">

                                        <form className="vh-100" onSubmit={handleLogin}>
                                            <div className="vh-100 d-flex flex-column justify-content-between p-4 pb-0">
                                                <div className=" mx-auto mb-5 text-center">
                                                    <img
                                                        src="assets/img/logo.svg"
                                                        className="img-fluid"
                                                        alt="Logo"
                                                    />
                                                </div>
                                                <div className="">
                                                    <div className="text-center mb-3">
                                                        <h2 className="mb-2">Sign In</h2>
                                                        <p className="mb-0">
                                                            Please enter your details to sign in
                                                        </p>
                                                    </div>
                                                    {errorMsg && (<div className="alert alert-primary" role="alert">
                                                        {errorMsg}
                                                    </div>)}

                                                    <div className="mb-3">
                                                        <label className="form-label">Email Address</label>
                                                        <div className="input-group">
                                                            <input
                                                                type="text"
                                                                name="email"
                                                                // onChange={(e) => setEmail(e.target.value)}
                                                                onChange={handleInputs}
                                                                value={loginData.email}
                                                                className="form-control border-end-0"
                                                            />
                                                            <span className="input-group-text border-start-0">
                                                                <i className="ti ti-mail" />
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Password</label>
                                                        <div className="pass-group">
                                                            <input
                                                                type="password"
                                                                name="password"
                                                                // onChange={(e) => setPass(e.target.value)}
                                                                onChange={handleInputs}
                                                                value={loginData.password}
                                                                className="pass-input form-control"
                                                            />
                                                            <span className="ti toggle-password ti-eye-off" />
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                                        <div className="d-flex align-items-center">
                                                            <div className="form-check form-check-md mb-0">
                                                                <input
                                                                    className="form-check-input"
                                                                    id="remember_me"
                                                                    type="checkbox"
                                                                />
                                                                <label
                                                                    htmlFor="remember_me"
                                                                    className="form-check-label mt-0"
                                                                >
                                                                    Remember Me
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="text-end">
                                                            <a href="forgot-password.html" className="link-danger">
                                                                Forgot Password?
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <button type="submit" className="btn btn-primary w-100">
                                                            Sign In
                                                        </button>
                                                    </div>
                                                    <div className="text-center">
                                                        <h6 className="fw-normal text-dark mb-0">
                                                            Don’t have an account?
                                                            <a href="register.html" className="hover-a">
                                                                {" "}
                                                                Create Account
                                                            </a>
                                                        </h6>
                                                    </div>
                                                    <div className="login-or">
                                                        {/* <span className="span-or">Or</span> */}
                                                    </div>

                                                </div>
                                                <div className="mt-5 pb-4 text-center">
                                                    <p className="mb-0 text-gray-9">
                                                        Copyright © 2025 - Rajjo
                                                    </p>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
