import { useState } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Calculator = () => {
    
    const [calculationState, setCalculationState] = useState({
        operand1: "0",
        operand2: "",
        operator: "",
        equalPressed: false,
    })

    const [displayValue, setDisplayValue] = useState(calculationState.operand1)

    function handleNum(e) {
        const num = e.target.innerText
        if (!calculationState.operator) {
            setCalculationState({
                ...calculationState,
                operand1: calculationState.operand1 === "0" ? num : calculationState.operand1 === "-0" ? "-" + num : calculationState.operand1 + num,
            })
            setDisplayValue(calculationState.operand1 === "0" ? num : calculationState.operand1 === "-0" ? "-" + num : calculationState.operand1 + num)
            return;
        }
        setCalculationState({
            ...calculationState,
            operand2: calculationState.operand2 === "0" ? num : calculationState.operand2 === "-0" ? "-" + num : calculationState.operand2 + num,
        })
        setDisplayValue(calculationState.operand2 === "0" ? num : calculationState.operand2 === "-0" ? "-" + num : calculationState.operand2 + num)
    }

    function handleOperator(e) {
        let operator = e.target.innerText
        if (calculationState.operand1 !== "" && calculationState.operand2 !== "" && calculationState.equalPressed) {
            setCalculationState({
                operand1: calculationState.operand2,
                operand2: "",
                operator: operator,
                equalPressed: false,
            })
            return
        }
        if (calculationState.operand1 !== "" && calculationState.operand2 !== "") {
            const result = calculateResult(
                Number(calculationState.operand1),
                calculationState.operand2 === "" ? Number(calculationState.operand1) : Number(calculationState.operand2),
                calculationState.operator,
            )
            setCalculationState({
                operand1: result,
                operand2: "",
                operator: operator
            })
            setDisplayValue(result)
            return;
        
        }
        setCalculationState({
            ...calculationState,
            operator: operator
        })

    }

    function handleEqual() {
        if (!calculationState.operator) {
            setCalculationState({
                ...calculationState,
                operand1: "0",
            })
            return
        }
        const result = calculateResult(
            Number(calculationState.operand1),
            calculationState.operand2 === "" ? Number(calculationState.operand1) : Number(calculationState.operand2),
            calculationState.operator,
        )
        setCalculationState({
            ...calculationState,
            operand1: result,
            operand2: "",
            equalPressed: true,
        })
        setDisplayValue(result)
    }

    function handlePoint() {
        if (!calculationState.operator && calculationState.operand1.search(/\./) !== 1) {
            setCalculationState({
                ...calculationState,
                operand1: calculationState.operand1 + "."
            })
            setDisplayValue(calculationState.operand1 + ".")
            return;
        }
        if (calculationState.operator && calculationState.operand2.search(/\./) !== 1) {
            setCalculationState({
                ...calculationState,
                operand2: calculationState.operand2 + "."
            })
            setDisplayValue(calculationState.operand2 + ".")
            return;
        }
    }

    function handleSign() {
        if (!calculationState.operator || (calculationState.operator && calculationState.equalPressed && calculationState.operand2 === "")) {
            setCalculationState({
                ...calculationState,
                operand1: calculationState.operand1 === "0" ? "-0" : calculationState.operand1 === "-0" ? "0" : calculationState.operand1 * -1
            })
            setDisplayValue(calculationState.operand1 === "0" ? "-0" : calculationState.operand1 === "-0" ? "0" : calculationState.operand1 * -1)
            return
        }
        setCalculationState({
            ...calculationState,
            operand2: calculationState.operand2 === "" ? "-0" : calculationState.operand2 === "-0" ? "0" : calculationState.operand2 * -1
        })
        setDisplayValue(calculationState.operand2 === "" ? "-0" : calculationState.operand2 === "-0" ? "0" : calculationState.operand2 * -1)
    }

    function handlePercent() {
        if (calculationState.operand2 === "") {
            setCalculationState({
                ...calculationState,
                operand1: calculationState.operand1 / 100
            })
            setDisplayValue(calculationState.operand1/100)
            return
        }
        setCalculationState({
            ...calculationState,
            operand2: calculationState.operand2/100
        })
        setDisplayValue(calculationState.operand2/100)
        }

    function handleClear() {
        setCalculationState({
            operand1: "0",
            operand2: "",
            operator: "",
            equalPressed: false
        })
        setDisplayValue("0")
    }

    function calculateResult(num1, num2, operator) {
        switch (operator) {
            case "×":
                return num1 * num2;
            case "+":
                return num1 + num2;
            case "-":
                return num1 - num2;
            default:
                return num1 / num2;
        }
    }

  return (
    <>
        <div>Calculator</div>
        <div className="calculator">
        <Row>
            <Col><input type="text" className="display" disabled={true} value={displayValue}/></Col>
        </Row>
        <Row>
            <Col><button className="btn-circle default" onClick={handleClear}>AC</button></Col>
            <Col><button className="btn-circle default" onClick={handleSign}>±</button></Col>
            <Col><button className="btn-circle default" onClick={handlePercent}>%</button></Col>
            <Col><button className="btn-circle operator" onClick={e => handleOperator(e)}>÷</button></Col>
        </Row>
        <Row>
            <Col><button className="btn-circle number" onClick={(e) => handleNum(e)}>7</button></Col>
            <Col><button className="btn-circle number" onClick={(e) => handleNum(e)}>8</button></Col>
            <Col><button className="btn-circle number" onClick={(e) => handleNum(e)}>9</button></Col>
            <Col><button className="btn-circle operator" onClick={e => handleOperator(e)} value="*">×</button></Col>
        </Row>
        <Row>
            <Col><button className="btn-circle number" onClick={(e) => handleNum(e)}>4</button></Col>
            <Col><button className="btn-circle number" onClick={(e) => handleNum(e)}>5</button></Col>
            <Col><button className="btn-circle number" onClick={(e) => handleNum(e)}>6</button></Col>
            <Col><button className="btn-circle operator" onClick={e => handleOperator(e)}>-</button></Col>
        </Row>
        <Row>
            <Col><button className="btn-circle number" onClick={(e) => handleNum(e)}>1</button></Col>
            <Col><button className="btn-circle number" onClick={(e) => handleNum(e)}>2</button></Col>
            <Col><button className="btn-circle number" onClick={(e) => handleNum(e)}>3</button></Col>
            <Col><button className="btn-circle operator" onClick={e => handleOperator(e)}>+</button></Col>
        </Row>
        <Row>
            <Col xs={6}><button className="btn-circle btn-zero number" onClick={(e) => handleNum(e)}>0</button></Col>
            <Col><button className="btn-circle number" onClick={handlePoint}>.</button></Col>
            <Col><button className="btn-circle operator" onClick={handleEqual}>=</button></Col>
        </Row>
        </div>

    </>
  )
}

export default Calculator