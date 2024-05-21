import React from "react";
import { FixedSizeList as List } from 'react-window';
import { Flex, Text, Button, Badge } from "@aws-amplify/ui-react";
import { useState } from 'react';
import { useEffect } from 'react';

const TableHeader = () => {
    return (

        <Flex className="list-table-row" height="60px" >
            <div className="list-table-row-cell list-table-estate-width">物業名稱</div>
            <div className="list-table-row-cell">地區</div>
            <div className="list-table-row-cell">樓齡</div>
            <div className="list-table-row-cell">實用面積</div>
            <div className="list-table-row-cell list-table-price-width">呎價</div>
            <div className="list-table-row-cell list-table-price-width">樓價</div>
            <div className="list-table-row-cell">物業類型</div>
            <Flex className="list-row-price-change-header-gp ">
                <div>30天叫價</div>
                <div>(%變化)</div>
            </Flex>
            <div className="list-table-row-cell"></div>
        </Flex>

    )
}


const ListRow = ({ index, style, data }) => {
    //const listing = data[index];
    return (
        <Flex className="list-table-row" style={{ ...style, cursor: 'pointer' }}>
            <div className="list-table-row-cell list-table-body-cell-estate">
                <div>物業編號:hfsalkjxziadadad</div>
                <div>物業名稱:太湖花園2期A座</div>
                <div>高層</div>
                <Flex className="row-display-list-name-tag">
                    <Badge size="small" className="list-table-row-badge" >連車位</Badge>
                    <Badge size="small" className="list-table-row-badge">海景</Badge>
                    <Badge size="small" className="list-table-row-badge">連車位海景</Badge>
                </Flex>
            </div>
            <div className="list-table-row-cell">沙田</div>
            <div className="list-table-row-cell">52年</div>
            <div className="list-table-row-cell">479呎</div>
            <div className="list-table-row-cell list-table-price-width">
                <div>未補地價</div>
                <div>{new Intl.NumberFormat('zh-HK', { style: 'currency', currency: 'HKD', }).format(10000)}/sqft</div>
                <div>已補地價</div>
                <div>{new Intl.NumberFormat('zh-HK', { style: 'currency', currency: 'HKD', }).format(10000)}</div>
            </div>
            <div className="list-table-row-cell list-table-price-width">
                <div>未補地價</div>
                <div>{new Intl.NumberFormat('zh-HK', { style: 'currency', currency: 'HKD', }).format(4900000)}</div>
                <div>已補地價</div>
                <div>{new Intl.NumberFormat('zh-HK', { style: 'currency', currency: 'HKD', }).format(3800000)}</div>
            </div>
            {/*             <div className="list_table_body_row_cell list_table_price_width">test</div> */}
            <div className="list-table-row-cell">私樓</div>
            <div className="list-table-row-cell">test</div>
            <div className="list-table-row-cell">
                <div>Like</div>
                <div>View</div>
                <div>Chat</div>
            </div>
        </Flex>
    );
};



const ListingListRow = () => {



    const [mobileState, setMobileState] = useState(false)


    useEffect(() => {
        // Update the column count and grid width when the window is resized
        function handleResize() {
            const screenWidth = window.screen.width;

            if (768 > screenWidth) {
                setMobileState(true)
                console.log('screenWidth', screenWidth)
            } else {
                setMobileState(false)
            }
        }

        window.addEventListener('resize', handleResize);


        return () => {
            // Remove the event listener when the component unmounts
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <div>
            <div className="list_row_display_gp">
                <TableHeader />
                <List
                    height={600} // Adjust as needed
                    itemCount={5}
                    itemSize={120} // Adjust row height
                    //itemData={filterListings}
                    width="100%"
                //onItemsRendered={({ visibleStopIndex }) => debouncedHandleScroll({ visibleStopIndex })}
                >
                    {ListRow}
                </List>
            </div>


            <div className="my-listing-table-mobile-container">
                <Flex className="my-listing-table">
                    <TableHeader />
                    <List
                        height={400}
                        itemCount={5}
                        itemSize={120}
                        width="100%"
                    >
                        {ListRow}
                    </List>
                </Flex>
            </div>


        </div>




    )



}




export default ListingListRow


