import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import ListingCard from './HomeComponents/ListingCard';

const ListingCardGridMui = () => {
    const columnCount = 4;
  const cardData = Array.from({ length: 20 }); // Example data, replace with actual data

  return (
    <Container maxWidth="lg" style={{ padding: '4px', marginTop: '10px' }}>
      <div style={{ height: '900px', overflow: 'hidden' }}>
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
  )
  };
export default ListingCardGridMui;

