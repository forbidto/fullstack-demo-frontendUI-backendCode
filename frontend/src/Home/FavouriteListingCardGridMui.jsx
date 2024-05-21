import React from 'react';
import { Container, Grid } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Flex, Heading, Button } from '@aws-amplify/ui-react';
import ListingCard from './HomeComponents/ListingCard';
import { FaAngleRight } from 'react-icons/fa';

const FavouriteListingCardGridMui = () => {
    const cardData = Array.from({ length: 8 }); // Example data, replace with actual data

   
    return (

        <Flex className="fav-list">
            <Flex className="fav-list-header">
                <Heading className="fav-list-header-text">收藏樓盤</Heading>
                <Button className="fav-list-header-more">更多收藏樓盤 <FaAngleRight /></Button>
            </Flex>
            <Container maxWidth="lg" style={{ padding: '4px', marginTop: '10px' }}>
                <div style={{ height: '500px', overflow: 'hidden' }}>
                    <PerfectScrollbar>
                        <Grid container spacing={1}>
                            {cardData.map((_, index) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                    <div style={{ width: '100%', maxWidth: '280px', margin: '0 auto' }}>
                                        <ListingCard />
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                    </PerfectScrollbar>
                </div>
            </Container>
        </Flex>

    );
};

export default FavouriteListingCardGridMui;
