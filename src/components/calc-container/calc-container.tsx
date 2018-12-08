import * as React from 'react';
import { useState } from 'react';
import { CalcButton } from '../calc-button/calc-button';
import { CalcScreen } from '../calc-screen/calc-screen';

const labels = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "=",
  "C",
];

const operands = [
  "+",
  "-",
  "%",
  "*",
  "/",
];
// export interface IContainerProps{
//   label: string
// }
export const CalcContainer: React.FC = ()=>{
  const [ isResult, setIsResult ] = useState<boolean>(false);
  const [ isError, setIsError ] = useState<boolean>(false);
  const [ buffer, setBuffer ] = useState<string[]>([]);
  const calc = ()=>{
    try{
     return new Function(`return [${buffer.join('')}]`)();
    }
    catch(e){
      return [];
    }
  }

  const reset = ()=>{
    setIsError(false);
    setIsResult(false);
  };
  const getVal = (input: string)=> {

    switch(input){
      case 'C':
        reset();
        return [];
      case '=':
        const result = calc();
        setIsError(!isFinite(result));
        setIsResult(true);
        return result;
      default:
        const prevBuffer = (isError || (isResult && !operands.some((x)=>x===input)))?[]:buffer;
        reset();
        return [ ...prevBuffer, input];
    }

  };
  const update  = (x:string)=> ()=>{
    setBuffer(getVal(x));
  }

  return <div>
    <CalcScreen labels={buffer}/><div>
    {
      [...labels, ...operands].map((x:string)=>(<CalcButton label={x} click={update}/>))
    }</div></div>;
};