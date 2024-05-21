import { Heading, Flex, Button, Text, Input, FileUploader, SelectField, Menu, MenuItem, MenuButton, ToggleButton, ToggleButtonGroup } from "@aws-amplify/ui-react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlusCircle } from 'react-icons/fa';
import { form3InputValidate, uploadPendingListing } from "../store/actions/sellHomeFrom3Action";
import { useDispatch, useSelector } from "react-redux";
import { invalidInput, validInput, clearErrorMessages } from "../store/reducers/sellHomeForm3Reducer";
import { v4 as uuidv4 } from 'uuid';
import PhotoUploader from "./PhotoUploader";
import { verifyAuth } from "../store/actions/authAction";
import { verifyAuthFail } from "../store/reducers/authReducer";


const SellHouseFormFill = () => {

    const isInputValid = useSelector((state) => state.form3Input.isValid);
    const inputErrorMessages = useSelector((state) => state.form3Input.errorMessages);
    const { userId } = useSelector((state) => state.userAuth);
    const state = useSelector(state => state);

    const [formInput, setFormInput] = useState(
        {
            region: "",
            district: "",
            type: "",
            estate: "",
            block: "",
            phase: "",
            floor: "",
            unit: "",
            room: "",
            facilities: [],
            decorations: [],
            view: [],
            sellingPoints: [],
            isHaunt: false,
            price: "",
            priceWithoutLandPremium: "",
        }

    )

    const [individualOwners, setIndividualOwners] = useState([]);

    const [companyOwners, setCompanyOwners] = useState([]);


    const dispatch = useDispatch();
    const navigate = useNavigate();


    //Region source
    const hkRegions = ["香港", "九龍", "新界", "離島"];
    //District source 
    const hkDistricts = ["堅尼地城", "西營盤", "石塘咀", "中上環", "中西半山", "灣仔", "金鐘", " 銅鑼灣", "跑馬地", "天后", "大坑", "北角", "炮台山", "鰂魚涌", "太古城", "西灣河", "筲箕灣", "杏花邨", "柴灣", "小西灣", "石澳", "香港仔", "鴨脷洲", "黃竹坑", "南區"];
    const kwDistricts = ["藍田", "油塘", "觀塘", "牛頭角", "九龍灣", "牛池灣", "鑽石山", "樂富", "土瓜灣", "九龍城", "啟德", "新蒲崗", "黃大仙", "九龍塘", "何文田", "又一村", "深水埗", "石硤尾", "南昌", "荔枝角", "長沙灣", "美孚", "荔景", "大角咀", "奧運", '九龍站', '太子', '旺角', '油麻地', '佐敦', '尖沙咀', '紅磡', '黃埔'];
    const ntDistricts = ["西貢", "清水灣", "將軍澳", "康城", "馬鞍山", "沙田", "大圍", "火炭", "大埔", "太和", "粉嶺", "上水", "元朗", "洪水橋", "天水圍", "屯門", "深井（荃灣）", "荃灣", "大窩口", "葵涌", "葵芳", "青衣", "沙頭角"];
    const isDistricts = ['馬灣', '愉景灣', '東涌', '南大嶼山', '大澳', '坪洲', '南丫島', '長洲', '其他離島'];
    //Type source 
    const propertyTypes = [
        "私樓", "居屋", "公屋", "唐樓", "村屋"
    ];
    //RoomType source 
    const rooms = ["開放式", "一房", "兩房", "三房", "其他"];
    //Facilites source 
    const facilites = ["鄰近港鐵站", "鄰近輕鐵站", "多條巴士線", "巴士總站", "大型商場", "鄰近街市", "大型休憩公園", "會所設備齊全", "穿梭巴士", "停車場"];
    //Decoration source 
    const decorations = [
        "豪華/特色裝修", "新淨靚裝", "簡約裝修", "清雅別緻", "方正實用", "主人房套廁", "有露台", "有花園/平台", "有天台", "工人房/儲物室"];
    //View source 
    const views = [
        "開揚遠景", "山景", "河景", "煙花景", "園景", "泳池景"
    ];
    //SellingPoints source 
    const sellingPoints = [
        "連一個車位", "連多個車位", "內置樓梯上天台", "特大花園/平台", "超高樓底", "車入花園", "已做大維修", "可養寵物", "環境清幽"
    ];

    //SelectedRegion
    const [selectedRegion, setSelectedRegion] = useState(null);
    //District Show Control
    const [showHkDisplayOn, setShowHkDisplayOn] = useState(false);
    const [showKwDisplayOn, setShowKwDisplayOn] = useState(false);
    const [showNtDisplayOn, setShowNtDisplayOn] = useState(false);
    const [showIsDisplayOn, setShowIsDisplayOn] = useState(false);
    //SelectedDistrict
    const [selectedDistrict, setSelectedDistrict] = useState("");
    //SelectedPropertyType
    const [selectedPropertyType, setSelectedPropertyType] = useState(null);
    //SelectedRoom
    const [selectedRoom, setSelectedRoom] = useState(null);
    //SelectedHuant
    const [selectedHuant, setSelectedHuant] = useState();

    // Estate Input Show Control

    const [displayPhase, setDisplayPhase] = useState("")
    const [displayBlock, setDisplayBlock] = useState("")
    const [displayFloor, setDisplayFloor] = useState("")
    const [displayUnit, setDisplayUnit] = useState("")


    //PriceWithoutLandPremium Show Cotrol
    const [displayPrice, setDisplayPrice] = useState("");
    const [displayPriceWithoutLand, setDisplayPriceWithoutLand] = useState("");
    const [showExtraPrice, setShowExtraPrice] = useState(false);


    const DistrictDisplay = ({ districts }) => (
        <div className="display-on">
            <Flex className="sell-house-formfill-item-div">
                <Text className="sell-house-formfill-sub-title">地區</Text>
                <Flex className="sell-house-form-district-button-container">
                    {districts.map((district, index) => (
                        <ToggleButton className="sell-house-form-button"
                            key={index}
                            value={district}
                            onClick={() => handleSingleSelection('district', district)}
                            isPressed={selectedDistrict === district ? true : false}
                        >{district}</ToggleButton>
                    ))}
                </Flex>
            </Flex>
        </div>
    );

    //Handle Button click for single option. Matching type and value to control selected state and formInput state
    const handleSingleSelection = (type, value) => {
        switch (type) {
            case "region":
                setSelectedRegion(value)
                setShowHkDisplayOn(value === "香港");
                setShowKwDisplayOn(value === "九龍");
                setShowNtDisplayOn(value === "新界");
                setShowIsDisplayOn(value === "離島");
                setFormInput({ ...formInput, region: value, district: "" });
                dispatch(clearErrorMessages())
                break;
            case "district":
                setSelectedDistrict(value);
                dispatch(clearErrorMessages())
                break;
            case "type":
                setSelectedPropertyType(value);
                dispatch(clearErrorMessages())
                if (value === "居屋" || value === "公屋") {
                    setShowExtraPrice(true);
                } else {
                    setShowExtraPrice(false);
                }
                break;
            case "room":
                setSelectedRoom(value)
                dispatch(clearErrorMessages())
                break;
            case "isHaunt":
                setSelectedHuant(value)
                dispatch(clearErrorMessages())
                break;
            default:
                break;
        };

        setFormInput(prevState => ({
            ...prevState,
            [type]: value
        }));
    };


    //Handle formInput state. Matching name and value for input value

    const handleInputChange = (name, value) => {

        let actualValue = value

        switch (name) {
            case "phase":
                actualValue = value.replace(/[^A-Za-z0-9]/g, "");
                setDisplayPhase(actualValue + "期");
                break;
            case "block":
                actualValue = value.replace(/[^A-Za-z0-9]/g, "");
                setDisplayBlock(actualValue + "座");
                break;
            case "floor":
                actualValue = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
                setDisplayFloor(actualValue + "樓");
                break;
            case "unit":
                actualValue = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
                setDisplayUnit(actualValue + "室");
                break;
            case "price":
                actualValue = value.replace(/[^0-9.]/g, "");
                const formattedPrice = actualValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                setDisplayPrice(formattedPrice);
                break;
            case "priceWithoutLandPremium":
                actualValue = value.replace(/[^0-9.]/g, "");
                const formattedPriceWithoutLand = actualValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                setDisplayPriceWithoutLand(formattedPriceWithoutLand);
                break;
            default:
                break;
        }

        setFormInput({
            ...formInput,
            [name]: actualValue
        });
        dispatch(clearErrorMessages())
    }


    const [photos, setPhotos] = useState([]);

    const handleFilesAdded = (newPhotos) => {
        setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
        console.log(newPhotos);
    };

    useEffect(() => {
        console.log(photos);
    }, [photos])




    //Handle Display Price Format and pass to formInput state

    /*   const handleDisplayPriceChange = (name, value) => {
  
          switch (name) {
  
              case "price":
                  const rawPrice = value.replace(/[^0-9.]/g, "");
                  handleInputChange(name, rawPrice);
                  const formattedPrice = rawPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  setDisplayPrice(formattedPrice);
  
                  break;
  
              case "priceWithoutLandPremium":
                  const rawPriceWithoutLand = value.replace(/[^0-9.]/g, "");
                  handleInputChange(name, rawPriceWithoutLand);
                  const formattedPriceWithoutLand = rawPriceWithoutLand.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  setDisplayPriceWithoutLand(formattedPriceWithoutLand);
  
                  break;
  
              default:
                  break;
          }}
   */

    /* const rawValue = value.replace(/[^0-9.]/g, "");
    handleInputChange(name, rawValue);
    const formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
    setDisplayPrice(formattedValue); 
    setDisplayPriceWithoutLand(formattedValue); */



    //Handle OwnerInput
    const handleIndividualOwnerInput = (id, name, value) => {
        setIndividualOwners(prevOwners => prevOwners.map((owner) => {
            if (owner.id === id) {
                return {
                    ...owner,
                    [name]: value
                }
            }
            return owner;

        })
        );
        dispatch(clearErrorMessages())
    }

    const handleCompanyOwnerInput = (id, name, value) => {
        setCompanyOwners(prevCompanyOwners => prevCompanyOwners.map((companyOwner) => {
            if (companyOwner.id === id) {
                return {
                    ...companyOwner,
                    [name]: value
                }
            }
            return companyOwner;
        }));
        dispatch(clearErrorMessages())
    }

    //Handle Button click for multiple option. Matching type and value to control selected state and formInput state
    const handleSpecialMultiple = (name, value) => {
        setFormInput(prevState => {
            const currentValues = prevState[name];
            const newValues = currentValues.includes(value) ? currentValues.filter(item => item !== value) : [...currentValues, value];
            return { ...prevState, [name]: newValues };
        })
    }


    const handleAddOwner = (value) => {
        if (value === "personalOwner") {
            const newOwner = {
                id: uuidv4(),
                ownerName: "",
                ownerHkId: "",
                ownerPhone: "",

            };
            setIndividualOwners(prevOwners => [...prevOwners, newOwner]);

        } else if (value === "companyOwner") {
            const newCompanyOwner = {
                id: uuidv4(),
                companyName: "",
                bussinessRegistrationId: "",
                directorName: "",
                directorHkId: "",
                directorPhone: "",
                companyAddress: "",

            };
            setCompanyOwners(prevCompanyOwners => [...prevCompanyOwners, newCompanyOwner])

        };

    }

    const handleReduceOwner = (value, id) => {
        if (value === "personalOwner") {
            setIndividualOwners(prevOwners => prevOwners.filter((owner => owner.id !== id)));
            dispatch(clearErrorMessages())
        } else if (value === "companyOwner") {
            setCompanyOwners(prevCompanyOwners => prevCompanyOwners.filter((companyOwner => companyOwner.id !== id)));
            dispatch(clearErrorMessages())
        }

    }

    const handleFormSubmit = async () => {
        const validationResult = await form3InputValidate(formInput, individualOwners, companyOwners);
        console.log(validationResult); // Log the result here
        switch (validationResult.isValid) {
            case true:
                const checkAuthRes = await verifyAuth(dispatch);
                console.log("verifyResult:", checkAuthRes)
                if (checkAuthRes.success) {
                    await uploadPendingListing(formInput, individualOwners, companyOwners, photos, userId);
                    /* navigate("/sellhousef3") */
                } else if (!checkAuthRes.success) {
                    console.log("請重新登入");
                    navigate('/login')
                }
                break;
            case false:
                dispatch(invalidInput(validationResult))
                break;
            default:
                break;
        }

    };


    useEffect(() => {
        console.log(formInput);
        console.log(individualOwners);
        console.log(companyOwners);
        console.log(isInputValid);
        console.log(inputErrorMessages);
        console.log(state);
    }, [formInput])


    return (
        <Flex className="sell-house-form-fill">
            <Heading className="sell-house-formfill-head">賣樓</Heading>

            <Flex direction="column" gap="2px">
                <Text className="sell-house-formfill-main-title">單位資料</Text>
                <Text className="offer-deal-remark">須提供詳細地址以供查冊</Text>
            </Flex>

            {/* 區域 */}

            <Flex className="sell-house-formfill-item-div">
                <Text className="sell-house-formfill-sub-title">區域</Text>

                <Flex direction="row">
                    {hkRegions.map((hkRegion, index) => {
                        return (
                            <ToggleButton
                                className='sell-house-form-button'
                                key={index}
                                value={hkRegion}
                                isPressed={selectedRegion === hkRegion}
                                onClick={() => handleSingleSelection('region', hkRegion)}>
                                {hkRegion}
                            </ToggleButton>
                        );
                    })}
                </Flex>

            </Flex>

            {showHkDisplayOn && <DistrictDisplay districts={hkDistricts} />}
            {showKwDisplayOn && <DistrictDisplay districts={kwDistricts} />}
            {showNtDisplayOn && <DistrictDisplay districts={ntDistricts} />}
            {showIsDisplayOn && <DistrictDisplay districts={isDistricts} />}


            {/*    物業類型 */}


            <Flex className="sell-house-formfill-item-div">
                <Text className="sell-house-formfill-sub-title">物業類型</Text>
                <Flex className="sell-house-form-district-button-container">
                    {propertyTypes.map((propertyType, index) => {
                        return <ToggleButton
                            className="sell-house-form-button"
                            isPressed={selectedPropertyType === propertyType}
                            key={index} value={propertyType}
                            onClick={() => handleSingleSelection('type', propertyType)}>
                            {propertyType}</ToggleButton>
                    })}
                </Flex>
            </Flex>


            {/*    單位資料 */}

            <Flex direction="row">
                <Flex className="sell-house-formfill-item-div">
                    <Text className="sell-house-formfill-sub-title">屋苑/大廈名稱 *</Text>
                    <Input isRequired
                        name="estate"
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)} />
                </Flex>
                <Flex className="sell-house-formfill-item-div">
                    <Text className="sell-house-formfill-sub-title">座數</Text>
                    <Input
                        name="block"
                        value={displayBlock}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)} />
                </Flex>
            </Flex>

            <Flex direction="row">
                <Flex className="sell-house-formfill-item-div">
                    <Text className="sell-house-formfill-sub-title">期數</Text>
                    <Input
                        name="phase"
                        value={displayPhase}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)} />
                </Flex>
                <Flex className="sell-house-formfill-item-div">
                    <Text className="sell-house-formfill-sub-title">樓層</Text>
                    <Input
                        name="floor"
                        value={displayFloor}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)} />
                </Flex>
                <Flex className="sell-house-formfill-item-div">
                    <Text className="sell-house-formfill-sub-title">單位</Text>
                    <Input
                        name="unit"
                        value={displayUnit}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)} />
                </Flex>
            </Flex>


            {/* 房型*/}

            <Flex className="sell-house-formfill-item-div">
                <Text className="sell-house-formfill-sub-title">房間</Text>
                <Flex className="sell-house-form-district-button-container">
                    {rooms.map((room, index) => {
                        return <ToggleButton className="sell-house-form-button" key={index}
                            isPressed={selectedRoom === room}
                            onClick={() => {
                                handleSingleSelection('room', room)
                            }}>{room}</ToggleButton>
                    })}
                </Flex>
            </Flex>


            {/*        特色/設備 */}

            <Flex className="sell-house-formfill-item-div">
                <Text className="sell-house-formfill-sub-title">特色/設備 *</Text>


                <Text className="sell-house-formfill-sub-title">附近交通/配套：</Text>
                <Flex className="sell-house-form-district-button-container">
                    {facilites.map((facility, index) => {
                        return <ToggleButton
                            name="facilities"
                            value={facility}
                            onClick={() => handleSpecialMultiple("facilities", facility)}
                            className="sell-house-form-button"
                            key={index}>{facility}</ToggleButton>
                    })}
                </Flex>
            </Flex>

            <Flex className="sell-house-formfill-item-div">
                <Text className="sell-house-formfill-sub-title">裝修/間隔：</Text>
                <Flex className="sell-house-form-district-button-container">
                    {decorations.map((decoration, index) => {
                        return <ToggleButton
                            name="decorations"
                            value={decoration}
                            onClick={() => handleSpecialMultiple("decorations", decoration)}
                            className="sell-house-form-button"
                            key={index}>{decoration}</ToggleButton>
                    })}
                </Flex>
            </Flex>

            <Flex className="sell-house-formfill-item-div">
                <Text className="sell-house-formfill-sub-title">景觀：</Text>
                <Flex className="sell-house-form-district-button-container">
                    {views.map((view, index) => {
                        return <ToggleButton
                            className="sell-house-form-button"
                            name="view"
                            value={view}
                            onClick={() => handleSpecialMultiple("view", view)}
                            key={index}>{view}</ToggleButton>
                    })}
                </Flex>
            </Flex>

            <Flex className="sell-house-formfill-item-div">
                <Text className="sell-house-formfill-sub-title">賣點：</Text>
                <Flex className="sell-house-form-district-button-container">
                    {sellingPoints.map((sellingPoint, index) => {
                        return <ToggleButton
                            name="sellingPoints"
                            value={sellingPoint}
                            className="sell-house-form-button"
                            onClick={() => handleSpecialMultiple("sellingPoints", sellingPoint)}
                            key={index}>{sellingPoint}</ToggleButton>
                    })}
                </Flex>
            </Flex>


            {/*   照片上傳 */}

            <Flex className="photo-upload">
                <Text className="sell-house-formfill-sub-title">照片</Text>
                <PhotoUploader onFilesAdded={handleFilesAdded} photos={photos} />
                <div className="photo-upload-cancel">
                    <Button className="sell-house-form-remove-button" onClick={() => setPhotos([])}>取消</Button>
                </div>
            </Flex>

            {/*凶宅 */}

            <Flex className="sell-house-formfill-item-div">

                <Text className="sell-house-formfill-sub-title">凶宅</Text>
                <Text>(凶宅一般指單位曾經發生凶案/自殺/意外引致有人死亡。)</Text>

                <Flex direction="row">
                    <ToggleButton
                        isPressed={selectedHuant === true}
                        onClick={() => handleSingleSelection('isHaunt', true)}>是</ToggleButton>
                    <ToggleButton
                        isPressed={selectedHuant === false}
                        onClick={() => handleSingleSelection('isHaunt', false)}>否</ToggleButton>
                </Flex>
            </Flex>

            {/* 價錢 */}

            <Flex direction="row" gap="40px">
                <Flex className="sell-house-formfill-item-div">
                    <Text className="sell-house-formfill-main-title">放售價錢</Text>
                    <Input placeholder="HK$"
                        name="price"
                        className="sell-house-formfill-price-input"
                        value={displayPrice}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)} />
                </Flex>
                {showExtraPrice && (<Flex className="sell-house-formfill-item-div">
                    <Text className="sell-house-formfill-main-title">放售價錢(未補地價)</Text>
                    <Input placeholder="HK$"
                        className="sell-house-formfill-price-input"
                        name="priceWithoutLandPremium"
                        value={displayPriceWithoutLand}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                    />
                </Flex>)}
            </Flex>



            {/*業權人 */}

            <Flex direction="column">
                <Flex className="form-fill-owner-title-gp">
                    <Text className="sell-house-formfill-main-title">業權人資料</Text>
                    <Text >(如業權人多於一人，請按+ 輸入其餘業權人資料)</Text>
                </Flex>

                <Menu trigger={
                    <MenuButton>
                        <FaPlusCircle /><Text>增加業權人</Text>
                    </MenuButton>
                }>
                    <MenuItem value="personalOwner" onClick={() => handleAddOwner("personalOwner")}>個人業主</MenuItem>
                    <MenuItem value="companyOwner" onClick={() => handleAddOwner("companyOwner")} >公司業主</MenuItem>
                </Menu>

                <Flex className="sell-house-formfill-item-div">
                    {
                        individualOwners.map((owner, index) => {
                            return (
                                <Flex className="sell-house-formfill-individual-owner-gp" key={owner.id}>
                                    <Flex className="sell-house-formfill-item-div">
                                        <Text>業主姓名 {index + 1} *</Text>
                                        <Input
                                            name="ownerName"
                                            onChange={(e) => {
                                                handleIndividualOwnerInput(owner.id, e.target.name, e.target.value)
                                            }} />

                                    </Flex>
                                    <Flex className="sell-house-formfill-item-div">
                                        <Text>業主身份證號碼 *</Text>
                                        <Input
                                            name="ownerHkId"
                                            onChange={(e) => {
                                                handleIndividualOwnerInput(owner.id, e.target.name, e.target.value)
                                            }}
                                        />
                                    </Flex>
                                    <Flex className="sell-house-formfill-item-div">
                                        <Text>電話號碼 *</Text>
                                        <Input
                                            name="ownerPhone"
                                            onChange={(e) => {
                                                handleIndividualOwnerInput(owner.id, e.target.name, e.target.value)
                                            }}
                                        />
                                    </Flex>
                                    <Button className="sell-house-form-remove-button" onClick={() => handleReduceOwner("personalOwner", owner.id)} >移除</Button>
                                </Flex>
                            )
                        }
                        )
                    }
                </Flex>


                <Flex className="sell-house-formfill-item-div">
                    {
                        companyOwners.map((companyOwner, index) => {
                            return (
                                <div key={companyOwner.id}>
                                    <Flex direction="row">
                                        <Flex className="sell-house-formfill-item-div">
                                            <Text>公司名稱 {index + 1} *</Text>
                                            <Input
                                                name="companyName"
                                                onChange={(e) => handleCompanyOwnerInput(companyOwner.id,
                                                    e.target.name,
                                                    e.target.value)} />
                                        </Flex>
                                        <Flex className="sell-house-formfill-item-div">
                                            <Text>商業登記證號碼 *</Text>
                                            <Input
                                                name="bussinessRegistrationId"
                                                onChange={(e) => handleCompanyOwnerInput(companyOwner.id,
                                                    e.target.name,
                                                    e.target.value)}
                                            />
                                        </Flex>
                                    </Flex>
                                    <Flex className="sell-house-formfill-company-owner-div">
                                        <Flex className="sell-house-formfill-item-div">
                                            <Text>公司董事姓名 *</Text>
                                            <Input
                                                name="directorName"
                                                onChange={(e) => handleCompanyOwnerInput(companyOwner.id,
                                                    e.target.name,
                                                    e.target.value)}
                                            />
                                        </Flex>
                                        <Flex className="sell-house-formfill-item-div">
                                            <Text>公司董事身份證號碼 *</Text>
                                            <Input
                                                name="directorHkId"
                                                onChange={(e) => handleCompanyOwnerInput(companyOwner.id,
                                                    e.target.name,
                                                    e.target.value)}
                                            />
                                        </Flex>
                                        <Flex className="sell-house-formfill-item-div">
                                            <Text>電話號碼 *</Text>
                                            <Input
                                                name="directorPhone"
                                                onChange={(e) => handleCompanyOwnerInput(companyOwner.id,
                                                    e.target.name,
                                                    e.target.value)}
                                            />
                                        </Flex>
                                        <Button className="sell-house-form-remove-button" onClick={() => handleReduceOwner("companyOwner", companyOwner.id)} >移除</Button>
                                    </Flex>
                                    <Flex className="sell-house-formfill-item-div">
                                        <Text>公司地址</Text>
                                        <Input
                                            name="companyAddress"
                                            onChange={(e) => handleCompanyOwnerInput(companyOwner.id,
                                                e.target.name,
                                                e.target.value)}
                                        />
                                    </Flex>

                                </div>
                            )
                        }
                        )
                    }
                </Flex>


            </Flex>


            {isInputValid === false && inputErrorMessages.length > 0 && (<Flex className="form3-error-message">
                {inputErrorMessages.map((message, index) => (
                    <div key={index}>{message}</div>
                ))}
            </Flex>)}


            <Flex direction="row">

                <Button>取消</Button>
                {/*  <Link to="/sellhousef3"> */}<Button onClick={() => handleFormSubmit()}>提交</Button>

            </Flex>

        </Flex>

    )

}

export default SellHouseFormFill;