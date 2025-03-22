import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../ClientSide/Navbar'
import { getUserDetails } from '../Login/authUtils';
import axios from 'axios';
import $ from "jquery";
import moment from "moment";
import DataTable from "react-data-table-component";
import "daterangepicker/daterangepicker.css";
import "daterangepicker";
import { Link } from 'react-router-dom';

export default function AttendanceEmployee() {
    const userDetails = getUserDetails();
    const [btnText, setBtnText] = useState("Punch In");
    const [timeText, setTimeText] = useState("Punch In at --:--");
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [productionTime, setProTime] = useState([]);
    const [dateRange, setDateRange] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const inputRef = useRef(null);
    const columns = [
        {
            name: "Date",
            selector: row => new Date(row.date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }),
            sortable: true
        },
        {
            name: "Check In",
            selector: row => row.punchin || "N/A",
            sortable: true
        },
        {
            name: "Status",
            cell: row => (
                <span className="badge badge-success-transparent d-inline-flex align-items-center">
                    <i className="ti ti-point-filled me-1" />
                    Present
                </span>
            ),
            sortable: false
        },
        {
            name: "Check Out",
            selector: row => row.punchout || "N/A",
            sortable: true
        },
        {
            name: "Late",
            selector: () => "32 Min",
            sortable: false
        },
        {
            name: "Overtime",
            selector: () => "20 Min",
            sortable: false
        },
        {
            name: "Production Hours",
            cell: row => (
                <span className="badge badge-success d-inline-flex align-items-center">
                    <i className="ti ti-clock-hour-11 me-1" />
                    {calculateProductionTime(row.punchin, row.punchout)}
                </span>
            ),
            sortable: true
        }
    ];

    const calculateProductionTime = (punchIn, punchOut) => {
        if (!punchIn || !punchOut) return "N/A";

        let inTime = new Date(`1970-01-01 ${punchIn}`);
        let outTime = new Date(`1970-01-01 ${punchOut}`);

        // Handle overnight shifts
        if (outTime < inTime) {
            outTime.setDate(outTime.getDate() + 1);
        }

        let diff = outTime - inTime;
        let hours = Math.floor(diff / 3600000);
        let minutes = Math.floor((diff % 3600000) / 60000);
        let seconds = Math.floor((diff % 60000) / 1000);

        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };
    useEffect(() => {
        if (inputRef.current) {
            $(inputRef.current).daterangepicker(
                {
                    autoUpdateInput: false,
                    locale: {
                        format: "DD/MM/YYYY",
                        cancelLabel: "Clear",
                    },
                },
                function (start, end) {
                    $(inputRef.current).val(
                        start.format("DD/MM/YYYY") + " - " + end.format("DD/MM/YYYY")
                    );
                }
            );
        }

        return () => {
            if (inputRef.current) {
                $(inputRef.current).data("daterangepicker").remove();
            }
        };
    }, []);
    // useEffect(() => {
    //     // Ensure DataTable does not initialize multiple times
    //     setTimeout(() => {
    //         if ($.fn.DataTable.isDataTable("#myTable")) {
    //             $("#myTable").DataTable().destroy();
    //         }
    //         $("#myTable").DataTable();
    //     }, 500); // Delays initialization to ensure React renders data
    // }, []);
    useEffect(() => {
        const storedState = localStorage.getItem("attendanceStatus");
        if (storedState) {
            setBtnText(storedState);
        }
    }, []);

    // AttendanceEmployee Insert 
    const handelAttentance = () => {
        const token = localStorage.getItem('token');
        const attendanceStatus = localStorage.getItem("attendanceStatus") || "Punch In";

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                // Define request data based on attendance status
                const data =
                    attendanceStatus === "Punch In"
                        ? {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        }
                        : {
                            outlatitude: position.coords.latitude,
                            outlongitude: position.coords.longitude
                        };

                try {
                    // Determine API endpoint based on attendance status
                    const endpoint =
                        attendanceStatus === "Punch In"
                            ? "/attend/punchin"
                            : "/attend/punchout";

                    const response = await axios.post(process.env.REACT_APP_API_URL + endpoint, data, {
                        headers: {
                            Authorization: token,
                            "Content-Type": "application/json",
                        },
                    });

                    if (response.data.success) {
                        console.log(response.data.message);

                        const newStatus = attendanceStatus === "Punch In" ? "Punch Out" : "Punch Over";
                        setBtnText(newStatus);
                        localStorage.setItem("attendanceStatus", newStatus);
                        if (newStatus === "Punch Over") {
                            setBtnDisabled(true);
                        }

                        await selectUsertData();
                    } else {
                        console.log("Something went wrong");
                    }

                } catch (error) {
                    console.error(`Error in ${attendanceStatus.toLowerCase()}:`, error);
                }
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    };

    // Select AttendanceEmployee
    const selectUsertData = async () => {
        try {
            const userId = userDetails.userId;


            const response = await axios.get(process.env.REACT_APP_API_URL + '/attend/selectuserdata',
                {
                    params: { userId },
                    headers: {
                        Authorization: localStorage.getItem('token'),
                        "Content-Type": "application/json",
                    },
                });

            if (response.data.success) {
                selectUserAllData();
                const userData = response.data.data[0];

                const punchinPTime = userData.punchin;
                const punchoutPTime = userData.punchout;

                console.log("Raw Punch-in:", punchinPTime);
                console.log("Raw Punch-out:", punchoutPTime);

                // Function to convert 12-hour format to 24-hour format
                function convertTo24Hour(timeStr) {
                    if (!timeStr) return null;

                    // Convert "1:14:13 am" to "01:14:13"
                    const match = timeStr.match(/(\d+):(\d+):(\d+) (am|pm)/i);
                    if (!match) return null;

                    let [_, hours, minutes, seconds, period] = match;
                    hours = parseInt(hours, 10);
                    minutes = parseInt(minutes, 10);
                    seconds = parseInt(seconds, 10);

                    if (period.toLowerCase() === "pm" && hours !== 12) {
                        hours += 12; // Convert PM hours
                    } else if (period.toLowerCase() === "am" && hours === 12) {
                        hours = 0; // Convert midnight (12 AM) to 00
                    }

                    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
                }

                // Convert times to 24-hour format
                const punchinTime = convertTo24Hour(punchinPTime);
                const punchoutTime = convertTo24Hour(punchoutPTime);

                console.log("Converted Punch-in:", punchinTime);
                console.log("Converted Punch-out:", punchoutTime);

                if (punchoutTime == null) {
                    setTimeText("Punch-in Time :- " + punchinTime);
                } else {
                    setTimeText("Punch-out Time :- " + punchoutTime);

                    if (punchinTime && punchoutTime) {
                        let inTime = new Date(`1970-01-01T${punchinTime}`);
                        let outTime = new Date(`1970-01-01T${punchoutTime}`);

                        // Handle overnight shifts (if punch-out is past midnight)
                        if (outTime < inTime) {
                            outTime.setDate(outTime.getDate() + 1);
                        }

                        let diff = outTime - inTime;
                        let hours = Math.floor(diff / 3600000);
                        let minutes = Math.floor((diff % 3600000) / 60000);
                        let seconds = Math.floor((diff % 60000) / 1000);

                        let productionTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
                        setProTime(productionTime);
                    } else {
                        console.warn("Invalid punch-in or punch-out time.");
                    }
                }
            }
            else {
                console.log("Something went wrong");
            }

        } catch (error) {
            console.error("Error in selectUsertData:", error);
        }
    }
    // Select AttendanceEmployee
    const selectUserAllData = async () => {
        try {
            setIsLoading(true);
            const userId = userDetails.userId;
            const response = await axios.get(process.env.REACT_APP_API_URL + '/attend/selectuseralldata',
                {
                    params: { userId },
                    headers: {
                        Authorization: localStorage.getItem('token'),
                        "Content-Type": "application/json",
                    },
                });

            setTimeout(() => {
                if (response.data.success) {
                    setTableData(response.data.data);
                } else {
                    console.log("Something went wrong");
                }
                setIsLoading(false);  // Stop loading after delay
            }, 500);

        } catch (error) {
            console.error("Error in selectUsertData:", error);
        }
    }

    // Select data by date range 
    const handleDataByRange = async () => {
        alert("df");
    }



    useEffect(() => {
        selectUsertData();
    }, []);









    // Time 
    const [time, setTime] = useState(getFormattedTime());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(getFormattedTime());
        }, 100); // Update every second

        return () => clearInterval(interval); // Cleanup interval
    }, []);

    function getFormattedTime() {
        const now = new Date();

        // Format time: 08:35 AM
        const timeString = now.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });

        // Format date: 11 Mar 2025
        const dateString = now.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });


        return `${timeString}, ${dateString}`;


    }




    return (
        <div>    <div className="main-wrapper">
            <Navbar />
            {/* Page Wrapper */}
            <div className="page-wrapper">
                <div className="content">
                    {/* Breadcrumb */}
                    <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
                        <div className="my-auto mb-2">
                            <h2 className="mb-1">Employee Attendance</h2>
                            <nav>
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item">
                                        <a href="index.html">
                                            <i className="ti ti-smart-home" />
                                        </a>
                                    </li>
                                    <li className="breadcrumb-item">Employee</li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Employee Attendance
                                    </li>
                                </ol>
                            </nav>
                        </div>
                        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap ">
                            <div className="me-2 mb-2">
                                <div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
                                    <a
                                        href="attendance-admin.html"
                                        className="btn btn-icon btn-sm active bg-primary text-white me-1"
                                    >
                                        <i className="ti ti-brand-days-counter" />
                                    </a>
                                    <a href="attendance-admin.html" className="btn btn-icon btn-sm">
                                        <i className="ti ti-calendar-event" />
                                    </a>
                                </div>
                            </div>
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
                            <div className="mb-2">
                                <Link as={Link} to='/attendance-list'
                                    href="#"
                                    className="btn btn-primary d-flex align-items-center"
                                    data-bs-toggle="modal"
                                    data-bs-target="#attendance_report"
                                >
                                    <i className="ti ti-file-analytics me-2" />
                                    Report
                                </Link>
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
                        <div className="col-xl-3 col-lg-4 d-flex">
                            <div className="card flex-fill">
                                <div className="card-body">
                                    <div className="mb-3 text-center">
                                        <h6 className="fw-medium text-gray-5 mb-2">
                                            Good Morning, {userDetails.name}
                                        </h6>
                                        <h4>{time}</h4>
                                    </div>
                                    <div
                                        className="attendance-circle-progress mx-auto mb-3"
                                        data-value={65}
                                    >
                                        <span className="progress-left">
                                            <span className="progress-bar border-success" />
                                        </span>
                                        <span className="progress-right">
                                            <span className="progress-bar border-success" />
                                        </span>
                                        <div className="avatar avatar-xxl avatar-rounded">
                                            <img src="assets/img/profiles/avatar-27.jpg" alt="Img" />
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="badge badge-md badge-primary mb-3">
                                            Production : {productionTime} hrs
                                        </div>
                                        <h6 className="fw-medium d-flex align-items-center justify-content-center mb-3" style={{ fontSize: "0.8em" }}>
                                            <i className="ti ti-fingerprint text-primary me-1" />
                                            {timeText}
                                        </h6>
                                        <button onClick={handelAttentance} className="btn btn-dark w-100" disabled={btnDisabled}>
                                            {btnText}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-9 col-lg-8 d-flex">
                            <div className="row flex-fill">
                                <div className="col-xl-3 col-md-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="border-bottom mb-2 pb-2">
                                                <span className="avatar avatar-sm bg-primary mb-2">
                                                    <i className="ti ti-clock-stop" />
                                                </span>
                                                <h2 className="mb-2">
                                                    {productionTime} / <span className="fs-20 text-gray-5"> 9</span>
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
                                            <div className="border-bottom mb-2 pb-2">
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
                                            <div className="border-bottom mb-2 pb-2">
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
                                            <div className="border-bottom mb-2 pb-2">
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
                                                    <div className="mb-3">
                                                        <p className="d-flex align-items-center mb-1">
                                                            <i className="ti ti-point-filled text-dark-transparent me-1" />
                                                            Total Working hours
                                                        </p>
                                                        <h3>12h 36m</h3>
                                                    </div>
                                                </div>
                                                <div className="col-xl-3">
                                                    <div className="mb-3">
                                                        <p className="d-flex align-items-center mb-1">
                                                            <i className="ti ti-point-filled text-success me-1" />
                                                            Productive Hours
                                                        </p>
                                                        <h3>08h 36m</h3>
                                                    </div>
                                                </div>
                                                <div className="col-xl-3">
                                                    <div className="mb-3">
                                                        <p className="d-flex align-items-center mb-1">
                                                            <i className="ti ti-point-filled text-warning me-1" />
                                                            Break hours
                                                        </p>
                                                        <h3>22m 15s</h3>
                                                    </div>
                                                </div>
                                                <div className="col-xl-3">
                                                    <div className="mb-3">
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
                    </div>
                    <div className="card">
                        <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                            <h5>Employee Attendance</h5>
                            <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                                <div className="me-3">
                                    <div className="input-icon-end position-relative">
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            className="form-control date-range bookingrange"
                                            placeholder="dd/mm/yyyy - dd/mm/yyyy"
                                            value={dateRange}
                                            onBlur={handleDataByRange}
                                        />
                                        <span className="input-icon-addon">
                                            <i className="ti ti-chevron-down" />
                                        </span>
                                    </div>
                                </div>
                                <div className="dropdown me-3">
                                    <select className="dropdown-toggle btn btn-white d-inline-flex align-items-center">
                                        <option>Select Status</option>
                                        <option className="dropdown-item rounded-1">Present</option>
                                        <option className="dropdown-item rounded-1">Absent</option>
                                    </select>
                                </div>
                                <div className="dropdown">
                                    <select className="dropdown-toggle btn btn-white d-inline-flex align-items-center">
                                        <option>Sort By : Last 7 Days</option>
                                        <option className="dropdown-item rounded-1">Recently Added</option>
                                        <option className="dropdown-item rounded-1">Ascending</option>
                                        <option className="dropdown-item rounded-1">Desending</option>
                                        <option className="dropdown-item rounded-1">Last Month</option>
                                        <option className="dropdown-item rounded-1"> Last 7 Days</option>
                                    </select>

                                </div>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            <div className="custom-datatable-filter table-responsive">
                                {isLoading ? (
                                    <div class="d-flex justify-content-center">
                                        <div class="spinner-border" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                ) : (
                                    <DataTable
                                        title="Attendance Report"
                                        columns={columns}
                                        data={tableData}
                                        pagination
                                        striped
                                        highlightOnHover
                                        responsive
                                    />
                                )}
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

        </div ></div >
    )
}
