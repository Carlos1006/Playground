import React, { FC, ReactNode, createContext, forwardRef, useContext, useEffect, useState } from "react";
import css from './../styles/nodeTree.module.scss';

interface NodeProps {
    name: string;
    level: number;
    nodes: NodeProps[];
}

interface NodeLevelProps {
    level: number;
    children: JSX.Element[] | JSX.Element;
}

const NodeTree:FC = () => {
    
    const nodeTree: NodeProps[] = [
        {name:'node1', nodes:[
            {name:'node4', nodes:[], level: -1},
            {name:'node5', nodes:[], level: -1},
            {name:'node6', nodes:[], level: -1},
            {name:'node7', nodes:[], level: -1}
        ], level: -1},
        {name:'node2', nodes:[], level: -1},
        {name:'node3', nodes:[
            {name:'node8', nodes:[], level: -1},
            {name:'node9', nodes:[], level: -1},
            {name:'node10', nodes:[], level: -1},
            {name:'node11', nodes:[], level: -1}
        ], level: -1},
    ]

    useEffect(() => {
        // get all elements with data-level attribute
        const elements = document.querySelectorAll('[data-level]');
        // loop through all elements
        console.log(elements);
        elements.forEach((element: HTMLElement): void => {
            const level = element.getAttribute('data-level');
            const width = element.offsetWidth;
            console.log(level, width);
        });
    });

    return <>
        <div className={css.nodeTree}>
            <Node level={0} name={'node0'} nodes={nodeTree} />
        </div>
    </>
}

const NodeLevel:FC<NodeLevelProps> = ({ level, children }: NodeLevelProps) => {
    const childrenLength = Array.isArray(children) ? children.length : 1;

    const top = 100;
    const width = childrenLength * 100;
    const left = - (width / 2) + 50;

    return <>
        <div className={css.nodeLevel} style={{ width, top, left }}>
            {children}
        </div>
    </>
}

const Node:FC<NodeProps> = ({ name, level, nodes }: NodeProps) => {
    return <>
        <div className={css.node}>
            {name} 
            { nodes.length > 0 && 
                <NodeLevel level={level + 1}>
                    {nodes?.map((node, index) => {
                        return <Node data-level={level} level={level + 1} key={index} name={`${node.name} ${level + 1}`} nodes={node.nodes} />
                    })}
                </NodeLevel>
            }
        </div>
    </>
}

export default NodeTree;