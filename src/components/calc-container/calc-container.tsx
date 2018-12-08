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
  "+",
  "-",
  "%",
  "*",
  "/",
  "=",
  "C",
];
// export interface IContainerProps{
//   label: string
// }
export const CalcContainer: React.FC = ()=>{
  const [ isError, setIsError ] = useState<boolean>(false);
  const [ buffer, setBuffer ] = useState<string[]>([]);
  const calc = ()=>{
    try{
    return new Function(`return [${buffer.join('')}]`)();
    }
  catch(e){
    setIsError(true);
    return [];
  }
  }
  const getVal = (input: string)=> {

    const prevBuffer = isError?[]:buffer;
    setIsError(false);

    switch(input){
      case 'C':
         return [];
      case '=':
      const result = calc();
      if(!Number.isFinite(result)){
        setIsError(true);
      }
        return calc();
      default:
        return [ ...prevBuffer, input];
    }

  };
  const update  = (x:string)=> ()=>{
    setBuffer(getVal(x));
  }

  return <div>
    <CalcScreen labels={buffer}/><div>
    {
      labels.map((x:string)=>(<CalcButton label={x} click={update}/>))
    }</div></div>;
};