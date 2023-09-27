import React from 'react';

interface Props {
    name: string;
    date: string;
}

const Wedding00: React.FC<Props> = ({ name, date }) => {
    return (
        <div>
            <h1>{name}</h1>
            <p>{date}</p>
        </div>
    );
};

export default Wedding00;
