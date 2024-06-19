import { useState } from 'react'
import Navbar from './Navbar'

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
                operand1: calculationState.operand1 === "0" ? num : calculationState.operand1 === "-0" ? "-" + num : calculationState.operand1.match(/\d/g).length < 9 ? calculationState.operand1 + num : calculationState.operand1,
            })
            setDisplayValue(calculationState.operand1 === "0" ? num : calculationState.operand1 === "-0" ? "-" + num : calculationState.operand1.match(/\d/g).length < 9 ? calculationState.operand1 + num : calculationState.operand1)
            return;
        }
        setCalculationState({
            ...calculationState,
            operand2: calculationState.operand2 === "0" ? num : calculationState.operand2 === "-0" ? "-" + num : calculationState.operand2.match(/\d/g) == null ? num : calculationState.operand2.match(/\d/g).length < 9 ? calculationState.operand2 + num : calculationState.operand2,
        })
        setDisplayValue(calculationState.operand2 === "0" ? num : calculationState.operand2 === "-0" ? "-" + num : calculationState.operand2.match(/\d/g) == null ? num : calculationState.operand2.match(/\d/g).length < 9 ? calculationState.operand2 + num : calculationState.operand2)
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
            if ((result >= 1000000000 || result <= -1000000000) || (result < 0.00001 && result > -0.00001)) {
                setDisplayValue(result.toExponential(5))
            } else if (String(result).length > 9 && (result < 0.0001 || result > -0.0001)) {
                setDisplayValue(result.toPrecision(7))
            } else if (String(result).length > 9 && (result < 0.001 || result > -0.001)) {
                setDisplayValue(result.toPrecision(8))
            } else if (String(result).length > 9) {
                setDisplayValue(result.toPrecision(9))
            } else {
                setDisplayValue(result)
            }  
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
        if ((result >= 1000000000 || result <= -1000000000) || (result < 0.00001 && result > -0.00001)) {
            setDisplayValue(result.toExponential(5))
            } else if (String(result).length > 9 && (result < 0.0001 || result > -0.0001)) {
            setDisplayValue(result.toPrecision(7))
            } else if (String(result).length > 9 && (result < 0.001 || result > -0.001)) {
                setDisplayValue(result.toPrecision(8))
            } else if (String(result).length > 9) {
                setDisplayValue(result.toPrecision(9))
            } else {
                setDisplayValue(result)
            } 
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
            setDisplayValue(calculationState.operand1 === "0" ? "-0" : calculationState.operand1 === "-0" ? "0" : displayValue.search(/-/) === 0 ? displayValue.replace("-", "") : "-" + displayValue)
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
        <Navbar />
        <div className='flex flex-col h-full text-center items-center'>
            <div className='mt-16 mb-3 text-3xl'>Calculator</div>
            <div className="bg-black rounded-3xl p-6 sm:p-10 max-w-[350px] sm:max-w-[450px]">
                <div>
                    <div><input type="text" className="bg-black text-white border-0 w-full text-[40px] sm:text-[50px] text-right pr-4 mb-4 rounded-lg" disabled={true} value={displayValue}/></div>
                </div>
                <div className='grid grid-rows-5'>  
                    <div className='grid grid-cols-4 gap-2 py-1 text-[30px] sm:text-[40px] text-bold text-center'>
                        <div><button className="cursor-pointer w-full py-2 sm:py-3.5 sm:px-4 rounded-full text-black bg-slate-300 hover:bg-slate-200" onClick={handleClear}>AC</button></div>
                        <div><button className="cursor-pointer w-full py-2 sm:py-3.5 sm:px-4 rounded-full text-black bg-slate-300 hover:bg-slate-200" onClick={handleSign}>±</button></div>
                        <div><button className="cursor-pointer w-full py-2 sm:py-3.5 sm:px-4 rounded-full text-black bg-slate-300 hover:bg-slate-200" onClick={handlePercent}>%</button></div>
                        <div><button className="cursor-pointer w-full py-2 sm:py-3.5 sm:px-4 rounded-full text-white bg-amber-500 hover:bg-amber-400" onClick={e => handleOperator(e)}>÷</button></div>
                    </div>
                    <div className='grid grid-cols-4 gap-2 py-1 text-[30px] sm:text-[40px] text-bold text-center'>
                        <div><button className="cursor-pointer w-full py-2 sm:py-3.5 sm:px-4 rounded-full bg-neutral-800 text-white hover:bg-neutral-600" onClick={(e) => handleNum(e)}>7</button></div>
                        <div><button className="cursor-pointer w-full py-2 sm:py-3.5 sm:px-4 rounded-full bg-neutral-800 text-white hover:bg-neutral-600" onClick={(e) => handleNum(e)}>8</button></div>
                        <div><button className="cursor-pointer w-full py-2 sm:py-3.5 sm:px-4 rounded-full bg-neutral-800 text-white hover:bg-neutral-600" onClick={(e) => handleNum(e)}>9</button></div>
                        <div><button className="cursor-pointer w-full py-2 sm:py-3.5 sm:px-4 rounded-full text-white bg-amber-500 hover:bg-amber-400" onClick={e => handleOperator(e)} value="*">×</button></div>
                    </div>
                    <div className='grid grid-cols-4  gap-2 py-1 text-[30px] sm:text-[40px] text-bold text-center'>
                        <div><button className="cursor-pointer w-full py-2 sm:py-3.5 sm:px-4 rounded-full bg-neutral-800 text-white hover:bg-neutral-600" onClick={(e) => handleNum(e)}>4</button></div>
                        <div><button className="cursor-pointer w-full py-2 sm:py-3.5 sm:px-4 rounded-full bg-neutral-800 text-white hover:bg-neutral-600" onClick={(e) => handleNum(e)}>5</button></div>
                        <div><button className="cursor-pointer w-full py-2 sm:py-3.5 sm:px-4 rounded-full bg-neutral-800 text-white hover:bg-neutral-600" onClick={(e) => handleNum(e)}>6</button></div>
                        <div><button className="cursor-pointer w-full py-2 sm:py-3.5 sm:px-4 rounded-full text-white bg-amber-500 hover:bg-amber-400" onClick={e => handleOperator(e)}>-</button></div>
                    </div>
                    <div className='grid grid-cols-4  gap-2 py-1 text-[30px] sm:text-[40px] text-bold text-center'>
                        <div><button className="cursor-pointer w-full py-2 sm:py-3.5 sm:px-4 rounded-full bg-neutral-800 text-white hover:bg-neutral-600" onClick={(e) => handleNum(e)}>1</button></div>
                        <div><button className="cursor-pointer w-full py-2 sm:py-3.5 sm:px-4 rounded-full bg-neutral-800 text-white hover:bg-neutral-600" onClick={(e) => handleNum(e)}>2</button></div>
                        <div><button className="cursor-pointer w-full py-2 sm:py-3.5 sm:px-4 rounded-full bg-neutral-800 text-white hover:bg-neutral-600" onClick={(e) => handleNum(e)}>3</button></div>
                        <div><button className="cursor-pointer w-full py-2 sm:py-3.5 sm:px-4 rounded-full text-white bg-amber-500 hover:bg-amber-400" onClick={e => handleOperator(e)}>+</button></div>
                    </div>
                    <div className='grid grid-cols-4  gap-2 py-1 text-[30px] sm:text-[40px] text-bold text-center'>
                        <div className='col-span-2 w-full'><button className="cursor-pointer w-full py-2 sm:py-3.5 px-9 rounded-full text-left btn-zero bg-neutral-800 text-white hover:bg-neutral-600" onClick={(e) => handleNum(e)}>0</button></div>
                        <div><button className="cursor-pointer w-full py-2 sm:py-3.5 sm:px-4 rounded-full bg-neutral-800 text-white hover:bg-neutral-600" onClick={handlePoint}>.</button></div>
                        <div><button className="cursor-pointer w-full py-2 sm:py-3.5 sm:px-4 rounded-full text-white bg-amber-500 hover:bg-amber-400" onClick={handleEqual}>=</button></div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Calculator