import { Heading, Flex, Card, Button } from "@aws-amplify/ui-react";
import React from "react";
import { Link } from "react-router-dom";

const PreSellHouseForm = () => {

    return (
        <Flex className="pre-sell-house-form">
            <Heading className="pre-sell-house-form-head">出售香港住宅物業用的地產代理協議解釋</Heading>
            <Card className="pre-sell-house-form-content" variation="elevated ">
                <div>testacojajfokajoaoufnlxnzcjiadlamklfasfjaofjlkasflkamvzxkvjaokfasafafhcxbxcbxbxbxb</div>
                <div>testacojajfokajoaoufnlxnzcjiadlamklfasfjaofjlkasflkamvzxkvjaokfasafafhcxbxcbxbxbxb</div>
                <div>testacojajfokajoaoufnlxnzcj </div>
                <div>testacojajfokajoaoufnlxnzcj</div>
                <ol>
                    <li>testacojajfokajoaoufnlxnzcjiadlamklfasfjaofjlkasflkamvzxkvjaokfasafafhcxbxcbxbxbxb</li>
                    <li>testacojajfokajoaoufnlxnzcjiadlamklfasfjaofjlkasflkamvzxkvjaokfasafafhcxbxcbxbxbxb</li>
                    <li>testacojajfokajoaoufnlxnzcj</li>
                    <li>testacojajfokajoaoufnlxnzcj</li>
                    <li>testacojajfokajoaoufnlxnzcjiadlamklfasfjaofjlkasflkamvzxkvj</li>
                </ol>
                <div>tacojajfokajoaoufn</div>
                <div>testacojajfokajoaoufnlxnzcjiadlamklfasfjaofjlkasflkamvzxkvj</div>
                <div>tacojajfokajoaoufn</div>
                <ol>
                    <li>testacojajfokajoaoufnlxnzcjiadlamklfasfjaofjlkasflkamvzxkvj</li>
                    <li>testacojajfokajoaoufnlxnzcjiadlamklfasfjaofjlkasflkamvzxkvj</li>
                    <li>testacojajfokajoaoufnlxnzcjiadlamklfasfjaofjlkasflkamvzxkvjaokfasafafhcxbxcbxbxbxb</li>
                </ol>
            </Card>
            <Flex className="confirm-presell-form-div">
                <Link to="/sellhouseform">
                    <Button className="agree-presell-form-button">同意及明白以上條款及解釋</Button>
                </Link>
            </Flex>


        </Flex>

    )

}

export default PreSellHouseForm;