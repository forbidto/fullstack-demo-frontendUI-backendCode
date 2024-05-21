import React, { useEffect, useRef, useState } from "react";
import { Flex, Text, Button, Card } from "@aws-amplify/ui-react";
import ListingPhotoGroup from "./ListingPhotoGroup";
import ListingMap from "./ListingMap";
import { FaRegHeart, FaRegEye } from 'react-icons/fa';
import userImage from "../Img/user.png";
import { Link, useNavigate } from "react-router-dom";



const ListingDetailRightPart = ({ allImages, onMainImageChange }) => {

    const navigate = useNavigate();




    return (
        <Flex className="list-detail-right-group">
            <Flex className="listing-detail-view-like-gp">
                <FaRegEye color="#000099" /> <Text>351</Text>
                <Text>|</Text>
                <FaRegHeart color="#ab3b57" /> <Text>17</Text>
            </Flex>
            <ListingPhotoGroup
                allImages={allImages}
                onMainImageChange={onMainImageChange}
            />
            <ListingMap />
            <Card className="list-detail-seller-card" variation="elevated">
                <Flex className="list-detail-seller-info-gp">
                    <Flex className="list-detail-seller-info">
                        <img src={userImage} alt="list" /><Text>文小姐</Text>
                    </Flex>
                    <Flex className="list-detail-seller-info-button-gp">
                        <Link to="/chat" className="link">
                            <Button className="list-detail-seller-info-button-appointment">預約睇樓</Button></Link>
                        <Link to="/prebuyhouse" className="link">
                            <Button
                                className="list-detail-seller-info-button-contact"
                            >直接聯絡</Button></Link>
                    </Flex>
                </Flex>
            </Card>
        </Flex>
    )
}

export default ListingDetailRightPart