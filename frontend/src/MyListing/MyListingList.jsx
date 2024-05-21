import { Heading, Flex, Button, TableHead, Table, TableCell, TableBody, Text, Badge, ToggleButton, TableRow } from "@aws-amplify/ui-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchMyListing } from "../store/actions/myListingAction";
import { useDispatch, useSelector } from "react-redux";
import { myListingsQuery } from "../store/reducers/myListingReducer";
import { useNavigate } from 'react-router-dom';
import { FixedSizeList as List } from 'react-window';







const MyListingList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const listingStatus = ['全部', "待審批", "待簽署", "生效中", "已過期", "已暫停", "已售", "已拒絕"]
    const [selectedListingStatus, setSelectedListingStatus] = useState();

    const { listings, nextToken } = useSelector((state) => state.myListings);

    useEffect(() => {
        console.log('listings', listings)
    }, [])


    const TableHeader = () => {
        return (

            <Flex className="list-table-row" height="60px" >
                <div className="list-table-row-cell list-table-estate-width">物業名稱</div>
                <div className="list-table-row-cell">地區</div>
                <div className="list-table-row-cell">樓齡</div>
                <div className="list-table-row-cell">實用面積</div>
                <div className="list-table-row-cell list-table-price-width">呎價</div>
                <div className="list-table-row-cell list-table-price-width">樓價(港幣)</div>
                <div className="list-table-row-cell">到期日</div>
                <div className="list-table-row-cell">狀態</div>
                <div className="list-table-row-cell"></div>
            </Flex>

        )
    }

    const ListRow = ({ index, style, data }) => {
        //const listing = data[index];
        return (
            <Flex className="list-table-row" style={{ ...style, cursor: 'pointer' }}>
                <div className="list-table-row-cell list-table-body-cell-estate" onClick={()=>{navigate("/mylisting/detail")}}>
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
                <div className="list-table-row-cell">2023-12-28</div>
                <div className="list-table-row-cell" onClick={()=>{navigate("/mylisting/sellhousef3")}}>已生效</div>
                <div className="list-table-row-cell">
                    <div>Like</div>
                    <div>View</div>
                    <div>Chat</div>
                </div>
            </Flex>
        );
    };


    /*   useEffect(() => {
  
          const userId = "test";
  
  
          const fetchData = async () => {
  
              if (nextToken === null) {
                  const fetchResult = await fetchMyListing(userId);
                  const fetchResultLength = fetchResult.myListingData.data.listMyListings.items.length;
                  console.log('fetchResultLength:', fetchResultLength)
                  console.log('fetchResult:', fetchResult)
                  if (listings.length >= fetchResultLength) {
                      console.log("listing state:", listings)
                      return fetchResult
                  } else {
                      dispatch(myListingsQuery(fetchResult.myListingData))
                      console.log("listing state:", listings)
                  }
  
              }
  
  
  
          }
          fetchData()
      }, []) */

    return (
        <Flex className="my-listing-page-gp">

            <Heading className="my-listing-page-header">樓盤</Heading>

            <Text className="my-listing-page-sub-heading">樓盤廣告將於地產代理協議表格3 的到期日自動移除，若欲繼續放盤，須重新簽署地產代理協議。</Text>

            <Flex className="my-listing-status-button-gp" direction="row">
                {listingStatus.map((status, index) => {
                    return (
                        <ToggleButton
                            className='sell-house-form-button'
                            key={index}
                            value={status}
                            isPressed={selectedListingStatus === status}
                            onClick={() => setSelectedListingStatus(status)}>
                            {status}
                        </ToggleButton>
                    );
                })}
            </Flex>

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

        </Flex>
    )
}


export default MyListingList


{/* <Flex className="my-listing-table-gp">

<Table>
    <TableHead>
        <TableRow className="my-list-table-head">
            <TableCell className="my-list-table-head" as="th">物業名稱</TableCell>
            <TableCell as="th">位置</TableCell>
            <TableCell as="th">樓齡</TableCell>
            <TableCell as="th">實用面積</TableCell>
            <TableCell as="th">呎價</TableCell>
            <TableCell as="th">樓價(港幣)</TableCell>
            <TableCell as="th">到期日</TableCell>
            <TableCell as="th">狀態</TableCell>
            <TableCell as="th"></TableCell>
        </TableRow>
    </TableHead>
    <TableBody>
        {listings.map((listing, index) => {

            const pricePerSqft = (listing.price / listing.actualArea).toFixed(0);
            return (

                <TableRow key={index} onClick={() => listing.status === '已批核' ? navigate(`/mylisting/sellhousef3/${listing.id}`) : navigate('/mylisting/detail')}>
                    <TableCell>
                        <Flex className="row-display-listing-name-gp" direction="column">
                            <Flex direction="column">
                                <Text>{listing.adsNumber}</Text>
                                <Text>{listing.estate}</Text>
                                <Text>{listing.level}</Text>
                            </Flex>
                            <Flex className="row-display-listing-name-tag" direction="row">
                                <Badge size="small">連車位</Badge>
                                <Badge size="small">連車位連車位</Badge>
                                <Badge size="small">連車位連車位</Badge>
                            </Flex>
                        </Flex>
                    </TableCell>
                    <TableCell>{listing.district}</TableCell>
                    <TableCell>{listing.buildingYear} 年</TableCell>
                    <TableCell>{listing.actualArea} sqft</TableCell>
                    <TableCell>
                        <Flex className="row-display-listing-sqft-price" direction="column">
                            <Text>{new Intl.NumberFormat('zh-HK', { style: 'currency', currency: 'HKD', }).format(pricePerSqft)}/sqft</Text>
                            <Text>呎價B</Text>
                        </Flex>
                    </TableCell>
                    <TableCell>
                        <Flex className="row-display-listing-sqft-price" direction="column">
                            <Text>{new Intl.NumberFormat('zh-HK', { style: 'currency', currency: 'HKD', }).format(listing.price)}</Text>
                            <Text>樓價B</Text>
                        </Flex>
                    </TableCell>
                    <TableCell>
                        <Flex className="row-display-listing-sqft-price" direction="column">
                            <Text>{listing.deadline}</Text>
                            <Text>REmaining day</Text>
                        </Flex>
                    </TableCell>
                    <TableCell>{listing.status}</TableCell>
                    <TableCell>
                        <Flex className="row-display-listing-sqft-price" direction="column">
                            <Text>View</Text>
                            <Text>Like</Text>
                            <Text>Chat</Text>
                        </Flex>
                    </TableCell>
                </TableRow>
            )


        })}
    </TableBody>
</Table>

</Flex>
 */}



{/* <TableBody>
                        {listings.map((listing, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Flex className="row-display-listing-name-gp" direction="column">
                                        <Text>{listing.adsNumber}</Text>
                                        <Text>{listing.estate}</Text>
                                        <Text>{listing.level}</Text>
                                        <Flex className="row-display-listing-name-tag" direction="row">
                                            <Badge>test</Badge>
                                            <Badge>test</Badge>
                                            <Badge>test</Badge>
                                        </Flex>
                                    </Flex>
                                </TableCell>
                                <TableCell>{listing.district}</TableCell>
                                <TableCell>{listing.buildingYear}</TableCell>
                                <TableCell>實用面積</TableCell>
                                <TableCell>
                                    <Flex className="row-display-listing-sqft-price" direction="column">
                                        <Text>呎價A</Text>
                                        <Text>呎價B</Text>
                                    </Flex>
                                </TableCell>
                                <TableCell>
                                    <Flex className="row-display-listing-sqft-price" direction="column">
                                        <Text>樓價A</Text>
                                        <Text>樓價B</Text>
                                    </Flex>
                                </TableCell>
                                <TableCell>
                                    <Flex className="row-display-listing-sqft-price" direction="column">
                                        <Text>到期日</Text>
                                        <Text>REmaining day</Text>
                                    </Flex>
                                </TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>
                                    <Flex className="row-display-listing-sqft-price" direction="column">
                                        <Text>View</Text>
                                        <Text>Like</Text>
                                        <Text>Chat</Text>
                                    </Flex>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody> */}