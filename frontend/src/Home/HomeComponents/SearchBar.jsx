import React, { useState, useEffect, useRef } from "react";
import { Flex, Button, Input, Fieldset, CheckboxField, Card } from '@aws-amplify/ui-react';
import { FaSearch } from 'react-icons/fa';



const SearchBar = () => {

  const [checkBoxTableIsOpen, setcheckBoxTableIsOpen] = useState(false);
  const [selectedRegion, setselectedRegion] = useState("")
  const tableRef = useRef(null);
  const regions = {
    "hkDistricts": ["堅尼地城", "西營盤", "石塘咀", "中上環", "中西半山", "灣仔", "金鐘", " 銅鑼灣", "跑馬地", "天后", "大坑", "北角", "炮台山", "鰂魚涌", "太古城", "西灣河", "筲箕灣", "杏花邨", "柴灣", "小西灣", "石澳", "香港仔", "鴨脷洲", "黃竹坑", "南區"],
    "kwDistricts": ["藍田", "油塘", "觀塘", "牛頭角", "九龍灣", "牛池灣", "鑽石山", "樂富", "土瓜灣", "九龍城", "啟德", "新蒲崗", "黃大仙", "九龍塘", "何文田", "又一村", "深水埗", "石硤尾", "南昌", "荔枝角", "長沙灣", "美孚", "荔景", "大角咀", "奧運", '九龍站', '太子', '旺角', '油麻地', '佐敦', '尖沙咀', '紅磡', '黃埔'],
    "ntDistricts": ["西貢", "清水灣", "將軍澳", "康城", "馬鞍山", "沙田", "大圍", "火炭", "大埔", "太和", "粉嶺", "上水", "元朗", "洪水橋", "天水圍", "屯門", "深井（荃灣）", "荃灣", "大窩口", "葵涌", "葵芳", "青衣", "沙頭角"],
    "isDistricts": ['馬灣', '愉景灣', '東涌', '南大嶼山', '大澳', '坪洲', '南丫島', '長洲', '其他離島']
  };



  const handleRegionClick = (region) => {
    setcheckBoxTableIsOpen(!checkBoxTableIsOpen)
    setselectedRegion(region)
  }


  useEffect(() => {

    const handleClickOutside = (event) => {
      if (tableRef.current && !tableRef.current.contains(event.target) && checkBoxTableIsOpen) {
        console.log(tableRef);
        setcheckBoxTableIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [checkBoxTableIsOpen]);

  
  return (
    <div>
      <Flex className="search-bar">
        <Button className="search-region" onClick={() => handleRegionClick('hkDistricts')}>香港島</Button>
        <Button className="search-region" onClick={() => handleRegionClick('ntDistricts')}>新界</Button>
        <Button className="search-region" onClick={() => handleRegionClick('kwDistricts')}>九龍</Button>
        <Button className="search-region" onClick={() => handleRegionClick('isDistricts')}>離島</Button>
        <Input className="search-input" placeholder="屋苑"></Input>
        <Button className="search-button"><FaSearch size="1.8vh" /></Button>
      </Flex>
  
      <Flex className="check-box-field">
        {checkBoxTableIsOpen && (
          <div ref={tableRef}>        
              <Card variation="elevated" className="district-checkbox-gp">
                <Flex direction="row" className="search-region-fieldset">
                  {regions[selectedRegion].map((district, index) => (
                    <CheckboxField key={index} name={district} value={district} label={district} />
                  ))}
                </Flex>
              </Card>
       
          </div>
        )}
      </Flex>

      

    </div>)

};

export default SearchBar;






/* 
const renderCheckboxFields = () => {
  const districts = regions[selectedRegion] || [];
  console.log(districts);
  return (
    <Card variation="elevated" className="district-checkbox-gp">
      <Flex direction="row" className="search-region-fieldset">
        {districts.map((district, index) => (
          <CheckboxField key={index} name={district} value={district} label={district} />
        ))}
      </Flex>
    </Card>
  )

}; */

{/*  <Flex className="check-box-field">
        <Card variation="elevated" className="district-checkbox-gp-v2">
          <Flex direction="row" className="search-region-fieldset-v2">
            {regions[selectedRegion].map((district, index) => (
              <CheckboxField key={index} name={district} value={district} label={district} />
            ))}
          </Flex>
        </Card>
      </Flex> */}

       {/* <Fieldset direction="row" className="search-region-fieldset">
              {renderCheckboxFields()}
            </Fieldset> */}


          /*   .district-checkbox-gp{
              width: 30vw;
            }

            .search-region-fieldset{
              display: flex;
              flex-wrap: wrap;
              width: 30vw;
              max-height: 50vh;
              justify-content: left;
              border-radius: 15px;
            
            } */