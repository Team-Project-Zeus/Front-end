import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonList, IonItem, IonLabel } from '@ionic/react';
import React, { FormEvent, useState, Component } from 'react';
import axios from 'axios';
import { environment } from '../enviroment';
// import { User } from '../models/User';
import store from '../store/store';
// import { History, LocationState } from "history";
// import { createBrowserHistory } from 'history';
import * as user from '../store/user/actions';

type MyProps = {};
type MyState = { email: string, password: string };
// var user = new User();

// const history = createBrowserHistory();



// const mapDispatchToProps = dispatch => {
//   return {
//     setToken: user => dispatch(setToken(token))
//   };
// }


export default class Login extends Component<any, MyState> {

  config = {
    headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' }
  };

  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }

  }

  redirect(location: string) {
    // console.log('Trying this: ' + location)
    try {
      // console.dir(this.props.history);
      this.props.history.push(location);
      // console.dir(this.props.history);
      // this.props.history.push(location);

    }
    catch (e) {
      console.log(e);
    }
    // console.log(location);

  }

  handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      // user =
      this.login(this.state.email, this.state.password);

    } catch (e) {
      console.error(e);
    }
  }

  handleEmailChange(event: any) {
    this.setState({ 'email': event.target.value });
  }
  handlePasswordChange(event: any) {
    this.setState({ 'password': event.target.value });
  }

  async login(email: string, password: string) {

    const object: any = { 'email': email, 'password': password };


    var formBody = [];
    for (var property in object) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(object[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    const formBodyString = formBody.join("&");


    const data = await axios.post(environment.LOGIN_URL, formBodyString, this.config).then(response => response.data)
      .then((data) => {
        // console.log(environment.LOGIN_URL);
        console.dir(data);

        const authToken = data['token'];


        // localStorage.setItem('useremail', email)
        //TODO ADD USER ROLE localStorage.setItem('userRole', user.role)
        store.dispatch(user.setEmail(email))
        store.dispatch(user.setToken(authToken))
        // console.dir(authToken);
        store.dispatch(user.setName('test'))

        localStorage.setItem("token", authToken)
        // localStorage.setItem("loggedIn", "true")
        // console.dir(localStorage);
        // console.log(authToken);
        // console.dir(history);
        // console.dir(this.props.history + '/dashboard');


        // console.dir(this.props.history);


      }, (error) => {
        console.dir(error);
      })
    this.redirect('/dashboard');
    // console.dir(store.getState());

  }



  render() {
    return (
      <>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <form onSubmit={e => this.handleSubmit(e)} action="post">
            <IonList>
              <IonItem>
                <IonLabel>Email</IonLabel>
                <IonInput name="email" type="email" value={this.state.email} onInput={(e: any) => this.handleEmailChange(e)} />
              </IonItem>
              <IonItem>
                <IonLabel>Password</IonLabel>
                <IonInput name="password" type="password" value={this.state.password} onInput={(e: any) => this.handlePasswordChange(e)} />
              </IonItem>
              <IonButton type="submit">Log in</IonButton>
            </IonList>
          </form>
        </IonContent>
      </>
    );
  }
}