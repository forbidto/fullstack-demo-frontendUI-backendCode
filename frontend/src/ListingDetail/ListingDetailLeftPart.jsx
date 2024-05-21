import React from "react";
import { Flex, Text, Heading, Image, Badge, Table, TableCell, TableRow, TableHead, TableBody, Button } from "@aws-amplify/ui-react";
import { FaRegMap, FaRegClock, FaExpandArrowsAlt, FaArrowDown, FaHeart, FaRegHeart, FaAngleDown, FaAngleRight} from 'react-icons/fa';
import { Link } from "react-router-dom";

const ListingDetailLeftPart = ({mainImage}) => {
    return (
        <Flex className="list-detail-left-group">

            <Flex className="listing-back-button-gp">
                <Link to="/" className="link">
                    <Button className="listing-back-button" variation="link">主頁</Button>
                </Link>
                <FaAngleRight />
                <Text className="listing-current-text">永和居</Text>
            </Flex>


            <Flex className="list-detail-info-gp">
                <Image
                    alt="list photo"
                    src={mainImage}
                    width="100%"
                    height="100%" />
                <Text className="list-detail-info-name">永和居</Text>
                <Text className="list-detail-info-sub-name">A座 高層</Text>
                <Flex className="list-detail-info-price-gp">
                    <Heading className="list-detail-info-price">547萬</Heading>
                    <Badge className="list-card-info-rate" size='small' >
                        <FaArrowDown /> 2%
                    </Badge>
                </Flex>
                <Flex className="list-detail-brief-info-gp">
                    <div className="list-detail-brief-info-item-gp">
                        <Text className="list-detail-brief-info-item-title" >位置</Text>
                        <Flex className="list-detail-brief-info-item">
                            <FaRegMap /><Text>太和</Text>
                        </Flex>
                    </div>
                    <div className="list-detail-brief-info-item-gp">
                        <Text className="list-detail-brief-info-item-title">樓齡</Text>
                        <Flex className="list-detail-brief-info-item">
                            <FaRegClock /><Text>32年</Text>
                        </Flex>
                    </div>
                    <div className="list-detail-brief-info-item-gp">
                        <Text className="list-detail-brief-info-item-title">間隔</Text>
                        <Flex className="list-detail-brief-info-item">
                            <FaRegClock /><Text>3</Text>
                        </Flex>
                    </div>
                    <div className="list-detail-brief-info-item-gp">
                        <Text className="list-detail-brief-info-item-title">實用面積</Text>
                        <Flex className="list-detail-brief-info-item">
                            <FaExpandArrowsAlt /><Text>432呎</Text>
                        </Flex>
                    </div>
                </Flex>

            </Flex>
            <Flex className="list-detail-unit-info-gp">
                <Heading className="list-detail-unit-info-header">單位資訊</Heading>
                <Flex className="list-detail-unit-info-item-gp">
                    <Flex className="list-detail-unit-info-item-title">
                        <Text>物業類型</Text>
                        <Text>樓層</Text>
                        <Text>特色/設備</Text>
                        <Text>凶宅</Text>
                        <Text>物業編號</Text>
                        <Text>更新日期</Text>
                    </Flex>
                    <Flex className="list-detail-unit-info-item-detail">
                        <Text>私樓</Text>
                        <Text>3</Text>
                        <Flex className="list-detail-unit-info-item-detail-list">
                            <Text>車位</Text>
                            <Text>露台</Text>
                            <Text>鄰近地鐵</Text>
                        </Flex>
                        <Text>是</Text>
                        <Text>HKTKOXX00245XX</Text>
                        <Text>01/01/2023</Text>
                    </Flex>

                </Flex>
            </Flex>
            <Flex className="list-detail-unit-info-gp">
                <Heading className="list-detail-unit-info-header">屋苑資訊</Heading>
                <Flex className="list-detail-unit-info-item-gp">
                    <Flex className="list-detail-unit-info-item-title">
                        <Text>屋苑</Text>
                        <Text>入伙年份</Text>
                        <Text>校網/校區</Text>
                        <Text>發展商</Text>
                    </Flex>
                    <Flex className="list-detail-unit-info-item-detail">
                        <Flex className="list-detail-unit-info-item-detail-list">
                            <Text>永和居</Text>
                            <Text>全2座</Text>
                            <Text>200伙</Text>
                        </Flex>
                        <Text>1989</Text>
                        <Flex className="list-detail-unit-info-item-detail-list">
                            <Text>小學25區</Text>
                            <Text>中學35區</Text>
                        </Flex>
                        <Flex className="list-detail-unit-info-item-detail-list">
                            <Text>新鴻基</Text>
                            <Text>新世界</Text>
                            <Text>長實</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>


            <div className="list-detail-historical-record-gp">
                <Heading className="list-detail-unit-info-header">歷史叫價紀錄</Heading>
                <Table
                    className="list-detail-historical-record-table"
                    highlightOnHover={false}>
                    <TableHead>
                        <TableRow className="list-detail-historical-record-table-head">
                            <TableCell as="th">日期</TableCell>
                            <TableCell as="th">叫價</TableCell>
                            <TableCell as="th">變幅</TableCell>
                            <TableCell as="th">%</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>01/01/2022</TableCell>
                            <TableCell>$5,200,000</TableCell>
                            <TableCell className="historical-record-change-gp"><Flex className="historical-record-change-row"><FaAngleDown /> <div>$100,000</div></Flex></TableCell>
                            <TableCell className="historical-record-change-gp"><Flex className="historical-record-change-row"><FaAngleDown /> <div>2%</div></Flex></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>01/12/2021</TableCell>
                            <TableCell>$5,300,000</TableCell>
                            <TableCell>-</TableCell>
                            <TableCell>-</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>



        </Flex>
    )
}

export default ListingDetailLeftPart