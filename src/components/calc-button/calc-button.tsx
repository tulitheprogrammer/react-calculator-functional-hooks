import * as React from 'react';

export interface IButtonProps{
  label: string;
  click: any;
}

export const CalcButton: React.FC<IButtonProps> = ({label, click})=>(<button onClick={click(label)}>{label}</button>);