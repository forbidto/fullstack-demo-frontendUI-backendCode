import React from "react";
import { Flex, Button, Menu, MenuItem } from '@aws-amplify/ui-react';
import { FaFilter, FaAngleDown, FaPollH, FaProjectDiagram, FaArrowUp, FaArrowDown } from 'react-icons/fa';


const FilterBarResponsive = () => {

   const [listStyle, setListStyle] = useState(false);

    const roomType = ["開放式", "一房", "兩房", "三房", "其他"];
    const propertyType = ["私樓", "居屋", "公屋", "唐樓", "村屋"];

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filterOption, setFilterOption] = useState();
    const [priceRange, setPriceRange] = useState([0, 10000000000]);
    const [actualSizeRange, setActualSizeRange] = useState([0, 5000]);
    const [buildingYearRange, setBuildingYearRange] = useState([0, 180]);
    const filterRef = useRef(null);

    const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
    const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);


    const handleRoomTypeChange = (type) => {
        setSelectedRoomTypes((prevSelected) => {
            if (prevSelected.includes(type)) {
                return prevSelected.filter((selectedType) => selectedType !== type)
            } else {
                return [...prevSelected, type];
            }
        })
    }

    const handlePropertyTypeChange = (type) => {
        setSelectedPropertyTypes((prevSelected) => {
            if (prevSelected.includes(type)) {
                // If already selected, remove it
                return prevSelected.filter((selectedType) => selectedType !== type);
            } else {
                // If not selected, add it
                return [...prevSelected, type];
            }
        });
    };

    const filterExpression = {
        roomType: selectedRoomTypes,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        minActualSize: actualSizeRange[0],
        maxActualSize: actualSizeRange[1],
        minBuildingYear: buildingYearRange[0],
        maxBuildingYear: buildingYearRange[1],
        propertyType: selectedPropertyTypes
    };


    const handlePriceInputChange = (index) => (event) => {
        const newValueText = event.target.value;
        const cleanValueText = newValueText.replace(/[^\d]/g, '');

        // Parse the cleaned value as an integer
        const newValueNumber = parseInt(cleanValueText, 10); // Remove non-numeric characters and parse as float
        if (!isNaN(newValueNumber)) {
            const newPriceRange = [...priceRange];
            newPriceRange[index] = newValueNumber;
            setPriceRange(newPriceRange);
        }
    };


    const handlePriceChange = debounce((event, newValue) => {
        setPriceRange(newValue);
    }, 50);

    const handlePriceBlur = () => {
        if (priceRange[0] < 0) {
            setPriceRange([0, priceRange[1]]);
        } else if (priceRange[1] > 100000000) {
            setPriceRange([priceRange[0], 100000000]);
        }
    };


    const handleActualSizeInputChange = (index) => (event) => {
        const newValueText = event.target.value;
        const cleanValueText = newValueText.replace(/[^\d]/g, '');
        const newValueNumber = parseInt(cleanValueText, 10);
        if (!isNaN(newValueNumber)) {
            const newActualSizeRange = [...actualSizeRange];
            newActualSizeRange[index] = newValueNumber;
            setActualSizeRange(newActualSizeRange);
        }
    }

    const handleActualSizeChange = debounce((event, newValue) => {
        setActualSizeRange(newValue)
    }, 50);

    const handleActualSizeBlur = () => {
        if (actualSizeRange[0] < 0) {
            setActualSizeRange([0, actualSizeRange[1]]);
        } else if (actualSizeRange[1] > 5000) {
            setActualSizeRange([actualSizeRange[0], 5000]);
        }
    }



    const handleBuildingYearInputChange = (index) => (event) => {
        const newValueText = event.target.value;
        const cleanValueText = newValueText.replace(/[^\d]/g, '');
        const newValueNumber = parseInt(cleanValueText, 10);
        if (!isNaN(newValueNumber)) {
            const newBuildingYearRange = [...buildingYearRange];
            newBuildingYearRange[index] = newValueNumber;
            setBuildingYearRange(newBuildingYearRange);
        }
    }

    const handleBuildingYearChange = debounce((event, newValue) => {
        setBuildingYearRange(newValue);
    }, 50);


    const handleBuildingYearBlur = () => {
        if (buildingYearRange[0] < 0) {
            setBuildingYearRange([0, buildingYearRange[1]]);
        } else if (buildingYearRange[1] > 180) {
            setBuildingYearRange([buildingYearRange[0], 180]);
        }
    };


    const handleFilterOption = (filterType) => {
        setIsFilterOpen(true);
        setFilterOption(filterType)
    }


    useEffect(() => {

        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target) && isFilterOpen) {
                console.log(filterRef);
                setIsFilterOpen(false);
            }
        };

        console.log(filterExpression)

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isFilterOpen]);



    const handleListStyleChange = (listStyle) => {
        switch (listStyle) {
            case "list":
                setListStyle(true)
                break;
            case "card":
                setListStyle(false)
                break;

            default:
                setListStyle(false)
                break;
        }

    } 


    return (
        <Flex className="filter-bar">

                {/*  FILTER BUTTON STYLE */}

                <Flex className="filter-condition">
                    <Button className="filter-button"><FaFilter size="1.8vh" /></Button>
                    <Button className="filter-item" onClick={() => handleFilterOption("rT")}>間隔<FaAngleDown className="filter-item-icon" /></Button>
                    <Button className="filter-item" onClick={() => handleFilterOption("p")}>價格<FaAngleDown className="filter-item-icon" /></Button>
                    <Button className="filter-item" onClick={() => handleFilterOption("aS")}>實用面積<FaAngleDown className="filter-item-icon" /></Button>
                    <Button className="filter-item" onClick={() => handleFilterOption("bY")} >樓齡<FaAngleDown className="filter-item-icon" /></Button>
                    <Button className="filter-item" onClick={() => handleFilterOption("pT")}>物業類型<FaAngleDown className="filter-item-icon" /></Button>
                    <Button className="filter-save">儲存搜尋</Button>
                </Flex>




                {/*  FILTE MENU STYLE */}

                <Flex className="filter-menu" direction="row" marginLeft="3%">
                    <Menu className="filter-menu">
                        <MenuItem className="filter-item">儲存記錄</MenuItem>
                        <MenuItem className="filter-item">間隔</MenuItem>
                        <MenuItem className="filter-item">價格</MenuItem>
                        <MenuItem className="filter-item">實用面積</MenuItem>
                        <MenuItem className="filter-item">樓齡</MenuItem>
                        <MenuItem className="filter-item">物業類型</MenuItem>
                    </Menu>
                    <Button className="filter-save">儲存搜尋</Button>
                </Flex>



                <Flex className="filter-style">
                    <Flex className="filter-format">
                        <Button onClick={() => handleListStyleChange("card")} className="list-style"><FaProjectDiagram size="2vh" /></Button>
                        <Button onClick={() => handleListStyleChange("list")} className="list-style"><FaPollH size="2vh" /></Button>
                    </Flex>
                    <Button className="filter-button"><FaArrowUp size="1vh" /><FaArrowDown size="1vh" /></Button>
                </Flex>


            </Flex>

            {isFilterOpen === true ? (<Card variation="elevated" className="filter-option-card" ref={filterRef}>
                <Flex className="filter-option-checkbox-gp">
                    {filterOption === "rT" && (roomType.map((type, index) => (
                        <CheckboxField
                            key={index}
                            label={type}
                            value={type}
                            checked={selectedRoomTypes.includes(type)}
                            onChange={() => handleRoomTypeChange(type)}
                        />
                    )))}
                    {filterOption === "pT" && (propertyType.map((type, index) => (
                        <CheckboxField
                            key={index}
                            label={type}
                            value={type}
                            checked={selectedPropertyTypes.includes(type)}
                            onChange={() => handlePropertyTypeChange(type)}
                        />
                    )))}
                    {filterOption === "p" && (
                        <Box className="filter-price-gp">
                            <Typography variant="h6" id="range-slider" gutterBottom>
                                價格範圍
                            </Typography>
                            <Slider
                                value={priceRange}
                                onChange={handlePriceChange}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                min={0}
                                max={100000000}
                                valueLabelFormat={(value) => formatToHKCurrency(value)}
                            />
                            <div className="price-filter-input-container">
                                <span>HK$</span>
                                <TextField
                                    value={formatWithCommas(priceRange[0])}
                                    onChange={handlePriceInputChange(0)}
                                    onBlur={handlePriceBlur}
                                    inputProps={{
                                        step: 100000,
                                        min: 0,
                                        max: 100000000,
                                        type: 'text',
                                        'aria-labelledby': 'input-slider',
                                    }}
                                />
                                <span>至</span>
                                <TextField
                                    value={formatWithCommas(priceRange[1])}
                                    onChange={handlePriceInputChange(1)}
                                    onBlur={handlePriceBlur}
                                    inputProps={{
                                        step: 100000,
                                        min: 0,
                                        max: 100000000,
                                        type: 'text',
                                        'aria-labelledby': 'input-slider',
                                    }}
                                />
                            </div>
                        </Box>
                    )}


                    {filterOption === "aS" && (
                        <Box className="filter-price-gp">
                            <Typography variant="h6" id="range-slider" gutterBottom>
                                實用面積
                            </Typography>
                            <Slider
                                value={actualSizeRange}
                                onChange={handleActualSizeChange}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                min={0}
                                max={5000}
                                valueLabelFormat={(value) => `${value}呎`}
                            />
                            <div className="price-filter-input-container">
                                <TextField
                                    value={formatWithCommas(actualSizeRange[0])}
                                    onChange={handleActualSizeInputChange(0)}
                                    onBlur={handleActualSizeBlur}
                                    inputProps={{
                                        step: 1,
                                        min: 0,
                                        max: 5000,
                                        type: 'text',
                                        'aria-labelledby': 'input-slider',
                                    }}
                                />
                                <span>至</span>
                                <TextField
                                    value={formatWithCommas(actualSizeRange[1])}
                                    onChange={handleActualSizeInputChange(1)}
                                    onBlur={handleActualSizeBlur}
                                    inputProps={{
                                        step: 1,
                                        min: 0,
                                        max: 5000,
                                        type: 'text',
                                        'aria-labelledby': 'input-slider',
                                    }}
                                />
                                <span>呎</span>
                            </div>
                        </Box>
                    )}


                    {filterOption === "bY" && (
                        <Box className="filter-price-gp">
                            <Typography variant="h6" id="range-slider" gutterBottom>
                                樓齡
                            </Typography>
                            <Slider
                                value={buildingYearRange}
                                onChange={handleBuildingYearChange}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                min={0}
                                max={180}
                                valueLabelFormat={(value) => `${value}年`}
                            />
                            <div className="price-filter-input-container">
                                <span>約</span>
                                <TextField
                                    value={formatWithCommas(buildingYearRange[0])}
                                    onChange={handleBuildingYearInputChange(0)}
                                    onBlur={handleBuildingYearBlur}
                                    inputProps={{
                                        step: 1,
                                        min: 0,
                                        max: 180,
                                        type: 'text',
                                        'aria-labelledby': 'input-slider',
                                    }}
                                />
                                <span>至</span>
                                <TextField
                                    value={formatWithCommas(buildingYearRange[1])}
                                    onChange={handleBuildingYearInputChange(1)}
                                    onBlur={handleBuildingYearBlur}
                                    inputProps={{
                                        step: 1,
                                        min: 0,
                                        max: 180,
                                        type: 'text',
                                        'aria-labelledby': 'input-slider',
                                    }}
                                />
                                <span>年</span>
                            </div>
                        </Box>
                    )}
                </Flex>
            </Card>) : ""}
            

};

export default FilterBarResponsive;