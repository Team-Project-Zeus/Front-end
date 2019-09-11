import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonList, IonItem, IonLabel } from '@ionic/react';
import React, { FormEvent, useState } from 'react';
import axios from 'axios';
import { environment } from '../enviroment';
import { jsxElement } from '@babel/types';
import { encode } from 'punycode';
import { User } from '../models/User';
import { History, LocationState } from "history";
import { Storage } from '@ionic/storage';


type MyProps = { history: History };
type MyState = { email: string, password: string };
var user = new User();

export default class HomePage extends React.Component<MyProps, MyState> {

  config = {
    headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/x-www-form-urlencoded' }
  };

  constructor(props: any) {
    super(props);
    console.log('constructing!');
    this.state = {
      email: '',
      password: ''
    }
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
        console.dir(data)
        return data
      })
    user = data['user'];
    const authToken = data['authToken'];

    localStorage.setItem('useremail', user.email)
    localStorage.setItem('userRole', user.role)
    localStorage.setItem("authToken", authToken)

    this.props.history.push('/Dashboard')
    console.log(user);
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