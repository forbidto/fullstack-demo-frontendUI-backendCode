import React, { useState, useRef, useEffect } from "react";
import { Button, View, Flex, Card, Text } from "@aws-amplify/ui-react";
import ReactModal from 'react-modal';
import SignatureCanvas from 'react-signature-canvas';
import { useSelector } from "react-redux";
import { pdf } from '@react-pdf/renderer';
import Form3Pdf from "./form3PdfGeneration";
import { currentYear, currentMonth, currentDay, expirationMonth, expirationDay, expirationYear } from "../store/utils/authUtils";
import { useNavigate, useParams } from "react-router-dom";
import { getSellerAgreementUploadUrl, sellerAgreementDataUpdate } from "../store/actions/myListingAction";

ReactModal.setAppElement('#root');

const SellHouseSign = () => {

    const navigate = useNavigate();

  /*   const { id } = useParams(); */
  const id = "1f2c81cb-1996-4dea-b0fd-df06e5d5d835";
  /*   const individualOwners = useSelector(state => state.myListings.individualOwners);
    const companyOwners = useSelector(state => state.myListings.companyOwners); */

    const individualOwners = [{
        userId: "8d35f9ca-d75d-4a9b-bc71-bc03b4a4c319",
        createdAt: "2023-11-24T14:58:22.314Z",
        bussinessRegistrationId: null,
        companyAddress: null,
        directorName: null,
        id: "99bf8278-f0ed-409e-928c-2fbf1162cae3",
        ownerHkId: "c1234569",
        ownerName: "CHAN TAI MAN",
        ownerPhone: "94785541",
        type: "individual"
      }, {
        userId: "abcf",
        createdAt: "2018-10-13T19:00:00Z",
        bussinessRegistrationId: null,
        companyAddress: null,
        directorName: null,
        id: "opsada",
        ownerHkId: "dsaihvzxjv",
        ownerName: "LEE LEUNG KEI",
        ownerPhone: "dsaihvzxjv",
        type: "individual"
      }];
    const companyOwners = [{
        userId: "test563223",
        createdAt: "2023-11-22T07:25:42.944Z",
        bussinessRegistrationId: "97845541",
        companyAddress: "BAI TAT YING LIMITED COMPANY",
        directorName: "LEE LEUNG KEI",
        id: "7aa8e110-99a5-46f5-887d-e6864f3495f5",
        ownerHkId: "c1234569",
        ownerName: "BAI TAT YING LIMITED COMPANY",
        ownerPhone: "97845541",
        type: "company"
      }];
  

    const selectListingById = (listingId) => (state) => {
        return state.myListings.listings.find((listing) => listing.id === listingId);
    }

    const listingStore = useSelector(state=>state.myListings)

    const selectedListing = useSelector(selectListingById(id))


    const [isSignatureVisible, setIsSignatureVisible] = useState(false);
    const [currentOwner, setCurrentOwner] = useState(null);
    const [signatures, setSignatures] = useState([{}]);
    const [viewSignatures, setViewSignatures] = useState([{}]);
    const [resizedSignatures, setResizedSignatures] = useState([]);

    const sigCanvasRef = useRef({});

    useEffect(() => {
        console.log("signatures", signatures)
        console.log("resizedSig:", resizedSignatures)
        console.log("viewSignatures:", viewSignatures)
        console.log("selectedListing", selectedListing )
        console.log("listingStore", listingStore)
        console.log("owner", individualOwners,companyOwners)
    }, [signatures]);

    useEffect(() => {
        console.log(individualOwners)
        console.log(companyOwners)
    }, []);


    const handleIsSignatureVisible = (owner) => {
        setIsSignatureVisible(true);
        setCurrentOwner(owner)
    };

    const handleCloseModal = () => {
        setIsSignatureVisible(false);
    };

    const handleClearSignature = () => {
        sigCanvasRef.current.clear();
        setSignatures({
            ...signatures,
            [currentOwner.createdAt]: null
        });

        setResizedSignatures(prevSignatures => [...prevSignatures, null]);

        /*   setReizedSignatures({
              ...resizedSignatures,
              [currentOwner.createdAt]: null
          }); */
    };

    const resizeSignature = (signatureCanvas, width, height) => {
        let signatureImage = new Image();
        signatureImage.src = signatureCanvas;

        return new Promise((resolve) => {
            signatureImage.onload = () => {
                const resizedCanvas = document.createElement('canvas');
                const ctx = resizedCanvas.getContext('2d');
                resizedCanvas.width = width;
                resizedCanvas.height = height;

                ctx.drawImage(signatureImage, 0, 0, width, height);
                const resizedSignature = resizedCanvas.toDataURL('image/png');
                resolve(resizedSignature);
            };
        });
    };

    const handleSaveSignature = () => {

        if (!sigCanvasRef.current.isEmpty()) {
            // You can access the signature image as a data URL here
            const signatureCanvas = sigCanvasRef.current.getTrimmedCanvas().toDataURL('png');

            let signatureImage = new Image();
            signatureImage.src = signatureCanvas;
            signatureImage.onload = () => {
                const resizedCanvas = document.createElement('canvas');
                const ctx = resizedCanvas.getContext('2d');
                const resizedWidth = 50;
                const resizedHeight = 10;
                resizedCanvas.width = resizedWidth;
                resizedCanvas.height = resizedHeight;

                ctx.drawImage(signatureImage, 0, 0, resizedWidth, resizedHeight);
                const resizedSignature = resizedCanvas.toDataURL('image/png');


                setSignatures({
                    ...signatures,
                    [currentOwner.createdAt]: signatureCanvas
                });

                setResizedSignatures(prevSignatures => [...prevSignatures, { createdAt: currentOwner.createdAt, resizedSignature }]);

                /*    setReizedSignatures({
                       ...resizedSignatures,
                       [currentOwner.createdAt]: resizedSignature
                   }) */

                console.log(signatures);
                console.log(signatureCanvas);
                console.log(resizedSignature)
                handleCloseModal();

            };

        } else {
            alert("Please sign")
        }

    };

    const handleNewSaveSignature = async () => {

        if (!sigCanvasRef.current.isEmpty()) {

            try {
                // You can access the signature image as a data URL here
                const signatureCanvas = sigCanvasRef.current.getTrimmedCanvas().toDataURL('png');

                // Resizing for display in <View> div
                const viewSignature = await resizeSignature(signatureCanvas, 120, 120);

                // Resizing for display in PDF
                const pdfSignature = await resizeSignature(signatureCanvas, 50, 25);

                setSignatures({
                    ...signatures,
                    [currentOwner.createdAt]: signatureCanvas
                });

                setViewSignatures(
                    {
                        ...viewSignatures,
                        [currentOwner.createdAt]: viewSignature
                    }
                );

                setResizedSignatures(
                    prevSignatures => [...prevSignatures,
                    { createdAt: currentOwner.createdAt, pdfSignature }
                    ]);

                handleCloseModal();
            } catch (error) {
                console.error("Error in resizing signature: ", error);
                alert("An error occurred while saving the signature");
            }


        } else {
            alert("Please sign")
        }

    };

    const handleFormSubmit = async () => {
 
        const blob = await pdf(
            <Form3Pdf
                formInput={selectedListing}
                signatures={resizedSignatures}
                individualOwners={individualOwners}
                companyOwners={companyOwners}
                currentYear={currentYear}
                currentMonth={currentMonth}
                currentDay={currentDay}
                expirationYear={expirationYear}
                expirationMonth={expirationMonth}
                expirationDay={expirationDay}
            />
        ).toBlob();
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');

        const userId = 'test'
        const getUrls = await getSellerAgreementUploadUrl(id, userId)
        const urls = getUrls.urls
        const pdfId = getUrls.pdfId
        const { district, type } = selectedListing

        const uploadPdfToUrl = async (pdfBob, targetUrl) => {
            try {
                const response = await fetch(targetUrl, {
                    method: "PUT",
                    body: pdfBob
                });
                if (response.ok) {
                    console.log(`PDF uploaded to ${targetUrl}`);
                    return { targetUrl, success: true, message: `${targetUrl} successfully uploaded` }
                } else {
                    console.error(`Error uploading PDF to ${targetUrl}`);
                    return { targetUrl, success: false, message: `${targetUrl} fail to upload` }
                }
            } catch (error) {
                return { targetUrl, success: false, reason: error.message };
            }
        }

        // Prepare an array of promises from each upload operation
        const uploadPromises = urls.map(targetUrl => uploadPdfToUrl(blob, targetUrl));

        // Await all the upload operations to complete
        const uploadResults = await Promise.all(uploadPromises);

        // Check if all uploads were successful
        const allUploadsSuccessful = uploadResults.every(result => result.success === true);

        if (allUploadsSuccessful) {
            console.log("All PDFs uploaded successfully");
            console.log("pdfId:", pdfId, "district:", district)
            // Proceed with the next operation
            return await sellerAgreementDataUpdate(id, pdfId, district, type)
        } else {
            console.error("Some uploads failed", uploadResults.filter(result => result.status === 'error'));
            // Handle the error situation
        }

    }


    const handleUpdateTableTest = async () => {

        const pdfId = "c13d6dd3-c9f8-4232-8376-b722d5388e79";
        const district = "堅尼地城";
        const type = "私樓";
        return await sellerAgreementDataUpdate(id, pdfId, district, type)
    }

    const handleCancel = async () => {
    }

    const [signCanvasWidth, setSignCanvasWidth] = useState(800)

    useEffect(() => {
        function handleResize() {
            const windowWidth = window.innerWidth;
            const newSignCanvasWidth = windowWidth * 0.6;
            setSignCanvasWidth(newSignCanvasWidth)
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [])

    const handleFormSubmitTest = async () => {

        const blob = await pdf(
            <Form3Pdf
                formInput={selectedListing}
                signatures={resizedSignatures}
                individualOwners={individualOwners}
                companyOwners={companyOwners}
                currentYear={currentYear}
                currentMonth={currentMonth}
                currentDay={currentDay}
                expirationYear={expirationYear}
                expirationMonth={expirationMonth}
                expirationDay={expirationDay}
            />
        ).toBlob();
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');


    }


    return (
        <div>

            {individualOwners && individualOwners.map((owner, index) => (
                <Flex className="sell-house-form-sign-gp" key={owner.createdAt}>
                    <Card className="sell-house-form-sign-card" variation="elevated" position="relative">
                        <Flex className="sell-house-form-sign-content-gp">
                            <View className="sell-house-form-signature-display">
                                {viewSignatures[owner.createdAt] && <img src={viewSignatures[owner.createdAt]}
                                    alt='Signature'
                                />}
                            </View>
                            <Flex className="sell-house-form-sign-info-button-gp">
                                <Text className="sell-house-form-sign-info">個人業主 {index + 1}: {owner.ownerName}</Text>
                                <Flex className="sell-house-form-sign-button-div" >
                                    <Button
                                        className="sell-house-form-sign-button"
                                        onClick={() => handleIsSignatureVisible(owner)}>
                                        簽名</Button>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Card>
                </Flex>
            ))}

            {companyOwners && companyOwners.map((companyOwner, index) => (
                <Flex className="sell-house-form-sign-gp" direction="column" key={companyOwner.createdAt}>
                    <Card className="sell-house-form-sign-card" variation="elevated" position="relative">
                        <Flex>
                            <View className="sell-house-form-signature-display">
                                {signatures[companyOwner.createdAt] && <img src={signatures[companyOwner.createdAt]} alt='Signature' />}
                            </View>
                            <Flex className="sell-house-form-sign-info-button-gp">
                                <div>
                                    <Text className="sell-house-form-sign-info">公司業主 {index + 1}: {companyOwner.ownerName}</Text>
                                    <Text className="sell-house-form-sign-info">公司業主 {index + 1} 代表: {companyOwner.directorName}</Text>
                                </div>
                                <Flex className="sell-house-form-sign-button-div" >
                                    <Button
                                        className="sell-house-form-sign-button"
                                        onClick={() => handleIsSignatureVisible(companyOwner)}>
                                        簽名</Button>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Card>
                </Flex>
            ))}



            <ReactModal
                isOpen={isSignatureVisible}
                onRequestClose={handleCloseModal}
                contentLabel="Modal"
                className="sell-house-form-sign-modal"
                overlayClassName="modal-overlay"
            >

                <Flex className="sell-house-form-sign-modal-content-gp">
                    <Flex className="sell-house-form-sign-modal-text-gp">
                        <Text className="sell-house-form-sign-info">簽署</Text>
                        <Text className="sell-house-form-sign-info">業權人:{currentOwner ? currentOwner.ownerName : ""}</Text>
                    </Flex>
                    <Flex className="sign-modal-signature">
                        <SignatureCanvas
                            penColor='black'
                            canvasProps={{ width: signCanvasWidth, height: 200, className: 'sigCanvas' }}
                            ref={sigCanvasRef}
                        />
                    </Flex>
                    <Flex className="sell-house-form-sign-modal-text-gp">
                        <Button
                            className="sell-house-form-sign-button"
                            onClick={() => handleClearSignature()}>清除</Button>
                        <Flex className="sell-house-form-sign-button-gp">
                            <Button
                                className="sell-house-form-sign-button"
                                onClick={() => handleCloseModal()}>取消</Button>
                            <Button
                                className="sell-house-form-sign-button"
                                onClick={handleNewSaveSignature}>確定</Button>
                        </Flex>
                    </Flex>
                </Flex>

            </ReactModal>

            <Flex className="sell-house-form-sign-submit-button-gp" >
                <Button className="sell-house-form-sign-button" onClick={handleFormSubmitTest}>提交</Button>
                <Button className="sell-house-form-sign-button" onClick={()=>navigate("/chat")}>取消</Button>
            </Flex>
        </div>
    )

}

export default SellHouseSign;