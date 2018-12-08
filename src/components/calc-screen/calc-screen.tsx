import * as React from 'react';

export interface IScreenProps{
  labels: string[];
}

export const CalcScreen: React.FC<IScreenProps> = ({labels})=>(<div>{labels.join('')}</div>);