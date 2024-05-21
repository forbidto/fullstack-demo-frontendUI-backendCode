import { Heading, Flex, Card, Button, Text } from "@aws-amplify/ui-react";
import React from "react";
import { Link } from "react-router-dom";

const PreBuyHouseForm = () => {

    return (
        <Flex className="pre-sell-house-form">
            <Heading className="pre-sell-house-form-head">購買香港住宅物業用的地產代理協議解釋</Heading>
            <Flex className="pre-sell-house-form-remark" >testacojajfokajoaoufnlxnzcjiadlamklfasfjaofjlkasflkamvzxkvjaokfasafafhcxbxcbxbxbxb</Flex>
            <Card className="pre-sell-house-form-content" variation="elevated ">
                <div>testacojajfokajoaoufnlxnzcjiadlamklfasfjaofjlkasflkamvzxkvjaokfasafafhcxbxcbxbxbxb</div>
                <div>testacojajfokajoaoufnlxnzcjiadlamklfasfjaofjlkasflkamvzxkvjaokfasafafhcxbxcbxbxbxb</div>
                <div>okajoaoufnlxnzcjiadlamklfa </div>
                <div>testacojajfokajoaoufnlxnzcjiadlamklfasfjaofjlkasflkamvzxkvjaokfasafafhcxbxcbxbxbxb</div>
                <ol>
                    <li>testacojajfokajoaoufnlxnzcjiadlamklfasfjaofjlkasflkamvzxkvjaokfasafafhcxbxcbxbxbxb</li>
                    <li>aoufnlxnzcjiadlamklfa</li>
                    <li>aoufnlxnzcjiadlamklfa</li>
                    <li>testacojajfokajoaoufnlxnzcjiadlamklfasfjaofjlkasflkamvzxkvjaokfasafafhcxbxcbxbxbxb</li>
                </ol>
                <div>aoufnlxnzcjiadlamklfa</div>
                <div>testacojajfokajoaoufnlxnzcjiadlamklfasfjaofjlkasflkamvzxkvjaokfasafafhcxbxcbxbxbxb</div>
                <div>aoufnlxnzcjiadlamklfa </div>
                <div>testacojajfokajoaoufnlxnzcjiadlamklfasfjaofjlkasflkamvzxkvjaokfasafafhcxbxcbxbxbxb</div>
                <div>vasd</div>
                <ol>
                    <li>aoufnlxnzcjiadlamklfa</li>
                    <li>tacojajfokajoaoufnlxnzcjiadlamklfasfjaofjlkasflkamvzxkvjaokfasafafhcxbxcbxbxbx</li>
                    <li>tacojajfokajoaoufnlxnzcjiadlamklfasfjaofjlkasflkamvzxkvjaokfasafafhcxbxcbxbxbx</li>
                </ol>
            </Card>
            <Flex className="confirm-presell-form-div">
                <Link to="/buyhouseform4">
                    <Button className="agree-presell-form-button">同意及明白以上條款及解釋</Button>
                </Link>
            </Flex>


        </Flex>

    )

}

export default PreBuyHouseForm;