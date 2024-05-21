import { Flex, Text, Heading, Image, Badge, Table, TableCell, TableRow, TableHead, TableBody, Button, Card, Divider, ToggleButtonGroup, ToggleButton, Input } from "@aws-amplify/ui-react";
import { FaRegMap, FaRegClock, FaExpandArrowsAlt, FaArrowDown, FaHeart, FaRegHeart, FaAngleDown, FaAngleRight, FaRegEye, FaTrash } from 'react-icons/fa';
import { Link } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import userImage from "../Img/user.png";
import ListingPhotoGroup from "../ListingDetail/ListingPhotoGroup";
import ListingMap from "../ListingDetail/ListingMap";
import PhotoUploader from "../SellHouseForm/PhotoUploader";
import ReactModal from 'react-modal';
import test1Img from "../Img/test1.png";
import test2Img from "../Img/test2.png";
import test3Img from "../Img/test3.png";


const MyListingDetail = () => {

    const [mainImage, setMainImage] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOWEJz5vMvVbv0RnuMj4zRDV8Q3uEedO6EmA&usqp=CAU");
    const [allImages, setAllImages] = useState([test1Img, test2Img, test3Img]);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const editOptionRef = useRef();
    const [editState, setEditState] = useState();
    const [editPhotoHovered, setEditPhotoHovered] = useState([]);

    const facilites = ["鄰近港鐵站", "鄰近輕鐵站", "多條巴士線", "巴士總站", "大型商場", "鄰近街市", "大型休憩公園", "會所設備齊全", "穿梭巴士", "停車場"];
    const decorations = [
        "豪華/特色裝修", "新淨靚裝", "簡約裝修", "清雅別緻", "方正實用", "主人房套廁", "有露台", "有花園/平台", "有天台", "工人房/儲物室"];
    const views = [
        "開揚遠景", "山景", "河景", "煙花景", "園景", "泳池景"
    ];
    const sellingPoints = [
        "連一個車位", "連多個車位", "內置樓梯上天台", "特大花園/平台", "超高樓底", "車入花園", "已做大維修", "可養寵物", "環境清幽"
    ];

    const [photos, setPhotos] = useState([]);

    const handleFilesAdded = (newPhotos) => {
        setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
        console.log(newPhotos);
    };

    const handleMainImageChange = (image) => {
        setMainImage(image)
    }

    const handleEditImageMouseIn = (index) => {
        console.log(index)
        setEditPhotoHovered((prevState) => {
            const updatedHovered = [...prevState];
            updatedHovered[index] = true;
            return updatedHovered;
        });
    }

    const handleEditImageMouseOut = (index) => {
        console.log(index)
        setEditPhotoHovered((prevState) => {
            const updatedHovered = [...prevState];
            updatedHovered[index] = false;
            return updatedHovered;
        });
    }

    const handleEditStateChange = (type) => {
        switch (type) {
            case 'e':
                setIsEditOpen(false)
                setEditState("e")
                break;
            case 'd':
                setIsEditOpen(false)
                setEditState("d")
                setIsStatusModalVisible(true);
                break;
            case 'h':
                setIsEditOpen(false)
                setEditState("h")
                setIsStatusModalVisible(true);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        // Initialize the editPhotoHovered state with the correct length
        setEditPhotoHovered(new Array(allImages.length).fill(false));
    }, [allImages]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const isClickInsideEditOption = editOptionRef.current && editOptionRef.current.contains(event.target);
            if (!isClickInsideEditOption) {
                setIsEditOpen(false)
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        console.log(editState)
        console.log('allImages:', allImages)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isEditOpen])

    useEffect(() => {
        console.log("editPhotoHovered:", editPhotoHovered)
    }, [editPhotoHovered])


    const [isStatusModalVisible, setIsStatusModalVisible] = useState(false)

    const handleCloseModal = () => {
        setIsStatusModalVisible(false);
    };


    return (
        <Flex className="list-detail-group">
            <Flex className="list-detail-left-group">

                <Flex className="listing-back-button-gp">
                    <Link to="/" className="link">
                        <Button className="listing-back-button" variation="link">主頁</Button>
                    </Link>
                    <FaAngleRight />
                    <Text className="listing-current-text">太和中心</Text>
                </Flex>


                <Flex className="list-detail-info-gp">
                    <Image
                        alt="list photo"
                        src={mainImage}
                        width="100%"
                        height="60%" />
                    <Flex className="my-list-detail-status-edit-gp">
                        <Flex className="my-list-detail-status-gp">
                            <Badge className="my-list-detail-status-badge" variation="success">生效中</Badge>
                            {/*                             <Badge className="my-list-detail-status-badge">已暫停</Badge>
                            <Badge className="my-list-detail-status-badge" variation="error">已過期</Badge>
                            <Badge className="my-list-detail-status-badge" variation="error">已拒絕</Badge>
                            <Badge className="my-list-detail-status-badge" variation="info">已售</Badge> */}
                            <Text className="my-list-detail-expire-date">2023-12-1</Text>
                        </Flex>
                        <div>
                            <Button className="my-list-detail-edit-button" onClick={() => { setIsEditOpen(true) }}>編輯</Button>
                            {isEditOpen === true ? (<Card variation="elevated" className="button-edit-option-gp" ref={editOptionRef}>
                                <div className="button-edit-option">
                                    <div onClick={() => handleEditStateChange("e")}>更改資料</div>
                                    <div onClick={() => handleEditStateChange("h")}>暫停放盤</div>
                                    <div onClick={() => handleEditStateChange("d")}>刪除放盤</div>
                                </div>
                            </Card>) : ""}
                        </div>
                    </Flex>
                    <Text className="list-detail-info-name">太和中心</Text>
                    <Text className="list-detail-info-sub-name">A座 高層</Text>
                    <Flex className="list-detail-info-price-gp">
                        {editState === "e" ? (
                            <div className='edit-price-image-gp'>

                                <Input placeholder="HK$" className="edit-price-input"></Input>

                                <div className="edit-image-container">
                                    {allImages.map((image, index) => (
                                        <div className="edit-image-grid-item" key={index} onMouseEnter={() => handleEditImageMouseIn(index)}
                                            onMouseLeave={() => handleEditImageMouseOut(index)}>
                                            {image ? <div className="image-container">{editPhotoHovered[index] && (
                                                <div className="edit-image-overlay" >
                                                    <FaTrash />
                                                </div>
                                            )}<img src={image} alt="list" /> </div> : <p>Loading...</p>}
                                        </div>
                                    ))}</div>
                                <Flex className="edit-photo-upload">
                                    <Text className="sell-house-formfill-sub-title">照片</Text>
                                    <PhotoUploader onFilesAdded={handleFilesAdded} photos={photos} />
                                    <div className="photo-upload-cancel">
                                        <Button onClick={() => setPhotos([])}>取消</Button>
                                    </div>
                                </Flex>
                            </div>
                        ) : (<Heading className="list-detail-info-price">547萬</Heading>)}
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
                    {editState === "e" ?
                        <div className="edit-ads-item-gp">
                            <Text>編輯廣告:</Text>
                            <Text>附近交通/配套：</Text>
                            <Flex className="sell-house-form-district-button-container">
                                {facilites.map((facility, index) => {
                                    return <ToggleButton
                                        name="facilities"
                                        value={facility}
                                        size="small"
                                        key={index}>{facility}</ToggleButton>
                                })}
                            </Flex>
                            <Text>裝修/間隔：</Text>
                            <Flex className="sell-house-form-district-button-container">
                                {decorations.map((decoration, index) => {
                                    return <ToggleButton
                                        name="facilities"
                                        value={decoration}
                                        size="small"
                                        key={index}>{decoration}</ToggleButton>
                                })}
                            </Flex>
                            <Text>景觀：</Text>
                            <Flex className="sell-house-form-district-button-container">
                                {views.map((view, index) => {
                                    return <ToggleButton
                                        name="facilities"
                                        value={view}
                                        size="small"
                                        key={index}>{view}</ToggleButton>
                                })}
                            </Flex>
                            <Text>賣點：</Text>
                            <Flex className="sell-house-form-district-button-container">
                                {sellingPoints.map((sellingPoint, index) => {
                                    return <ToggleButton
                                        name="facilities"
                                        value={sellingPoint}
                                        size="small"
                                        key={index}>{sellingPoint}</ToggleButton>
                                })}
                            </Flex>
                        </div> : ""}
                </Flex>
                {editState === "e" ? <Flex className="edit-list-confirm-button-gp">

                    <Button>確認</Button>
                    <Button onClick={() => setEditState('')}>取消</Button>

                </Flex> : ""}
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
                                <Text>太和中心</Text>
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
                    <Heading className="list-detail-unit-info-header">出價</Heading>
                    <Table
                        className="list-detail-historical-record-table"
                        highlightOnHover={false}>
                        <TableHead>
                            <TableRow className="list-detail-historical-record-table-head">
                                <TableCell as="th">出價用戶</TableCell>
                                <TableCell as="th">出價</TableCell>
                                <TableCell as="th">狀態</TableCell>
                                <TableCell as="th">時間</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Andy Wong</TableCell>
                                <TableCell>$5,200,000</TableCell>
                                <TableCell className="historical-record-change-gp">接受</TableCell>
                                <TableCell className="historical-record-change-gp">2023-12-18</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>

                <Divider />

                <Flex direction="row">
                    <ToggleButtonGroup>
                        <ToggleButton>放盤表格</ToggleButton>
                        <ToggleButton>查冊</ToggleButton>
                    </ToggleButtonGroup>
                </Flex>


            </Flex>
            <Flex className="list-detail-right-group">
                <Flex className="listing-detail-view-like-gp">
                    <FaRegEye color="#000099" /> <Text>351</Text>
                    <Text>|</Text>
                    <FaRegHeart color="#ab3b57" /> <Text>17</Text>
                </Flex>
                <ListingPhotoGroup allImages={allImages} onMainImageChange={handleMainImageChange} />
                <ListingMap />
                <Flex className="list-detail-owner-gp">
                    <Heading className="list-detail-owner-header">業權人資料</Heading>
                    <Card variation="elevated" className="list-detail-owner-info">
                        <Text>業權人名稱:MING CHOI YIN</Text>
                        <Text>業權人類型:個人業主</Text>
                    </Card>
                    <Card variation="elevated" className="list-detail-owner-info">
                        <Text>業權人名稱:MING CHOI YIN LIMITED COMPANY</Text>
                        <Text>業權人類型:公司業主</Text>
                    </Card>

                </Flex>

            </Flex>

            <ReactModal
                isOpen={isStatusModalVisible}
                onRequestClose={handleCloseModal}
                contentLabel="Modal"
                className="edit-status-modal"
                overlayClassName="modal-overlay"
            >
                {
                    editState === "h" &&
                    <Flex className="edit-status-modal-content">
                        <Text>是否確定暫停放盤, 並於稍後回復放盤</Text>
                        <Flex className="edit-status-modal-button-gp">
                            <Button className="edit-status-modal-button">確定</Button>
                            <Button className="edit-status-modal-button" onClick={()=>{setIsStatusModalVisible(false)}}>取消</Button>
                        </Flex>
                    </Flex>
                }

                {
                    editState === "d" &&
                    <Flex className="edit-status-modal-content">
                        <Text>很可惜沒能幫你成功出售放盤</Text>
                        <Text>請確定是否刪除放盤</Text>
                        <Flex className="edit-status-modal-button-gp">
                            <Button className="edit-status-modal-button">確定</Button>
                            <Button className="edit-status-modal-button" onClick={()=>{setIsStatusModalVisible(false)}}>取消</Button>
                        </Flex>
                    </Flex>
                }

            </ReactModal>

        </Flex>



    )

}

export default MyListingDetail;