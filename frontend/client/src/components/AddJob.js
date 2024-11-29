import React, { useState } from 'react';
import axios from 'axios';

const AddJob = () => {
    const [jobData, setJobData] = useState({
        title: '',
        company: '',
        location: '',
        salary: '',
        status: '',
    });

    // Retrieve userId and token from localStorage
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId || !token) {
            alert('User not authenticated. Please log in.');
            return;
        }

        const payload = { ...jobData, userId };

        try {
            const response = await axios.post('http://localhost:4001/api/jobs/add', payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            alert(response.data.message);
            setJobData({ title: '', company: '', location: '', salary: '', status: '' });
        } catch (err) {
            console.error('Error adding job:', err.response?.data || err.message);
            alert('Error adding job: ' + (err.response?.data.message || err.message));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={jobData.title}
                placeholder="Job Title"
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="company"
                value={jobData.company}
                placeholder="Company"
                onChange={handleChange}
            />
            <input
                type="text"
                name="location"
                value={jobData.location}
                placeholder="Location"
                onChange={handleChange}
            />
            <input
                type="number"
                name="salary"
                value={jobData.salary}
                placeholder="Salary"
                onChange={handleChange}
            />
            <input
                type="text"
                name="status"
                value={jobData.status}
                placeholder="Status"
                onChange={handleChange}
            />
            <button type="submit">Add Job</button>
        </form>
    );
};

export default AddJob;
