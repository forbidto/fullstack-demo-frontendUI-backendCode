import { Heading, Flex, Card, Button, Text, Radio, RadioGroupField, Table, TableCell, TableBody, TableHead, TableRow, Divider, } from "@aws-amplify/ui-react";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { form3AgreementUpdate } from "../store/reducers/sellHomeForm3Reducer";
import { currentYear, currentMonth, currentDay, expirationDate, expirationMonth, expirationDay, expirationYear } from "../store/utils/authUtils";

const BuyHouseForm4 = () => {

    const inputColor = "#e3163f";

    const tableHeaders = [
        "物業",
        "視察日期(如買方同意不視察物業，請指明)",
        "買方放棄收取物業資料表格(包括賣方的陳述)的權利(請於適當的方格內劃上“✔”號)",
        "代理關係 (請於適當的方格內劃上“✔”號，並刪去不適用者)",
        "賣方所須支付的佣金(如適用的話)的數額或收費率",
        "買方所須支付的佣金的數額或收費率",
        "買方的簽署*"
    ]


    return (
        <Flex className="sell-house-form-template">
            <Heading className="sell-house-form-template-head">本 表 格 由 地 產 代 理 監 管 局 按 《 地 產 代 理 條 例 》 訂 明</Heading>
            <Heading className="pre-sell-house-form-head">購買香港住宅物業用的地產代理協議 表格4</Heading>
            <Card className="sell-house-form-template-content-card" variation="elevated ">
                <div className="sell-house-form-template-notice">一般注意事項：請仔細閱讀本協議並按指示填寫。如你不明白本協議內的任何字句，請要求代理解釋。如你不明白或不同意代理的解釋，則最佳的做法是在簽署本協議前諮詢你的律師。
                </div>
                <div className="sell-house-form-template-notice">備註：凡本協議內的任何字句尾隨有括號的數字(例如<sub>(1)</sub>)，請立即參閱本協議附表5內相同編號的註釋。凡本協議內的任何字句提述本協議的某附表，亦請立即參閱該附表。
                </div>
                <div className="sell-house-form-template-content-title">1.代理的委任及本協議的有效期</div>
                <div className="sell-house-form-template-content">本人/我們:</div>

                <div>
                    <div className="sell-house-form-template-content-specified">
                        <div>test</div>
                    </div>
                    <div className="sell-house-form-template-content-specified">
                        <div>test</div>
                    </div>
                    <div className="sell-house-form-template-content">('買方')</div>
                </div>

                <div className="sell-house-form-template-content-appointment">
                    現按照本協議的條款並在該等條款的規限下就擬購買本協議附表1所列物業(“物業”)一事委任
                    <p className="sell-house-form-template-content-specified">
                        
                    </p>('代理'<sub>(2)</sub>)為本人/我們的代理。</div>

                <div className="sell-house-form-template-content">
                    本協議由 <span style={{ color: inputColor }}>{currentYear}</span> 年 <span style={{ color: inputColor }}>{currentMonth}</span> 月 <span style={{ color: inputColor }}>{currentDay}</span>  日起生效，並於 <span style={{ color: inputColor }}>{expirationYear}</span>   年  <span style={{ color: inputColor }}>{expirationMonth}</span>   月   <span style={{ color: inputColor }}>{expirationDay}</span> 日屆滿(首尾兩天包括在內)('有效期')。
                    <div className="sell-house-form-template-notice">
                        [注意：建議有效期不應超過3個月。]
                    </div>
                </div>

                <div className="sell-house-form-template-content-title">
                    2.	代理關係及代理的責任
                </div>
                <div className="sell-house-form-template-content">代理與買方同意 —
                </div>
                <div className="sell-house-form-template-content">
                    (a)	代理與買方之間就物業而有的代理關係屬本協議附表1第4欄所指明的<s>單邊代理/雙邊代理</s>/有可能代表雙方的代理<sub>(3)</sub>關係；
                </div>
                <div className="sell-house-form-template-content">
                    (b)	如屬雙邊代理關係，則代理須在切實可行的範圍內，盡快以書面向賣方披露代理將向買方收取的佣金的數額或收費率；
                </div>
                <div className="sell-house-form-template-content">
                    (c)	如屬有可能代表雙方的代理關係，則代理須在建立雙邊代理關係後，在切實可行的範圍內，盡快以書面向賣方披露該代理關係以及代理將向買方收取的佣金的數額或收費率；及
                </div>
                <div className="sell-house-form-template-content">
                    (d)	代理除須履行本協議或任何成文法則委予代理的責任外，亦須履行本協議附表2內所列的責任。
                </div>
                <div className="sell-house-form-template-content-title">
                    3. 佣金</div>
                <div className="sell-house-form-template-content">
                    本協議適用於買方須向代理支付的佣金的規定，列於本協議附表1、3及5內 <sub>(4)</sub>。
                </div>
                <div className="sell-house-form-template-content-title">4.物業資料</div>
                <div className="sell-house-form-template-content">
                    代理須向賣方提供《地產代理常規
                    (一般責任及香港住宅物業 )規例》訂明並經代理填妥和簽署的物業資
                    料表格 (包括賣方的陳述 )。
                </div>
                <div className="sell-house-form-template-content">
                    (a)	如屬單邊代理關係，該等表格須向各別賣方的持牌地產代理取得；
                </div>
                <div className="sell-house-form-template-content">
                    (b)	如屬雙邊代理關係，或在賣方並沒有持牌地產代理代表的情況下，該等表格須由代理填妥和簽署，
                </div>
                <div className="sell-house-form-template-content">
                    但如買方明確表示放棄收取該等表格的權利，則代理無須提供有關表格。
                </div>

                <div className="sell-house-form-template-content-title">5.代理須披露權益</div>

                <Flex className="sell-house-form-template-content" direction="column">
                    <div>
                        (a) 代表代理簽署本協議的人現披露：他或其指明親屬<sub>(5)</sub>，或其任何代名人，或其指明親屬的任何代名人，或代理或代理的任何僱員/大股東<sub>(6)</sub>/合夥人董事對物業擁有金錢上的或其他實益的權益<sub>(7)</sub>
                    </div>

                    <RadioGroupField name="agentBenefit" direction="row" size="small" gap="5px" margin="0 0 5px 20px" defaultValue="no" isReadOnly>
                        <Radio value="yes" size="small">有</Radio>
                        <Radio value="no" size="small">沒有</Radio><sub>(8)</sub>
                    </RadioGroupField>
                </Flex>

                <div className="sell-house-form-template-content">
                    (b) 如對以上問題的回答是“有”的話，則必須在本協議附表 4 述明有關權益的詳情。</div>
                <div className="sell-house-form-template-content">
                    (c) 代表代理簽署本協議的人須在切實可行的範圍內，盡快以書面向買方披露在有效期內產生的上述 (a) 段所提述的任何權益。
                </div>
                <div className="sell-house-form-template-content-title">
                    6.
                    買方的確認
                    買方確認他已
                    —</div>
                <div className="sell-house-form-template-content">
                    (a) 閱讀並明白本協議的條款；及</div>
                <div className="sell-house-form-template-content">
                    (b) 收取本協議第4條規定提供的而買方並沒有明確表示放棄收取的所有有關的物業資料表格(包括賣方的陳述)。</div>

                <div className="sell-house-form-template-content-title"> 7.附表</div>
                <div className="sell-house-form-template-content">本協議的附表構成本協議的一部分。</div>
                <div className="sell-house-form-template-content-title"> 8.如物業不容許作住宅用途則本協議即屬無效</div>
                <div className="sell-house-form-template-content">
                    如附表1所列的任何物業的佔用許可證所規定的用途並不包括住宅用途或不容許作住宅用途，則就該物業而言，本協議即屬無效。</div>
                <Flex className="sell-house-form-template-content-title">9.額外條款
                    <div className="sell-house-form-template-content-title-notice">[注意：這些額外條款不得與本協議的其他條款有所抵觸，亦不得限制本協議的其他條款。]︰</div></Flex>



                <Flex className="sell-house-form-template-sign-info-gp">
                    <Flex className="sell-house-form-template-owner-gp">

                        <div>買方的簽署﹕</div>
                        <div>香港身分證號碼：如適用的話 </div>

                        <div> 如賣方是一間公司，請述明：</div>

                        <div>簽署人的姓名或名稱：</div>

                        <div>簽署人的職位：</div>

                        <div>賣方的商業登記證號碼：</div>

                        <div>地址：</div>
                        <div>電話號碼：</div>

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
                        <div>物業</div>
                    </Flex>
                    <div className="buy-form-table-container">
                        <Table className="buy-form-table-gp">
                            <TableHead>
                                <TableRow>
                                    {
                                        tableHeaders.map((header, index) => (
                                            <TableCell key={index} className="buy-form-table-header" as="th">
                                                {header}
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                <TableRow>
                                    <TableCell className="buy-form-table-cell-content">
                                        賣方所須支付的
                                        佣金(如適用的
                                        話)的數額或收費
                                        率
                                    </TableCell>
                                    <TableCell className="buy-form-table-cell-content">
                                        2023-12-18
                                    </TableCell>
                                    <TableCell className="buy-form-table-cell-content">
                                        <RadioGroupField
                                            name="collect"
                                            direction="row"
                                            size="small"
                                            gap="5px"
                                            justifyContent="center"
                                            defaultValue="no" isReadOnly>
                                            <Radio value="yes" size="small">是</Radio>
                                            <Radio value="no" size="small">否</Radio>
                                        </RadioGroupField>
                                    </TableCell>
                                    <TableCell className="buy-form-table-cell-content">
                                        <RadioGroupField
                                            name="agent"
                                            direction="column"
                                            size="small"
                                            gap="5px"
                                            justifyContent="center"
                                            defaultValue="no" isReadOnly>
                                            <Radio value="yes" size="small">
                                                <s>單邊代理</s>
                                            </Radio>
                                            <Radio value="no" size="small">
                                                <s>雙邊代理</s>
                                            </Radio>
                                            <Radio value="no" size="small">
                                                有可能代表雙方的代理
                                            </Radio>
                                        </RadioGroupField>

                                    </TableCell>
                                    <TableCell className="buy-form-table-cell-content">
                                        
                                    </TableCell>
                                    <TableCell className="buy-form-table-cell-content">
                                       
                                    </TableCell>
                                    <TableCell>

                                    </TableCell>

                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                    <div>* 買方必須就所列的每項物業分別簽署。</div>



                    <Flex className="sell-house-form-template-addition-title">
                        <div>附表2</div>
                        <div>代理的責任</div>
                    </Flex>
                    <Flex className="sell-house-form-template-addition-content">
                        <div>代理須-</div>
                        <div>(a)為買方取得關於物業的資料；</div>
                        <div>(b)因應買方的要求安排買方視察物業；</div>
                        <div>(c)進行商議，並按買方的指示向物業的賣方提交所有要約；及</div>
                        <div>(d)協助買方與任何一項或多於一項物業的賣方訂立具約束力的買賣協議。</div>
                    </Flex>
                </Flex>
                <Flex className="sell-house-form-template-addition-title">
                    <div>
                        <div>附表3</div>
                        <div>賣方須支付的佣金</div>
                    </div>
                </Flex>
                <Flex className="sell-house-form-template-addition-content">
                    <div>
                        1.
                        除本附表第2及5條另有規定外，如買方在有效期內經由代理與賣方就一項或多於一項物業訂立具約
                        束力的買賣協議，則買方須於：
                    </div>
                    <RadioGroupField name="paidBeforeComplete" direction="column" size="small" gap="5px" defaultValue="true" >
                        <Flex className="sell-house-form-template-radio-option-gp"><Radio value="true" size="small">簽署買賣協議時</Radio><sub>(8)</sub></Flex>
                        <Flex className="sell-house-form-template-radio-option-gp"><Radio value="false" size="small">買賣協議指明的物業交易完成時，</Radio><sub>(8)</sub></Flex>
                    </RadioGroupField>
                    <div>向代理佣金。</div>
                    <div>2.
                        除本附表第 3 條另有規定外，如非因買方犯錯而令物業交易未能完成，則買方沒有責任向代理支付任
                        何佣金。在此情況下，如買方已支付佣金，則代理須在切實可行的範圍內盡快但無論如何不得遲於由
                        買賣協議指明的完成交易日期起計的 5 個工作日將佣金<s>連同利息</s>/不連同利息(1)退還予買方。</div>
                    <div>3.
                        如買賣雙方非基於有關物業的買賣協議的條文而共同取消該具約束力的買賣協議，則買方須向代理支付佣金。</div>
                    <div>4.如代理為購買任何一項或多於一項物業的目的而與其他地產代理合作，則買方無須向該等其他地產代理支付任何佣金。</div>
                    <div>
                        除本附表第 2、3 及 4 條另有規定外，如買方或買方的配偶、任何代名人、未經披露身分的主事人
                        或代理人在有效期內(不論是否透過代理)，與任何一項或多於一項物業的賣方訂立具約束力的買賣
                        協議，則買方須就代理就有關物業而提供的服務向代理支付佣金。
                    </div>
                </Flex>

                <Flex className="sell-house-form-template-addition-title">
                    <div>附表4</div>
                    <div>對物業所擁有的權益</div>
                </Flex>
                <Flex className="sell-house-form-template-addition-content">
                    <div>按照本協議第 5 條，就一項或多於一項物業所擁有的金錢上的或其他實益的權益<sub>(7)</sub>的詳情如下：</div>
                </Flex>


                <Flex className="sell-house-form-template-addition-title">
                    <div>附表4</div>
                    <div>註釋</div>
                </Flex>
                <Flex className="sell-house-form-template-addition-content">
                    <div>(1)指刪去不適用者。所有刪除必須加以簡簽。</div>
                    <div>(2)在本協議第 1 條內填上有關地產代理業務實體即俗稱商號的名稱。</div>
                    <div>(3)獨家代理指代理是唯一為賣方行事的地產代理。如賣方在有效期內經由另一地產代理與一名買方就物業訂立具約束力的買賣協議，則代理有權向賣方追討附表 2 第 1 條所指明的佣金。</div>
                    <div>單邊代理 — 指代理只為買方行事。</div>
                    <div>雙邊代理 — 指代理既為買方亦為本協議附表1所列某項物業的賣方行事。</div>
                    <div>有可能代表雙方的代理 — 指代理只為買方行事，但於稍後亦可能為本協議附表1所列某項物業的賣方行事。</div>
                    <div>(4)佣金的數額或收費率可由買方與代理商議。</div>
                    <div>(5)指明親屬指配偶、父母、子女、兄弟或 姊妹。</div>
                    <div>(6)大股東 —指在代理的股東大會上，有權行使百分之十或以上的投票權或控制百分之十或以上的投票權的行使的人。</div>
                    <div>(7)擁有金錢上的或其他實益的權益，包括：</div>
                    <div>(a)身為對物業擁有金錢上的或其他實益的權益的公司或任何其他團體的成員；</div>
                    <div>(b)與對物業擁有金錢上的或其他實益的權益的人有合夥關係，或受僱於該人；或</div>
                    <div>(c)屬於任何關乎物業的安排或協議 不論是否可強制執行的一方。</div>
                    <div>(8) 請於適當的方格內劃上 ✔ 號。</div>
                </Flex>

            </Card>
            <Flex className="sell-house-form-template-button-gp">
                <Link to={`/mylisting/sellhousef3/sellhouseformsign`}>
                    <Button>同意</Button></Link>
                <Link to={`/mylisting`}>
                    <Button>返回</Button></Link>
            </Flex>

        </Flex>

    )

}

export default BuyHouseForm4;