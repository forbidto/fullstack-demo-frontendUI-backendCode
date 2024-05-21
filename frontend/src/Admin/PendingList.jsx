import React, { useState, useEffect } from "react";
import debounce from 'lodash.debounce';
import { Flex, Button, Divider, SelectField, Table, TableHead, TableRow, TableCell, Text, TableBody } from "@aws-amplify/ui-react";
import Slider from '@mui/material/Slider';
import { Typography, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import { generateClient } from 'aws-amplify/api';
import { useNavigate } from 'react-router-dom';
import { fetchPendingListings } from "../store/actions/adminApprovePendingListAction";
import { useDispatch, useSelector } from "react-redux";
import { clearPendingListingsState, nextPendingListingsQuery, selectFilteredResult } from "../store/reducers/adminPendingListingReducer";
import { FixedSizeList as List, FixedSizeGrid as Grid } from 'react-window';



const PendingList = () => {

    const client = generateClient();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedRegion, setSelectedRegion] = useState("");
    const [districtOptions, setDistrictOptions] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 100000000]);


    const pendingStatus = ["待審批", "待簽署", "生效中", "已過期", "已暫停", "已售", "已拒絕"];
    const hkRegions = ["香港", "九龍", "新界", "離島"];
    const hkDistricts = ["堅尼地城", "西營盤", "石塘咀", "中上環", "中西半山", "灣仔", "金鐘", " 銅鑼灣", "跑馬地", "天后", "大坑", "北角", "炮台山", "鰂魚涌", "太古城", "西灣河", "筲箕灣", "杏花邨", "柴灣", "小西灣", "石澳", "香港仔", "鴨脷洲", "黃竹坑", "南區"];
    const kwDistricts = ["藍田", "油塘", "觀塘", "牛頭角", "九龍灣", "牛池灣", "鑽石山", "樂富", "土瓜灣", "九龍城", "啟德", "新蒲崗", "黃大仙", "九龍塘", "何文田", "又一村", "深水埗", "石硤尾", "南昌", "荔枝角", "長沙灣", "美孚", "荔景", "大角咀", "奧運", '九龍站', '太子', '旺角', '油麻地', '佐敦', '尖沙咀', '紅磡', '黃埔'];
    const ntDistricts = ["西貢", "清水灣", "將軍澳", "康城", "馬鞍山", "沙田", "大圍", "火炭", "大埔", "太和", "粉嶺", "上水", "元朗", "洪水橋", "天水圍", "屯門", "深井（荃灣）", "荃灣", "大窩口", "葵涌", "葵芳", "青衣", "沙頭角"];
    const isDistricts = ['馬灣', '愉景灣', '東涌', '南大嶼山', '大澳', '坪洲', '南丫島', '長洲', '其他離島'];
    const propertyTypes = [
        "私樓", "居屋", "公屋", "唐樓", "村屋"
    ];


    const pendingListingsCache = useSelector((state) => state.pendingListingsCache);


    const handleSelectRegion = (event) => {
        const selectedValue = event.target.value
        setSelectedRegion(selectedValue);

        switch (selectedValue) {
            case "香港":
                setDistrictOptions(hkDistricts);
                break;
            case "九龍":
                setDistrictOptions(kwDistricts);
                break;
            case "新界":
                setDistrictOptions(ntDistricts);
                break;
            case "離島":
                setDistrictOptions(isDistricts);
                break;

            default:
                break;
        }


    }

    const [sortDirection, setSortDirection] = useState("DESC")

    const { listings, nextToken } = useSelector(state => state.pendingListingsCache)




    const handleScroll = ({ visibleStopIndex }) => {
        if (filterListings.length === visibleStopIndex && nextToken != null) {
            fetchPendingListings(status, sortDirection, dispatch, nextToken);
        } else if (nextToken != null) {
            return (
                <div>No more data</div>
            )
        }
    }

    const debouncedHandleScroll = debounce(handleScroll, 200)

    const [filters, setFilters] = useState({
        district: null,
        priceMin: null,
        priceMax: null,
        status: '待審批',
        type: null
    });

    const { type, status, priceMin, priceMax, district } = filters;

    const filterListings = useSelector(selectFilteredResult(type, status, priceMin, priceMax, district));

    const handleFilterChange = (filterKey, value) => {
        if(filterKey === "status"){
            dispatch(clearPendingListingsState())
            setFilters(prev => ({ ...prev, [filterKey]: value }));
        }else{setFilters(prev => ({ ...prev, [filterKey]: value }))};
    };

    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
        setFilters(prevFilters => ({
            ...prevFilters,
            priceMin: newValue[0],
            priceMax: newValue[1]
        }));
    };

    const [showSlider, setShowSlider] = useState(false);

    const handleInputChange = (index) => (event) => {
        const newRange = [...priceRange];
        newRange[index] = event.target.value === '' ? '' : Number(event.target.value);
        setPriceRange(newRange);
        setFilters(prevFilters => ({
            ...prevFilters,
            priceMin: newRange[0],
            priceMax: newRange[1]
        }));
    };

    const handleBlur = () => {
        if (priceRange[0] < 0) {
            setPriceRange([0, priceRange[1]]);
        } else if (priceRange[1] > 10000000) {
            setPriceRange([priceRange[0], 10000000]);
        }
    };


    const handleFilterSearch = () => {

    }

    useEffect(() => {

        const fetchData = async () => {

            if(nextToken === null){
                const fetchResult = await fetchPendingListings(status, sortDirection, nextToken);
                console.log("pendingListingsCache:", pendingListingsCache);
                console.log("fetchResult:", fetchResult);
                console.log('filter:', filters)
                const fetchResultLength = fetchResult.listingData.data.listPendingListings.items.length
                if (pendingListingsCache.listings.length >= fetchResultLength) {
                    return fetchResult
                } else {
                    dispatch(nextPendingListingsQuery(fetchResult.listingData))
                }
            }
        }

        fetchData()
    }, [status]);


    console.log("filterListings:", filterListings)

    const resetFilters = () => {
        setFilters({
            district: null,
            priceMin: null,
            priceMax: null,
            state: null,
            type: null
        });
    };


    const TableHeader = () => {
        return (

            <div className="pending_list_table_row">
                <div className="pending_list_table_estate">物業名稱</div>
                <div className="pending_list_table_district">地區</div>
                <div className="pending_list_table_price">樓價</div>
                <div className="pending_list_table_type">物業類型</div>
                <div className="pending_list_table_createdAt">提交日期</div>
                <div className="pending_list_table_status">狀態</div>
                <div className="pending_list_table_adsNumber">物業編號</div>
                <div className="pending_list_table_createdAt">要求簽署日期</div>
            </div>

        )
    }

    //cursor: 'pointer'
    const Row = ({ index, style, data }) => {
        const listing = data[index];
        return (
            <div className="pending_list_table_row" style={{ ...style, cursor: 'pointer' }} onClick={() => navigate(`/admin/pendinglist/detail/${listing.id}`)}>
                <div className="pending_list_table_estate">{listing.estate}</div>
                <div className="pending_list_table_district">{listing.district}</div>
                <div className="pending_list_table_price">{new Intl.NumberFormat('zh-HK', { style: 'currency', currency: 'HKD', }).format(listing.price)}</div>
                <div className="pending_list_table_type">{listing.type}</div>
                <div className="pending_list_table_createdAt">{listing.createdAt.slice(0, 10)}</div>
                <div className="pending_list_table_status">{listing.status}</div>
                <div className="pending_list_table_adsNumber">{listing.adsNumber}</div>
                <div className="pending_list_table_createdAt">{listing.signSchedule}</div>
            </div>
        );
    };



    return (

        <Flex className="admin_pending_list_gp" direction="column">
            <Flex className="admin_pending_list_top_divide" direction="row">
                <Button className="admin_pending_list_top_button">賣盤</Button>
                <Button className="admin_pending_list_top_button">租盤</Button>
            </Flex>
            <Divider />

            <Flex className="admin_pending_list_sortField-gp" direction="row">
                <Flex className="admin_pending_list_sortField">
                    <SelectField onChange={(e) => handleFilterChange('status', e.target.value)}>
                        {pendingStatus.map((status, index) => (
                            <option value={status} key={index}>{status}</option>
                        ))
                        }
                    </SelectField>
                    <SelectField placeholder="區域" onChange={handleSelectRegion}>
                        {hkRegions.map((region, index) => (
                            <option value={region} key={index}>{region}</option>
                        ))}
                    </SelectField>
                    <SelectField placeholder="地區" onChange={(e) => handleFilterChange('district', e.target.value)}>
                        {districtOptions.map((district, index) => (
                            <option value={district} key={index}>{district}</option>
                        ))}
                    </SelectField>
                    <Button className="filter_price_button" onClick={() => setShowSlider(!showSlider)}>價格範圍</Button>

                    <SelectField placeholder="物業類型" onChange={(e) => handleFilterChange('type', e.target.value)}>
                        {propertyTypes.map((type, index) => (
                            <option value={type} key={index}>{type}</option>
                        ))}
                    </SelectField>
                    <Button>搜尋</Button>
                </Flex>
                <Button>十 放盤</Button>
            </Flex>

            {showSlider && (
                <Box>
                    <Typography id="range-slider" gutterBottom>
                        價格範圍
                    </Typography>
                    <Slider
                        value={priceRange}
                        onChange={handlePriceChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={10000000}
                    />
                    <TextField
                        value={priceRange[0]}
                        onChange={handleInputChange(0)}
                        onBlur={handleBlur}
                        inputProps={{
                            step: 100000,
                            min: 0,
                            max: 10000000,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                    <TextField
                        value={priceRange[1]}
                        onChange={handleInputChange(1)}
                        onBlur={handleBlur}
                        inputProps={{
                            step: 100000,
                            min: 0,
                            max: 10000000,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Box>
            )}

            <Text>共30個放盤</Text>

            {/*  <Table>
                <TableHead>
                    <TableRow>
                        <TableCell as="th">物業名稱</TableCell>
                        <TableCell as="th">地區</TableCell>
                        <TableCell as="th">樓價</TableCell>
                        <TableCell as="th">物業類型</TableCell>
                        <TableCell as="th">提交日期</TableCell>
                        <TableCell as="th">狀態</TableCell>
                        <TableCell as="th">物業編號</TableCell>
                        <TableCell as="th">要求簽署日期</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listings.map(listing => (
                        <TableRow key={listing.id} style={{ cursor: 'pointer' }} onClick={() => navigate(listing.id)}>
                            <TableCell>{listing.estate}</TableCell>
                            <TableCell>{listing.district}</TableCell>
                            <TableCell>{new Intl.NumberFormat('zh-HK', { style: 'currency', currency: 'HKD', }).format(listing.price)}</TableCell>
                            <TableCell>{listing.type}</TableCell>
                            <TableCell>{listing.createdAt.slice(0, 10)}</TableCell>
                            <TableCell>{listing.status}</TableCell>
                            <TableCell>{listing.status}</TableCell>
                            <TableCell>NA</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table> */}

            <TableHeader />
            <List
                height={800} // Adjust as needed
                itemCount={filterListings.length}
                itemSize={80} // Adjust row height
                itemData={filterListings}
                width="100%"
                onItemsRendered={({ visibleStopIndex }) => debouncedHandleScroll({ visibleStopIndex })}
            >
                {Row}
            </List>





        </Flex>




    )



}

export default PendingList