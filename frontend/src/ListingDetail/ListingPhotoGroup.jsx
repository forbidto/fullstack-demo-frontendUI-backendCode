import React, { useEffect, useState } from "react";


const ListingPhotoGroup = ({ allImages, onMainImageChange }) => {


    return (
        <div className="list-detail-image-grid-container">
            {allImages.map((image, index) => (
                <div className="list-detail-image-grid-item" key={index}>
                    {image ? <img src={image} alt="list" onClick={() => { onMainImageChange(image) }} /> : <p>Loading...</p>}
                </div>
            ))}
        </div>
    )
}

export default ListingPhotoGroup