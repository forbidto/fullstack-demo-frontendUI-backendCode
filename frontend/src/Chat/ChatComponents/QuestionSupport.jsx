import { Button, Flex, Heading} from "@aws-amplify/ui-react";
import React from "react";


const QuestionSupport = () =>{

return (
<Flex className="support-question-gp">
<Heading className="support-question-head">重要問題題示</Heading>
<Button className="support-question-item">請問已做大維修？</Button>
<Button className="support-question-item">請問單位有無漏水/滲水問題未解決？</Button>
<Button className="support-question-item">請恕我直言，請問單位內曾有凶案/自殺/有人死亡嗎？</Button>
<Button className="support-question-item">請問間隔有無改動？想了解一下有無結構性改動？ </Button>
<Button className="support-question-item">請問同層/樓上樓下有凶宅嗎？</Button>
<Button className="support-question-item">請問管理費幾錢？知唔知停車場幾錢？</Button>
<Button className="support-question-item">請問屋苑有否穿梭巴士？</Button>
<Button className="support-question-item">請問單位裝修左幾耐，有無換水喉/電線/電箱？</Button>
<Button className="support-question-item">請問樓契是否完整齊全？</Button>
</Flex>
)

}

export default QuestionSupport;