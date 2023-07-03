import React from 'react';

export type Node<P = object> = React.FunctionComponent<P>;
export interface Coordinates {
    x: number;
    y: number;
}