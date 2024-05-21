import React, { useRef, useState, useEffect, useCallback } from "react";
import HomeMap from "./HomeComponents/HomeMap";
import ListingListRow from "./ListingListRow";
import SearchFilter from "./SearchFilter";
import ListingCardGridMui from "./ListingCardGridMui";
import FavouriteListingCardGridMui from "./FavouriteListingCardGridMui";
import debounce from 'lodash.debounce';


const HomePage = () => {

    const [listStyle, setListStyle] = useState(false);
    const [listings, setListings] = useState([]);
    const [filters, setFilters] = useState({});
    const [sortField, setSortField] = useState("updatedAt");
    const [sortOrder, setSortOrder] = useState("ASC");


    const handleListStyleChange = (newListStyle) => {
        setListStyle(newListStyle);
    };


    //Fetch listing data initially
    const fetchInitialListings = useCallback(async () => {

        const queryParams = new URLSearchParams({
            limit: 100  // limit 100 for first fetching
          });
        try {
          const response = await fetch(`http://localhost:3001/api/listing?${queryParams.toString()}`);
          const data = await response.json();
          setListings(data.listings);
        } catch (error) {
          console.error('Error fetching initial listings:', error);
        }
      }, []);

    // Fetching listing data with filter and sorting
    const fetchListings = useCallback(debounce(async () => {
        const queryParams = new URLSearchParams({
            ...filters,
            sortField,
            sortOrder
        });

        try {
            const response = await fetch(`http://localhost:3001/api/listing?${queryParams.toString()}`);
            const data = await response.json();
            setListings(data.listings);
        } catch (error) {
            console.error('Error fetching listings:', error);
        }
    }, 300), [filters, sortField, sortOrder]);

    useEffect(() => {
        fetchInitialListings();
      }, [fetchInitialListings]);

      useEffect(() => {
        if (Object.keys(filters).length > 0) {
          fetchListings();
        }
      }, [filters, sortField, sortOrder, fetchListings]);

    const handleFilterChange = (newFilters) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            ...newFilters
        }));
    };

    useEffect(() => {
        console.log(filters);
        console.log(sortField);
        console.log(sortOrder)
    }, [filters, sortField, sortOrder]);

    const handleSortChange = (newSortField, newSortOrder) => {
        setSortField(newSortField);
        setSortOrder(newSortOrder);
    }


    // Fetch listings when the filter button is clicked
    const handleFilterAction = () => {
        fetchListings();
    }

    // Fetch listings when the search button is clicked
    const handleSearch = () => {
        fetchListings(); 
    };
 
    return (
        <div>
            <HomeMap />

            <SearchFilter onListStyleChange={handleListStyleChange}
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
                onFilterAction={handleFilterAction}
            />

            {listStyle === false ? (<ListingCardGridMui listings={listings} />) : ""}
            {listStyle === true ? (<ListingListRow listings={listings} />) : ""}
            <FavouriteListingCardGridMui />

        </div>

    )

}

export default HomePage;