
import React, { FormEvent, useState } from 'react';

type MyProps = { history: History };
type MyState = { email: string, password: string };

export default class Dashboard extends React.Component<MyProps, MyState> {
    render() {
        return (
            <>
                <p>logged in!</p>
            </>
        );
    }
}
