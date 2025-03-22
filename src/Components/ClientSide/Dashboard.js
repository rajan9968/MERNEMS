import React, { useEffect, useState, useContext } from 'react';
import Navbar from './Navbar';
import { getUserDetails } from '../Login/authUtils';


export default function Dashboard() {
    const userDetails = getUserDetails();
    // const [loggedInUser, setloggedInUser] = useState('');
    // useEffect(() => {
    //     const user = JSON.parse(localStorage.getItem('user'));
    //     setloggedInUser(user.name);

    // }, [])

    return (
        <div>
            {/* <div id="global-loader">
                <div className="page-loader" />
            </div> */}
            {/* Main Wrapper */}
            <div className="main-wrapper">
                <Navbar />
                {/* Page Wrapper */}
                <div className="page-wrapper">
                    <div className="content">
                        {/* Breadcrumb */}
                        <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
                            <div className="my-auto mb-2">
                                <h2 className="mb-1">Employee Dashboard</h2>
                                <nav>
                                    <ol className="breadcrumb mb-0">
                                        <li className="breadcrumb-item">
                                            <a href="index.html">
                                                <i className="ti ti-smart-home" />
                                            </a>
                                        </li>
                                        <li className="breadcrumb-item">Dashboard</li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            Employee Dashboard
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="d-flex my-xl-auto right-content align-items-center flex-wrap ">
                                <div className="me-2 mb-2">
                                    <div className="dropdown">
                                        <a
                                            href="javascript:void(0);"
                                            className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                                            data-bs-toggle="dropdown"
                                        >
                                            <i className="ti ti-file-export me-1" />
                                            Export
                                        </a>
                                        <ul className="dropdown-menu  dropdown-menu-end p-3">
                                            <li>
                                                <a
                                                    href="javascript:void(0);"
                                                    className="dropdown-item rounded-1"
                                                >
                                                    <i className="ti ti-file-type-pdf me-1" />
                                                    Export as PDF
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="javascript:void(0);"
                                                    className="dropdown-item rounded-1"
                                                >
                                                    <i className="ti ti-file-type-xls me-1" />
                                                    Export as Excel{" "}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="input-icon w-120 position-relative mb-2">
                                    <span className="input-icon-addon">
                                        <i className="ti ti-calendar text-gray-9" />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control datetimepicker"
                                        defaultValue="15 Apr 2025"
                                    />
                                </div>
                                <div className="ms-2 head-icons">
                                    <a
                                        href="javascript:void(0);"
                                        className=""
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-original-title="Collapse"
                                        id="collapse-header"
                                    >
                                        <i className="ti ti-chevrons-up" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* /Breadcrumb */}

                        <div className="row">
                            <div className="col-xl-4 d-flex">
                                <div className="card position-relative flex-fill">
                                    <div className="card-header bg-dark">
                                        <div className="d-flex align-items-center">
                                            <span className="avatar avatar-lg avatar-rounded border border-white border-2 flex-shrink-0 me-2">
                                                <img src="assets/img/users/user-01.jpg" alt="Img" />
                                            </span>
                                            <div>
                                                <h5 className="text-white mb-1">{userDetails.name}</h5>
                                                <div className="d-flex align-items-center">
                                                    <p className="text-white fs-12 mb-0">
                                                        Senior Product Designer
                                                    </p>
                                                    <span className="mx-1">
                                                        <i className="ti ti-point-filled text-primary" />
                                                    </span>
                                                    <p className="fs-12">UI/UX Design</p>
                                                </div>
                                            </div>
                                        </div>
                                        <a
                                            href="#"
                                            className="btn btn-icon btn-sm text-white rounded-circle edit-top"
                                        >
                                            <i className="ti ti-edit" />
                                        </a>
                                    </div>
                                    <div className="card-body">
                                        <div className="mb-3">
                                            <span className="d-block mb-1 fs-13">Phone Number</span>
                                            <p className="text-gray-9">+1 324 3453 545</p>
                                        </div>
                                        <div className="mb-3">
                                            <span className="d-block mb-1 fs-13">Email Address</span>
                                            <p className="text-gray-9">
                                                <a
                                                    href="/cdn-cgi/l/email-protection"
                                                    className="__cf_email__"
                                                    data-cfemail="c192b5a4b1a4b3a5a4f0f3f581a4b9a0acb1ada4efa2aeac"
                                                >
                                                    {userDetails.email}
                                                </a>
                                            </p>
                                        </div>
                                        <div className="mb-3">
                                            <span className="d-block mb-1 fs-13">Report Office</span>
                                            <p className="text-gray-9">Doglas Martini</p>
                                        </div>
                                        <div>
                                            <span className="d-block mb-1 fs-13">Joined on</span>
                                            <p className="text-gray-9">15 Jan 2024</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-5 d-flex">
                                <div className="card flex-fill">
                                    <div className="card-header">
                                        <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                                            <h5>Leave Details</h5>
                                            <div className="dropdown">
                                                <a
                                                    href="javascript:void(0);"
                                                    className="btn btn-white border btn-sm d-inline-flex align-items-center"
                                                    data-bs-toggle="dropdown"
                                                >
                                                    <i className="ti ti-calendar me-1" />
                                                    2024
                                                </a>
                                                <ul className="dropdown-menu  dropdown-menu-end p-3">
                                                    <li>
                                                        <a
                                                            href="javascript:void(0);"
                                                            className="dropdown-item rounded-1"
                                                        >
                                                            2024
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="javascript:void(0);"
                                                            className="dropdown-item rounded-1"
                                                        >
                                                            2023
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="javascript:void(0);"
                                                            className="dropdown-item rounded-1"
                                                        >
                                                            2022
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <div className="mb-3">
                                                        <p className="d-flex align-items-center">
                                                            <i className="ti ti-circle-filled fs-8 text-dark me-1" />
                                                            <span className="text-gray-9 fw-semibold me-1">1254</span>
                                                            on time
                                                        </p>
                                                    </div>
                                                    <div className="mb-3">
                                                        <p className="d-flex align-items-center">
                                                            <i className="ti ti-circle-filled fs-8 text-success me-1" />
                                                            <span className="text-gray-9 fw-semibold me-1">32</span>
                                                            Late Attendance
                                                        </p>
                                                    </div>
                                                    <div className="mb-3">
                                                        <p className="d-flex align-items-center">
                                                            <i className="ti ti-circle-filled fs-8 text-primary me-1" />
                                                            <span className="text-gray-9 fw-semibold me-1">658</span>
                                                            Work From Home
                                                        </p>
                                                    </div>
                                                    <div className="mb-3">
                                                        <p className="d-flex align-items-center">
                                                            <i className="ti ti-circle-filled fs-8 text-danger me-1" />
                                                            <span className="text-gray-9 fw-semibold me-1">14</span>
                                                            Absent
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="d-flex align-items-center">
                                                            <i className="ti ti-circle-filled fs-8 text-warning me-1" />
                                                            <span className="text-gray-9 fw-semibold me-1">68</span>
                                                            Sick Leave
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3 d-flex justify-content-md-end">
                                                    <div id="leaves_chart" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-check mt-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="todo1"
                                                    />
                                                    <label className="form-check-label" htmlFor="todo1">
                                                        Better than <span className="text-gray-9">85%</span> of
                                                        Employees
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 d-flex">
                                <div className="card flex-fill">
                                    <div className="card-header">
                                        <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                                            <h5>Leave Details</h5>
                                            <div className="dropdown">
                                                <a
                                                    href="javascript:void(0);"
                                                    className="btn btn-white border btn-sm d-inline-flex align-items-center"
                                                    data-bs-toggle="dropdown"
                                                >
                                                    <i className="ti ti-calendar me-1" />
                                                    2024
                                                </a>
                                                <ul className="dropdown-menu  dropdown-menu-end p-3">
                                                    <li>
                                                        <a
                                                            href="javascript:void(0);"
                                                            className="dropdown-item rounded-1"
                                                        >
                                                            2024
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="javascript:void(0);"
                                                            className="dropdown-item rounded-1"
                                                        >
                                                            2023
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="javascript:void(0);"
                                                            className="dropdown-item rounded-1"
                                                        >
                                                            2022
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col-sm-6">
                                                <div className="mb-4">
                                                    <span className="d-block mb-1">Total Leaves</span>
                                                    <h4>16</h4>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="mb-4">
                                                    <span className="d-block mb-1">Taken</span>
                                                    <h4>10</h4>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="mb-4">
                                                    <span className="d-block mb-1">Absent</span>
                                                    <h4>2</h4>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="mb-4">
                                                    <span className="d-block mb-1">Request</span>
                                                    <h4>0</h4>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="mb-4">
                                                    <span className="d-block mb-1">Worked Days</span>
                                                    <h4>240</h4>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="mb-4">
                                                    <span className="d-block mb-1">Loss of Pay</span>
                                                    <h4>2</h4>
                                                </div>
                                            </div>
                                            <div className="col-sm-12">
                                                <div>
                                                    <a
                                                        href="#"
                                                        className="btn btn-dark w-100"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#add_leaves"
                                                    >
                                                        Apply New Leave
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="row">
                            <div className="col-xl-4 d-flex">
                                <div className="card flex-fill border-primary attendance-bg">
                                    <div className="card-body">
                                        <div className="mb-4 text-center">
                                            <h6 className="fw-medium text-gray-5 mb-1">Attendance</h6>
                                            <h4>08:35 AM, 11 Mar 2025</h4>
                                        </div>
                                        <div
                                            className="attendance-circle-progress attendance-progress mx-auto mb-3"
                                            data-value={65}
                                        >
                                            <span className="progress-left">
                                                <span className="progress-bar border-success" />
                                            </span>
                                            <span className="progress-right">
                                                <span className="progress-bar border-success" />
                                            </span>
                                            <div className="total-work-hours text-center w-100">
                                                <span className="fs-13 d-block mb-1">Total Hours</span>
                                                <h6>5:45:32</h6>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="badge badge-dark badge-md mb-3">
                                                Production : 3.45 hrs
                                            </div>
                                            <h6 className="fw-medium d-flex align-items-center justify-content-center mb-4">
                                                <i className="ti ti-fingerprint text-primary me-1" />
                                                Punch In at 10.00 AM
                                            </h6>
                                            <a href="#" className="btn btn-primary w-100">
                                                Punch Out
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-8 d-flex">
                                <div className="row flex-fill">
                                    <div className="col-xl-3 col-md-6">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="border-bottom mb-3 pb-2">
                                                    <span className="avatar avatar-sm bg-primary mb-2">
                                                        <i className="ti ti-clock-stop" />
                                                    </span>
                                                    <h2 className="mb-2">
                                                        8.36 / <span className="fs-20 text-gray-5"> 9</span>
                                                    </h2>
                                                    <p className="fw-medium text-truncate">Total Hours Today</p>
                                                </div>
                                                <div>
                                                    <p className="d-flex align-items-center fs-13">
                                                        <span className="avatar avatar-xs rounded-circle bg-success flex-shrink-0 me-2">
                                                            <i className="ti ti-arrow-up fs-12" />
                                                        </span>
                                                        <span>5% This Week</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-6">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="border-bottom mb-3 pb-2">
                                                    <span className="avatar avatar-sm bg-dark mb-2">
                                                        <i className="ti ti-clock-up" />
                                                    </span>
                                                    <h2 className="mb-2">
                                                        10 / <span className="fs-20 text-gray-5"> 40</span>
                                                    </h2>
                                                    <p className="fw-medium text-truncate">Total Hours Week</p>
                                                </div>
                                                <div>
                                                    <p className="d-flex align-items-center fs-13">
                                                        <span className="avatar avatar-xs rounded-circle bg-success flex-shrink-0 me-2">
                                                            <i className="ti ti-arrow-up fs-12" />
                                                        </span>
                                                        <span>7% Last Week</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-6">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="border-bottom mb-3 pb-2">
                                                    <span className="avatar avatar-sm bg-info mb-2">
                                                        <i className="ti ti-calendar-up" />
                                                    </span>
                                                    <h2 className="mb-2">
                                                        75 / <span className="fs-20 text-gray-5"> 98</span>
                                                    </h2>
                                                    <p className="fw-medium text-truncate">Total Hours Month</p>
                                                </div>
                                                <div>
                                                    <p className="d-flex align-items-center fs-13 text-truncate">
                                                        <span className="avatar avatar-xs rounded-circle bg-danger flex-shrink-0 me-2">
                                                            <i className="ti ti-arrow-down fs-12" />
                                                        </span>
                                                        <span>8% Last Month</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-6">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="border-bottom mb-3 pb-2">
                                                    <span className="avatar avatar-sm bg-pink mb-2">
                                                        <i className="ti ti-calendar-star" />
                                                    </span>
                                                    <h2 className="mb-2">
                                                        16 / <span className="fs-20 text-gray-5"> 28</span>
                                                    </h2>
                                                    <p className="fw-medium text-truncate">Overtime this Month</p>
                                                </div>
                                                <div>
                                                    <p className="d-flex align-items-center fs-13 text-truncate">
                                                        <span className="avatar avatar-xs rounded-circle bg-danger flex-shrink-0 me-2">
                                                            <i className="ti ti-arrow-down fs-12" />
                                                        </span>
                                                        <span>6% Last Month</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-xl-3">
                                                        <div className="mb-4">
                                                            <p className="d-flex align-items-center mb-1">
                                                                <i className="ti ti-point-filled text-dark-transparent me-1" />
                                                                Total Working hours
                                                            </p>
                                                            <h3>12h 36m</h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-3">
                                                        <div className="mb-4">
                                                            <p className="d-flex align-items-center mb-1">
                                                                <i className="ti ti-point-filled text-success me-1" />
                                                                Productive Hours
                                                            </p>
                                                            <h3>08h 36m</h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-3">
                                                        <div className="mb-4">
                                                            <p className="d-flex align-items-center mb-1">
                                                                <i className="ti ti-point-filled text-warning me-1" />
                                                                Break hours
                                                            </p>
                                                            <h3>22m 15s</h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-3">
                                                        <div className="mb-4">
                                                            <p className="d-flex align-items-center mb-1">
                                                                <i className="ti ti-point-filled text-info me-1" />
                                                                Overtime
                                                            </p>
                                                            <h3>02h 15m</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div
                                                            className="progress bg-transparent-dark mb-3"
                                                            style={{ height: 24 }}
                                                        >
                                                            <div
                                                                className="progress-bar bg-white rounded"
                                                                role="progressbar"
                                                                style={{ width: "18%" }}
                                                            />
                                                            <div
                                                                className="progress-bar bg-success rounded me-2"
                                                                role="progressbar"
                                                                style={{ width: "18%" }}
                                                            />
                                                            <div
                                                                className="progress-bar bg-warning rounded me-2"
                                                                role="progressbar"
                                                                style={{ width: "5%" }}
                                                            />
                                                            <div
                                                                className="progress-bar bg-success rounded me-2"
                                                                role="progressbar"
                                                                style={{ width: "28%" }}
                                                            />
                                                            <div
                                                                className="progress-bar bg-warning rounded me-2"
                                                                role="progressbar"
                                                                style={{ width: "17%" }}
                                                            />
                                                            <div
                                                                className="progress-bar bg-success rounded me-2"
                                                                role="progressbar"
                                                                style={{ width: "22%" }}
                                                            />
                                                            <div
                                                                className="progress-bar bg-warning rounded me-2"
                                                                role="progressbar"
                                                                style={{ width: "5%" }}
                                                            />
                                                            <div
                                                                className="progress-bar bg-info rounded me-2"
                                                                role="progressbar"
                                                                style={{ width: "3%" }}
                                                            />
                                                            <div
                                                                className="progress-bar bg-info rounded"
                                                                role="progressbar"
                                                                style={{ width: "2%" }}
                                                            />
                                                            <div
                                                                className="progress-bar bg-white rounded"
                                                                role="progressbar"
                                                                style={{ width: "18%" }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="co-md-12">
                                                        <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                                                            <span className="fs-10">06:00</span>
                                                            <span className="fs-10">07:00</span>
                                                            <span className="fs-10">08:00</span>
                                                            <span className="fs-10">09:00</span>
                                                            <span className="fs-10">10:00</span>
                                                            <span className="fs-10">11:00</span>
                                                            <span className="fs-10">12:00</span>
                                                            <span className="fs-10">01:00</span>
                                                            <span className="fs-10">02:00</span>
                                                            <span className="fs-10">03:00</span>
                                                            <span className="fs-10">04:00</span>
                                                            <span className="fs-10">05:00</span>
                                                            <span className="fs-10">06:00</span>
                                                            <span className="fs-10">07:00</span>
                                                            <span className="fs-10">08:00</span>
                                                            <span className="fs-10">09:00</span>
                                                            <span className="fs-10">10:00</span>
                                                            <span className="fs-10">11:00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div className="row">
                            <div className="col-xl-6 d-flex">
                                <div className="card flex-fill">
                                    <div className="card-header">
                                        <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                                            <h5>Projects</h5>
                                            <div className="dropdown">
                                                <a
                                                    href="javascript:void(0);"
                                                    className="btn btn-white border-0 dropdown-toggle border btn-sm d-inline-flex align-items-center"
                                                    data-bs-toggle="dropdown"
                                                >
                                                    Ongoing Projects
                                                </a>
                                                <ul className="dropdown-menu  dropdown-menu-end p-3">
                                                    <li>
                                                        <a
                                                            href="javascript:void(0);"
                                                            className="dropdown-item rounded-1"
                                                        >
                                                            All Projects
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="javascript:void(0);"
                                                            className="dropdown-item rounded-1"
                                                        >
                                                            Ongoing Projects
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="card mb-4 shadow-none mb-md-0">
                                                    <div className="card-body">
                                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                                            <h6>Office Management</h6>
                                                            <div className="dropdown">
                                                                <a
                                                                    href="javascript:void(0);"
                                                                    className="d-inline-flex align-items-center"
                                                                    data-bs-toggle="dropdown"
                                                                >
                                                                    <i className="ti ti-dots-vertical" />
                                                                </a>
                                                                <ul className="dropdown-menu dropdown-menu-end p-3">
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="dropdown-item rounded-1"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#edit_task"
                                                                        >
                                                                            <i className="ti ti-edit me-2" />
                                                                            Edit
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="dropdown-item rounded-1"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#delete_modal"
                                                                        >
                                                                            <i className="ti ti-trash me-2" />
                                                                            Delete
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="d-flex align-items-center mb-3">
                                                                <a href="javascript:void(0);" className="avatar">
                                                                    <img
                                                                        src="assets/img/users/user-32.jpg"
                                                                        className="img-fluid rounded-circle"
                                                                        alt="img"
                                                                    />
                                                                </a>
                                                                <div className="ms-2">
                                                                    <h6 className="fw-normal">
                                                                        <a href="javascript:void(0);">Anthony Lewis</a>
                                                                    </h6>
                                                                    <span className="fs-13 d-block">Project Leader</span>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-center mb-3">
                                                                <a
                                                                    href="javascript:void(0);"
                                                                    className="avatar bg-soft-primary rounded-circle"
                                                                >
                                                                    <i className="ti ti-calendar text-primary fs-16" />
                                                                </a>
                                                                <div className="ms-2">
                                                                    <h6 className="fw-normal">14 Jan 2024</h6>
                                                                    <span className="fs-13 d-block">Deadline</span>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-center justify-content-between bg-transparent-light border border-dashed rounded p-2 mb-3">
                                                                <div className="d-flex align-items-center">
                                                                    <span className="avatar avatar-sm bg-success-transparent rounded-circle me-1">
                                                                        <i className="ti ti-checklist fs-16" />
                                                                    </span>
                                                                    <p>
                                                                        Tasks : <span className="text-gray-9">6 </span> /10
                                                                    </p>
                                                                </div>
                                                                <div className="avatar-list-stacked avatar-group-sm">
                                                                    <span className="avatar avatar-rounded">
                                                                        <img
                                                                            className="border border-white"
                                                                            src="assets/img/profiles/avatar-06.jpg"
                                                                            alt="img"
                                                                        />
                                                                    </span>
                                                                    <span className="avatar avatar-rounded">
                                                                        <img
                                                                            className="border border-white"
                                                                            src="assets/img/profiles/avatar-07.jpg"
                                                                            alt="img"
                                                                        />
                                                                    </span>
                                                                    <span className="avatar avatar-rounded">
                                                                        <img
                                                                            className="border border-white"
                                                                            src="assets/img/profiles/avatar-08.jpg"
                                                                            alt="img"
                                                                        />
                                                                    </span>
                                                                    <a
                                                                        className="avatar bg-primary avatar-rounded text-fixed-white fs-12 fw-medium"
                                                                        href="javascript:void(0);"
                                                                    >
                                                                        +2
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="bg-soft-secondary p-2 rounded d-flex align-items-center justify-content-between">
                                                                <p className="text-secondary mb-0 text-truncate">
                                                                    Time Spent
                                                                </p>
                                                                <h5 className="text-secondary text-truncate">
                                                                    65/120 <span className="fs-14 fw-normal">Hrs</span>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="card shadow-none mb-0">
                                                    <div className="card-body">
                                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                                            <h6>Office Management</h6>
                                                            <div className="dropdown">
                                                                <a
                                                                    href="javascript:void(0);"
                                                                    className="d-inline-flex align-items-center"
                                                                    data-bs-toggle="dropdown"
                                                                >
                                                                    <i className="ti ti-dots-vertical" />
                                                                </a>
                                                                <ul className="dropdown-menu dropdown-menu-end p-3">
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="dropdown-item rounded-1"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#edit_task"
                                                                        >
                                                                            <i className="ti ti-edit me-2" />
                                                                            Edit
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="dropdown-item rounded-1"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#delete_modal"
                                                                        >
                                                                            <i className="ti ti-trash me-2" />
                                                                            Delete
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="d-flex align-items-center mb-3">
                                                                <a href="javascript:void(0);" className="avatar">
                                                                    <img
                                                                        src="assets/img/users/user-33.jpg"
                                                                        className="img-fluid rounded-circle"
                                                                        alt="img"
                                                                    />
                                                                </a>
                                                                <div className="ms-2">
                                                                    <h6 className="fw-normal">
                                                                        <a href="javascript:void(0);">Anthony Lewis</a>
                                                                    </h6>
                                                                    <span className="fs-13 d-block">Project Leader</span>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-center mb-3">
                                                                <a
                                                                    href="javascript:void(0);"
                                                                    className="avatar bg-soft-primary rounded-circle"
                                                                >
                                                                    <i className="ti ti-calendar text-primary fs-16" />
                                                                </a>
                                                                <div className="ms-2">
                                                                    <h6 className="fw-normal">14 Jan 2024</h6>
                                                                    <span className="fs-13 d-block">Deadline</span>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-center justify-content-between bg-transparent-light border border-dashed rounded p-2 mb-3">
                                                                <div className="d-flex align-items-center">
                                                                    <span className="avatar avatar-sm bg-success-transparent rounded-circle me-1">
                                                                        <i className="ti ti-checklist fs-16" />
                                                                    </span>
                                                                    <p>
                                                                        Tasks : <span className="text-gray-9">6 </span> /10
                                                                    </p>
                                                                </div>
                                                                <div className="avatar-list-stacked avatar-group-sm">
                                                                    <span className="avatar avatar-rounded">
                                                                        <img
                                                                            className="border border-white"
                                                                            src="assets/img/profiles/avatar-06.jpg"
                                                                            alt="img"
                                                                        />
                                                                    </span>
                                                                    <span className="avatar avatar-rounded">
                                                                        <img
                                                                            className="border border-white"
                                                                            src="assets/img/profiles/avatar-07.jpg"
                                                                            alt="img"
                                                                        />
                                                                    </span>
                                                                    <span className="avatar avatar-rounded">
                                                                        <img
                                                                            className="border border-white"
                                                                            src="assets/img/profiles/avatar-08.jpg"
                                                                            alt="img"
                                                                        />
                                                                    </span>
                                                                    <a
                                                                        className="avatar bg-primary avatar-rounded text-fixed-white fs-12 fw-medium"
                                                                        href="javascript:void(0);"
                                                                    >
                                                                        +2
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="bg-soft-secondary p-2 rounded d-flex align-items-center justify-content-between">
                                                                <p className="text-secondary mb-0 text-truncate">
                                                                    Time Spent
                                                                </p>
                                                                <h5 className="text-secondary text-truncate">
                                                                    65/120 <span className="fs-14 fw-normal">Hrs</span>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 d-flex">
                                <div className="card flex-fill">
                                    <div className="card-header">
                                        <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                                            <h5>Tasks</h5>
                                            <div className="dropdown">
                                                <a
                                                    href="javascript:void(0);"
                                                    className="btn btn-white border-0 dropdown-toggle border btn-sm d-inline-flex align-items-center"
                                                    data-bs-toggle="dropdown"
                                                >
                                                    All Projects
                                                </a>
                                                <ul className="dropdown-menu  dropdown-menu-end p-3">
                                                    <li>
                                                        <a
                                                            href="javascript:void(0);"
                                                            className="dropdown-item rounded-1"
                                                        >
                                                            All Projects
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="javascript:void(0);"
                                                            className="dropdown-item rounded-1"
                                                        >
                                                            Ongoing Projects
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="list-group list-group-flush">
                                            <div className="list-group-item border rounded mb-3 p-2">
                                                <div className="row align-items-center row-gap-3">
                                                    <div className="col-md-8">
                                                        <div className="todo-inbox-check d-flex align-items-center">
                                                            <span>
                                                                <i className="ti ti-grid-dots me-2" />
                                                            </span>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" />
                                                            </div>
                                                            <span className="me-2 d-flex align-items-center rating-select">
                                                                <i className="ti ti-star-filled filled" />
                                                            </span>
                                                            <div className="strike-info">
                                                                <h4 className="fs-14 text-truncate">
                                                                    Patient appointment booking
                                                                </h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="d-flex align-items-center justify-content-md-end flex-wrap row-gap-3">
                                                            <span className="badge bg-soft-pink d-inline-flex align-items-center me-2">
                                                                <i className="fas fa-circle fs-6 me-1" />
                                                                Onhold
                                                            </span>
                                                            <div className="d-flex align-items-center">
                                                                <div className="avatar-list-stacked avatar-group-sm">
                                                                    <span className="avatar avatar-rounded">
                                                                        <img
                                                                            className="border border-white"
                                                                            src="assets/img/profiles/avatar-13.jpg"
                                                                            alt="img"
                                                                        />
                                                                    </span>
                                                                    <span className="avatar avatar-rounded">
                                                                        <img
                                                                            className="border border-white"
                                                                            src="assets/img/profiles/avatar-14.jpg"
                                                                            alt="img"
                                                                        />
                                                                    </span>
                                                                    <span className="avatar avatar-rounded">
                                                                        <img
                                                                            className="border border-white"
                                                                            src="assets/img/profiles/avatar-15.jpg"
                                                                            alt="img"
                                                                        />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="list-group-item border rounded mb-3 p-2">
                                                <div className="row align-items-center row-gap-3">
                                                    <div className="col-md-8">
                                                        <div className="todo-inbox-check d-flex align-items-center">
                                                            <span>
                                                                <i className="ti ti-grid-dots me-2" />
                                                            </span>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" />
                                                            </div>
                                                            <span className="me-2 rating-select d-flex align-items-center">
                                                                <i className="ti ti-star" />
                                                            </span>
                                                            <div className="strike-info">
                                                                <h4 className="fs-14 text-truncate">
                                                                    Appointment booking with payment
                                                                </h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="d-flex align-items-center justify-content-md-end flex-wrap row-gap-3">
                                                            <span className="badge bg-transparent-purple d-flex align-items-center me-2">
                                                                <i className="fas fa-circle fs-6 me-1" />
                                                                Inprogress
                                                            </span>
                                                            <div className="d-flex align-items-center">
                                                                <div className="avatar-list-stacked avatar-group-sm">
                                                                    <span className="avatar avatar-rounded">
                                                                        <img
                                                                            className="border border-white"
                                                                            src="assets/img/profiles/avatar-20.jpg"
                                                                            alt="img"
                                                                        />
                                                                    </span>
                                                                    <span className="avatar avatar-rounded">
                                                                        <img
                                                                            className="border border-white"
                                                                            src="assets/img/profiles/avatar-21.jpg"
                                                                            alt="img"
                                                                        />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="list-group-item border rounded mb-3 p-2">
                                                <div className="row align-items-center row-gap-3">
                                                    <div className="col-md-8">
                                                        <div className="todo-inbox-check d-flex align-items-center">
                                                            <span>
                                                                <i className="ti ti-grid-dots me-2" />
                                                            </span>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" />
                                                            </div>
                                                            <span className="me-2 rating-select d-flex align-items-center">
                                                                <i className="ti ti-star" />
                                                            </span>
                                                            <div className="strike-info">
                                                                <h4 className="fs-14 text-truncate">
                                                                    Patient and Doctor video conferencing
                                                                </h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="d-flex align-items-center justify-content-md-end flex-wrap row-gap-3">
                                                            <span className="badge badge-soft-success align-items-center me-2">
                                                                <i className="fas fa-circle fs-6 me-1" />
                                                                Completed
                                                            </span>
                                                            <div className="d-flex align-items-center">
                                                                <div className="avatar-list-stacked avatar-group-sm">
                                                                    <span className="avatar avatar-rounded">
                                                                        <img
                                                                            className="border border-white"
                                                                            src="assets/img/profiles/avatar-28.jpg"
                                                                            alt="img"
                                                                        />
                                                                    </span>
                                                                    <span className="avatar avatar-rounded">
                                                                        <img
                                                                            className="border border-white"
                                                                            src="assets/img/profiles/avatar-29.jpg"
                                                                            alt="img"
                                                                        />
                                                                    </span>
                                                                    <span className="avatar avatar-rounded">
                                                                        <img
                                                                            className="border border-white"
                                                                            src="assets/img/profiles/avatar-24.jpg"
                                                                            alt="img"
                                                                        />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="list-group-item border rounded mb-3 p-2">
                                                <div className="row align-items-center row-gap-3">
                                                    <div className="col-md-8">
                                                        <div className="todo-inbox-check d-flex align-items-center todo-strike-content">
                                                            <span>
                                                                <i className="ti ti-grid-dots me-2" />
                                                            </span>
                                                            <div className="form-check">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    defaultChecked=""
                                                                />
                                                            </div>
                                                            <span className="me-2 rating-select d-flex align-items-center">
                                                                <i className="ti ti-star" />
                                                            </span>
                                                            <div className="strike-info">
                                                                <h4 className="fs-14 text-truncate">
                                                                    Private chat module
                                                                </h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="d-flex align-items-center justify-content-md-end flex-wrap row-gap-3">
                                                            <span className="badge badge-secondary-transparent d-flex align-items-center me-2">
                                                                <i className="fas fa-circle fs-6 me-1" />
                                                                Pending
                                                            </span>
                                                            <div className="d-flex align-items-center">
                                                                <div className="avatar-list-stacked avatar-group-sm">
                                                                    <span className="avatar avatar-rounded">
                                                                        <img
                                                                            className="border border-white"
                                                                            src="assets/img/profiles/avatar-23.jpg"
                                                                            alt="img"
                                                                        />
                                                                    </span>
                                                                    <span className="avatar avatar-rounded">
                                                                        <img
                                                                            className="border border-white"
                                                                            src="assets/img/profiles/avatar-24.jpg"
                                                                            alt="img"
                                                                        />
                                                                    </span>
                                                                    <span className="avatar avatar-rounded">
                                                                        <img
                                                                            className="border border-white"
                                                                            src="assets/img/profiles/avatar-25.jpg"
                                                                            alt="img"
                                                                        />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="list-group-item border rounded p-2">
                                                <div className="row align-items-center row-gap-3">
                                                    <div className="col-md-8">
                                                        <div className="todo-inbox-check d-flex align-items-center">
                                                            <span>
                                                                <i className="ti ti-grid-dots me-2" />
                                                            </span>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" />
                                                            </div>
                                                            <span className="me-2 rating-select d-flex align-items-center">
                                                                <i className="ti ti-star" />
                                                            </span>
                                                            <div className="strike-info">
                                                                <h4 className="fs-14 text-truncate">
                                                                    Go-Live and Post-Implementation Support
                                                                </h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="d-flex align-items-center justify-content-md-end flex-wrap row-gap-3">
                                                            <span className="badge bg-transparent-purple d-flex align-items-center me-2">
                                                                <i className="fas fa-circle fs-6 me-1" />
                                                                Inprogress
                                                            </span>
                                                            <div className="d-flex align-items-center">
                                                                <div className="avatar-list-stacked avatar-group-sm">
                                                                    <span className="avatar avatar-rounded">
                                                                        <img
                                                                            className="border border-white"
                                                                            src="assets/img/profiles/avatar-28.jpg"
                                                                            alt="img"
                                                                        />
                                                                    </span>
                                                                    <span className="avatar avatar-rounded">
                                                                        <img
                                                                            className="border border-white"
                                                                            src="assets/img/profiles/avatar-29.jpg"
                                                                            alt="img"
                                                                        />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
                        <p className="mb-0">2014 - 2025 © SmartHR.</p>
                        <p>
                            Designed &amp; Developed By{" "}
                            <a href="javascript:void(0);" className="text-primary">
                                Dreams
                            </a>
                        </p>
                    </div>
                </div>

                {/* /Page Wrapper */}

                {/* Add Project */}
                <div className="modal fade" id="add_project" role="dialog">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header header-border align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <h5 className="modal-title me-2">Add Project </h5>
                                    <p className="text-dark">Project ID : PRO-0004</p>
                                </div>
                                <button
                                    type="button"
                                    className="btn-close custom-btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <i className="ti ti-x" />
                                </button>
                            </div>
                            <div className="add-info-fieldset">
                                <div className="add-details-wizard p-3 pb-0">
                                    <ul className="progress-bar-wizard d-flex align-items-center border-bottom">
                                        <li className="active p-2 pt-0">
                                            <h6 className="fw-medium">Basic Information</h6>
                                        </li>
                                        <li className="p-2 pt-0">
                                            <h6 className="fw-medium">Members</h6>
                                        </li>
                                    </ul>
                                </div>
                                <fieldset id="first-field-file">
                                    <form action="projects.html">
                                        <div className="modal-body">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
                                                        <div className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
                                                            <i className="ti ti-photo text-gray-2 fs-16" />
                                                        </div>
                                                        <div className="profile-upload">
                                                            <div className="mb-2">
                                                                <h6 className="mb-1">Upload Project Logo</h6>
                                                                <p className="fs-12">Image should be below 4 mb</p>
                                                            </div>
                                                            <div className="profile-uploader d-flex align-items-center">
                                                                <div className="drag-upload-btn btn btn-sm btn-primary me-2">
                                                                    Upload
                                                                    <input
                                                                        type="file"
                                                                        className="form-control image-sign"
                                                                        multiple=""
                                                                    />
                                                                </div>
                                                                <a
                                                                    href="javascript:void(0);"
                                                                    className="btn btn-light btn-sm"
                                                                >
                                                                    Cancel
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="mb-3">
                                                        <label className="form-label">Project Name</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="mb-3">
                                                        <label className="form-label">Client</label>
                                                        <select className="select">
                                                            <option>Select</option>
                                                            <option>Anthony Lewis</option>
                                                            <option>Brian Villalobos</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label className="form-label">Start Date</label>
                                                                <div className="input-icon-end position-relative">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control datetimepicker"
                                                                        placeholder="dd/mm/yyyy"
                                                                        defaultValue="02-05-2024"
                                                                    />
                                                                    <span className="input-icon-addon">
                                                                        <i className="ti ti-calendar text-gray-7" />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label className="form-label">End Date</label>
                                                                <div className="input-icon-end position-relative">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control datetimepicker"
                                                                        placeholder="dd/mm/yyyy"
                                                                        defaultValue="02-05-2024"
                                                                    />
                                                                    <span className="input-icon-addon">
                                                                        <i className="ti ti-calendar text-gray-7" />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label className="form-label">Priority</label>
                                                                <select className="select">
                                                                    <option>Select</option>
                                                                    <option>High</option>
                                                                    <option>Medium</option>
                                                                    <option>Low</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label className="form-label">Project Value</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    defaultValue="$"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label className="form-label">
                                                                    Total Working Hours
                                                                </label>
                                                                <div className="input-icon-end position-relative">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control timepicker"
                                                                        placeholder="-- : -- : --"
                                                                        defaultValue="02-05-2024"
                                                                    />
                                                                    <span className="input-icon-addon">
                                                                        <i className="ti ti-clock-hour-3 text-gray-7" />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label className="form-label">Extra Time</label>
                                                                <input type="text" className="form-control" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="mb-0">
                                                        <label className="form-label">Description</label>
                                                        <div className="summernote" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <div className="d-flex align-items-center justify-content-end">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-light border me-2"
                                                    data-bs-dismiss="modal"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    className="btn btn-primary wizard-next-btn"
                                                    type="button"
                                                >
                                                    Add Team Member
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </fieldset>

                            </div>
                        </div>
                    </div>
                </div>
                {/* /Add Project */}
                {/* Add Leaves */}
                <div className="modal fade" id="add_leaves">
                    <div className="modal-dialog modal-dialog-centered modal-md">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add Leave Request</h4>
                                <button
                                    type="button"
                                    className="btn-close custom-btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <i className="ti ti-x" />
                                </button>
                            </div>
                            <form action="index.html">
                                <div className="modal-body pb-0">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <label className="form-label">Employee Name</label>
                                                <select className="select">
                                                    <option>Select</option>
                                                    <option>Anthony Lewis</option>
                                                    <option>Brian Villalobos</option>
                                                    <option>Harvey Smith</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <label className="form-label">Leave Type</label>
                                                <select className="select">
                                                    <option>Select</option>
                                                    <option>Medical Leave</option>
                                                    <option>Casual Leave</option>
                                                    <option>Annual Leave</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">From </label>
                                                <div className="input-icon-end position-relative">
                                                    <input
                                                        type="text"
                                                        className="form-control datetimepicker"
                                                        placeholder="dd/mm/yyyy"
                                                    />
                                                    <span className="input-icon-addon">
                                                        <i className="ti ti-calendar text-gray-7" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">To </label>
                                                <div className="input-icon-end position-relative">
                                                    <input
                                                        type="text"
                                                        className="form-control datetimepicker"
                                                        placeholder="dd/mm/yyyy"
                                                    />
                                                    <span className="input-icon-addon">
                                                        <i className="ti ti-calendar text-gray-7" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">No of Days</label>
                                                <input type="text" className="form-control" disabled="" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Remaining Days</label>
                                                <input type="text" className="form-control" disabled="" />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <label className="form-label">Reason</label>
                                                <textarea
                                                    className="form-control"
                                                    rows={3}
                                                    defaultValue={""}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-light me-2"
                                        data-bs-dismiss="modal"
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Add Leaves
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/* /Add Leaves */}
            </div >
            {/* /Main Wrapper */}

        </div >
    )
}
