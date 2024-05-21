import React from "react";
import {Card, Image, Heading, Text, Badge, Flex} from '@aws-amplify/ui-react';
import {FaRegMap, FaRegClock, FaExpandArrowsAlt, FaArrowDown,FaRegHeart} from 'react-icons/fa';
import { Link } from "react-router-dom";



const ListingCard = () => {

return(
<Card className="list-card" variation="elevated">
<Link to="/listing" className="link">
<Flex className="list-card-info">
<Image
src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOWEJz5vMvVbv0RnuMj4zRDV8Q3uEedO6EmA&usqp=CAU"
alt="list photo"
maxWidth="280px"
height="230px"
/>
{/* <div className='songDetail' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '6px 12px 2px 12px', }}> */}
<Heading className="list-card-info-name">物業名稱</Heading>
<Text className="list-card-floor">中層</Text>
<Flex className="list-card-info-brief">
<Flex className="list-card-info-brief-item"> {/* adjust the gap value as needed */}
    <FaRegMap />
    <Text className="list-card-info-brief-item-text">粉嶺</Text>
  </Flex>
  <Flex className="list-card-info-brief-item"> {/* adjust the gap value as needed */}
    <FaRegClock />
    <Text className="list-card-info-brief-item-text">31年</Text>
  </Flex>
  <Flex className="list-card-info-brief-item"> {/* adjust the gap value as needed */}
    <FaExpandArrowsAlt />
    <Text className="list-card-info-brief-item-text">實 377呎</Text>
  </Flex>
</Flex>
<Heading className="list-card-info-price">547萬</Heading>
<Flex className="list-card-info-remark">
<Flex className="list-card-info-remark-gp">
<Text className="list-card-info-price-fleet">$13500/sqft</Text>
<Badge className="list-card-info-rate" size='small' >
<FaArrowDown/> 2%
</Badge>
</Flex>
<Flex className="list-card-info-like">
<FaRegHeart className="list-card-info-heart" size="36px"/>
<Text>6</Text>
 {/* <div onClick={handleLike} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'row', justifyContent: 'center',
    alignItems: 'center',
    gap: '10px' }}>
      {liked ? (
        <FaHeart size="20px" style={{ color: '#ab3b57' }} />
      ) : (
        <FaRegHeart size="20px" style={{ color: '#ab3b57' }} />
      )}
      <Text fontFamily="Verdana" fontSize="15px" fontWeight={500}>Like</Text>
    </div> */}
    </Flex>
</Flex>
<Card className='list-card-ads-info' style={{ backgroundColor: '#f2f2f2', width:"100%", height:"60px", display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
<Text className='list-card-ads-info-text'>物業編號: HKTKOXX00245XX</Text>
<Text className='list-card-ads-info-text'>更新日期: 01/01/2023</Text>
</Card>
</Flex>
</Link>
</Card>

)



}

export default ListingCard



