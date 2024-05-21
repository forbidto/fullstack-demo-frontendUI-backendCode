import { Heading, Flex, Card, Button, Text, Radio, RadioGroupField } from "@aws-amplify/ui-react";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { form3AgreementUpdate } from "../store/reducers/sellHomeForm3Reducer";
import { currentYear, currentMonth, currentDay, expirationDate, expirationMonth, expirationDay, expirationYear } from "../store/utils/authUtils";
import { fetchPendingOwners } from "../store/actions/adminApprovePendingListAction";
import { myListingIndividualOwnersQuery, myListingCompanyOwnersQuery, testAddListing } from "../store/reducers/myListingReducer";

const SellHouseForm3 = () => {

    const dispatch = useDispatch();
    /* const {id}=useParams() */
    const id = "1f2c81cb-1996-4dea-b0fd-df06e5d5d835";
    const individualOwners = useSelector(state => state.myListings.individualOwners);
    const companyOwners = useSelector(state => state.myListings.companyOwners);
    const price = useSelector(state => state.form3Input.price);
    const formattedPrice = price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const inputColor = "#e3163f";
    const state = useSelector(state => state);
    console.log(state);

    const handlePaidBeforeChange = (name, value) => {
        const booleanValue = value === "true";
        dispatch(form3AgreementUpdate({ value: booleanValue }));
    }

    const selectListingById = (listingId) => (state) => {
        return state.myListings.listings.find((listing) => listing.id === listingId);
    };

    const selectedListing = useSelector(selectListingById(id));
    console.log('f3 listing:', selectedListing)


    const [individualOwnerSet, setIndividualOwnerSet] = useState([]); // Use state for individual owners
    const [companyOwnerSet, setCompanyOwnerSet] = useState([]); // Use state for company owners

  /*   useEffect(() => {
        const fetchData = async () => {
            try {
                const { individualOwners, companyOwners } = await fetchPendingOwners(id).then();
                // Update the state with the fetched data

                console.log("individualOwners", individualOwners)
                console.log("companyOwners", companyOwners)
                setIndividualOwnerSet(individualOwners);
                setCompanyOwnerSet(companyOwners);
                dispatch(myListingIndividualOwnersQuery(individualOwners))
                dispatch(myListingCompanyOwnersQuery(companyOwners))
            } catch (error) {
                console.error("Error fetching owners", error);
            }
        };

        fetchData();

    }, []) */

    console.log('individualOwnerSet:', individualOwnerSet)
    console.log('individualOwners redux:', individualOwners)

    const handleFormInputTest =() =>{
        dispatch(testAddListing)
    }

    useState(()=>{
        console.log("owner", individualOwners, companyOwners)
    })


    return (
        <Flex className="sell-house-form-template">
            <Heading className="sell-house-form-template-head">本 表 格 由 地 產 代 理 監 管 局 按 《 地 產 代 理 條 例 》 訂 明</Heading>
            <Heading className="pre-sell-house-form-head">出售香港住宅物業用的地產代理協議 表格3</Heading>
            <Card className="sell-house-form-template-content-card" variation="elevated ">
                <div className="sell-house-form-template-notice">一般注意事項：請仔細閱讀本協議並按指示填寫。如你不明白本協議內的任何字句，請要求代理解釋。如你不明白或不同意代理的解釋，則最佳的做法是在簽署本協議前諮詢你的律師。
                </div>
                <div className="sell-house-form-template-notice">備註：凡本協議內的任何字句尾隨有括號的數字(例如<sub>(1)</sub>)，請立即參閱本協議附表4內相同編號的註釋。凡本協議內的任何字句提述本協議的某附表，亦請立即參閱該附表。
                </div>
                <div className="sell-house-form-template-content-title">1.代理的委任及本協議的有效期</div>
                <div className="sell-house-form-template-content">本人/我們:</div>

                <div>
                    <div className="sell-house-form-template-content-specified">
                        {individualOwners && individualOwners.map((owner, index) => (<div key={index}>{owner.ownerName}</div>))}
                        {individualOwnerSet.map((owner, index) => owner.ownerName).join(', ')}
                    </div>
                    <div className="sell-house-form-template-content-specified">
                        {companyOwners && companyOwners.map((companyOwner, index) => (<div key={index}>{companyOwner.companyName}</div>))}
                        {companyOwnerSet.map((owner, index) => owner.ownerName).join(', ')}
                    </div>
                    <div className="sell-house-form-template-content">('賣方')</div>
                </div>

                <div className="sell-house-form-template-content-appointment">現按照本協議的條款並在該等條款的規限下委任<p className="sell-house-form-template-content-specified"></p>('代理'<sub>(2)</sub>)為本人/我們的<s>獨家</s><sub>(3)</sub>/非獨家<sub>(1)</sub>代理，以推銷位於 </div>

                <div className="sell-house-form-template-content-specified">
                    {selectedListing.region}
                    {selectedListing.district}
                    {selectedListing.estate}
                    {selectedListing.phase !== "" ? "第" + selectedListing.phase + "期" : null}
                    {selectedListing.block !== "" ? "第" + selectedListing.block + "座" : null}
                    {selectedListing.floor + "樓"}
                    {selectedListing.unit + "室"}的物業  ('物業')。</div>

                <div className="sell-house-form-template-content">
                    本協議由 <span style={{ color: inputColor }}>{currentYear}</span> 年 <span style={{ color: inputColor }}>{currentMonth}</span> 月 <span style={{ color: inputColor }}>{currentDay}</span>  日起生效，並於 <span style={{ color: inputColor }}>{expirationYear}</span>   年  <span style={{ color: inputColor }}>{expirationMonth}</span>   月   <span style={{ color: inputColor }}>{expirationDay}</span> 日屆滿(首尾兩天包括在內)('有效期')。
                    <div className="sell-house-form-template-notice">[注意：如屬獨家代理關係，則即使物業在有效期內並非經由代理出售，賣方仍可能須向代理支付佣金，因此當賣方與代理建立獨家代理關係時應謹慎考慮。代理以獨家代理身分行事時須履行的特別責任，可在第13條下以額外條款的形式指明。]</div>
                </div>

                <div className="sell-house-form-template-content-title">
                    2.	代理關係及代理的責任
                </div>
                <div className="sell-house-form-template-content">代理與賣方同意 —
                </div>
                <div className="sell-house-form-template-content">(a)	代理與賣方之間就物業而有的代理關係屬<s>單邊代理/雙邊代理</s>/有可能代表雙方的代理<sub>(3)(1)</sub>關係；
                </div>
                <div className="sell-house-form-template-content">
                    (b)	如屬雙邊代理關係，則代理須在切實可行的範圍內，盡快以書面向賣方披露代理將向買方收取的佣金的數額或收費率；
                </div>
                <div className="sell-house-form-template-content">
                    (c)	如屬有可能代表雙方的代理關係，則代理須在建立雙邊代理關係後，在切實可行的範圍內，盡快以書面向賣方披露該代理關係以及代理將向買方收取的佣金的數額或收費率；及
                </div>
                <div className="sell-house-form-template-content">
                    (d)	代理除須履行本協議或任何成文法則委予代理的責任外，亦須履行本協議附表1內所列的責任。
                </div>
                <Flex className="sell-house-form-template-content-title">
                    3.	放盤價
                    <div className="sell-house-form-template-content-title-notice">[注意：賣方並沒有藉本條授權代理代賣方接受任何要約。放盤價只供放盤及作廣告宣傳之用。]</div>
                </Flex>
                <div className="sell-house-form-template-content">
                    放盤價為港幣 <span style={{ color: inputColor }}>{formattedPrice}</span>元<span style={{ color: inputColor }}>(HK${formattedPrice})</span>。放盤價只在賣方的書面指示下方可更改，而該等指示將構成本協議一部分。
                </div>
                <div className="sell-house-form-template-content-title">
                    4. 佣金</div>
                <div className="sell-house-form-template-content">
                    本協議適用於賣方須向代理支付的佣金的規定，列於本協議附表2及 4內 <sub>(4)</sub>。
                </div>
                <div className="sell-house-form-template-content-title">5.物業資料</div>
                <div className="sell-house-form-template-content">
                    代理須向賣方提供《地產代理常規
                    (一般責任及香港住宅物業 )規例》訂明並經代理填妥和簽署的物業資
                    料表格 (包括賣方的陳述 )。
                </div>
                <div className="sell-house-form-template-content-title"> 6.視察物業 </div>

                <Flex className="sell-house-form-template-radio-option-gp">(a)賣方同意容許代理買方<sub>(1)</sub>於雙方議定的時間查看物業。
                    <RadioGroupField name="agreeTimeToVisit" direction="row" size="small" gap="5px" defaultValue="agree" isReadOnly>
                        <Radio value="agree" size="small">同意</Radio>
                        <Radio value="disagree" size="small">不同意</Radio>
                    </RadioGroupField> <sub>(8)</sub></Flex>

                <Flex className="sell-house-form-template-radio-option-gp">(b)賣方同意將物業的鎖匙交由代理妥為保管，以供查看物業之用。
                    <RadioGroupField name="agreeKeepKey" direction="row" size="small" gap="5px" defaultValue="disagree" isReadOnly>
                        <Radio value="agree" size="small">同意</Radio>
                        <Radio value="disagree" size="small">不同意</Radio>
                    </RadioGroupField><sub>(8)</sub></Flex>

                <Flex className="sell-house-form-template-radio-option-gp">
                    (c)賣方授權代理將鎖匙交予其他地產代理人士<sub>(1)</sub>，以供查看物業之用。
                    <RadioGroupField name="agreeShareKey" direction="row" size="small" gap="5px" defaultValue="disagree" isReadOnly>
                        <Radio value="agree" size="small">同意</Radio>
                        <Radio value="disagree" size="small">不同意</Radio>
                    </RadioGroupField><sub>(8)</sub>
                </Flex>


                <div className="sell-house-form-template-content-title">7.分銷放盤</div>

                <Flex className="sell-house-form-template-radio-option-gp">
                    (a)
                    賣方授權代理將物業分銷放盤，並將由賣方提供的關於賣方及物業的資料交予其他地產代理以供分銷放盤之用。
                    <RadioGroupField name="agreeShareInfo" direction="row" size="small" gap="5px" defaultValue="agree" isReadOnly>
                        <Radio value="agree" size="small">同意</Radio>
                        <Radio value="disagree" size="small">不同意</Radio>
                    </RadioGroupField><sub>(8)</sub>
                </Flex>

                <div className="sell-house-form-template-content">(b)
                    如代理將物業交由另一地產代理分銷放盤代理分銷放盤，則代理須確保分銷放盤代理遵守《地產代理常規一般責任及香港住宅物業規例》中關於廣告宣傳的規定。</div>
                <div className="sell-house-form-template-content-title">
                    8.廣告宣傳
                </div>

                <Flex className="sell-house-form-template-radio-option-gp">
                    (a) 賣方授權代理發出關於物業的廣告
                    <RadioGroupField name="agreeAds" direction="row" size="small" gap="5px" defaultValue="agree" isReadOnly>
                        <Radio value="agree" size="small">同意</Radio>
                        <Radio value="disagree" size="small">不同意</Radio>
                    </RadioGroupField><sub>(8)</sub>
                </Flex>

                <div className="sell-house-form-template-content">(b)
                    如對以上問題的回答是同意的話，則除本協議另有指明外，廣告宣傳費將由代理承擔。</div>
                <div className="sell-house-form-template-content-title">9.代理須披露權益</div>

                <Flex className="sell-house-form-template-content" direction="column">
                    <div>
                        (a) 代表代理簽署本協議的人現披露：他或其指明親屬<sub>(5)</sub>，或其任何代名人，或其指明親屬的任何代名人，或代理或代理的任何僱員大股東(合夥人董事對物業擁有金錢上的或其他實益的權益)
                    </div>

                    <RadioGroupField name="agentBenefit" direction="row" size="small" gap="5px" margin="0 0 5px 20px" defaultValue="no" isReadOnly>
                        <Radio value="yes" size="small">有</Radio>
                        <Radio value="no" size="small">沒有</Radio><sub>(8)</sub>
                    </RadioGroupField>
                </Flex>

                <div className="sell-house-form-template-content">
                    (b) 如對以上問題的回答是有的話，則必須在本協議附表 3 述明有關權益的詳情。</div>
                <div className="sell-house-form-template-content">
                    (c) 代表代理簽署本協議的人須在切實可行的範圍內，盡快以書面向賣方披露在有效期內產生的上述 (a) 段所提述的任何權益。
                </div>
                <div className="sell-house-form-template-content-title">
                    10.
                    賣方的確認
                    賣方確認他已
                    —</div>
                <div className="sell-house-form-template-content">(a) 閱讀並明白本協議的條款；及</div>
                <Flex className="sell-house-form-template-content-option-item"> (b)
                    <RadioGroupField
                        name="propertyInfoBeforeTempAgreement"
                        direction="column"
                        size="small" gap="5px" defaultValue="agree" isReadOnly>
                        <Flex direction="row" gap="5px" >
                            <Radio value="disagree" size="small">收取本協議第5條規定提供的物業資料表格 包括賣方的陳述。</Radio><sub>(8)</sub>
                        </Flex>
                        <Flex direction="row" gap="5px">
                            <Radio value="agree" size="small">同意於賣方與一名買方訂立具約束力的買賣協議之前收取物業資料表格 包括賣方的陳述。</Radio><sub>(8)</sub>
                        </Flex>
                    </RadioGroupField>
                </Flex>

                <div className="sell-house-form-template-content-title"> 11.附表</div>
                <div className="sell-house-form-template-content">本協議的附表構成本協議的一部分。</div>
                <div className="sell-house-form-template-content-title"> 12.如物業不容許作住宅用途則本協議即屬無效</div>
                <div className="sell-house-form-template-content">如物業的佔用許可證所規定的用途並不包括住宅用途或不容許作住宅用途，則本協議即屬無效。</div>
                <Flex className="sell-house-form-template-content-title">13.額外條款 <div className="sell-house-form-template-content-title-notice">[注意：這些額外條款不得與本協議的其他條款有所抵觸，亦不得限制本協議的其他條款。]︰</div></Flex>
                <div className="sell-house-form-template-content"></div>
                <div className="sell-house-form-template-content"></div>
                <div className="sell-house-form-template-content"></div>
                <div className="sell-house-form-template-content"></div>


                <Flex className="sell-house-form-template-sign-info-gp">
                    <Flex className="sell-house-form-template-owner-gp">

                        <div>賣方的簽署：</div>
                        <div>香港身分證號碼：如適用的話 </div>
                        {individualOwnerSet.map((owner, index) => (
                            <div key={index}>個人業主{index + 1}: <span style={{ color: inputColor }}>{owner.ownerHkId}</span></div>
                        ))}
                        {individualOwners && individualOwners.map((owner, index) => (<div key={index}>個人業主{index + 1}: <span style={{ color: inputColor }}>{owner.ownerHkId}</span></div>))}
                        {companyOwners && companyOwners.map((companyOwner, index) => (<div key={index}>公司業主{index + 1}: <span style={{ color: inputColor }}>{companyOwner.directorHkId}</span></div>))}
                        <div> 如賣方是一間公司，請述明：</div>
                        {companyOwners && companyOwners.map((companyOwner, index) => (<div key={index}>公司業主{index + 1}:<span style={{ color: inputColor }}>{companyOwner.companyName}</span></div>))}
                        <div>簽署人的姓名或名稱：</div>
                        {individualOwnerSet.map((owner, index) => (
                            <div key={index}>個人業主{index + 1}: <span style={{ color: inputColor }}>{owner.ownerName}</span></div>
                        ))}
                        {individualOwners && individualOwners.map((owner, index) => (<div key={index}>個人業主{index + 1}: <span style={{ color: inputColor }}>{owner.ownerName}</span></div>))}
                        {companyOwners && companyOwners.map((companyOwner, index) => (<div key={index}>公司業主{index + 1}: <span style={{ color: inputColor }}>{companyOwner.directorName}</span></div>))}
                        <div>簽署人的職位：</div>
                        {companyOwners && companyOwners.map((companyOwner, index) => (<div key={index}>公司業主{index + 1}: <span style={{ color: inputColor }}>董事</span></div>))}
                        <div>賣方的商業登記證號碼：</div>
                        {companyOwners && companyOwners.map((companyOwner, index) => (<div key={index}>公司業主{index + 1}: <span style={{ color: inputColor }}>{companyOwner.bussinessRegistrationId}</span></div>))}
                        <div>地址：</div>
                        <div>電話號碼：</div>
                        {individualOwnerSet.map((owner, index) => (
                            <div key={index}>個人業主{index + 1}: <span style={{ color: inputColor }}>{owner.ownerPhone}</span></div>
                        ))}
                        {individualOwners && individualOwners.map((owner, index) => (<div key={index}>個人業主{index + 1}: <span style={{ color: inputColor }}>{owner.ownerPhone}</span></div>))}
                        {companyOwners && companyOwners.map((companyOwner, index) => (<div key={index}>公司業主{index + 1}: <span style={{ color: inputColor }}>{companyOwner.directorPhone}</span></div>))}
                        <div>傳真號碼：</div>
                        <div>日期：</div>
                        <div><span style={{ color: inputColor }}>{currentYear}</span> 年 <span style={{ color: inputColor }}>{currentMonth}</span> 月 <span style={{ color: inputColor }}>{currentDay}</span>  日</div>

                    </Flex>
                    <Flex className="sell-house-form-template-mars-gp">

                        <div className="sell-house-form-template-mars-signature-space">為代理及代代理簽署的地產代理營業員的簽署：</div>
                        <div>For and on behalf of </div>
                        <div>Authorized Signature(s)</div>
                        <div>簽署人的姓名或名稱及牌照號碼：</div>
                        <div>代理的營業詳情說明書號碼：</div>
                        <div>地址：</div>
                        <div>電話號碼：</div>
                        <div>傳真號碼：</div>
                        <div>日期：</div>
                        <div><span style={{ color: inputColor }}>{currentYear}</span> 年 <span style={{ color: inputColor }}>{currentMonth}</span> 月 <span style={{ color: inputColor }}>{currentDay}</span>  日</div>

                    </Flex>
                </Flex>
                <Text>[注意 ：在本協議簽署後，必須立即給予賣方一份經簽署的本協議的正本或副本。]</Text>
                <Flex className="sell-house-form-template-addition-gp">
                    <Flex className="sell-house-form-template-addition-title">
                        <div>附表1</div>
                        <div>代理的責任</div>
                    </Flex>
                    <Flex className="sell-house-form-template-addition-content">
                        <div>代理須-</div>
                        <div>(a)代賣方推銷物業；</div>
                        <div>(b)為賣方取得關於物業的資料；</div>
                        <div>(c)安排買方視察物業；</div>
                        <div>(d)進行商議，並向賣方提交所有關於物業的要約；及</div>
                        <div>(e)協助賣方與買方訂立具約束力的買賣協議。</div>
                    </Flex>
                </Flex>
                <Flex className="sell-house-form-template-addition-title">
                    <div>
                        <div>附表2</div>
                        <div>賣方須支付的佣金</div>
                    </div>
                </Flex>
                <Flex className="sell-house-form-template-addition-content">
                    <div>
                        1.
                        除本附表第 2 條另有規定外，如賣方在有效期內經由代理與買方就物業訂立具約束力的買賣協議，則
                        賣方須於：
                    </div>
                    <RadioGroupField name="paidBeforeComplete" direction="column" size="small" gap="5px" defaultValue="true" onChange={(e) => handlePaidBeforeChange("paidBeforeComplete", e.target.value)} >
                        <Flex className="sell-house-form-template-radio-option-gp"><Radio value="true" size="small">簽署買賣協議時</Radio><sub>(8)</sub></Flex>
                        <Flex className="sell-house-form-template-radio-option-gp"><Radio value="false" size="small">買賣協議指明的物業交易完成時，</Radio><sub>(8)</sub></Flex>
                    </RadioGroupField>
                    <div>向代理支付一筆數額 <span style={{ color: inputColor }}></span> / 物業成交價的 % <sub>(1)</sub>作為代理的佣金。</div>
                    <div>2.
                        除本附表第 3 條另有規定外，如非因賣方犯錯而令物業交易未能完成，則賣方沒有責任向代理支付任
                        何佣金。在此情況下，如賣方已支付 佣 金，則代理須在切實可行的範圍內盡快但無論如何不得遲於由
                        買賣協議指明的完成交易日期起計的 5 個工作日將佣金連同利息不連同利息(1)退還予賣方。</div>
                    <div>3.
                        如買賣雙方非基於物業的買賣協議的條文而共同取消該具約束力的買賣協議，則賣方須向代理支付 佣金。</div>
                    <div>4.如代理為推銷物業而與其他地產代理合作，則賣方無須向該等其他地產代理支付任何佣金。</div>
                </Flex>

                <Flex className="sell-house-form-template-addition-title">
                    <div>附表3</div>
                    <div>對物業所擁有的權益</div>
                </Flex>
                <Flex className="sell-house-form-template-addition-content">
                    <div>對物業所擁有的權益按照本協議第9條，就物業所擁有的金錢上的或其他實益的權益<sub>(7)</sub>的詳情如下：</div>
                </Flex>

                <Flex className="sell-house-form-template-addition-title">
                    <div>附表4</div>
                    <div>註釋</div>
                </Flex>
                <Flex className="sell-house-form-template-addition-content">
                    <div>(1)指刪去不適用者。所有刪除必須加以簡簽。</div>
                    <div>(2)在本協議第 1 條內填上有關地產代理業務實體即俗稱商號的名稱。</div>
                    <div>(3)獨家代理指代理是唯一為賣方行事的地產代理。如賣方在有效期內經由另一地產代理與一名買方就物業訂立具約束力的買賣協議，則代理有權向賣方追討附表 2 第 1 條所指明的佣金。</div>
                    <div>單邊代理 一指代理只為賣方行事。</div>
                    <div>雙邊代理 一 指代理既為賣方亦為物業的買方行事。</div>
                    <div>有可能代表雙方的代理 一 指代理既為賣方亦為物業的買方行事指代理只為賣方行事，但於稍後亦可能為物業的買方行事。</div>
                    <div>(4)佣金的數額或收費率可由賣方與代理商議。</div>
                    <div>(5)指明親屬指配偶、父母、子女、兄弟或 姊妹。</div>
                    <div>(6)大股東 —指在代理的股東大會上，有權行使百分之十或以上的投票權或控制百分之十或以上的投票權的行使的人。</div>
                    <div>(7)擁有金錢上的或其他實益的權益，包括：</div>
                    <div>(a)身為對物業擁有金錢上的或其他實益的權益的公司或任何其他團體的成員；</div>
                    <div>(b)與對物業擁有金錢上的或其他實益的權益的人有合夥關係，或受 僱 於該人；或</div>
                    <div>(c)屬於任何關乎物業的安排或協議 不論是否可 強 制執行 的一方。</div>
                    <div>(8) 請於適當的方格內劃上 ✔ 號。</div>
                </Flex>

            </Card>
            <Flex className="sell-house-form-template-button-gp">
                <Link to={`/mylisting/sellhousef3/sellhouseformsign`}>
                <Button onClick={()=>{handleFormInputTest()}}>同意</Button></Link>
                <Link to={`/mylisting`}>
                <Button>返回</Button></Link>
            </Flex>

        </Flex>

    )

}

export default SellHouseForm3;