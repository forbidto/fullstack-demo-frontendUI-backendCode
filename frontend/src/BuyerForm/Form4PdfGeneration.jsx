import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image, } from '@react-pdf/renderer';
import logoImage from "../Img/MARS-logo.jpg";



Font.register({
    family: "NotoSansTC-Light",
    src: "/font/NotoSansTC-Light.ttf"
})

const styles = StyleSheet.create({
    page: {
        backgroundColor: "yellow",
        fontFamily: "NotoSansTC-Light",
        display: "flex",
        flexDirection: "column",
        fontSize: 10,
        width: 595
    },

    top_container: {
        marginTop: 20,
        marginBottom: 20,
        marginRight: 50,
        marginLeft: 50,
    },

    top_heading: {
        fontSize: 16,
        margin: 10
    },
    logo: {
        width: 100,
        height: 100
    },
    form3_heading_gp: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center", // This aligns items vertically in the center
        marginBottom: 14,
        width: "100%",
    },
    form3_heading: {
        fontSize: 12,
        fontWeight: 600,
        flex: 1,
        textAlign: 'center',
    },
    form3_heading_remark: {
        textAlign: "right",
        border: "1px solid black",
        padding: 2,
        fontSize: 10,
    },
    top_notice_gp: {
        display: "flex",
        flexDirection: "column",
        gap: 3
    },

    underline_container: {
        borderBottom: '1px solid black', // Adjust as needed
        paddingBottom: 1, // Adjust spacing
        display: 'inline-flex',
    },

    text: {
        fontSize: 10
    },

    text_container: {
        width: 595 - 100
    },

    form3_term_gp: {
        display: "flex",
        flexDirection: "column",
        gap: 4,
        marginTop: 10
    },

    form3_term_title_mark: {
        fontSize: 12,
        fontWeight: 600,
        marginTop: 10,
        marginRight: 10
    },
    form3_term_title: {
        fontSize: 12,
        fontWeight: 800
    },
    form3_gp_inline: {
        display: "flex",
        flexDirection: "row",
        width: "100%"

    },

    text_wrapper: {
        width: '100%', // Set width for the text container
        flexDirection: 'column', // Adjust if necessary
    },

    form3_gp_incolumn: {
        display: "flex",
        flexDirection: "column",
    },

    form3_term_title_submark: {
        marginRight: 10
    },


    form3_sign_gp_inline: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 15
    },

    form3_sign_gp_incolumn: {
        display: "flex",
        flexDirection: "column",
        marginTop: 10,
        marginBottom: 10,
        justifyContent: "space-between"
    },

    form3_owner_info: {
        width: 257
    },

    form3_mars_info: {
        width: 257
    },

    form3_notice_heading_gp: {
        display: "flex",
        flexDirection: "column",
        marginBottom: 10,
        textAlign: 'center',
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
    },


    form3_sign_remark: {
        margin: 30
    },

    form3_notice_heading: {
        fontSize: 12,
        fontWeight: 600,
    },

    form3_notice__gp_colunm: {
        display: "flex",
        flexDirection: "column",
        marginBottom: 30,
    },


})

const Form4Pdf = ({ formInput, individualOwners, companyOwners, signatures, currentYear, currentMonth, currentDay, expirationYear, expirationMonth, expirationDay }) =>{
const price = "8500000"

    return (

        <Document>
            <Page style={styles.page}>
                <View style={styles.top_container}>
                    <Text style={styles.top_heading}>本表格由地產代理監管局按《地產代理條例》訂明</Text>
                    <View style={styles.form3_heading_gp}>
                        <Text style={styles.form3_heading}>購買香港住宅物業用的地產代理協議</Text>
                        <Text style={styles.form3_heading_remark}>表格4</Text>
                    </View>
                    <View style={styles.top_notice_gp}>
                        <View style={styles.form3_gp_inline}><Text style={{ textDecoration: 'underline' }}>一般注意事項：</Text><Text>請仔細閱讀本協議並按指示填寫。如你不明白本協議內的任何字句，請要求代理解釋。如你不明白</Text></View>
                        <Text>或不同意代理的解釋，則最佳的做法是在簽署本協議前諮詢你的律師。</Text>
                        <View style={styles.form3_gp_inline}>
                            <Text style={{ textDecoration: 'underline' }}>備註：</Text>
                            <Text>凡本協議內的任何字句尾隨有括號的數字(例如(1))，請立即參閱本協議附表4內相同編號的註釋。凡本協議內</Text>
                        </View>
                        <Text>的任何字句提述本協議的某附表，亦請立即參閱該附表。</Text>
                    </View>
                    <View style={styles.form3_gp_inline}>
                        <Text style={styles.form3_term_title_mark}>1.</Text>
                        <View style={styles.form3_term_gp}>
                        <View style={styles.form3_gp_inline}>
                        <Text style={styles.form3_term_title}>代理的委任及本協議的有效期</Text>
                        {signatures.map((signature, index)=>(
                            <Image key={index} src={signature.pdfSignature} style={{ width: 50, height: 25, marginRight:5 }}
                            />
                        ))}
                        </View>
                            <Text>本人/我們:{individualOwners && individualOwners.map((owner, index) => `${owner.ownerName}${index < individualOwners.length - 1 ? ', ' : ''}`)} & {companyOwners && companyOwners.map((companyOwner, index) => `${companyOwner.companyName}${index < companyOwners.length - 1 ? ', ' : ''}`)}
                                ('賣方')現按照本協議的條款並在該等條款的規限下委任('代理'(2))為本人/我們的
                                <Text style={{ textDecoration: "line-through" }}>獨家</Text>(3)/非獨家(1)代理，以推銷位於{formInput.region}{formInput.district}{formInput.estate}
                                {formInput.phase !== "" ? "第" + formInput.phase + "期" : null}
                                {formInput.block !== "" ? "第" + formInput.block + "座" : null}
                                {" " + formInput.floor + "樓"}
                                {formInput.unit + "室"}('物業')。</Text>
                            <Text>本協議由 {currentYear} 年 {currentMonth} 月 {currentDay} 日起生效，並於 {currentYear + 1} 年 {currentMonth} 月 {currentDay - 1} 日屆滿(首尾兩天包括在內)('有效期')。</Text>
                            <Text>[注意：如屬獨家代理關係，則即使物業在有效期內並非經由代理出售，賣方仍可能須向代理支付佣金，因此</Text>
                            <Text>當賣方與代理建立獨家代理關係時應謹慎考慮。代理以獨家代理身分行事時須履行的特別責任，可在第13</Text>
                            <Text>條下以額外條款的形式指明。]</Text>
                        </View>
                    </View>
    
                    <View style={styles.form3_gp_inline}>
                        <Text style={styles.form3_term_title_mark}>2.</Text>
                        <View style={styles.form3_term_gp}>
                            <Text style={styles.form3_term_title}>代理關係及代理的責任</Text>
                            <Text>代理與賣方同意 —</Text>
                            <View style={styles.form3_gp_inline}>
                                <Text style={styles.form3_term_title_submark}>(a)</Text>
                                <Text>代理與賣方之間就物業而有的代理關係屬<Text style={{ textDecoration: 'line-through' }}>單邊代理/雙邊代理/</Text>有可能代表雙方的代理(3)(1)關係；</Text>
                            </View>
    
    
                            <View style={styles.form3_gp_inline}>
                                <Text style={styles.form3_term_title_submark}>(b)</Text>
                                <Text style={styles.text_container}>如屬雙邊代理關係，則代理須在切實可行的範圍內，盡快以書面向賣方披露代理將向買方收取的
                                    佣金的數額或收費率；</Text>
                            </View>
    
                            <View style={styles.form3_gp_inline}>
                                <Text style={styles.form3_term_title_submark}>(c)</Text>
                                <Text>如屬有可能代表雙方的代理關係，則代理須在建立雙邊代理關係後，在切實可行的範圍內，盡快
                                    以書面向賣方披露該代理關係以及代理將向買方收取的 佣 金的數額或收費率；及</Text>
                            </View>
    
                            <View style={styles.form3_gp_inline}>
                                <Text style={styles.form3_term_title_submark}>(d)</Text>
                                <Text>代理除須履行本協議或任何成文法則委予代理的責任外，亦須履行本協議附表1內所列的責任。</Text>
                            </View>
    
                        </View>
                    </View>
    
                    <View style={styles.form3_gp_inline}>
                        <Text style={styles.form3_term_title_mark}>3.</Text>
                        <View style={styles.form3_term_gp}>
                            <View style={styles.form3_gp_inline}>
                                <Text style={styles.form3_term_title}>放盤價</Text>
                                <Text>[注意：賣方並沒有藉本條授權代理代賣方接受任何要約。放盤價只供放盤及作廣告宣傳之用。]</Text></View>
                            <View style={styles.form3_gp_inline}>
                                <Text>放盤價為港幣{new Intl.NumberFormat('zh-HK', { style: 'currency', currency: 'HKD', }).format(price)}元(HK${/* {price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} */})。</Text>
                                <Text>放盤價只在賣方的書面指示下方可更改，而該等指示將構成本協議一部分。</Text>
                            </View>
                        </View>
                    </View>
    
                    <View style={styles.form3_gp_inline}>
                        <Text style={styles.form3_term_title_mark}>4.</Text>
                        <View style={styles.form3_term_gp}>
                            <Text style={styles.form3_term_title}>佣金</Text>
                            <Text>本協議適用於賣方須向代理支付的佣金的規定，列於本協議附表2及 4內 (4)。</Text>
                        </View>
                    </View>
    
    
                    <View style={styles.form3_gp_inline}>
                        <Text style={styles.form3_term_title_mark}>5.</Text>
                        <View style={styles.form3_term_gp}>
                            <Text style={styles.form3_term_title}>物業資料</Text>
                            <Text>代理須向賣方提供《地產代理常規(一般責任及香港住宅物業)規例》訂明並經代理填妥和簽署的物業資料表格</Text>
                            <Text>(包括賣方的陳述 )。</Text>
                        </View>
                    </View>
    
    
    
                    <View style={styles.form3_gp_inline}>
                        <Text style={styles.form3_term_title_mark}>6.</Text>
    
                        <View style={styles.form3_term_gp}>
                            <Text style={styles.form3_term_title}>視察物業</Text>
                            <View style={styles.form3_gp_inline}>
                                <Text style={styles.form3_term_title_submark}>(a)</Text>
                                <View style={styles.form3_gp_incolumn}>
                                    <Text>賣方同意容許代理買方(1)於雙方議定的時間查看物業。</Text>
                                    <Text>同意 ☐ 不同意 🗹 (8)</Text>
                                </View>
                            </View>
                            <View style={styles.form3_gp_inline}>
                                <Text style={styles.form3_term_title_submark}>(b)</Text>
                                <View style={styles.form3_gp_incolumn}>
                                    <Text>賣方同意將物業的鎖匙交由代理妥為保管，以供查看物業之用。</Text>
                                    <Text>同意 ☐ 不同意 🗹 (8)</Text>
                                </View>
                            </View>
                            <View style={styles.form3_gp_inline}>
                                <Text style={styles.form3_term_title_submark}>(c)</Text>
                                <View style={styles.form3_gp_incolumn}>
                                    <Text>賣方授權代理將鎖匙交予其他地產代理人士(1)，以供查看物業之用。</Text>
                                    <Text>同意 ☐ 不同意 🗹 (8)</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
    
            <Page style={styles.page}>
                <View style={styles.top_container}>
    
    
                    <View style={styles.form3_gp_inline}>
                        <Text style={styles.form3_term_title_mark}>7.</Text>
                        <View style={styles.form3_term_gp}>
                            <Text style={styles.form3_term_title}>分銷放盤</Text>
                            <View style={styles.form3_gp_inline}>
                                <Text style={styles.form3_term_title_submark}>(a)</Text>
                                <View style={styles.form3_gp_incolumn}>
                                    <Text>賣方授權代理將物業分銷放盤，並將由賣方提供的關於賣方及物業的資料交予其他地產代理以供分銷放盤之用。</Text>
                                    <Text> 同意 ☐ 不同意 🗹 (8)</Text>
                                </View>
                            </View>
                            <View style={styles.form3_gp_inline}>
                                <Text style={styles.form3_term_title_submark}>(b)</Text>
                                <Text>如代理將物業交由另一地產代理分銷放盤代理分銷放盤，則代理須確保分銷放盤代理遵守《地產代理常規
                                    一般責任及香港住宅物業規例》中關於廣告宣傳的規定。</Text>
                            </View>
                        </View>
                    </View>
    
    
                    <View style={styles.form3_gp_inline}>
                        <Text style={styles.form3_term_title_mark}>8.</Text>
                        <View style={styles.form3_term_gp}>
                            <Text style={styles.form3_term_title}>廣告宣傳</Text>
                            <View style={styles.form3_gp_inline}>
                                <Text style={styles.form3_term_title_submark}>(a)</Text>
                                <View style={styles.form3_gp_incolumn}>
                                    <Text> 賣方授權代理發出關於物業的廣告</Text>
                                    <Text> 🗹 同意 ☐ 不同意(8)</Text>
                                </View>
                            </View>
                            <View style={styles.form3_gp_inline}>
                                <Text style={styles.form3_term_title_submark}>(b)</Text>
                                <Text>如對以上問題的回答是同意的話，則除本協議另有指明外，廣告宣傳費將由代理承擔。</Text>
                            </View>
                        </View>
                    </View>
    
    
                    <View style={styles.form3_gp_inline}>
                        <Text style={styles.form3_term_title_mark}>9.</Text>
                        <View style={styles.form3_term_gp}>
                            <Text style={styles.form3_term_title}>代理須披露權益</Text>
                            <View style={styles.form3_gp_inline}>
                                <Text style={styles.form3_term_title_submark}>(a)</Text>
                                <View style={styles.form3_gp_incolumn}>
                                    <Text>代表代理簽署本協議的人現披露：他或其指明親屬(5)，或其任何代名人，或其指明親屬的任何代名人，
                                        或代理或代理的任何僱員大股東(合夥人董事對物業擁有金錢上的或其他實益的權益)</Text>
                                    <Text>有 ☐ 沒有 🗹 (8)</Text>
                                </View>
                            </View>
                            <View style={styles.form3_gp_inline}>
                                <Text style={styles.form3_term_title_submark}>(b)</Text>
                                <Text>如對以上問題的回答是有的話，則必須在本協議附表 3 述明有關權益的詳情。</Text>
                            </View>
                            <View style={styles.form3_gp_inline}>
                                <Text style={styles.form3_term_title_submark}>(c)</Text>
                                <View style={styles.form3_gp_incolumn}>
                                    <Text>代表代理簽署本協議的人須在切實可行的範圍內，盡快以書面向賣方披露在有效期內產生的上述 (a) 段所提述</Text>
                                    <Text>的任何權益。</Text>
                                </View>
                            </View>
                        </View>
                    </View>
    
    
                    <View style={styles.form3_gp_inline}>
                        <Text style={styles.form3_term_title_mark}>10.</Text>
                        <View style={styles.form3_term_gp}>
                            <Text style={styles.form3_term_title}>賣方的確認 賣方確認他已 —</Text>
                            <View style={styles.form3_gp_inline}>
                                <Text style={styles.form3_term_title_submark}>(a)</Text>
                                <Text>閱讀並明白本協議的條款；及</Text>
                            </View>
                            <View style={styles.form3_gp_inline}>
                                <Text style={styles.form3_term_title_submark}>(b)</Text>
                                <View style={styles.form3_gp_incolumn}>
                                    <Text>☐ (8) 收取本協議第5條規定提供的物業資料表格 包括賣方的陳述。</Text>
                                    <Text>🗹 (8) 同意於賣方與一名買方訂立具約束力的買賣協議之前收取物業資料表格 包括賣方的陳述</Text>
                                </View>
                            </View>
                        </View>
                    </View>
    
    
                    <View style={styles.form3_gp_inline}>
                        <Text style={styles.form3_term_title_mark}>11.</Text>
                        <View style={styles.form3_term_gp}>
                            <Text style={styles.form3_term_title}>附表</Text>
                            <Text>本協議的附表構成本協議的一部分。</Text>
                        </View>
                    </View>
    
                    <View style={styles.form3_gp_inline}>
                        <Text style={styles.form3_term_title_mark}>12.</Text>
                        <View style={styles.form3_term_gp}>
                            <Text style={styles.form3_term_title}>如物業不容許作住宅用途則本協議即屬無效</Text>
                            <Text>如物業的佔用許可證所規定的用途並不包括住宅用途或不容許作住宅用途，則本協議即屬無效。</Text>
                        </View>
    
                    </View>
    
                    <View style={styles.form3_gp_inline}>
                        <Text style={styles.form3_term_title_mark}>13.</Text>
                        <View style={styles.form3_term_gp}>
                            <View style={styles.form3_gp_inline}>
                                <Text style={styles.form3_term_title}>額外條款</Text>
                                <Text>[<u><b>注意</b></u>：這些額外條款不得與本協議的其他條款有所抵觸，亦不得限制本協議的其他條款。]︰</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
    
    
            <Page style={styles.page}>
                <View style={styles.top_container}>
                    <View style={styles.form3_sign_gp_incolumn} >
    
                        <View style={styles.form3_sign_gp_inline}>
                            <Text style={styles.form3_owner_info}>
                                賣方的簽署：
                            </Text>
                            <Text style={styles.form3_mars_info}>
                                為代理及代代理簽署的地產代理營業員的簽署：
                            </Text>
                        </View>
    
                        <View style={styles.form3_sign_gp_inline}>
                            <View style={styles.form3_gp_incolumn}>
                                <Text style={styles.form3_owner_info}>香港身分證號碼：</Text>
                                {individualOwners && individualOwners.map((owner, index) => (
                                    <Text>{owner.ownerName}: {owner.ownerHkId} {index < individualOwners.length - 1 ? ', ' : ''}</Text>))}
                                {/* `${owner.ownerName}`+ ":" +`${owner.ownerHkId}${index < individualOwners.length - 1 ? ', ' : ''}` */}
                                {companyOwners && companyOwners.map((companyOwner, index) => (
                                    <Text>{companyOwner.directorName}: {companyOwner.directorHkId} {index < companyOwners.length - 1 ? ', ' : ''}</Text>
                                ))}
                                {/* `${companyOwner.directorName}: ${companyOwner.directorHkId}${index < companyOwners.length - 1 ? ', ' : ''}` */}
                                <Text>
                                    (如適用的話)
                                </Text>
                            </View>
                            <Text style={styles.form3_mars_info}>
                                簽署人的姓名或名稱及牌照號碼：
                            </Text>
                        </View>
                        {/* {companyOwners && companyOwners.map((companyOwner, index) => `${companyOwner.directorName}${index < companyOwners.length - 1 ? ', ' : ''}`)} */}
                        <View style={styles.form3_sign_gp_inline}>
                            <View style={styles.form3_gp_incolumn}>
                                <Text style={styles.form3_owner_info}> 如賣方是一間公司，請述明：</Text>
                                {companyOwners && companyOwners.map((companyOwner, index) => `${companyOwner.companyName}${index < companyOwners.length - 1 ? ', ' : ''}`)}
                                <Text style={styles.form3_owner_info}> 簽署人的姓名或名稱：</Text>
                                {individualOwners && individualOwners.map((owner, index) => (
                                    <Text>{owner.ownerName}{index < individualOwners.length - 1 ? ', ' : ''}</Text>))}
                                {companyOwners && companyOwners.map((companyOwner, index) => (
                                    <Text>{companyOwner.directorName}{index < companyOwners.length - 1 ? ', ' : ''}</Text>
                                ))}
    
                                <Text style={styles.form3_owner_info}> 簽署人的職位：{companyOwners === "" ? null : "董事"}</Text>
                                <Text style={styles.form3_owner_info}> 賣方的商業登記證號碼：</Text>
                                {companyOwners && companyOwners.map((companyOwner, index) => (
                                    <Text>{companyOwner.companyName}: {companyOwner.bussinessRegistrationId} {index < companyOwners.length - 1 ? ', ' : ''}</Text>
                                ))}
                            </View>
                            <Text style={styles.form3_mars_info}>代理的營業詳情說明書號碼：</Text>
                        </View>
    
                        <View style={styles.form3_gp_inline}>
                            <Text style={styles.form3_owner_info}> 地址：</Text>
                            <Text style={styles.form3_mars_info}>地址：</Text>
                        </View>
                        <View style={styles.form3_gp_inline}>
                            <View style={styles.form3_gp_incolumn}>
                                <Text style={styles.form3_owner_info}> 電話號碼：</Text>
                                {individualOwners && individualOwners.map((owner, index) => (
                                    <Text>{owner.ownerName}: {owner.ownerPhone} {index < individualOwners.length - 1 ? ', ' : ''}</Text>))}
                                {companyOwners && companyOwners.map((companyOwner, index) => (
                                    <Text>{companyOwner.companyName}: {companyOwner.directorPhone} {index < companyOwners.length - 1 ? ', ' : ''}</Text>
                                ))}
                            </View>
                            <Text style={styles.form3_mars_info}>電話號碼：</Text>
                        </View>
                        <View style={styles.form3_gp_inline}>
                            <Text style={styles.form3_owner_info}> 傳真號碼：</Text>
                            <Text style={styles.form3_mars_info}>傳真號碼：</Text>
                        </View>
                        <View style={styles.form3_gp_inline}>
                            <Text style={styles.form3_owner_info}> 日期：</Text>
                            <Text style={styles.form3_mars_info}>日期：</Text>
                        </View>
    
    
                        <Text style={styles.form3_sign_remark}>[注意：在本協議簽署後，必須立即給予賣方一份經簽署的本協議的正本或副本。]</Text>
    
                    </View>
                </View>
            </Page>
            <Page style={styles.page}>
                <View style={styles.top_container}>
                    <View style={styles.form3_notice__gp_colunm}>
                        <View style={styles.form3_notice_heading_gp}>
                            <Text style={styles.form3_notice_heading}>
                                附表1
                            </Text>
                            <Text style={styles.form3_notice_heading}>
                                代理的責任
                            </Text>
                        </View>
                        <Text>代理須 — </Text>
                        <View style={styles.form3_gp_inline}>
                            <Text style={styles.form3_term_title_submark}>(a)</Text>
                            <Text>代賣方推銷物業；</Text>
                        </View>
                        <View style={styles.form3_gp_inline}>
                            <Text style={styles.form3_term_title_submark}>(b)</Text>
                            <Text>為賣方取得關於物業的資料；</Text>
                        </View>
                        <View style={styles.form3_gp_inline}>
                            <Text style={styles.form3_term_title_submark}>(c)</Text>
                            <Text>安排買方視察物業；</Text>
                        </View>
                        <View style={styles.form3_gp_inline}>
                            <Text style={styles.form3_term_title_submark}>(d)</Text>
                            <Text>進行商議，並向賣方提交所有關於物業的要約；及</Text>
                        </View>
                        <View style={styles.form3_gp_inline}>
                            <Text style={styles.form3_term_title_submark}>(e)</Text>
                            <Text>協助賣方與買方訂立具約束力的買賣協議。</Text>
                        </View>
    
                    </View>
    
                    <View style={styles.form3_notice__gp_colunm}>
                        <View style={styles.form3_notice_heading_gp}>
                            <Text style={styles.form3_notice_heading}>
                                附表2
                            </Text>
                            <Text style={styles.form3_notice_heading}>
                                賣方須支付的佣金
                            </Text>
                        </View>
                        <View style={styles.form3_gp_inline}>
                            <Text style={styles.form3_term_title_submark}>1</Text>
                            <View style={styles.form3_gp_incolumn}>
                                <Text>除本附表第 2 條另有規定外，如賣方在有效期內經由代理與買方就物業訂立具約束力的買賣協議，</Text>
                                <Text>則賣方須於：</Text>
                                <Text>🗹(8)簽署買賣協議時，</Text>
                                <Text>☐(8)買賣協議指明的物業交易完成時，</Text>
                                <Text>向代理支付一筆數額$ / 物業成交價的%(1)作為代理的佣金。</Text>
                            </View>
                        </View>
                        <View style={styles.form3_gp_inline}>
                            <Text style={styles.form3_term_title_submark}>2</Text>
                            <View style={styles.form3_gp_incolumn}>
                                <Text>除本附表第3條另有規定外，如非因賣方犯錯而令物業交易未能完成，則賣方沒有責任向代理支付任何佣金。
                                    在此情況下，如賣方已支付佣金，則代理須在切實可行的範圍內盡快(但無論如何不得遲於由買賣協議指明的</Text>
                                <Text>完成交易日期起計的 5 個工作日)將佣金<Text style={{ textDecoration: "line-through" }}>連同利息</Text>/不連同利息(1)退還予賣方。</Text>
                            </View>
                        </View>
                        <View style={styles.form3_gp_inline}>
                            <Text style={styles.form3_term_title_submark}>3</Text>
                            <Text>如買賣雙方非基於物業的買賣協議的條文而共同取消該具約束力的買賣協議，則賣方須向代理支付佣金</Text>
                        </View>
                        <View style={styles.form3_gp_inline}>
                            <Text style={styles.form3_term_title_submark}>4</Text>
                            <Text>如代理為推銷物業而與其他地產代理合作，則賣方無須向該等其他地產代理支付任何佣金。</Text>
                        </View>
                    </View>
    
                    <View style={styles.form3_notice__gp_colunm}>
                        <View style={styles.form3_notice_heading_gp}>
                            <Text style={styles.form3_notice_heading}>
                                附表3
                            </Text>
                            <Text style={styles.form3_notice_heading}>
                                對物業所擁有的權益
                            </Text>
                        </View>
                        <Text>按照本協議第 9 條，就物業所擁有的金錢上的或其他實益的權益(7)的詳情如下：</Text>
                    </View>
    
                    <View style={styles.form3_notice__gp_colunm}>
                        <View style={styles.form3_notice_heading_gp}>
                            <Text style={styles.form3_notice_heading}>
                                附表4
                            </Text>
                            <Text style={styles.form3_notice_heading}>
                                註釋
                            </Text>
                        </View>
                        <View style={styles.form3_gp_inline}>
                            <Text style={styles.form3_term_title_submark}>(1)</Text>
                            <Text>指刪去不適用者。所有刪除必須加以簡簽。</Text>
                        </View>
                        <View style={styles.form3_gp_inline}>
                            <Text style={styles.form3_term_title_submark}>(2)</Text>
                            <Text>在本協議第 1 條內填上有關地產代理業務實體(即俗稱商號)的名稱。</Text>
                        </View>
                        <View style={styles.form3_gp_inline}>
                            <Text style={styles.form3_term_title_submark}>(3)</Text>
                            <View style={styles.form3_gp_incolumn}>
                                <View style={styles.form3_gp_inline}>
                                    <Text>獨家代理 －</Text>
                                    <View style={styles.form3_gp_incolumn}>
                                        <Text>指代理是唯一為賣方行事的地產代理。如賣方在有效期內經由另一地產代理與一名買方就物業訂立
                                            具約束力的買賣協議，則代理有權向賣方追討附表 2 第 1 條所指明的佣金。</Text>
                                    </View>
                                </View>
                                <View style={styles.form3_gp_inline}>
                                    <Text>單邊代理 －</Text>
                                    <Text>指代理只為賣方行事。</Text>
                                </View>
                                <View style={styles.form3_gp_inline}>
                                    <Text>雙邊代理 －</Text>
                                    <Text>指代理既為賣方亦為物業的買方行事。</Text>
                                </View>
                                <View style={styles.form3_gp_inline}>
                                    <Text>有可能代表雙方的代理 －</Text>
                                    <Text>指代理只為賣方行事，但於稍後亦可能為物業的買方行事。</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.form3_gp_inline}>
                            <Text style={styles.form3_term_title_submark}>(4)</Text>
                            <Text>佣金的數額或收費率可由賣方與代理商議。</Text>
                        </View>
    
                        <View style={styles.form3_gp_inline}>
                            <Text style={styles.form3_term_title_submark}>(5)</Text>
                            <Text>指明親屬 — 指配偶、父母、子女、兄弟或姊妹。</Text>
                        </View>
    
                        <View style={styles.form3_gp_inline}>
                            <Text style={styles.form3_term_title_submark}>(6)</Text>
                            <View style={styles.form3_gp_inline}>
                                <Text>大股東 —</Text>
                                <Text>指在代理的股東大會上，有權行使百分之十或以上的投票權或控制百分之十或以上的投票權的行使的人。</Text>
                            </View>
                        </View>
    
    
                        <View style={styles.form3_gp_inline}>
                            <Text style={styles.form3_term_title_submark}>(7)</Text>
                            <View style={styles.form3_gp_incolumn}>
                                <Text>擁有金錢上的或其他實益的權益，包括：</Text>
                                <View style={styles.form3_gp_inline}>
                                    <Text style={styles.form3_term_title_submark}>(a)</Text>
                                    <Text>身為對物業擁有金錢上的或其他實益的權益的公司或任何其他團體的成員；</Text>
                                </View>
                                <View style={styles.form3_gp_inline}>
                                    <Text style={styles.form3_term_title_submark}>(b)</Text>
                                    <Text>與對物業擁有金錢上的或其他實益的權益的人有合夥關係，或受僱於該人；或</Text>
                                </View>
                                <View style={styles.form3_gp_inline}>
                                    <Text style={styles.form3_term_title_submark}>(c)</Text>
                                    <Text>於任何關乎物業的安排或協議(不論是否可強制執行)的一方。</Text>
                                </View>
                            </View>
                        </View>
    
                        <View style={styles.form3_gp_inline}>
                            <Text style={styles.form3_term_title_submark}>(8)</Text>
                            <Text>請於適當的方格內劃上“✓”號。</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
} 



export default Form4Pdf;