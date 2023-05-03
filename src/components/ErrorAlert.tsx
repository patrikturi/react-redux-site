import React from 'react';
import { Alert } from 'react-bootstrap';

type Props = {
    messages: string[];
}

const buildLines = (messages: string[]): JSX.Element => {
    if(messages.length <= 1) {
        return <div>{messages[0]}</div>;
    }
    return (
        <ul>
            {messages.map(message => (
                <li key={message}>{message}</li>
            ))}
        </ul>
    );
}

const ErrorAlert = ({messages}: Props):JSX.Element => {

    return (<Alert variant='danger' style={{marginTop: '10px', marginBottom: '0px'}}>
        {buildLines(messages)}
    </Alert>);
};

export default ErrorAlert;
