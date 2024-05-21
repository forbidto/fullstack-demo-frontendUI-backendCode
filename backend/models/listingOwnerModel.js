const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/postgreConfig');

const ListingOwner = sequelize.define('ListingOwner', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    listingId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    type: {
        type: DataTypes.ENUM('公司業主', '個人業主'),
        allowNull: false,
    },
    ownerName: { type: DataTypes.STRING, allowNull: false },
    directorName: { type: DataTypes.STRING, allowNull: true },
    ownerHkId: { type: DataTypes.STRING, allowNull: false },
    ownerPhone: { type: DataTypes.STRING, allowNull: false },
    bussinessRegistrationId: { type: DataTypes.STRING, allowNull: true },
    companyAddress: { type: DataTypes.STRING, allowNull: true },
}
    ,
    {
        timestamps: true,  // This enables automatic timestamp management
    });


module.exports = ListingOwner;