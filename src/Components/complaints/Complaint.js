// import "../Addcss/Complaint.css";
import React, { useEffect, useState } from 'react';
import complaintService from "../../Services/ComplaintService";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';

const Complaint = () => {

    const navigate = useNavigate();

    const [response1, setResponse1] = useState('');
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [adderss, setAddress] = useState('');
    const [contactNum, setContactNum] = useState('');
    const [todayDate, setTodayDate] = useState('');


    const [email, setEmail] = useState('');
    const [complaintType, setComplaintType] = useState('');
    const [subComplaintType, setSubComplaintType] = useState('');
    const [complaintDescription, setComplaintDescription] = useState('');
    const [complaintLocation, setComplaintLocation] = useState('');

    const [showPopUp, setShowPopUp] = useState(false);
    const [complaintId, setComlaintId] = useState();

    const [mainComplaints, setMainComplaints] = useState([]);
    const [subComplaints, setSubComplaints] = useState([]);
    const { complainttype } = useParams();


    useEffect(() => {
        complaintService.getMainComplaints().then((res) => {
            setMainComplaints(res.data);
            console.log(mainComplaints);
        })
            .catch((err) => {
                console.error(err);
            });
    }, []);


    const handleComplaintType = (e) => {
        let complaintType = e.target.value;
        console.log(complaintType);
        setComplaintType(complaintType);

        complaintService.getSubComplaints(complaintType).then((res) => {
            console.log("res", res.data);
            setSubComplaints(res.data);
        })
            .catch((err) => {
                console.error(err);
            });

    }

    const handleComplaintSubType = (e) => {
        console.log(e.target.value);

        let complaintSubType = e.target.value;
        setSubComplaintType(complaintSubType);

    }

    const testHandle = (e) => {
        e.preventDefault();

        const data = {
            Complaint: {
                firstName: FirstName,
                lastName: LastName,
                address: adderss,
                contactNo: contactNum,
                email: email,
                complaintDesc: complaintDescription,
                complaintLoc: complaintLocation,
                regDate: new Date().toISOString().slice(0, 10)

            }
        }

        console.log(response1.tokenId);

        console.log(data)



    }

    const handleSubmit = (e) => {
        e.preventDefault();


        setTodayDate((new Date().toISOString().slice(0, 10)))
        console.log(todayDate);

        const data = {
            firstName: FirstName,
            lastName: LastName,
            address: adderss,
            contactNo: contactNum,
            email: email,
            complaintDesc: complaintDescription,
            complaintLoc: complaintLocation,
            mainType: complaintType,
            subType: subComplaintType,
            regDate: new Date().toISOString().slice(0, 10)

        }

        complaintService.registerComplaint(data).then((res) => {
            console.log("res", res.data);

            setComlaintId(res.data.tokenId);
            setShowPopUp(true);
            // navigate('/registeredcomplaint/' + res.data.tokenId);
        })
            .catch((err) => {
                console.error(err);
            });

    }

    const handleSubmit2 = (e) => {
        e.preventDefault();

        navigate('/AllUserComplaints')
    }

    return (
        <div>
            {
                showPopUp ? <Modal closePopUp={setShowPopUp} complaintId={complaintId}></Modal> : null
            }
            <div className="row justify-content-center box-height">

                <div className="col-9 align-self-center shadow-lg" style={{ backgroundColor: '#ebf2fa' }} >
                    <div className="row justify-content-center p-2">
                        < h2 className="textStyleHeading">Complaint Registration</h2>
                    </div>
                    <form className="form-inline" onSubmit={(e) => handleSubmit(e)} >
                        <div className="border border-2 p-1" >
                            <div className='row justify-content-center'>
                                <h3 className='p-2 rounded textStyle'>Personal Information
                                </h3>
                            </div>

                            <div>
                                <div className="mb-3 row justify-content-center">
                                    <label className="col-sm-3 col-form-label" >
                                        First Name :
                                    </label>
                                    <div className="col-sm-8">
                                        <input className="form-control " type="text" pattern="[A-Za-z\\s]*" title="First Name is not proper" placeholder="First Name" required onChange={(e) => { setFirstName(e.target.value) }} />
                                    </div>
                                </div>
                                <div className="mb-3 row justify-content-center">
                                    <label className="col-sm-3 col-form-label" >
                                        Last Name :
                                    </label>
                                    <div className="col-sm-8">
                                        <input className="form-control" type="text" placeholder="Last Name" required onChange={(e) => { setLastName(e.target.value) }} /><br />

                                    </div>
                                </div>
                                <div className="mb-3 row justify-content-center">
                                    <label className="col-sm-3 col-form-label">Address </label>
                                    <div className="col-sm-8">
                                        <textarea className="form-control" required placeholder="Enter your address here" onChange={(e) => { setAddress(e.target.value) }}></textarea>
                                    </div>
                                </div>
                                <div className="mb-3 row mx-4">
                                    <label className="col-sm-3 col-form-label">Contact Number </label>
                                    <div className="col-sm-4 mx-4">
                                        <input className="form-control" type="number" required placeholder="Contact number" onChange={(e) => { setContactNum(e.target.value) }} />

                                    </div>
                                </div>
                                <div className="mb-4 row mx-4">
                                    <label className="col-sm-3 col-form-label">Email </label>
                                    <div className="col-sm-4 mx-4">
                                        <input className="form-control" type="email" placeholder="name@example.com" required onChange={(e) => { setEmail(e.target.value) }} />
                                    </div>
                                </div>
                            </div>
                            <div className="border border-2 p-1" >
                                <div className='row justify-content-center'>
                                    <h3 className='p-2 rounded textStyle'>Complaint Information
                                    </h3>
                                </div>
                                <div className="mb-3 row mx-4">
                                    <label className="col-sm-3 col-form-label">Complaint type</label>
                                    <div className="col-sm-4 mx-4">

                                        <select className="form-control" required onChange={(e) => { handleComplaintType(e) }}>
                                            <option value="selectComplaint" disabled selected>Select Complaint Type</option>
                                            {mainComplaints.map((complaint) => (
                                                <option value={complaint}>{complaint}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-3 row mx-4">
                                    <label className="col-sm-3 col-form-label">Sub Complaint type</label>
                                    <div className="col-sm-4 mx-4">
                                        <select className="form-control" required onChange={(e) => { handleComplaintSubType(e) }}>
                                            <option value="selectSubComplaint" disabled selected>Select SubComplaint Type</option>
                                            {subComplaints.map((complaint) => (
                                                <option value={complaint}>{complaint}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-3 row justify-content-center">
                                    <label className="col-sm-3 col-form-label">Complaint Description </label>
                                    <div className="col-sm-8">
                                        <textarea className="form-control" type="text" required placeholder="Complaint Description" onChange={(e) => { setComplaintDescription(e.target.value) }} />
                                    </div>
                                </div>
                                <div className="mb-3 row justify-content-center">
                                    <label className="col-sm-3 col-form-label">Specify complaint location </label>
                                    <div className="col-sm-8">
                                        <textarea className="form-control" type="text" required placeholder="Complaint location" onChange={(e) => { setComplaintLocation(e.target.value) }} />
                                    </div>
                                </div>

                            </div>

                        </div>

                        <button value="test" onClick={testHandle}>Test</button>
                        <div className='wraper'>   <input type="submit" value="Submit" className='btn btn-lg' id='submitbutton' onSubmit={(e) => { handleSubmit(e) }} /></div>
                    </form>

                    <form onSubmit={(e) => { handleSubmit2(e) }}>
                        <div className='wraper'>   <input type="submit" value="Show All My Complaints" className='btn btn-lg' id='submitbutton' /></div>
                    </form>

                </div>
            </div>



        </div>

    )
}

export default Complaint;