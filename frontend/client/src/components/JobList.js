import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobList = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost:4001/jobs');
                setJobs(response.data);
            } catch (err) {
                console.error('Error fetching jobs:', err);
            }
        };

        fetchJobs();
    }, []);

    return (
        <ul>
            {jobs.map((job) => (
                <li key={job._id}>
                    {job.title} at {job.company} ({job.location})
                </li>
            ))}
        </ul>
    );
};

export default JobList;
