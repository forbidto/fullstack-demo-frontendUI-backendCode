import { Divider, Input, Radio, Flex, Text, Button, Card, RadioGroupField, Label } from "@aws-amplify/ui-react";
import React, { useState, useEffect } from "react";
import ReviewMapComponent from "./ReviewListingGoogleMap";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { submitPendingListingApproval, fetchPendingOwners, validateApprovalInput } from "../store/actions/adminApprovePendingListAction";
import ReactModal from 'react-modal';


ReactModal.setAppElement('#root');

const booleanMap = {
    true: "是",
    false: "否"
}

const photoPrefix = "https://lambdalayertest2145792154645.s3.ap-east-1.amazonaws.com/";

function ImageList({ imageUrls }) {
    const [selectedImage, setSelectedImage] = useState(null);

    const openImagePreview = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const closeImagePreview = () => {
        setSelectedImage(null);
    };

    return (
        <div>
            {imageUrls.map((imageUrl, index) => (
                <div key={index} onClick={() => openImagePreview(imageUrl)}>
                    <img
                        src={imageUrl}
                        alt={`Image ${index}`}
                        style={{ width: '100px', height: '100px', margin: '10px', cursor: 'pointer' }}
                    />
                </div>
            ))}
            {selectedImage && (
                <div className="modal">
                    <span className="close" onClick={closeImagePreview}>
                        &times;
                    </span>
                    <img src={selectedImage} alt="Selected Image" className="modal-content" />
                </div>
            )}
        </div>
    );
}

const PendingListingDetail = () => {

    const { id } = useParams();
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [actualArea, setActualArea] = useState();
    const [buildingYear, setBuildingYear] = useState();
    const [level, setLevel] = useState();
    const [isApprovalPannelVisible, setIsApprovalPannelVisible] = useState(false)
    const [signSchedule, setSignSchedule] = useState();
    const [deadline, setDeadline] = useState();
    const [adsNumber, setAdsNumber] = useState();

    const navigate = useNavigate();

    const handleInputChange = (name, value) => {
        switch (name) {
            case "actualArea":
                setActualArea(value);
                break;
            case "buildingYear":
                setBuildingYear(value);
                break;
            case "level":
                setLevel(value);
                break;
            case "signSchedule":
                setSignSchedule(value);
                break;
            case "deadline":
                setDeadline(value);
                break;
            case "adsNumber":
                setAdsNumber(value);
                break;
            default:
                break;
        }

    }

    const handleApproval = () => {
        const validateRes = validateApprovalInput(level, actualArea, buildingYear, lat, lng);
        if (validateRes.success === true) {
            setIsApprovalPannelVisible(true);
        } else {
            alert(validateRes.message)
        }
    }

    const handleCloseModal = () => {
        setIsApprovalPannelVisible(false);
    };

    const handleSubmission = async() => {
        if(signSchedule != null && deadline != null && adsNumber != null) {
            const input = {
                level,
                actualArea,
                buildingYear,
                lat,
                lng,
                signSchedule,
                deadline,
                adsNumber,
                status:"已批核"
            }
    
            const identifier ={
                id,
                createdAt:selectedListing.createdAt
            }
         
            const submissionRes = await submitPendingListingApproval(input, identifier)
    
            console.log('submissionRes:',submissionRes)
        }else {
            alert("Please input all necessary")
        }
        

    }

    const [individualOwnerSet, setIndividualOwnerSet] = useState([]); // Use state for individual owners
    const [companyOwnerSet, setCompanyOwnerSet] = useState([]); // Use state for company owners

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { individualOwners, companyOwners } = await fetchPendingOwners(id).then();
                // Update the state with the fetched data

                console.log("individualOwners", individualOwners)
                console.log("companyOwners", companyOwners)
                setIndividualOwnerSet(individualOwners);
                setCompanyOwnerSet(companyOwners);
            } catch (error) {
                console.error("Error fetching owners", error);
            }
        };

        fetchData();

    }, [])





    const selectListingById = (listingId) => (state) => {
        return state.pendingListingsCache.listings.find((listing) => listing.id === listingId);
    };

    const selectedListing = useSelector(selectListingById(id));

    const photoUrls = selectedListing.photos.map((photoKey) => {
        return `${photoPrefix}${photoKey}`;
    });

    const isHauntText = booleanMap[selectedListing.isHaunt];
    const formattedPrice = new Intl.NumberFormat('zh-HK', { style: 'currency', currency: 'HKD' }).format(selectedListing.price);
    console.log(id);

    console.log("selectedListing:", selectedListing);


    useEffect(() => {
        console.log(actualArea, buildingYear, level, lat, lng)
    }, [actualArea, buildingYear, level, lat, lng])

    return (
        <Flex className="pending-listing-detail-gp" direction="column">
            <Flex direction="row" className="pending-listing-info-pic-gp">
                <Flex direction="column" className="pending-listing-info-gp">
                    <Button className="pending-listing-topback-button" onClick={()=>navigate('/admin/pendinglist')}>返回樓盤</Button>
                    <Text className="pending-listing-detail-title">單位資料</Text>

                    <Flex direction="row" className="pending-listing-detail-info">
                        <Flex direction="column" className="pending-listing-detail-item">
                            <Text>區域</Text>
                            <Text>地區</Text>
                            <Text>物業類型</Text>
                            <Text>屋苑/大廈名稱</Text>
                            <Text>期數</Text>
                            <Text>座數</Text>
                            <Text>樓層 *</Text>
                            <Text>單位</Text>
                            <Text>實用面積 *</Text>
                            <Text>房間</Text>
                            <Text>樓齡 *</Text>
                            <Text>特色/設備</Text>
                            <Text>凶宅</Text>
                        </Flex>
                        <Flex direction="column" className="pending-listing-detail-data">
                            <Text>{selectedListing.region}</Text>
                            <Text>{selectedListing.district}</Text>
                            <Text>{selectedListing.type}</Text>
                            <Text>{selectedListing.estate}</Text>
                            <Text>{selectedListing.phase}</Text>
                            <Text>{selectedListing.block}</Text>
                            <Flex direction="row">
                                <Text>{selectedListing.floor}</Text>
                                <RadioGroupField direction="row" onChange={(e) => handleInputChange("level", e.target.value)} >
                                    <Radio value="high">高</Radio>
                                    <Radio value="mid">中</Radio>
                                    <Radio value="low">低</Radio>
                                </RadioGroupField>
                            </Flex>
                            <Text>{selectedListing.unit}</Text>
                            <Input className="pending-listing-detail-input" placeholder="sqft" onChange={(e) => handleInputChange("actualArea", parseFloat(e.target.value))}></Input>
                            <Text>{selectedListing.room}</Text>
                            <Input className="pending-listing-detail-input" onChange={(e) => handleInputChange("buildingYear", parseFloat(e.target.value))}></Input>
                            <Text>{selectedListing.decorations}</Text>
                            <Text>{isHauntText}</Text>
                        </Flex>
                    </Flex>
                    <Divider />

                    <Flex direction="row" className="pending-listing-detail-info">
                        <Text>用戶</Text>
                        <Text>{selectedListing.userId}</Text>
                    </Flex>
                    <Text className="pending-listing-detail-title">放售價錢</Text>
                    <Flex direction="row" className="pending-listing-detail-info">
                        <Text>放售價錢</Text>
                        <Text>{formattedPrice}</Text>
                    </Flex>


                    <Text className="pending-listing-detail-title">樓盤位置 *</Text>
                    <Flex direction="column">
                        <Flex direction="row" className="pending-listing-detail-location-input-gp">
                            <Text>緯度</Text>
                            <Input
                                className="pending-listing-detail-location-input"
                                onChange={(e) => setLat(parseFloat(e.target.value))}
                            />
                            <Text>經度</Text>
                            <Input
                                className="pending-listing-detail-location-input"
                                onChange={(e) => setLng(parseFloat(e.target.value))}
                            />
                        </Flex>
                        <ReviewMapComponent lat={lat} long={lng} />
                    </Flex>


                    <Text className="pending-listing-detail-title">業權人資料</Text>
                    <Card variation="elevated" className="pending-listing-owner-card">
                        <Flex direction="row" className="pending-listing-owner-info-gp">
                            <Flex direction="column">
                                <Text>公司名稱</Text>
                                <Text>商業登記證號碼</Text>
                                <Text>公司董事姓名</Text>
                                <Text>公司董事身份證號碼</Text>
                                <Text>電話號碼</Text>
                                <Text>公司地址</Text>
                            </Flex>
                            <Flex direction="column">
                                <Text>公司名稱</Text>
                                <Text>商業登記證號碼</Text>
                                <Text>公司董事姓名</Text>
                                <Text>公司董事身份證號碼</Text>
                                <Text>電話號碼</Text>
                                <Text>公司地址</Text>
                            </Flex>
                        </Flex>
                    </Card>

                    {individualOwnerSet && individualOwnerSet.map((individualOwner, index) => (
                        <Card key={index} variation="elevated" className="pending-listing-owner-card">
                            <Flex direction="row" className="pending-listing-owner-info-gp">
                                <Flex direction="column">
                                    <Text>業主姓名</Text>
                                    <Text>業主身份證號碼</Text>
                                    <Text>電話號碼</Text>
                                </Flex>
                                <Flex direction="column">
                                    <Text>{individualOwner.ownerName}</Text>
                                    <Text>{individualOwner.ownerHkId}</Text>
                                    <Text>{individualOwner.ownerPhone}</Text>
                                </Flex>
                            </Flex>
                        </Card>
                    ))}


                </Flex>
                <Flex direction="column" className="pending-listing-pic-gp">
                    <ImageList imageUrls={photoUrls} />
                </Flex>
            </Flex>



            <ReactModal
                isOpen={isApprovalPannelVisible}
                onRequestClose={handleCloseModal}
                contentLabel="Modal"
                className="approval-modal"
                overlayClassName="modal-overlay"
            >

                <Flex direction="column" padding="1vh">

                    <Flex direction="column" gap="small">
                        <Label htmlFor="signSchedule">要求簽署日期</Label>
                        <Input
                            id="signSchedule"
                            type="date"
                            onChange={(e)=>handleInputChange("signSchedule",e.target.value)}
                        />
                    </Flex>

                    <Flex direction="column" gap="small">
                        <Label htmlFor="deadline">到期日</Label>
                        <Input
                            id="deadline"
                            type="date"
                            onChange={(e)=>handleInputChange("deadline",e.target.value)}
                        />
                    </Flex>

                    <Flex direction="column" gap="small">
                        <Label htmlFor="adsNumber">物業廣告編號</Label> 
                        <Input
                            id="adsNumber"
                            onChange={(e)=>handleInputChange("adsNumber",e.target.value)}
                        />
                    </Flex>


                    <Flex direction="row">
                        <Button onClick={() => handleCloseModal()}>取消</Button>
                        <Button onClick={() => handleSubmission()}>確定</Button>
                    </Flex>
                </Flex>.

            </ReactModal>




            <Flex direction="row" className="pending-lisitng-bottom-gp">
                <Button>取消</Button>
                <Flex direction="row" className="pending-listing-approval-gp">
                    <Button>拒絕</Button>
                    <Button onClick={handleApproval}>通過</Button>
                </Flex>
            </Flex>
        </Flex>
    )

}



export default PendingListingDetail