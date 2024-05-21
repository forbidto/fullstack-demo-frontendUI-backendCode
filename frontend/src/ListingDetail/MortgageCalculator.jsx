import React, { useEffect, useState } from "react";
import { Flex, Text, Heading, CheckboxField, Input, Card } from "@aws-amplify/ui-react";
import { Link } from "react-router-dom";
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';


const MortageChart = ({ chartData }) => {

    const data = {
        labels: chartData.labels,
        datasets: [
            {
                data: chartData.values,
                backgroundColor: [
                    'blue',   // color for "總貸款額"
                    'red',    // color for "首期"
                    'orange', // color for "總利息"
                    'yellow', // color for "印花稅"
                    'grey', //"其他費用"
                    // ... add more colors for each category
                ],
                hoverOffset: 4,
            },
        ],
    };

    return <Doughnut data={data} />;

}


const MortgageCalculator = () => {

    const [chartData, setChartData] = useState({
        labels: ['總貸款額', '首期', '總利息', '印花稅', '其他費用'/* other categories */],
        values: []
    });



    const mortgageOptions = [
        '非香港永久居民',
        '有其他住宅物業',
        '以公司名義購買'
    ]



    const [checkedState, setCheckedState] = useState([]);
    const [displayPrice, setDisplayPrice] = useState(`HK$ $5,470,000`);
    const [displayDpPercentage, setDisplayDpPercentage] = useState();
    const [displayDpAmount, setDisplayDpAmount] = useState("");
    const [displayMgPercentage, setDisplayMgPercentage] = useState();
    const [displayMgAmount, setDisplayMgAmount] = useState("");
    const [displayYear, setDisplayYear] = useState("");
    const [interest, setInterest] = useState();
    const [displayMonthlyPayment, setDisplayMonthlyPayment] = useState("");
    const [monthlyRequirement, setMonthlyRequirement] = useState("");
    const [testRequirement, setTestRequirement] = useState("");
    const [buyCost, setBuyCost] = useState("HK$");


    let adValoremStamp, buyerStampDuty


    function formatNumberToCurrency(number) {
        const numberString = number.toString()
        return 'HK$' + numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function calculateAmount(price, percentage) {
        return (price * percentage / 100).toFixed(0);
    }

    function calculatePercentage(amount, price) {
        return (amount / price * 100).toFixed(0);
    }

    function extractNumber(value) {
        return value.replace(/[^0-9.]/g, "");
    }

    function updateDpAndMortgageAmounts(actualValue, displayDpPercentage, displayMortgagePercentage) {
        if (displayDpPercentage) {
            const percentageValue = extractNumber(displayDpPercentage)
            const DpAmount = (actualValue * percentageValue / 100).toFixed(0);
            setDisplayDpAmount(formatNumberToCurrency(DpAmount))
        }
        if (displayMortgagePercentage) {
            const percentageValue = extractNumber(displayMortgagePercentage)
            const MgAmount = (actualValue * percentageValue / 100).toFixed(0);
            setDisplayMgAmount(formatNumberToCurrency(MgAmount))
        }
    }



    const handleInputChange = (name, value) => {

        let actualValue = Number(value.replace(/[^0-9.]/g, ""));
        let priceValue, dpAmount, dpPercentage, mgAmount, mgPercentage;
        priceValue = extractNumber(displayPrice);

        switch (name) {

            case "price":
                const formattedPrice = formatNumberToCurrency(actualValue)
                setDisplayPrice(formattedPrice);
                updateDpAndMortgageAmounts(actualValue, displayDpPercentage, displayMgPercentage)
                break;

            case "DpPercentage":

                if (actualValue > 100) {
                    actualValue = 100;
                } else if (actualValue < 0 || isNaN(actualValue)) {
                    actualValue = 0;
                }

                setDisplayDpPercentage(actualValue + "%");

                setDisplayMgPercentage((100 - actualValue + "%"))

                dpAmount = calculateAmount(priceValue, actualValue)
                console.log("dpAmount", dpAmount)

                if (isNaN(dpAmount)) {
                    setDisplayDpAmount(formatNumberToCurrency("0"));
                } else {
                    setDisplayDpAmount(formatNumberToCurrency(dpAmount))
                }

                setDisplayMgAmount(formatNumberToCurrency(priceValue - dpAmount))

                break;

            case "DpAmount":
                if (actualValue > priceValue) {
                    actualValue = priceValue
                } else if (actualValue < 0 || isNaN(actualValue)) {
                    actualValue = 0;
                }

                setDisplayDpAmount(formatNumberToCurrency(actualValue));
                dpPercentage = calculatePercentage(actualValue, priceValue);
                setDisplayDpPercentage(dpPercentage + "%")
                setDisplayMgPercentage((100 - dpPercentage) + "%")
                setDisplayMgAmount(formatNumberToCurrency(priceValue - actualValue))

                break;

            case "MgPercentage":

                if (actualValue > 100) {
                    actualValue = 100;
                } else if (actualValue < 0 || isNaN(actualValue)) {
                    actualValue = 0;
                }

                setDisplayMgPercentage(actualValue + "%");
                setDisplayDpPercentage((100 - actualValue) + "%");

                mgAmount = calculateAmount(priceValue, actualValue);

                if (isNaN(mgAmount)) {
                    setDisplayMgAmount(formatNumberToCurrency("0"));
                } else {
                    setDisplayMgAmount(formatNumberToCurrency(mgAmount));
                }

                setDisplayDpAmount(formatNumberToCurrency(priceValue - mgAmount));

                break;

            case "MgAmount":

                if (actualValue > priceValue) {
                    actualValue = priceValue
                } else if (actualValue < 0 || isNaN(actualValue)) {
                    actualValue = 0;
                }

                setDisplayMgAmount(formatNumberToCurrency(actualValue));
                setDisplayDpAmount(formatNumberToCurrency(priceValue - actualValue))

                mgPercentage = calculatePercentage(actualValue, priceValue);
                setDisplayMgPercentage(mgPercentage + "%")
                setDisplayDpPercentage((100 - mgPercentage) + "%")


                break;
            case "year":
                if (actualValue > 30) {
                    actualValue = 30
                }
                setDisplayYear(actualValue + "年");
                break;
            case "interest":
                setInterest(actualValue)

                break;
            default:
                break;
        }

        /*     setFormInput({
                ...formInput,
                [name]: actualValue
            });
            dispatch(clearErrorMessages()) */
    }

    const handleCheckboxChange = (option) => {
        setCheckedState(prevState => {
            if (prevState.includes(option)) {
                // If option is already selected, remove it
                return prevState.filter(item => item !== option);
            } else {
                // If option is not selected, add it
                return [...prevState, option];
            }
        });
    }

    const calculateAVD = (price) => {


        if (checkedState.length > 0) {
            adValoremStamp = price * 0.075
        } else if (price <= 3000000) {
            adValoremStamp = 100;
        } else if (price <= 3528240) {
            adValoremStamp = 100 + (price - 3000000) * 0.10;
        } else if (price <= 4500000) {
            adValoremStamp = price * 0.015;
        } else if (price <= 4935480) {
            adValoremStamp = 67500 + (price - 4500000) * 0.10;
        } else if (price <= 6000000) {
            adValoremStamp = price * 0.0225;
        } else if (price <= 6642860) {
            adValoremStamp = 135000 + (price - 6000000) * 0.10;
        } else if (price <= 9000000) {
            adValoremStamp = price * 0.03;
        } else if (price <= 10080000) {
            adValoremStamp = 270000 + (price - 9000000) * 0.10;
        } else if (price <= 20000000) {
            adValoremStamp = price * 0.0375;
        } else if (price <= 21739120) {
            adValoremStamp = 750000 + (price - 20000000) * 0.10;
        } else {
            adValoremStamp = price * 0.0425;
        }

        return adValoremStamp;

    }

    const calculateBSD = (price) => {
        if (checkedState.includes('非香港永久居民',) ||
            checkedState.includes('以公司名義購買')) {
            buyerStampDuty = price * 0.075
        } else {
            buyerStampDuty = 0
        }

        return buyerStampDuty

    }

    const calculateMonthlyPayment = (displayMgAmount, displayYear, interest) => {
        const monthlyInterest = interest / 100 / 12;
        console.log("monthlyInterest", monthlyInterest)
        const numberOfPayments = extractNumber(displayYear) * 12;
        console.log("numberOfPayments", numberOfPayments)
        const loanAmount = extractNumber(displayMgAmount);
        console.log(loanAmount)
        if (monthlyInterest === 0) {
            return loanAmount / numberOfPayments
        }

        return (loanAmount * monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, -numberOfPayments));

    }

    const calculateMonthlyPaymentTest = (displayMgAmount, displayYear, interest) => {
        const monthlyTestInterest = (interest + 2) / 100 / 12;
        console.log("monthlyTestInterest", monthlyTestInterest)
        const numberOfPayments = extractNumber(displayYear) * 12;
        console.log("numberOfPayments", numberOfPayments)
        const loanAmount = extractNumber(displayMgAmount);
        console.log(loanAmount)
        if (monthlyTestInterest === 0) {
            return loanAmount / numberOfPayments
        }

        return (loanAmount * monthlyTestInterest) / (1 - Math.pow(1 + monthlyTestInterest, -numberOfPayments));

    }

    useEffect(() => {

        const priceValue = extractNumber(displayPrice);

        const avd = calculateAVD(priceValue);

        const bsd = calculateBSD(priceValue);

        const stampDuty = avd + bsd

        console.log("adValoremStamp", avd, bsd)

        const monthlyPayment = calculateMonthlyPayment(displayMgAmount, displayYear, interest).toFixed(0);

        if (isNaN(monthlyPayment)) {

            setDisplayMonthlyPayment("HK$")
            setMonthlyRequirement("HK$")

        } else {
            setDisplayMonthlyPayment(formatNumberToCurrency(monthlyPayment));
            setMonthlyRequirement(formatNumberToCurrency(monthlyPayment * 2));
        }

        const monthlyTestPayment = calculateMonthlyPaymentTest(displayMgAmount, displayYear, interest);

        if (isNaN(monthlyTestPayment)) {

            setTestRequirement("HK$")

        } else {
            const req = (monthlyTestPayment / 0.6).toFixed(0)
            setTestRequirement(formatNumberToCurrency(req));
        }


        const totalInterest = (monthlyPayment * extractNumber(displayYear) * 12) - extractNumber(displayPrice);
        console.log("monthlyPayment", monthlyPayment)
        const other = 120000


        const dpAmountNum = parseFloat(extractNumber(displayDpAmount)) || 0;
        const avdNum = parseFloat(avd) || 0;
        const bsdNum = parseFloat(bsd) || 0;
        const otherNum = parseFloat(other) || 0;

        // Now perform the addition
        const cost = dpAmountNum + avdNum + bsdNum + otherNum;

        console.log('cost', cost)


        setBuyCost(formatNumberToCurrency(cost))

        setChartData(prevData => ({
            ...prevData,
            values: [
                extractNumber(displayMgAmount),
                extractNumber(displayDpAmount),
                totalInterest,
                stampDuty,
                other // Keep the rest of the values after index 5 unchanged
            ]
        }));

    }, [checkedState, displayPrice,
        displayDpAmount, displayDpPercentage,
        displayMgAmount, displayMgPercentage,
        displayYear, interest
    ])





    return (
        <Flex className="list-mortgage-chart-container">
            <Card variation="elevated" className="list-mortgage-chart-card">
                <Flex className="list-mortgage-chart-result-gp">
                    <Flex className="list-mortgage-option-chart-gp">

                        <Flex className="list-mortgage-cal-option">
                            <Flex direction="row">
                                <Heading>
                                    按揭計算機
                                </Heading>
                                <Text fontSize="12px">
                                    自訂計算
                                </Text>
                            </Flex>
                            <Flex className="list-mortgage-cal-item">
                                <Text>樓價</Text>
                                <Flex className="list-mortgage-cal-item-price-gp">
                                    <Input
                                        name="price"
                                        className="list-mortgage-cal-item-long-input"
                                        placeholder="HK$"
                                        value={displayPrice}
                                        onChange={(e) => { handleInputChange("price", e.target.value) }}
                                    />
                                </Flex>
                            </Flex>

                            <Flex className="list-mortgage-cal-item">
                                <Text>首期</Text>
                                <Flex direction="row">
                                    <Input
                                        className="list-mortgage-cal-item-short-input"
                                        placeholder="%"
                                        value={displayDpPercentage}
                                        onChange={(e) => { handleInputChange("DpPercentage", e.target.value) }}
                                    />
                                    <Input
                                        className="list-mortgage-cal-item-mid-input"
                                        placeholder="HK$"
                                        value={displayDpAmount}
                                        onChange={(e) => { handleInputChange("DpAmount", e.target.value) }}
                                    />
                                </Flex>
                            </Flex>

                            <Flex className="list-mortgage-cal-item">
                                <Text>貸款額</Text>
                                <Flex direction="row">
                                    <Input
                                        className="list-mortgage-cal-item-short-input"
                                        placeholder="%"
                                        value={displayMgPercentage}
                                        onChange={(e) => { handleInputChange("MgPercentage", e.target.value) }}
                                    />
                                    <Input
                                        className="list-mortgage-cal-item-mid-input"
                                        placeholder="HK$"
                                        value={displayMgAmount}
                                        onChange={(e) => { handleInputChange("MgAmount", e.target.value) }}
                                    />
                                </Flex>
                            </Flex>

                            <Flex className="list-mortgage-cal-item">
                                <Text>年期</Text>
                                <Input
                                    className="list-mortgage-cal-item-long-input"
                                    placeholder="年"
                                    value={displayYear}
                                    onChange={(e) => { handleInputChange("year", e.target.value) }}
                                />
                            </Flex>

                            <Flex className="list-mortgage-cal-item">
                                <Text>利率</Text>
                                <Input
                                    className="list-mortgage-cal-item-long-input"
                                    placeholder="%"
                                    onChange={(e) => { handleInputChange("interest", e.target.value) }}
                                />
                            </Flex>

                            <Flex className="list-mortgage-cal-checkbox-gp">
                                {
                                    mortgageOptions.map((option, index) => (
                                        <CheckboxField
                                            fontSize="13px"
                                            key={index}
                                            label={option}
                                            value={option}
                                            onChange={(e) => { handleCheckboxChange(e.target.value) }}
                                            checked={checkedState.includes(option)}
                                        />
                                    ))
                                }
                            </Flex>

                        </Flex>

                        <Flex className="list-mortgage-chart">
                            <MortageChart chartData={chartData} />
                        </Flex>

                    </Flex>


                    <Flex className="list-mortgage-cal-result-gp">
                        <Flex className="list-mortgage-cal-result-item">
                            <Text>月供</Text>
                            <Text>{displayMonthlyPayment}</Text>
                        </Flex>
                        <Flex className="list-mortgage-cal-result-item">
                            <Text>每月入息要求</Text>
                            <Text>{monthlyRequirement}</Text>
                        </Flex>
                        <Flex className="list-mortgage-cal-result-item">
                            <Text>按壓力測試要求</Text>
                            <Text>{testRequirement}</Text>
                        </Flex>
                        <Flex className="list-mortgage-cal-result-item">
                            <Text>置業成本總預算</Text>
                            <Text>{buyCost}</Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Text className="list-mortgage-cal-remark">
                    資料僅供參考，一概以銀行最終批核、金管局、按揭證券公司及税務局最新公佈為準。如需更精確計算及進一步瞭解詳情，歡迎與我們專業的按揭顧問聯絡。
                </Text>
            </Card>



        </Flex>


    )
}

export default MortgageCalculator