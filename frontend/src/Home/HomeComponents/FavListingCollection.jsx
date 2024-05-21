import React from "react";
import {Flex, Button, Heading} from '@aws-amplify/ui-react';
import {FaAngleRight } from 'react-icons/fa';
import ListingCard from "./ListingCard";

const FavListingCollection = () => {
    return (
    <Flex className="fav-list">
    <Flex className="fav-list-header">
    <Heading className="fav-list-header-text">收藏樓盤</Heading>
    <Button className="fav-list-header-more">更多收藏樓盤 <FaAngleRight/></Button>
    </Flex>
    <div className="fav-list-collection">
        <ListingCard/>
        <ListingCard/>
        <ListingCard/>
        <ListingCard/>      
        </div>
    </Flex>)
  
  };

  export default FavListingCollection;