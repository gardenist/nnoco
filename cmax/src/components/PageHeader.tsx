import React from 'react';

interface IProp {
    title: string
}

export default (props: IProp) => {
    return (
        <span>{props.title}</span>
    )
}