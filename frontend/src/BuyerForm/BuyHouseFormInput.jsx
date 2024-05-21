import { Heading, Flex, Card, Button, Text, Input, CheckboxField } from "@aws-amplify/ui-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BuyHouseFormInput = () => {

    const mustInputObjects = [
        {
            title: '簽署人的姓名',
            star: '*',
            remark: '(須與身分證相同)',
            placeHolder: '身份證全名',
            width: '25%'
        },
        {
            title: '身份證號碼',
            star: '*',
            placeHolder: 'A123456(7)',
            width: '25%'
        }
    ]

    const [isCompanyBuyer, setIsCompanyBuyer] = useState(false)

    useEffect(() => {
        console.log("isCompanyBuyer:", isCompanyBuyer)
    })



    const companyBuyerObjects = [
        {
            title: '簽署人的職位',
            width: '25%'
        },
        {
            title: '買方的商業登記證號碼',
            width: '25%'
        },
        {
            title: '公司名稱',
            width: '50%'
        },
        {
            title: '地址',
            width: '50%'
        },
        {
            title: '電話號碼',
            width: '25%'
        },
        {
            title: '傳真號碼',
            width: '25%'
        }
    ]

    const PreBuyHouseFormInputField = ({ title, star, remark, placeHolder, inputColumn, width }) => {

        return (
            <Flex className="buy-form-fill-input-container">
                <Flex className="buy-form-fill-input-title-gp">
                    <Text>{title}</Text>
                    {star &&
                        <span className="buy-form-fill-input-star">{star}</span>
                    }
                    {remark &&
                        <Text className="buy-form-fill-input-remark">{remark}</Text>
                    }
                </Flex>
                <Input
                    placeholder={placeHolder}
                    width={width}
                />
            </Flex>
        )
    }

    return (
        <Flex className="sell-house-form-fill">
            <Heading className="pre-sell-house-form-head">購買香港住宅物業用的地產代理協議 表格4</Heading>
            <Flex className="pre-sell-house-form-remark" >因應＂地產代理常規＂，Mars介紹你向業主直接查詢前，需簽署＂地產代理協議 表格4＂（俗稱＂睇樓紙＂）。 簽署後，你將會獲得物業詳細地址及可直接跟業主聯絡。</Flex>

            {
                mustInputObjects.map((inputObj, index) => {
                    const { title, star, remark, placeHolder, width } = inputObj;
                    return (
                        <PreBuyHouseFormInputField
                            key={index}
                            title={title}
                            star={star}
                            remark={remark}
                            placeHolder={placeHolder}
                            width={width}
                        />
                    )
                })
            }

            <CheckboxField
                label="以公司名義購買"
                checked={isCompanyBuyer}
                onChange={() => { setIsCompanyBuyer(!isCompanyBuyer) }}
            />

            {
                isCompanyBuyer && companyBuyerObjects.map((inputObj, index) => {
                    const { title, width } = inputObj;
                    return (
                        <PreBuyHouseFormInputField
                            key={index}
                            title={title}
                            width={width}
                        />
                    )
                })
            }


            <Flex direction="row" margin="20px 0">
                <Button>
                    取消
                </Button>

                <Button>
                    提交
                </Button>

            </Flex>

        </Flex>

    )

}

export default BuyHouseFormInput;