import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
// import Tutorial from '../pages/Tutorial';
import { connect } from 'react-redux';
import { createStore } from 'redux';
import store from '../store/store';
// import { RootState } from '../store';


type Props = ReturnType<typeof mapStateToProps> & {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    path?: string | string[];
}


type MyState = { email: string, password: string };

const mapStateToProps = (state: any) => ({
    user: state.user
});




class PRoute extends Component<Props, MyState> {
    componentDidMount() { console.log("test") }

    render() {
        // console.log(this.state.email)
        console.log(localStorage.getItem('loggedIn'));
        const Component = this.props.component;
        const routeRender = (props: any) => {
            if (localStorage.getItem('loggedIn') == 'true' || true == true) {
                return React.createElement(Component, props);
            }
            return (
                <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }} />
            );
        }
        return <Route render={routeRender.bind(this)} />;
    }
}
export const PrivateRoute = connect(mapStateToProps)(PRoute);
