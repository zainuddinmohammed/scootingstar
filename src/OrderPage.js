import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderPage.css';
import './Background.css';

import icon from './logo.png'

const OrderPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contactMethod, setContactMethod] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [dateTimePairs, setDateTimePairs] = useState([{ date: '', time: '' }]);
    const [advertiseLocation, setAdvertiseLocation] = useState('');
    const [selection, setSelection] = useState('');
    const [design, setDesign] = useState(null); // Updated to store the file object
    const [details, setDetails] = useState('');
    const [isPending, setIsPending] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('contactMethod', contactMethod);
        formData.append('description', description);
        formData.append('startDate', startDate);
        formData.append('startTime', startTime);
        formData.append('endDate', endDate);
        formData.append('endTime', endTime);
        formData.append('eventLocation', eventLocation);
        formData.append('dateTimePairs', JSON.stringify(dateTimePairs));
        formData.append('advertiseLocation', advertiseLocation);
        formData.append('selection', selection);
        formData.append('details', details);

        if (design) {
            formData.append('design', design);
        }

        fetch('http://localhost:3001/order', {
            method: 'POST',
            body: formData,
        }).then(() => {
            console.log('Submission success');
            setIsPending(false);
            navigate('/order/thanks');
        }).catch(err => {
            console.error('Error submitting form:', err);
            setIsPending(false);
        });
    };

    const handleFileChange = (e) => {
        setDesign(e.target.files[0]); // Updated to store the file object
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const handleDetailsChange = (e) => {
        setDetails(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const handleDateChange = (index, value) => {
        const updatedPairs = [...dateTimePairs];
        updatedPairs[index].date = value;
        setDateTimePairs(updatedPairs);
    };

    const handleTimeChange = (index, value) => {
        const updatedPairs = [...dateTimePairs];
        updatedPairs[index].time = value;
        setDateTimePairs(updatedPairs);
    };

    const addDateTimePair = () => {
        setDateTimePairs([...dateTimePairs, { date: '', time: '' }]);
    };

    const removeDateTimePair = (index) => {
        const updatedPairs = dateTimePairs.filter((_, i) => i !== index);
        setDateTimePairs(updatedPairs);
    };

    return (
        <div className="background">

            <img src={icon} alt="profile" className="icon"/>

            <h1>Make an Order <br/></h1>
            <form onSubmit={handleSubmit}>

                <hr className="divider"/>

                <label>Name/Student Organization*</label>
                <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label>Email*</label>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Preferred Method of Contact (include username for social media)*</label>
                <input
                    type="text"
                    required
                    value={contactMethod}
                    onChange={(e) => setContactMethod(e.target.value)}
                />

                <hr className="divider"/>

                <label>Brief Description of Event/Student Organization* (I may decline if the event/organization is too
                    controversial/political)</label>
                <textarea
                    required
                    value={description}
                    onChange={handleDescriptionChange}
                    style={{resize: 'none', overflow: 'hidden'}}
                    rows="1"
                ></textarea>

                <label>Event Start Date/Time*</label>
                <div className="date-time-container">
                    <input
                        type="date"
                        required
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <input
                        type="time"
                        required
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                </div>

                <label>Event End Date/Time*</label>
                <div className="date-time-container">
                    <input
                        type="date"
                        required
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    <input
                        type="time"
                        required
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                    />
                </div>

                <label>Event Location*</label>
                <input
                    type="text"
                    required
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                />

                <hr className="divider"/>

                <label>Dates/Times for me to advertise.
                    I will decide only one day before your event date if left blank (Cost is $10/day).
                    I will contact you in case the date/time does not line up with my schedule.
                </label>
                {dateTimePairs.map((pair, index) => (
                    <div className="date-time-container" key={index}>
                        <input
                            type="date"
                            value={pair.date}
                            onChange={(e) => handleDateChange(index, e.target.value)}
                        />
                        <select
                            value={pair.time}
                            onChange={(e) => handleTimeChange(index, e.target.value)}
                        >
                            <option>Any time</option>
                            <option>11:15 AM - 11:30 AM</option>
                            <option>12:45 PM - 1:00 PM</option>
                            <option>2:15 PM - 2:30 PM</option>
                        </select>
                        <button type="button" onClick={() => removeDateTimePair(index)}>X</button>
                    </div>
                ))}

                <button type="button" onClick={addDateTimePair}>Add Date/Time</button>

                <label>Any (on-campus) location to advertise in? I will decide if left blank.</label>
                <input
                    type="text"
                    value={advertiseLocation}
                    onChange={(e) => setAdvertiseLocation(e.target.value)}
                />

                <hr className="divider"/>

                <label>Poster type*</label>
                <select
                    required
                    value={selection}
                    onChange={(e) => setSelection(e.target.value)}
                >
                    <option value="">Select a poster type</option>
                    <option>Poster (You design)</option>
                    <option>Whiteboard (I design)</option>
                    <option>Other (Describe in last section)</option>
                </select>

                <label>
                    Upload poster design{selection === 'Poster (You design)' ? '*' : ''}
                </label>
                <input
                    type="file"
                    name="design"
                    required={selection === 'Poster (You design)'}
                    accept="image/*"
                    onChange={handleFileChange}
                />

                <hr className="divider"/>

                <label>Any other details (instructions, etc.)?</label>
                <textarea
                    value={details}
                    onChange={handleDetailsChange}
                    style={{resize: 'none', overflow: 'hidden'}}
                    rows="1"
                ></textarea>

                <hr className="divider"/>

                {!isPending && <button type="submit">Submit</button>}
                {isPending && <button disabled>Submitting...</button>}

            </form>
        </div>
    );
}

export default OrderPage;