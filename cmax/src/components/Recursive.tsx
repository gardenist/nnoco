import React from 'react';
import { TreeNode } from '../model/TreeNode';

interface IProp {
    node: TreeNode
    depth: number
}

export default function Recursive(props: IProp) {
    return (
        <ul>
            {props.node.items.map(item => (
                <li>{ item }</li>
            ))}

            {props.node.child && (
                <li><Recursive node={props.node.child} depth={props.depth + 1}/></li>
            )}
        </ul>
    )
}