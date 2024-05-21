import React, { useState, useEffect, useRef } from "react";
import debounce from 'lodash.debounce';
import { Flex, Button, Input, Text, CheckboxField, Card } from '@aws-amplify/ui-react';
import { FaSearch, FaAngleDown, FaVectorSquare, FaSlidersH, FaSort, FaList, FaBars } from 'react-icons/fa';
import Slider from '@mui/material/Slider';
import { Box } from '@mui/material';
import { formatToHKCurrency, formatWithCommas } from "../store/utils/authUtils";


const SearchFilter = (
  { onListStyleChange, onFilterChange, onSortChange }
) => {

  const [districtTableIsOpen, setDistrictTableIsOpen] = useState(false);
  const [selectedRegion, setselectedRegion] = useState("")
  const tableRef = useRef(null);
  const regions = {
    "hkDistricts": ["堅尼地城", "西營盤", "石塘咀", "中上環", "中西半山", "灣仔", "金鐘", " 銅鑼灣", "跑馬地", "天后", "大坑", "北角", "炮台山", "鰂魚涌", "太古城", "西灣河", "筲箕灣", "杏花邨", "柴灣", "小西灣", "石澳", "香港仔", "鴨脷洲", "黃竹坑", "南區"],
    "kwDistricts": ["藍田", "油塘", "觀塘", "牛頭角", "九龍灣", "牛池灣", "鑽石山", "樂富", "土瓜灣", "九龍城", "啟德", "新蒲崗", "黃大仙", "九龍塘", "何文田", "又一村", "深水埗", "石硤尾", "南昌", "荔枝角", "長沙灣", "美孚", "荔景", "大角咀", "奧運", '九龍站', '太子', '旺角', '油麻地', '佐敦', '尖沙咀', '紅磡', '黃埔'],
    "ntDistricts": ["西貢", "清水灣", "將軍澳", "康城", "馬鞍山", "沙田", "大圍", "火炭", "大埔", "太和", "粉嶺", "上水", "元朗", "洪水橋", "天水圍", "屯門", "深井（荃灣）", "荃灣", "大窩口", "葵涌", "葵芳", "青衣", "沙頭角"],
    "isDistricts": ['馬灣', '愉景灣', '東涌', '南大嶼山', '大澳', '坪洲', '南丫島', '長洲', '其他離島']
  };
  const sortItems = ["最近上架", "實用呎價(低至高)", "實用呎價(高至低)", "價格(低至高)", "價格(高至低)", "實用面積(低至高)", "實用面積(高至低)"];
  const sortIndexMap = {
    0: {sortField:"updatedAt", sortOrder:"DESC"},
    1: {sortField:"size", sortOrder:"ASC"},
    2: {sortField:"size", sortOrder:"DESC"},
    3: {sortField:"price", sortOrder:"ASC"},
    4: {sortField:"price", sortOrder:"DESC"},
    5: {sortField:"pricePerUnitArea", sortOrder:"ASC"},
    6: {sortField:"pricePerUnitArea", sortOrder:"DESC"},
  }



  const roomType = ["開放式", "一房", "兩房", "三房", "其他"];
  const propertyType = ["私樓", "居屋", "公屋", "唐樓", "村屋"];

  const [keywords, setKeywords] = useState();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterOption, setFilterOption] = useState();
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000000000]);
  const [sizeRange, setSizeRange] = useState([0, 5000]);
  const [buildingAgeRange, setBuildingAgeRange] = useState([0, 180]);
  const filterRef = useRef(null);
  const filterButtonRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuFilterOpen, setIsMenuFilterOpen] = useState(false);
  const [menuFilterState, setMenuFilterState] = useState();

  const [selectedDistrict, setSectedDistrict] = useState([]);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);


  /* useEffect(() => {
    onFilterChange({
      roomType: selectedRoomTypes,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      minSize: sizeRange[0],
      maxSize: sizeRange[1],
      minBuildingAge: buildingAgeRange[0],
      maxBuildingAge: buildingAgeRange[1],
      propertyType: selectedPropertyTypes
    });
    console.log(selectedRoomTypes, priceRange, sizeRange, buildingAgeRange, selectedPropertyTypes)
  }, [selectedRoomTypes, priceRange, sizeRange, buildingAgeRange, selectedPropertyTypes, onFilterChange]); */


  const handleRegionClick = (region) => {
    setDistrictTableIsOpen(!districtTableIsOpen)
    setselectedRegion(region)
  }


  const handleDistrictChange = (district) => {
    setSectedDistrict((prevSelected) => {
      if (prevSelected.includes(district)) {
        return prevSelected.filter((selectedItem) => selectedItem !== district)
      } else {
        return [...prevSelected, district]
      }
    })
    handleFilterAction()
  }

  const handleKeywordsChange = (input) => {
    setKeywords(input)
  }

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

  const handleMenuFilterChange = (type) => {
    setIsMenuFilterOpen(true)
    setMenuFilterState(type)
  }




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


  const handleSizeInputChange = (index) => (event) => {
    const newValueText = event.target.value;
    const cleanValueText = newValueText.replace(/[^\d]/g, '');
    const newValueNumber = parseInt(cleanValueText, 10);
    if (!isNaN(newValueNumber)) {
      const newSizeRange = [...sizeRange];
      newSizeRange[index] = newValueNumber;
      setSizeRange(newSizeRange);
    }
  }

  const handleSizeChange = debounce((event, newValue) => {
    setSizeRange(newValue)
  }, 50);

  const handleSizeBlur = () => {
    if (sizeRange[0] < 0) {
      setSizeRange([0, sizeRange[1]]);
    } else if (sizeRange[1] > 5000) {
      setSizeRange([sizeRange[0], 5000]);
    }
  }



  const handleBuildingAgeInputChange = (index) => (event) => {
    const newValueText = event.target.value;
    const cleanValueText = newValueText.replace(/[^\d]/g, '');
    const newValueNumber = parseInt(cleanValueText, 10);
    if (!isNaN(newValueNumber)) {
      const newBuildingAgeRange = [...buildingAgeRange];
      newBuildingAgeRange[index] = newValueNumber;
      setBuildingAgeRange(newBuildingAgeRange);
    }
  }

  const handleBuildingAgeChange = debounce((event, newValue) => {
    setBuildingAgeRange(newValue);
  }, 50);


  const handleBuildingAgeBlur = () => {
    if (buildingAgeRange[0] < 0) {
      setBuildingAgeRange([0, buildingAgeRange[1]]);
    } else if (buildingAgeRange[1] > 180) {
      setBuildingAgeRange([buildingAgeRange[0], 180]);
    }
  };


  const handleFilterOption = (filterType) => {
    setIsFilterOpen(true);
    setFilterOption(filterType)
  }

  const handleSortChange = (index) => {
      const { sortField, sortOrder } = sortIndexMap[index];
      onSortChange(sortField, sortOrder);
      setIsSortOpen(false);
  }


  useEffect(() => {

    const handleClickOutside = (event) => {

      const isClickInsideTableRef = tableRef.current && tableRef.current.contains(event.target);
      const isClickInsideFilterRef = filterRef.current && filterRef.current.contains(event.target);
      const isFilterButtonClick = filterButtonRef.current && filterButtonRef.current.contains(event.target);

      if (!isClickInsideTableRef && !isClickInsideFilterRef && !isFilterButtonClick) {
        // Close both tableRef and filterRef
        if (districtTableIsOpen) {
          setDistrictTableIsOpen(false);
        }
        if (isFilterOpen) {
          setIsFilterOpen(false);
        }
      }


      /*   if (tableRef.current && !tableRef.current.contains(event.target) && districtTableIsOpen) {
          console.log(tableRef);
          setDistrictTableIsOpen(false);
        }else if(filterRef.current && !filterRef.current.contains(event.target) && isFilterOpen){
          setIsFilterOpen(false);
        } */

    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [districtTableIsOpen, isFilterOpen]);

  const handleFilterAction = () => {
    onFilterChange({
      roomType: selectedRoomTypes,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      minSize: sizeRange[0],
      maxSize: sizeRange[1],
      minBuildingAge: buildingAgeRange[0],
      maxBuildingAge: buildingAgeRange[1],
      propertyType: selectedPropertyTypes,
      keywords: keywords,
      district: selectedDistrict
    });
    console.log(selectedRoomTypes, priceRange, sizeRange, buildingAgeRange, selectedPropertyTypes)
  }


  const handleListStyleChange = (listStyle) => {
    switch (listStyle) {
      case "list":
        onListStyleChange(true);
        break;
      case "card":
        onListStyleChange(false);
        break;

      default:
        break;
    }

  }

  return (
    <div>
      {/* SEARCH BAR */}
      <Flex className="search-bar" >
        <Button className="search-region-button" onClick={() => handleRegionClick('hkDistricts')}>香港島</Button>
        <Button className="search-region-button" onClick={() => handleRegionClick('ntDistricts')}>新界</Button>
        <Button className="search-region-button" onClick={() => handleRegionClick('kwDistricts')}>九龍</Button>
        <Button className="search-region-button" onClick={() => handleRegionClick('isDistricts')}>離島</Button>
        <Input className="search-input" placeholder="屋苑"
          onChange={(e) => handleKeywordsChange(e.target.value)}
        ></Input>
        <Button className="search-button"><FaSearch size="12px"
          onClick={handleFilterAction}
        /></Button>
      </Flex>
      {/* SEARCH BAR DISTRICT CHECKBOX FIELD */}
      <Flex className="check-box-field">
        {districtTableIsOpen && (
          <div ref={tableRef}>
            <Card variation="elevated" className="district-checkbox-card">
              <Flex className="search-region-fieldset">
                {regions[selectedRegion].map((district, index) => (
                  <CheckboxField
                    key={index}
                    name={district}
                    value={district}
                    label={district}
                    className="search-region-checkbox"
                    onChange={() => handleDistrictChange(district)} checked={selectedDistrict.includes(district)} />
                ))}
              </Flex>
            </Card>

          </div>
        )}
      </Flex>

      {/*     FILTER BAR */}

      <Flex className="filter-bar">

        {/*  FILTER BUTTON STYLE */}
        <Flex direction="row">
          <Flex className="filter-button-display" ref={filterButtonRef}>
            <Button className="filter-button-save"><FaSlidersH size="12px" /></Button>

            {/* ROOM TYPE FILTER BUTTON  */}

            <div className="filter-button-card-div">
              <Button
                size="small"
                className="filter-button"
                onClick={() => handleFilterOption("rT")}>
                間隔
                <FaAngleDown className="filter-button-icon" />
              </Button>
              {isFilterOpen && (
                <div ref={filterRef}>
                  {filterOption === "rT" && <Card
                    variation="elevated"
                    className="filter-checkbox-card"
                    ref={filterRef}>
                    <Flex className="filter-checkbox-gp">
                      {roomType.map((type, index) => (
                        <CheckboxField
                          className="filter-checkbox-content"
                          key={index}
                          label={type}
                          value={type}
                          checked={selectedRoomTypes.includes(type)}
                          onChange={() => handleRoomTypeChange(type)}
                        />
                      ))}
                    </Flex>
                  </Card>}
                </div>
              )}
            </div>


            {/* PRICE FILTER BUTTON */}

            <div className="filter-button-card-div">
              <Button
                size="small"
                className="filter-button"
                onClick={() => handleFilterOption("p")}>價格<FaAngleDown
                  className="filter-button-icon" /></Button>
              {isFilterOpen && (
                <div ref={filterRef}>
                  {filterOption === "p" && <Card
                    variation="elevated"
                    className="filter-range-card"
                    ref={filterRef}>
                    <Box className="filter-range-gp">
                      <div className="filter-range-name">價格範圍</div>
                      <Slider
                        value={priceRange}
                        onChange={handlePriceChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={100000000}
                        valueLabelFormat={(value) => formatToHKCurrency(value)}
                        style={{
                          width: '100%', // Set the width to your desired value
                          height: '1px', // Set the height to your desired value
                          track: {
                            borderRadius: '1px', // Set the track border-radius
                            backgroundColor: 'blue', // Set the track color
                          },
                          rail: {
                            borderRadius: '1px', // Set the rail border-radius
                            backgroundColor: 'lightgray', // Set the rail color
                          }
                        }}

                      />
                      <div className="filter-input-range-container">
                        <span className="filter-range-name">HK$</span>
                        <Input
                          value={formatWithCommas(priceRange[0])}
                          onChange={handlePriceInputChange(0)}
                          onBlur={handlePriceBlur}
                          placeholder="0"
                          className="filter-input-field"
                        />
                        <span className="filter-range-name">至</span>
                        <Input
                          value={formatWithCommas(priceRange[1])}
                          onChange={handlePriceInputChange(1)}
                          onBlur={handlePriceBlur}
                          placeholder="100000000"
                          className="filter-input-field"
                        />
                      </div>
                    </Box></Card>}
                </div>
              )}

            </div>

            {/*  ACTUAL SIZE FILTER BUTTON */}

            <div className="filter-button-card-div">
              <Button
                size="small"
                className="filter-button"
                onClick={() => handleFilterOption("aS")}>實用面積<FaAngleDown
                  className="filter-button-icon" /></Button>

              {isFilterOpen && (
                <div ref={filterRef}>
                  {filterOption === "aS" && <Card
                    variation="elevated"
                    className="filter-range-card"
                    ref={filterRef}>
                    <Box className="filter-range-gp">
                      <div className="filter-range-name">實用面積</div>
                      <Slider
                        value={sizeRange}
                        onChange={handleSizeChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={5000}
                        valueLabelFormat={(value) => `${value}呎`}
                        style={{
                          width: '100%', // Set the width to your desired value
                          height: '1px', // Set the height to your desired value
                          track: {
                            borderRadius: '1px', // Set the track border-radius
                            backgroundColor: 'blue', // Set the track color
                          },
                          rail: {
                            borderRadius: '1px', // Set the rail border-radius
                            backgroundColor: 'lightgray', // Set the rail color
                          }
                        }}
                      />
                      <div className="filter-input-range-container">
                        <Input
                          value={formatWithCommas(sizeRange[0])}
                          onChange={handleSizeInputChange(0)}
                          onBlur={handleSizeBlur}
                          className="filter-input-field"
                        />
                        <span className="filter-range-name">至</span>
                        <Input
                          value={formatWithCommas(sizeRange[1])}
                          onChange={handleSizeInputChange(1)}
                          onBlur={handleSizeBlur}
                          className="filter-input-field"
                        />
                        <span className="filter-range-name">呎</span>
                      </div>
                    </Box></Card>}
                </div>
              )}
            </div>

            {/*  BUILDING Age FILTER BUTTON */}

            <div className="filter-button-card-div">
              <Button
                size="small"
                className="filter-button"
                onClick={() => handleFilterOption("bY")}>樓齡<FaAngleDown
                  className="filter-button-icon" /></Button>
              {isFilterOpen && (
                <div ref={filterRef}>
                  {filterOption === "bY" && <Card
                    variation="elevated"
                    className="filter-range-card"
                    ref={filterRef}>
                    <Box className="filter-range-gp">
                      <div className="filter-range-name">樓齡</div>
                      <Slider
                        value={buildingAgeRange}
                        onChange={handleBuildingAgeChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={180}
                        valueLabelFormat={(value) => `${value}年`}
                        style={{
                          width: '100%', // Set the width to your desired value
                          height: '1px', // Set the height to your desired value
                          track: {
                            borderRadius: '1px', // Set the track border-radius
                            backgroundColor: 'blue', // Set the track color
                          },
                          rail: {
                            borderRadius: '1px', // Set the rail border-radius
                            backgroundColor: 'lightgray', // Set the rail color
                          }
                        }}
                      />
                      <div className="filter-input-range-container">
                        <span className="filter-range-name">約</span>
                        <Input
                          value={formatWithCommas(buildingAgeRange[0])}
                          onChange={handleBuildingAgeInputChange(0)}
                          onBlur={handleBuildingAgeBlur}
                          className="filter-input-field"
                        />
                        <span className="filter-range-name">至</span>

                        <Input
                          className="filter-input-field"
                          value={formatWithCommas(buildingAgeRange[1])}
                          onChange={handleBuildingAgeInputChange(1)}
                          onBlur={handleBuildingAgeBlur}
                        />
                        <span className="filter-range-name">年</span>
                      </div>
                    </Box></Card>}
                </div>
              )}

            </div>

            {/* PROPERTY TYPE FILTER BUTTON */}

            <div className="filter-button-card-div">
              <Button
                size="small"
                className="filter-button"
                onClick={() => handleFilterOption("pT")}>物業類型<FaAngleDown
                  className="filter-button-icon" /></Button>
              {isFilterOpen && (
                <div ref={filterRef}>
                  {filterOption === "pT" && <Card
                    variation="elevated"
                    className="filter-checkbox-card"
                    ref={filterRef}>
                    <Flex className="filter-checkbox-gp">
                      {propertyType.map((type, index) => (
                        <CheckboxField
                          className="filter-checkbox-content"
                          key={index}
                          label={type}
                          value={type}
                          checked={selectedPropertyTypes.includes(type)}
                          onChange={() => handlePropertyTypeChange(type)}
                        />
                      ))}
                    </Flex>
                  </Card>}
                </div>
              )}
            </div>
          </Flex>

          {/* FILTER MENU STYLE */}


          <div className="filter-menu">
            <Button
              className="filter-menu-button"
              onClick={() => { setIsMenuOpen(!isMenuOpen) }}
            ><FaBars size="12px" /></Button>
            {isMenuOpen && <Flex direction="row">
              <Card variation="elevated" className="filter-menu-card">
                <Flex className="filter-menu-card-content">
                  <Text className="filter-menu-item"
                    onClick={() => handleMenuFilterChange('rT')}>間隔</Text>
                  <Text className="filter-menu-item"
                    onClick={() => handleMenuFilterChange('p')}>價格</Text>
                  <Text className="filter-menu-item"
                    onClick={() => handleMenuFilterChange('aS')}>實用面積</Text>
                  <Text className="filter-menu-item"
                    onClick={() => handleMenuFilterChange('bY')}>樓齡</Text>
                  <Text className="filter-menu-item"
                    onClick={() => handleMenuFilterChange('pT')}>物業類型</Text>
                  <Text className="filter-menu-item">篩選記錄</Text>
                </Flex>
              </Card>
              {
                isMenuFilterOpen && menuFilterState === 'rT' && <Card
                  variation="elevated"
                  className="filter-menu-checkbox-card">
                  <Flex className="filter-menu-checkbox-gp">
                    {roomType.map((type, index) => (
                      <CheckboxField
                        className="filter-checkbox-content"
                        key={index}
                        label={type}
                        value={type}
                        checked={selectedRoomTypes.includes(type)}
                        onChange={() => handleRoomTypeChange(type)}
                      />
                    ))}
                  </Flex>
                </Card>
              }

              {
                isMenuFilterOpen && menuFilterState === 'p' && <Card
                  variation="elevated"
                  className="filter-menu-range-card">
                  <Box className="filter-menu-range-gp">
                    <div className="filter-range-name">價格範圍</div>
                    <Slider
                      value={priceRange}
                      onChange={handlePriceChange}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                      min={0}
                      max={100000000}
                      valueLabelFormat={(value) => formatToHKCurrency(value)}
                      style={{
                        width: '100%', // Set the width to your desired value
                        height: '1px', // Set the height to your desired value
                        track: {
                          borderRadius: '1px', // Set the track border-radius
                          backgroundColor: 'blue', // Set the track color
                        },
                        rail: {
                          borderRadius: '1px', // Set the rail border-radius
                          backgroundColor: 'lightgray', // Set the rail color
                        }
                      }}

                    />
                    <div className="filter-input-range-container">
                      <span className="filter-range-name">HK$</span>
                      <Input
                        value={formatWithCommas(priceRange[0])}
                        onChange={handlePriceInputChange(0)}
                        onBlur={handlePriceBlur}
                        placeholder="0"
                        className="filter-input-field"
                      />
                      <span className="filter-range-name">至</span>
                      <Input
                        value={formatWithCommas(priceRange[1])}
                        onChange={handlePriceInputChange(1)}
                        onBlur={handlePriceBlur}
                        placeholder="100000000"
                        className="filter-input-field"
                      />
                    </div>
                  </Box>
                </Card>
              }

              {
                isMenuFilterOpen && menuFilterState === 'aS' && <Card
                  variation="elevated"
                  className="filter-menu-range-card">
                  <Box className="filter-menu-range-gp">
                    <div className="filter-range-name">實用面積</div>
                    <Slider
                      value={sizeRange}
                      onChange={handleSizeChange}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                      min={0}
                      max={5000}
                      valueLabelFormat={(value) => `${value}呎`}
                      style={{
                        width: '100%', // Set the width to your desired value
                        height: '1px', // Set the height to your desired value
                        track: {
                          borderRadius: '1px', // Set the track border-radius
                          backgroundColor: 'blue', // Set the track color
                        },
                        rail: {
                          borderRadius: '1px', // Set the rail border-radius
                          backgroundColor: 'lightgray', // Set the rail color
                        }
                      }}
                    />
                    <div className="filter-input-range-container">
                      <Input
                        value={formatWithCommas(sizeRange[0])}
                        onChange={handleSizeInputChange(0)}
                        onBlur={handleSizeBlur}
                        className="filter-input-field"
                      />
                      <span className="filter-range-name">至</span>
                      <Input
                        value={formatWithCommas(sizeRange[1])}
                        onChange={handleSizeInputChange(1)}
                        onBlur={handleSizeBlur}
                        className="filter-input-field"
                      />
                      <span className="filter-range-name">呎</span>
                    </div>
                  </Box>
                </Card>
              }

              {
                isMenuFilterOpen && menuFilterState === 'bY' && <Card
                  variation="elevated"
                  className="filter-menu-range-card">
                  <Box className="filter-menu-range-gp">
                    <div className="filter-range-name">樓齡</div>
                    <Slider
                      value={buildingAgeRange}
                      onChange={handleBuildingAgeChange}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                      min={0}
                      max={180}
                      valueLabelFormat={(value) => `${value}年`}
                      style={{
                        width: '100%', // Set the width to your desired value
                        height: '1px', // Set the height to your desired value
                        track: {
                          borderRadius: '1px', // Set the track border-radius
                          backgroundColor: 'blue', // Set the track color
                        },
                        rail: {
                          borderRadius: '1px', // Set the rail border-radius
                          backgroundColor: 'lightgray', // Set the rail color
                        }
                      }}
                    />
                    <div className="filter-input-range-container">
                      <span className="filter-range-name">約</span>
                      <Input
                        value={formatWithCommas(buildingAgeRange[0])}
                        onChange={handleBuildingAgeInputChange(0)}
                        onBlur={handleBuildingAgeBlur}
                        className="filter-input-field"
                      />
                      <span className="filter-range-name">至</span>

                      <Input
                        className="filter-input-field"
                        value={formatWithCommas(buildingAgeRange[1])}
                        onChange={handleBuildingAgeInputChange(1)}
                        onBlur={handleBuildingAgeBlur}
                      />
                      <span className="filter-range-name">年</span>
                    </div>
                  </Box>
                </Card>
              }

              {
                isMenuFilterOpen && menuFilterState === 'pT' && <Card
                  variation="elevated"
                  className="filter-menu-checkbox-card">
                  <Flex className="filter-menu-checkbox-gp">
                    {propertyType.map((type, index) => (
                      <CheckboxField
                        className="filter-checkbox-content"
                        key={index}
                        label={type}
                        value={type}
                        checked={selectedPropertyTypes.includes(type)}
                        onChange={() => handlePropertyTypeChange(type)}
                      />
                    ))}
                  </Flex>
                </Card>
              }
            </Flex>}
          </div>

          {/* FILTER ACTION AND SAVE BUTTON */}

          <Button
            size="small"
            className="filter-action-save"
            onClick={handleFilterAction}
          >篩選</Button>
          <Button
            size="small"
            className="filter-action-save">儲存搜尋</Button>

        </Flex>


        {/* DISPLAY STYLE AND SORTING BUTTON */}


        <Flex className="display-style-gp">
          <Flex className="display-format">
            <Button
              onClick={() => handleListStyleChange("card")}
              className="display-style"><FaVectorSquare
                size="16px" /></Button>
            <Button
              onClick={() => handleListStyleChange("list")}
              className="display-style"><FaList
                size="16px" /></Button>
          </Flex>
          <div className="sort-menu">
            <Button className="sort-button"
              onClick={() => { setIsSortOpen(!isSortOpen) }}
            ><FaSort size="14px" /></Button>
            {isSortOpen && (
              <Card variation="elevated" className="sort-menu-card">
                <Flex className="sort-menu-card-content">
                  {
                    sortItems.map((item, index) => (
                      <Text className="sort-menu-item"
                        key={index}
                        onClick={()=>handleSortChange(index) }
                      >
                        {item}
                      </Text>
                    ))
                  }
                </Flex>
              </Card>
            )}
          </div>
        </Flex>

      </Flex>



    </div>)

};

export default SearchFilter;



{/*  FILTE MENU STYLE */ }
{/* 
        <Flex className="filter-menu" marginLeft="3%">
          <div></div>
          <Button
            className="filter-menu-button"
          ><FaBars size="12px" /></Button>
          <Menu className="filter-menu">
            <MenuItem className="filter-item">間隔</MenuItem>
            <MenuItem className="filter-item">價格</MenuItem>
            <MenuItem className="filter-item">實用面積</MenuItem>
            <MenuItem className="filter-item">樓齡</MenuItem>
            <MenuItem className="filter-item">物業類型</MenuItem>
            <MenuItem className="filter-item">篩選記錄</MenuItem>
          </Menu>
          <Button className="filter-action-save">篩選</Button>
          <Button className="filter-action-save">儲存搜尋</Button>
        </Flex> */}


{/*  {isFilterOpen === true ? (<Card variation="elevated" className="filter-option-card" ref={filterRef}>
        <Flex className="filter-option-checkbox-gp">
          {filterOption === "rT" && (roomType.map((type, index) => (
            <CheckboxField
              className="filter-checkbox-content"
              key={index}
              label={type}
              value={type}
              checked={selectedRoomTypes.includes(type)}
              onChange={() => handleRoomTypeChange(type)}
            />
          )))}
          {filterOption === "pT" && (propertyType.map((type, index) => (
            <CheckboxField
              className="filter-checkbox-content"
              key={index}
              label={type}
              value={type}
              checked={selectedPropertyTypes.includes(type)}
              onChange={() => handlePropertyTypeChange(type)}
            />
          )))}


          {filterOption === "p" && (
            <Box className="filter-price-gp">
              <div className="filter-range-name">價格範圍</div>
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={100000000}
                valueLabelFormat={(value) => formatToHKCurrency(value)}
                style={{
                  width: '100%', // Set the width to your desired value
                  height: '1px', // Set the height to your desired value
                  track: {
                    borderRadius: '1px', // Set the track border-radius
                    backgroundColor: 'blue', // Set the track color
                  },
                  rail: {
                    borderRadius: '1px', // Set the rail border-radius
                    backgroundColor: 'lightgray', // Set the rail color
                  }
                }}

              />
              <div className="price-filter-input-container">
                <span className="filter-range-name">HK$</span>
                <Input
                  value={formatWithCommas(priceRange[0])}
                  onChange={handlePriceInputChange(0)}
                  onBlur={handlePriceBlur}
                  placeholder="0"
                  className="filter-input-field"
                />
                <span className="filter-range-name">至</span>
                <Input
                  value={formatWithCommas(priceRange[1])}
                  onChange={handlePriceInputChange(1)}
                  onBlur={handlePriceBlur}
                  placeholder="100000000"
                  className="filter-input-field"
                />
              </div>
            </Box>
          )}


          {filterOption === "aS" && (
            <Box className="filter-price-gp">
              <div className="filter-range-name">實用面積</div>
              <Slider
                value={actualSizeRange}
                onChange={handleActualSizeChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={5000}
                valueLabelFormat={(value) => `${value}呎`}
                style={{
                  width: '100%', // Set the width to your desired value
                  height: '1px', // Set the height to your desired value
                  track: {
                    borderRadius: '1px', // Set the track border-radius
                    backgroundColor: 'blue', // Set the track color
                  },
                  rail: {
                    borderRadius: '1px', // Set the rail border-radius
                    backgroundColor: 'lightgray', // Set the rail color
                  }
                }}
              />
              <div className="price-filter-input-container">
                <Input
                  value={formatWithCommas(actualSizeRange[0])}
                  onChange={handleActualSizeInputChange(0)}
                  onBlur={handleActualSizeBlur}
                  className="filter-input-field"
                />
                <span className="filter-range-name">至</span>
                <Input
                  value={formatWithCommas(actualSizeRange[1])}
                  onChange={handleActualSizeInputChange(1)}
                  onBlur={handleActualSizeBlur}
                  className="filter-input-field"
                />
                <span className="filter-range-name">呎</span>
              </div>
            </Box>
          )}


          {filterOption === "bY" && (
            <Box className="filter-price-gp">
              <div className="filter-range-name">樓齡</div>
              <Slider
                value={buildingYearRange}
                onChange={handleBuildingYearChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={180}
                valueLabelFormat={(value) => `${value}年`}
                style={{
                  width: '100%', // Set the width to your desired value
                  height: '1px', // Set the height to your desired value
                  track: {
                    borderRadius: '1px', // Set the track border-radius
                    backgroundColor: 'blue', // Set the track color
                  },
                  rail: {
                    borderRadius: '1px', // Set the rail border-radius
                    backgroundColor: 'lightgray', // Set the rail color
                  }
                }}
              />
              <div className="price-filter-input-container">
                <span className="filter-range-name">約</span>
                <Input
                  value={formatWithCommas(buildingYearRange[0])}
                  onChange={handleBuildingYearInputChange(0)}
                  onBlur={handleBuildingYearBlur}
                  className="filter-input-field"
                />
                <span className="filter-range-name">至</span>

                <Input
                  className="filter-input-field"
                  value={formatWithCommas(buildingYearRange[1])}
                  onChange={handleBuildingYearInputChange(1)}
                  onBlur={handleBuildingYearBlur}
                />
                <span className="filter-range-name">年</span>
              </div>
            </Box>
          )}
        </Flex>
      </Card>) : ""} */}















/* INPUT TextField


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


 */