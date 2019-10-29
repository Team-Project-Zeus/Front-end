import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonList, IonItem, IonLabel } from '@ionic/react';
import React, { FormEvent, Component } from 'react';
import axios from 'axios';
import { environment } from '../../enviroment';
import store from '../../store/store';
import * as user from '../../store/user/actions';
import { errorCodes } from '../../utils/errorCodes';

// type MyProps = { errorMessage: string };
type MyState = { email: string, password: string, errorMessage: string };

export default class Login extends Component<any, MyState> {

  config = {
    headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' }
  };
  errorMessage: any

  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: ''
    }

  }

  //Redirects to different page
  redirect(location: string) {
    try {
      this.props.history.push(location);
    }
    catch (e) {
      console.log(e);
    }

  }

  handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      // user login
      this.login(this.state.email, this.state.password);

    } catch (e) {
      console.error(e);
    }
  }

  //Updates Email property
  handleEmailChange(event: any) {
    this.setState({ 'email': event.target.value });
  }
  //Updates Password property
  handlePasswordChange(event: any) {
    this.setState({ 'password': event.target.value });
  }

  async login(email: string, password: string) {

    const object: any = { 'email': email, 'password': password };


    var formBody = [];
    //Encoding Forminputs to FormUrlEncoded for security
    for (var property in object) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(object[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    const formBodyString = formBody.join("&");

    //Sending post request to database for login
    await axios.post(environment.LOGIN_URL, formBodyString, this.config).then(response => response.data)
      .then((data) => {
        const authToken = data['token'];

        //Storing user Data in redux
        store.dispatch(user.setEmail(email))
        store.dispatch(user.setToken(authToken))
        store.dispatch(user.setName('test'))
        //Saving token in localStorage to stay logged in 
        localStorage.setItem("token", authToken)

        //Redirecting to Dashboard
        this.redirect('/dashboard');

      }, (error) => {
        console.log("error:")
        console.dir(error.message);
        if (error.message == 'Network Error') {
          this.setState({ 'errorMessage': errorCodes[404] });

        }
        else {
          console.log(error.response.status);

          switch (error.response.status) {
            case 422:
              this.setState({ 'errorMessage': errorCodes[422] });
              console.log(this.errorMessage);
              break;
            case 404:
              this.setState({ 'errorMessage': errorCodes[404] });
              console.log(this.errorMessage);
              break;
            default:
              this.setState({ 'errorMessage': "onbekende error!" });
              console.log(this.errorMessage);
              break;

          }
        }

      })

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
              <IonItem  ><p style={{ color: 'red' }}>{this.state.errorMessage}</p></IonItem>
            </IonList>
          </form>
        </IonContent>
      </>
    );
  }
}