import { Injectable } from '@angular/core';
import {
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
} from 'amazon-cognito-identity-js';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userPool: CognitoUserPool
  user: CognitoUser

  constructor() {
    const poolData = {
        UserPoolId: environment.UserPoolId, // Your user pool id here
        ClientId: environment.ClientId, // Your client id here
    };
    this.userPool = new CognitoUserPool(poolData);
  }

  registerUser( username: string, password: string, email: string, phone ?: string): Promise<Boolean> {
    
    var attributeList = [];
    
    var dataEmail = {
        Name: 'email',
        Value: email,
    };
    
    var dataPhoneNumber = {
        Name: 'phone_number',
        Value: phone ? phone : '',
    };
    var attributeEmail = new CognitoUserAttribute(dataEmail);
    var attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);
    
    attributeList.push(attributeEmail);
    attributeList.push(attributePhoneNumber);

    return new Promise((resolve, reject) => {
      this.userPool.signUp(username, password, attributeList, null, (err, result) => {
        if (err) {
            alert(err.message || JSON.stringify(err));
            reject(false);
        }
        this.user = result.user;
        console.log('user name is ' + this.user.getUsername());
        resolve(true);
    });
    })
  }// registerUser

  verifyUser(code: string): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      this.user.confirmRegistration(code, true, function(err, result) {
        if (err) {
            alert(err.message || JSON.stringify(err));
            reject(false);
        }
        console.log('call result: ' + result);
        resolve(true)
      });
    })

  }
}
