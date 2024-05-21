const express = require('express');
const { createListingControl,
    queryListingsControl,
    getListingByIdControl,
    updateListingControl,
    deleteListingControl } = require('../controllers/listingController');

const router = express.Router();

// Create a new listing
router.post('/', createListingControl);

// Get all listings or search listings with query parameters
router.get('/', queryListingsControl);

// Get listings by userId
router.get('/user/:userId', queryListingsControl);

// Get a specific listing by ID
router.get('/:id', getListingByIdControl);

// Update a specific listing by ID
router.put('/:id', updateListingControl);

// Delete a specific listing by ID
router.delete('/:id', deleteListingControl);

module.exports = router;