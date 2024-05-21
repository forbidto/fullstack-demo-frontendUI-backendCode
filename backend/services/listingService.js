const { Listing } = require('../models/index');
const { Op, Sequelize } = require('sequelize');


//Create Listing Service
const createListing = async (
  userId, region, district, type, estate, block,
  phase, floor, unit, room, facilities, decorations, view,
  sellingPoints, isHaunt, price, priceWithoutLandPremium
) => {
  try {
    const createListingRes = await Listing.create(
      {
        userId, region, district, type, estate, block,
        phase, floor, unit, room, facilities, decorations, view,
        sellingPoints, isHaunt, price, priceWithoutLandPremium
      }
    );
    return createListingRes;
  } catch (error) {
    throw new Error(error.message);
  }
};

//Query Listing Service
const queryListing = async ({
  room, maxPrice, minPrice, maxArea, minArea, minBuildingAge,
  maxBuildingAge, type, district, keywords, userId, status, 
  sortField, sortOrder, limit, offset
}
) => {

  const filters = {};

  if (room) {
    filters.room = {
      [Op.in]: Array.isArray(room) ? room : [room]
    }
  }

  if (minPrice || maxPrice) {
    filters.price = {};
    if (minPrice) filters.price[Op.gte] = minPrice;
    if (maxPrice) filters.price[Op.lte] = maxPrice;
  }

  if (minArea || maxArea) {
    filters.area = {};
    if (minArea) filters.area[Op.gte] = minArea;
    if (maxArea) filters.area[Op.lte] = maxArea;
  }

  if (minBuildingAge || maxBuildingAge) {
    filters.buildingAge = {};
    if (minBuildingAge) filters.buildingAge[Op.gte] = minBuildingAge;
    if (maxBuildingAge) filters.buildingAge[Op.lte] = maxBuildingAge;
  }

  if (type) {
    filters.type = {
      [Op.in]: Array.isArray(type) ? type : [type]
    };
  }

  if (district) {
    filters.district = {
      [Op.in]: Array.isArray ? district : [district]
    };
  }

  if (keywords) {
    filters[Op.or] = [
      { estate: { [Op.like]: `%${keywords}%` } },
      { district: { [Op.like]: `%${keywords}%` } }
    ]
  }

    if (userId) {
      filters.userId = userId;
    }

    const order = [];

    if(sortField && sortOrder){
      if(sortField === 'pricePerUnitArea'){
        order.push([
          Sequelize.literal('price/area'), sortOrder
        ])
      }else {
      order.push([sortField, sortOrder]);
    }


  }

  try {
    const listings = await Listing.findAll({ 
      where: filters,
      order: order.length ? order : undefined,
      limit: limit ? limit : undefined,
      offset: offset ? offset : undefined
     });

    return { success: true, listings };

  } catch (error) {
    throw new Error(error.message);
  }


}
// Get Listing By Id Service

const getListingById = async (id) => {

  try {

    const listing = await Listing.findByPk(id);

    if (!listing) {
      return { success: true, message: "No Listing Found" }
    }
    return { success: true, listing }
  } catch (error) {
    throw new Error(error.message);
  }


}


const updateListingById = async (id, { price, priceWithoutLandPremium, facilities,
  decorations, view, sellingPoints }) => {

  try {

    const listing = await Listing.findByPk(id);

    if (!listing) {
      return { success: false, message: "No Listing Found" }
    }

    let needUpdate = false;

    if (price !== undefined && price !== listing.price) {
      listing.price = price;
      needUpdate = true
    }

    if (priceWithoutLandPremium !== undefined && priceWithoutLandPremium !== listing.priceWithoutLandPremium) {
      listing.priceWithoutLandPremium = priceWithoutLandPremium;
      needUpdate = true
    }
    if (facilities !== undefined && JSON.stringify(facilities) !== JSON.stringify(listing.facilities)) {
      listing.facilities = facilities;
      needUpdate = true
    }
    if (decorations !== undefined && JSON.stringify(decorations) !== JSON.stringify(listing.decorations)) {
      listing.decorations = decorations;
      needUpdate = true;
    }
    if (view !== undefined && JSON.stringify(view) !== JSON.stringify(listing.view)) {
      listing.view = view;
      needUpdate = true;
    }
    if (sellingPoints !== undefined && JSON.stringify(sellingPoints) !== JSON.stringify(listing.sellingPoints)) {
      listing.sellingPoints = sellingPoints;
      needUpdate = true;
    }

    if (needUpdate) {
      await listing.save();
    }

    return { success: true, listing };

  } catch (error) {
    throw new Error(error.message);
  }


}

//Delete Listing By Id

const deleteListingById = async (id) => {

  try {
    const deleteListing = await Listing.destroy(
      {
        where: { id }
      }
    );

    if (!deleteListing) {
      return { success: false, message: "Delete listing error" }
    }

    return { success: true, deleteListing };

  } catch (error) {
    throw new Error(error.message);
  }

}


module.exports = { createListing, queryListing, getListingById, updateListingById, deleteListingById }