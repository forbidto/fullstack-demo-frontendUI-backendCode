const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/postgreConfig');
const ListingOwner = require('./listingOwnerModel');
const User = require('./userModel');

const Listing = sequelize.define('Listing', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  userId:{
    type: DataTypes.UUID,
    allowNull: false,
  },
  region: { type: DataTypes.STRING, allowNull: false },
  district: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false },
  estate: { type: DataTypes.STRING, allowNull: false },
  block: { type: DataTypes.STRING, allowNull: false },
  phase: { type: DataTypes.STRING, allowNull: false },
  floor: { type: DataTypes.STRING, allowNull: false },
  unit: { type: DataTypes.STRING, allowNull: false },
  roomType: { type: DataTypes.STRING, allowNull: false },
  facilities: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
  decorations: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
  view: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
  sellingPoints: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
  isHaunt: { type: DataTypes.BOOLEAN, allowNull: false },
  size: {type: DataTypes.INTEGER, allowNull:true},
  price: { type: DataTypes.INTEGER, allowNull: false },
  priceWithoutLandPremium: { type: DataTypes.INTEGER, allowNull: true },
  buildingAge: { type: DataTypes.INTEGER, allowNull: true },
  listingImages:{
    type: DataTypes.ARRAY(DataTypes.UUID),
    allowNull: true,
  },
  adsId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  approvalStatus: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending',
    allowNull: false,
  },
  
},
{
  timestamps: true,  // This enables automatic timestamp management
}
);

module.exports = Listing;