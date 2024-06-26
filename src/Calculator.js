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
            handleDisplay(result)
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
        handleDisplay(result)
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
            const result1 = calculationState.operand1 / 100
            handleDisplay(result1)
            return
        }
        setCalculationState({
            ...calculationState,
            operand2: calculationState.operand2/100
        })
        const result2 = calculationState.operand2/100
        handleDisplay(result2)
        console.log(result2)
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

    function handleDisplay(num) {
        if ((num >= 1000000000 || num <= -1000000000) || (num  < 0.00001 && num > -0.00001)) {
            setDisplayValue(num.toExponential(5))
            } else if (String(num).length > 9 && (num < 0.0001 || num > -0.0001)) {
            setDisplayValue(num.toPrecision(7))
            } else if (String(num).length > 9 && (num < 0.001 || num > -0.001)) {
                setDisplayValue(num.toPrecision(8))
            } else if (String(num).length > 9) {
                setDisplayValue(num.toPrecision(9))
            } else {
                setDisplayValue(num)
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
        <div className='relative top-10'>
            <div className=''>
                <a
                    role="button"
                    href="https://github.com/asjscott/calculator/tree/main/src"
                    data-twe-ripple-init
                    data-twe-ripple-color="light"
                    className="inline-block rounded-full bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                    Check out the code
                </a>
            </div>
        </div>
    </div>
    </>
  )
}

export default Calculator