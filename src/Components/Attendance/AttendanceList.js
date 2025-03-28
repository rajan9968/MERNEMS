import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../ClientSide/Navbar'
import { getUserDetails } from '../Login/authUtils';
import axios from 'axios';
import $ from "jquery";
import "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import { Table } from 'react-bootstrap';

export default function AttendanceList() {
    const [tableData, setTableData] = useState([]);
    const inputRef = useRef(null);
    const userDetails = getUserDetails();
    const [message, setMessage] = useState("");
    const [dateRange, setDateRange] = useState("");
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        selectUserAllData();
    }, []);
    // Data Table
    useEffect(() => {
        // Ensure DataTable does not initialize multiple times
        setTimeout(() => {
            if ($.fn.DataTable.isDataTable("#attendanceTable")) {
                $("#attendanceTable").DataTable().destroy();
            }
            $("#attendanceTable").DataTable();
        }, 500); // Delays initialization to ensure React renders data
    }, []);

    // Handle Month Change
    const handleMonthChange = async (e) => {
        try {
            const month = e.target.value;
            const year = new Date().getFullYear();
            const userId = userDetails.userId;

            const response = await axios.post(process.env.REACT_APP_API_URL + '/attend/selectmonthdate',
                { month, year },
                {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.success) {
                // console.log(response.data.data);
                setTableData(response.data.data);
            }


        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message || "Something went wrong!");
            } else {
                setMessage("Network error. Please try again later.");
            }
            setTableData([]);
            console.error("Error in selectMonthData:", error);
        }


    };



    // Select AttendanceEmployee Data
    const selectUserAllData = async () => {
        setIsLoading(true);  // Start loading
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + '/attend/selectuseralldata', {
                headers: {
                    Authorization: localStorage.getItem('token'),
                    "Content-Type": "application/json",
                },
            });

            if (response.data.success) {
                const attendanceData = response.data.data;
                const leaveData = response.data.leaves;

                // Get the current year and month
                const currentDate = new Date();
                const year = currentDate.getFullYear();
                const month = currentDate.getMonth(); // March = 2 (0-based index)

                // Get correct number of days in the month
                const daysInMonth = new Date(year, month + 1, 0).getDate();

                // Generate all dates of the current month
                let monthDates = [];
                for (let day = 1; day <= daysInMonth; day++) {
                    let formattedDate = new Date(Date.UTC(year, month, day)).toISOString().split("T")[0]; // YYYY-MM-DD
                    monthDates.push({
                        date: formattedDate,
                        punchin: "N/A",
                        punchout: "N/A",
                        status: "Absent",
                        leaveType: null, // Default no leave
                    });
                }

                // Merge attendance data (convert to YYYY-MM-DD for accurate comparison)
                let mergedData = monthDates.map(day => {
                    let record = attendanceData.find(att => att.date.split("T")[0] === day.date);

                    return record ? {
                        ...record,
                        status: "Present",
                        leaveType: null // Ensure no leave status if present
                    } : day;
                });

                // Merge leave data (check if the date falls within leave range)
                mergedData = mergedData.map(day => {
                    let leaveRecord = leaveData.find(leave => {
                        let fromDate = new Date(leave.fromdate).toISOString().split("T")[0]; // Convert to YYYY-MM-DD
                        let toDate = new Date(leave.todate).toISOString().split("T")[0];
                        return day.date >= fromDate && day.date <= toDate; // Check if date falls in leave range
                    });

                    return leaveRecord ? {
                        ...day,
                        status: "On Leave",
                        leaveType: leaveRecord.leavetype, // Store leave type
                        punchin: "N/A",
                        punchout: "N/A"
                    } : day;
                });

                setTableData(mergedData);
            } else {
                console.log("Something went wrong");
            }

        } catch (error) {
            console.error("Error in selectUserAllData:", error);
        } finally {
            setIsLoading(false);  // Stop loading
        }
    };



    // Select data by date range 
    const handleDataByRange = async () => {
        alert("df");
    }
    // calculateProductionTime
    function calculateProductionTime(punchIn, punchOut) {
        if (!punchIn || !punchOut) return "N/A";

        // Convert time to Date objects
        let inTime = new Date(`1970-01-01 ${punchIn}`);
        let outTime = new Date(`1970-01-01 ${punchOut}`);

        // Handle overnight shifts (if punchOut is past midnight)
        if (outTime < inTime) {
            outTime.setDate(outTime.getDate() + 1);
        }

        // Calculate difference in milliseconds
        let diff = outTime - inTime;

        // Convert milliseconds to hours, minutes, and seconds
        let hours = Math.floor(diff / 3600000);
        let minutes = Math.floor((diff % 3600000) / 60000);
        let seconds = Math.floor((diff % 60000) / 1000);

        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }

    // Function to get all dates of the current month
    const getCurrentMonthDates = () => {
        let dates = [];
        let daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let day = 1; day <= daysInMonth; day++) {
            let date = new Date(year, month, day);
            let formattedDate = date.toISOString().split("T")[0]; // Format YYYY-MM-DD
            dates.push(formattedDate);
        }
        return dates;
    };

    // Get all dates for the current month
    const monthDates = getCurrentMonthDates();


    return (
        <div>    <div className="main-wrapper">
            <Navbar />
            {/* Page Wrapper */}
            <div className="page-wrapper">
                <div className="content">
                    {/* Breadcrumb */}
                    <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
                        <div className="my-auto mb-2">
                            <h2 className="mb-1">Attendance Report</h2>
                            <nav>
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item">
                                        <a href="index.html">
                                            <i className="ti ti-smart-home" />
                                        </a>
                                    </li>
                                    <li className="breadcrumb-item">Employee</li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Attendance Report
                                    </li>
                                </ol>
                            </nav>
                        </div>

                    </div>
                    {/* /Breadcrumb */}

                    <div className="card">
                        <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                            <h5>Attendance Report</h5>
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

                                <div className="dropdown">
                                    <select className="dropdown-toggle btn btn-white d-inline-flex align-items-center" onChange={handleMonthChange}>
                                        <option value="all" selected>All</option>
                                        <option value="01">January</option>
                                        <option value="02">February</option>
                                        <option value="03">March</option>
                                        <option value="04">April</option>
                                        <option value="05">May</option>
                                        <option value="06">June</option>
                                        <option value="07">July</option>
                                        <option value="08">August</option>
                                        <option value="09">September</option>
                                        <option value="10">October</option>
                                        <option value="11">November</option>
                                        <option value="12">December</option>
                                    </select>


                                </div>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            <div className="custom-datatable-filter table-responsive">
                                {isLoading ? (
                                    <div class="d-flex justify-content-center py-5">
                                        <div class="spinner-border" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                ) : (
                                    <table className="table datatable">
                                        <thead className="thead-light">
                                            <tr>
                                                <th>Date</th>
                                                <th>Check In</th>
                                                <th>Status</th>
                                                <th>Check Out</th>
                                                <th>Late</th>
                                                <th>Overtime</th>
                                                <th>Production Hours</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tableData.length > 0 ? (
                                                tableData.map((item, index) => {
                                                    // Format date properly (07 Mar 2025)
                                                    const formattedDate = new Date(item.date).toLocaleDateString("en-GB", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    });

                                                    return (
                                                        <tr key={index}>
                                                            <td><strong>{formattedDate}</strong></td>
                                                            <td>{item.punchin}</td>
                                                            <td>
                                                                {item.status === "Present" ? (
                                                                    <span className="badge badge-success d-inline-flex align-items-center">
                                                                        <i className="ti ti-point-filled me-1" />
                                                                        Present
                                                                    </span>
                                                                ) : item.status === "On Leave" ? (
                                                                    <span className="badge badge-warning d-inline-flex align-items-center">
                                                                        <i className="ti ti-point-filled me-1" />
                                                                        {item.leaveType.replace("_", " ")} {/* Convert snake_case to readable */}
                                                                    </span>
                                                                ) : (
                                                                    <span className="badge badge-danger d-inline-flex align-items-center">
                                                                        <i className="ti ti-point-filled me-1" />
                                                                        Absent
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td>{item.punchout}</td>
                                                            <td>{item.status === "Present" ? "32 Min" : "N/A"}</td>
                                                            <td>{item.status === "Present" ? "20 Min" : "N/A"}</td>
                                                            <td>
                                                                <span className="badge badge-success d-inline-flex align-items-center">
                                                                    <i className="ti ti-clock-hour-11 me-1" />
                                                                    {item.status === "Present" ? calculateProductionTime(item.punchin, item.punchout) : "N/A"}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            ) : (
                                                <tr>
                                                    <td colSpan="7" className="text-center">No data available</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>

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
