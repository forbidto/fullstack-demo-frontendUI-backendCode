import React, { useState } from "react";
import ListingDetailLeftPart from "./ListingDetailLeftPart";
import ListingDetailRightPart from "./ListingDetailRightPart";
import { Flex } from "@aws-amplify/ui-react";
import MortgageCalculator from "./MortgageCalculator";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import localImage from "../Img/test1.png"
import localImage2 from "../Img/test2.png"
import localImage3 from "../Img/test3.png"


const client = new S3Client({
    region: "ap-east-1",
    credentials: {
        accessKeyId: "your access key",
        secretAccessKey: "AccessKey"
    }
});

const ListingDetailPage = () => {

    const [mainImage, setMainImage] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOWEJz5vMvVbv0RnuMj4zRDV8Q3uEedO6EmA&usqp=CAU");
    const [allImages, setAllImages] = useState([localImage,localImage2,localImage3]);

    const fetchImages = async () => {
        const bucketName = "bucketName";
        const prefix = `prefix`;
        const cloudFrontDomain = 'CloudFront domain'; // Replace with your CloudFront domain

        const listParams = {
            Bucket: bucketName,
            Prefix: prefix
        }

        const command = new ListObjectsV2Command(listParams)


        try {
            const response = await client.send(command);

            console.log("S3 response", response)

            const imageUrls = response.Contents.map(content => {
                return `${cloudFrontDomain}/${content.Key}`;
            });
            console.log("imageUrls:", imageUrls);
            setMainImage(imageUrls[0]);
            setAllImages(imageUrls);
        } catch (error) {
            console.error("Error fetching images from S3", error);
        }
    };


   /*  useEffect(() => {
        fetchImages();
    }, []);
 */

    const handleMainImageChange = (image) => {
        setMainImage(image);
    };


    return (
        <div>
            <Flex className="list-detail-group">
                <ListingDetailLeftPart mainImage={mainImage} />
                <ListingDetailRightPart
                    allImages={allImages}
                    onMainImageChange={handleMainImageChange}
                />
            </Flex>
            <MortgageCalculator />
        </div>

    )

}

export default ListingDetailPage;