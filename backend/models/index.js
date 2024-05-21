const { sequelize } = require('../config/postgreConfig');

const User = require('./userModel');
const Listing = require('./listingModel');
const ListingOwner = require('./listingOwnerModel');

// Associations
User.hasMany(Listing, { foreignKey: 'userId' });
Listing.belongsTo(User, { foreignKey: 'userId' });

Listing.hasMany(ListingOwner, { foreignKey: 'listingId' });
ListingOwner.belongsTo(Listing, { foreignKey: 'listingId' });

User.hasMany(ListingOwner, { foreignKey: 'userId' });
ListingOwner.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  Listing,
  ListingOwner,
};