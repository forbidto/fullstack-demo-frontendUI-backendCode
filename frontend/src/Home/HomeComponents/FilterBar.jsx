import React from "react";
import {Flex, Button} from '@aws-amplify/ui-react';
import {FaFilter, FaAngleDown, FaPollH, FaProjectDiagram, FaArrowUp, FaArrowDown} from 'react-icons/fa';


const FilterBar= () => {




    return (
    <Flex className="filter-bar">
    <Flex className="filter-condition">
    <Button className="filter-button"><FaFilter size="1.8vh"/></Button>
    <Button className="filter-item">間隔<FaAngleDown className="filter-item-icon"/></Button>
    <Button className="filter-item">價格<FaAngleDown className="filter-item-icon"/></Button>
    <Button className="filter-item">實用面積<FaAngleDown className="filter-item-icon"/></Button>
    <Button className="filter-item">樓齡<FaAngleDown className="filter-item-icon"/></Button>
    <Button className="filter-item">物業類型<FaAngleDown className="filter-item-icon"/></Button>
    <Button className="filter-save">儲存搜尋</Button>
    </Flex>
    <Flex className="filter-style">
    <Flex className="filter-format">
        <Button className="list-style"><FaProjectDiagram size="2vh"/></Button>
        <Button className="list-style"><FaPollH size="2vh"/></Button>
        </Flex>
        <Button className="filter-button"><FaArrowUp size="1vh"/><FaArrowDown size="1vh"/></Button>
    </Flex>
    </Flex>)

  };

  export default FilterBar;