const express = require('express');
const router = express.Router();
const User = require('../Models/UserModel');

// Add a job for a specific user
router.post('/add', async (req, res) => {
    try {
        const { userId, title, company, location, salary, status } = req.body;

        // Validate input
        if (!userId || !title || !company) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Add the job to the user's jobs array
        const newJob = { title, company, location, salary, status };
        user.jobs.push(newJob);

        await user.save(); // Save the updated user document

        res.status(201).json({ message: 'Job added successfully', jobs: user.jobs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding job', error: error.message });
    }
});

// Get jobs for a specific user
router.get('/:userId/jobs', async (req, res) => {
    try {
        const { userId } = req.params;

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ jobs: user.jobs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching jobs', error: error.message });
    }
});

module.exports = router;
