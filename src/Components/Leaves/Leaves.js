import React, { useState, useEffect } from 'react'
import Navbar from '../ClientSide/Navbar'
import { Button, Modal } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import $ from "jquery";
import "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import { applyLeave, selectLeave } from './LeaveService';
import { empLeave } from '../Admin/Empleave';


export default function Leaves() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [succMsg, setSuccMsg] = useState('');
    const [tableData, setTableData] = useState([]);
    const [updatedLeave, setUpdatedLeave] = useState(null);
    // Amin start
    const [empleave, setEmpLeave] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            const response = await empLeave();
            if (response && response.data) {
                setEmpLeave(response.data[0]); // Ensure response.data is an object
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        // Ensure DataTable does not initialize multiple times
        setTimeout(() => {
            if ($.fn.DataTable.isDataTable("#leaveTable")) {
                $("#leaveTable").DataTable().destroy();
            }
            $("#leaveTable").DataTable();
        }, 500); // Delays initialization to ensure React renders data
    }, []);


    const calculateTotalLeave = () => {
        if (!empleave) return 0;
        return (
            Number(empleave.annual_leave) +
            Number(empleave.casual_leave) +
            Number(empleave.medical_leave) +
            Number(empleave.other_leave)
        );
    };

    const calculateRemainlLeave = () => {
        if (!empleave) return 0;

        let totalLeave = {
            annual_leave: Number(empleave.annual_leave),
            casual_leave: Number(empleave.casual_leave),
            medical_leave: Number(empleave.medical_leave),
            other_leave: Number(empleave.other_leave)
        };

        // Subtract leave based on selected leaves
        tableData.forEach(({ leavetype, noofday }) => {
            if (totalLeave.hasOwnProperty(leavetype)) {
                totalLeave[leavetype] -= Number(noofday);
            }
        });

        return (
            totalLeave.annual_leave +
            totalLeave.casual_leave +
            totalLeave.medical_leave +
            totalLeave.other_leave
        );
    };

    useEffect(() => {
        calculateUpdatedLeave();
    }, [tableData, empleave]); // Recalculate when tableData or empleave changes

    const calculateUpdatedLeave = () => {
        if (!empleave) return;

        let newLeaveBalances = {
            annual_leave: Number(empleave.annual_leave),
            casual_leave: Number(empleave.casual_leave),
            medical_leave: Number(empleave.medical_leave),
            other_leave: Number(empleave.other_leave)
        };

        // Subtract leave based on selected leaves
        tableData.forEach(({ leavetype, noofday }) => {
            if (newLeaveBalances.hasOwnProperty(leavetype)) {
                newLeaveBalances[leavetype] -= Number(noofday);
            }
        });

        // Format numbers as 01, 02, etc.
        Object.keys(newLeaveBalances).forEach(key => {
            newLeaveBalances[key] = newLeaveBalances[key].toString().padStart(2, '0');
        });

        setUpdatedLeave(newLeaveBalances); // Store updated leave balances
    };


    // Admin end 

    const [LeaveData, setLeaveData] = useState({
        fromdate: "",
        todate: "",
        type: "",
        leavetype: "",
        noofday: "",
        reason: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeaveData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

    }
    const handleData = async (e) => {
        e.preventDefault();
        if (!LeaveData.fromdate || !LeaveData.todate || !LeaveData.type || !LeaveData.leavetype || !LeaveData.noofday || !LeaveData.reason) {
            setErrorMsg('Please fill all the fields');
            setTimeout(() => {
                setErrorMsg('');
                handleClose();
            }, 4000);
            return;
        }

        try {
            const response = await applyLeave(LeaveData);

            if (response.success) {
                setSuccMsg(response.message);
                setTimeout(() => {
                    setSuccMsg('');
                    handleClose();
                    setLeaveData({
                        fromdate: "",
                        todate: "",
                        type: "",
                        leavetype: "",
                        noofday: "",
                        reason: ""
                    });
                }, 400);
                selectLeaveData();

            } else {
                console.log(response.message);
            }

        } catch (error) {
            console.log(error);
        }

    }
    // User Leave Select API
    const selectLeaveData = async () => {
        try {
            const response = await selectLeave();

            if (response.success) {
                const filterData = response.data.map(({ leavetype, noofday }) => ({
                    leavetype,
                    noofday
                }));
                // console.log(filterData);
                setTableData(response.data);
                calculateUpdatedLeave();
            } else {
                console.log(response.message);
            }

        } catch (error) {
            console.log(error);
        }

    }
    // Date Format  
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    useEffect(() => {
        selectLeaveData();
    }, []);







    return (
        <div>
            <div className="main-wrapper">
                <Navbar />
                <div className="page-wrapper">
                    <div className="content">
                        {/* Breadcrumb */}
                        <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
                            <div className="my-auto mb-2">
                                <h2 className="mb-1">Leaves</h2>
                                <nav>
                                    <ol className="breadcrumb mb-0">
                                        <li className="breadcrumb-item">
                                            <a href="index.html">
                                                <i className="ti ti-smart-home" />
                                            </a>
                                        </li>
                                        <li className="breadcrumb-item">Employee</li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            Leaves
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
                                <div className="mb-2">
                                    <a
                                        href="#"
                                        onClick={handleShow}
                                        className="btn btn-primary d-flex align-items-center"
                                    >
                                        <i className="ti ti-circle-plus me-2" />
                                        Add Leave
                                    </a>
                                </div>
                                <div className="head-icons ms-2">
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
                        {/* Leaves Info */}
                        <div className="row">
                            <div className="col-xl-3 col-md-6">
                                <div className="card bg-black-le">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="text-start">
                                                <p className="mb-1">Annual Leaves</p>
                                                {empleave?.annual_leave ? <h4>{empleave.annual_leave}</h4> : null}
                                            </div>
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 me-2">
                                                    <span className="avatar avatar-md d-flex">
                                                        <i className="ti ti-calendar-event fs-32" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="badge bg-secondary-transparent">

                                            Remaining Leaves :  {updatedLeave && updatedLeave.annual_leave}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card bg-blue-le">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="text-start">
                                                <p className="mb-1">Medical Leaves</p>
                                                {empleave?.medical_leave ? <h4>{empleave.medical_leave}</h4> : null}
                                            </div>
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 me-2">
                                                    <span className="avatar avatar-md d-flex">
                                                        <i className="ti ti-vaccine fs-32" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="badge bg-info-transparent">
                                            Remaining Leaves : {updatedLeave && updatedLeave.medical_leave}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card bg-purple-le">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="text-start">
                                                <p className="mb-1">Casual Leaves</p>
                                                {empleave?.casual_leave ? <h4>{empleave.casual_leave}</h4> : null}
                                            </div>
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 me-2">
                                                    <span className="avatar avatar-md d-flex">
                                                        <i className="ti ti-hexagon-letter-c fs-32" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="badge bg-transparent-purple">
                                            Remaining Leaves : {updatedLeave && updatedLeave.casual_leave}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card bg-pink-le">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="text-start">
                                                <p className="mb-1">Other Leaves</p>
                                                <h4>{empleave.other_leave}</h4>
                                            </div>
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 me-2">
                                                    <span className="avatar avatar-md d-flex">
                                                        <i className="ti ti-hexagonal-prism-plus fs-32" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="badge bg-pink-transparent">
                                            Remaining Leaves : {updatedLeave && updatedLeave.other_leave}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /Leaves Info */}
                        {/* Leaves list */}
                        <div className="card">
                            <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                                <div className="d-flex">
                                    <h5 className="me-2">Leave List</h5>
                                    <span className="badge bg-primary-transparent me-2">
                                        Total Leaves : {calculateTotalLeave()}
                                    </span>
                                    <span className="badge bg-secondary-transparent">
                                        Total Remaining Leaves : {calculateRemainlLeave()}
                                    </span>
                                </div>
                                <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                                    <div className="me-3">
                                        <div className="input-icon-end position-relative">
                                            <input
                                                type="text"
                                                className="form-control date-range bookingrange"
                                                placeholder="dd/mm/yyyy - dd/mm/yyyy"
                                            />
                                            <span className="input-icon-addon">
                                                <i className="ti ti-chevron-down" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="dropdown me-3">
                                        <select className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center">
                                            <option>Leave Type</option>
                                            <option className="dropdown-item rounded-1">Medical Leave</option>
                                            <option className="dropdown-item rounded-1">Casual Leave</option>
                                            <option className="dropdown-item rounded-1">Annual Leave</option>
                                        </select>
                                    </div>
                                    <div className="dropdown me-3">
                                        <select className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center">
                                            <option>Approved By</option>
                                            <option className="dropdown-item rounded-1">Team Leader</option>
                                            <option className="dropdown-item rounded-1">Senior Manager</option>
                                            <option className="dropdown-item rounded-1">Manager</option>
                                        </select>
                                    </div>
                                    <div className="dropdown me-3">
                                        <select className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center">
                                            <option> Select Status</option>
                                            <option className="dropdown-item rounded-1">Approved</option>
                                            <option className="dropdown-item rounded-1">Declined</option>
                                            <option className="dropdown-item rounded-1">New</option>
                                        </select>

                                    </div>

                                </div>
                            </div>
                            <div className="card-body p-0">
                                <div className="custom-datatable-filter table-responsive">
                                    <table className="table datatable" id='leaveTable'>
                                        <thead className="thead-light">
                                            <tr>

                                                <th>Leave Type</th>
                                                <th>From</th>
                                                <th>Approved By</th>
                                                <th>To</th>
                                                <th>No of Days</th>
                                                <th>Status</th>
                                                <th />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tableData.map((item, index) => (

                                                <tr key={index}>

                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <p className="fs-14 fw-medium d-flex align-items-center mb-0">
                                                                {item.leavetype === "medical_leave" ? "Medical Leave" :
                                                                    item.leavetype === "casual_leave" ? "Casual Leave" :
                                                                        item.leavetype === "annual_leave" ? "Annual Leave" :
                                                                            item.leavetype === "other_leave" ? "Other Leave" : item.leavetype}
                                                            </p>
                                                            <a
                                                                href="#"
                                                                className="ms-2"
                                                                data-bs-toggle="tooltip"
                                                                data-bs-placement="right"
                                                                data-bs-title="I am currently experiencing a fever and
                                          feeling unwell."
                                                            >
                                                                <i className="ti ti-info-circle text-info" />
                                                            </a>
                                                        </div>
                                                    </td>
                                                    <td>{formatDate(item.fromdate)}</td>
                                                    <td>
                                                        <div className="d-flex align-items-center file-name-icon">
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="avatar avatar-md border avatar-rounded"
                                                            >
                                                                <img
                                                                    src="assets/img/users/user-34.jpg"
                                                                    className="img-fluid"
                                                                    alt="img"
                                                                />
                                                            </a>
                                                            <div className="ms-2">
                                                                <h6 className="fw-medium">
                                                                    <a href="javascript:void(0);">Doglas Martini</a>
                                                                </h6>
                                                                <span className="fs-12 fw-normal ">Manager</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{formatDate(item.todate)}</td>
                                                    <td>{item.noofday} Days</td>
                                                    <td>
                                                        <div className="dropdown">
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
                                                                data-bs-toggle="dropdown"
                                                            >
                                                                <span className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2">
                                                                    <i className="ti ti-point-filled text-success" />
                                                                </span>{" "}
                                                                Approved
                                                            </a>
                                                            <ul className="dropdown-menu  dropdown-menu-end p-3">
                                                                <li>
                                                                    <a
                                                                        href="javascript:void(0);"
                                                                        className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"
                                                                    >
                                                                        <span className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2">
                                                                            <i className="ti ti-point-filled text-success" />
                                                                        </span>
                                                                        Approved
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        href="javascript:void(0);"
                                                                        className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"
                                                                    >
                                                                        <span className="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2">
                                                                            <i className="ti ti-point-filled text-danger" />
                                                                        </span>
                                                                        Declined
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        href="javascript:void(0);"
                                                                        className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"
                                                                    >
                                                                        <span className="rounded-circle bg-transparent-purple d-flex justify-content-center align-items-center me-2">
                                                                            <i className="ti ti-point-filled text-purple" />
                                                                        </span>
                                                                        New
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="action-icon d-inline-flex">
                                                            <a
                                                                href="#"
                                                                className="me-2"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#edit_leaves"
                                                            >
                                                                <i className="ti ti-edit" />
                                                            </a>
                                                            <a
                                                                href="javascript:void(0);"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#delete_modal"
                                                            >
                                                                <i className="ti ti-trash" />
                                                            </a>
                                                        </div>
                                                    </td>
                                                </tr>

                                            ))}



                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {/* /Leaves list */}
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
                    {/* MODAL  */}
                    <Modal size="lg" show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Leave <br />
                                {succMsg && <p className="text-success">{succMsg}</p>}
                            </Modal.Title>

                        </Modal.Header>
                        <form onSubmit={handleData}>
                            <Modal.Body>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3" >
                                            <label className="form-label">Leave Type</label>

                                            <div>
                                                <select className="form-control w-100" name='leavetype' onChange={handleChange} value={LeaveData.leavetype}>
                                                    <option>Select</option>
                                                    <option value="medical_leave">
                                                        Medical Leave
                                                    </option>
                                                    <option value="casual_leave">
                                                        Casual Leave
                                                    </option>
                                                    <option value="annual_leave">
                                                        Annual Leave
                                                    </option>
                                                </select>
                                            </div>
                                            {errorMsg && <p className="text-danger">{errorMsg}</p>}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">From </label>
                                            <div className="relative w-full max-w-xs">
                                                <DatePicker
                                                    className="form-control w-full py-2 pl-10 pr-4 border rounded-md"
                                                    name='fromdate'
                                                    selected={startDate}
                                                    value={LeaveData.fromdate}
                                                    onChange={(date) => {
                                                        setStartDate(date);
                                                        // Manually call handleChange with an event-like object
                                                        handleChange({ target: { name: "fromdate", value: date } });
                                                    }}
                                                    placeholderText="MM/DD/YYYY"
                                                />
                                            </div>
                                            {errorMsg && <p className="text-danger">{errorMsg}</p>}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">To </label>
                                            <div className="relative w-full max-w-xs">
                                                <DatePicker
                                                    className="form-control w-full py-2 pl-10 pr-4 border rounded-md"
                                                    name='todate'
                                                    selected={endDate}
                                                    value={LeaveData.todate}
                                                    onChange={(date) => {
                                                        setEndDate(date);
                                                        // Manually call handleChange with an event-like object
                                                        handleChange({ target: { name: "todate", value: date } });
                                                    }}
                                                    placeholderText="MM/DD/YYYY"
                                                />
                                            </div>
                                            {errorMsg && <p className="text-danger">{errorMsg}</p>}
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3" data-select2-id="select2-data-14-bf3d">
                                            <label className="form-label">Type</label>
                                            <div>
                                                <select className="form-control w-100" name='type' value={LeaveData.type} onChange={handleChange} >
                                                    <option value="">Select Leave Type</option>
                                                    <option value="Full Day">Full Day</option>
                                                    <option value="First Half">First Half</option>
                                                    <option value="Second Half">Second Half</option>
                                                </select>
                                            </div>
                                            {errorMsg && <p className="text-danger">{errorMsg}</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">No of Days</label>
                                            <input type="number" className="form-control" onChange={handleChange} name='noofday' />
                                            {errorMsg && <p className="text-danger">{errorMsg}</p>}
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Remaining Days</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                defaultValue={8}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Reason</label>
                                            <textarea className="form-control" name='reason' value={LeaveData.reason} onChange={handleChange} rows={3} />
                                        </div>
                                    </div>
                                </div>




                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                &nbsp;&nbsp;
                                <Button type='submit' variant="primary">
                                    Add Leave
                                </Button>
                            </Modal.Footer>
                        </form>
                    </Modal>
                </div>
                {/* /Page Wrapper */}


            </div>
        </div >
    )
}
