const { createListing, queryListing, getListingById, updateListingById, deleteListingById } = require('../services/listingService');

// Create Listing Controller
const createListingControl = async (req, res) => {
  const { userId, region, district, type, estate, block,
    phase, floor, unit, room, facilities, decorations, view,
    sellingPoints, isHaunt, price, priceWithoutLandPremium
  } = req.body
  try {
    const createListingRes = await createListing({
      userId, region, district, type, estate, block,
      phase, floor, unit, room, facilities, decorations, view,
      sellingPoints, isHaunt, price, priceWithoutLandPremium
    }
    );
    res.status(201).json(createListingRes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get all listings or search listings with query parameters
const queryListingsControl = async (req, res) => {
  const { room, maxPrice, minPrice, maxArea, minArea, minBuildingAge,
    maxBuildingAge, type, district, keywords, userId, status, sortField, sortOrder } = req.query;
  try {
    const listings = await queryListing({
      room, maxPrice, minPrice, maxArea, minArea, minBuildingAge,
      maxBuildingAge, type, district, keywords, userId, status, sortField, sortOrder
    }
    );
    res.status(201).json(listings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific listing by ID
const getListingByIdControl = async (req, res) => {
  const id = req.params.id;

  try {
    const listing = await getListingById(id);

    if (!listing.success) {
      res.status(404).json({ error: 'Listing not found' });
    }

    res.status(200).json(listing);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }


}


// Update a specific listing by ID

const updateListingControl = async (req, res) => {
  const id = req.params.id

  const { price, priceWithoutLandPremium, facilities,
    decorations, view, sellingPoints } = req.body

  try {

    const updateListing =await updateListingById(id, {
      price, priceWithoutLandPremium, facilities, decorations, view, sellingPoints
    })

    if (!updateListing.success) {

      res.status(404).json({ error: updateResult.message });
    }

    res.status(200).json(updateResult.listing);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}

//Delete a specific listing by ID

const deleteListingControl = async (req, res) => {

  const id = req.params.id

  try {

    const deleteListing = await deleteListingById(id);

    if(!deleteListing.success){
     res.status(404).json({error:deleteListing.message})
    }

    res.status(200).json(deleteListing)

  } catch (error) {
    res.status(500).json({ error: error.message });
  }


}





module.exports = { createListingControl, queryListingsControl, getListingByIdControl, updateListingControl, deleteListingControl };