import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
// import Tutorial from '../pages/Tutorial';
import { connect } from 'react-redux';


type Props = ReturnType<typeof mapStateToProps> & {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    path?: string | string[];
}


type MyState = { email: string, password: string };

const mapStateToProps = (state: any) => ({
    user: state.user
});




class PRoute extends Component<Props, MyState> {

    render() {

        const Component = this.props.component;
        const routeRender = (props: any) => {
            if (this.props.user.token !== null) {
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

