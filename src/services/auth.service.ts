import { LocalUser } from './../models/local_user';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from './../models/credenciais.dto';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { StorageServive } from './storage.service';

@Injectable()
export class AuthService{

  constructor(public http : HttpClient, public storage: StorageServive){
  }

  authenticate(creds: CredenciaisDTO){
    return this.http.post(
      `${API_CONFIG.baseUrl}/login`,
      creds,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

  successfulLogin(authorizationValue : string){
    let tk = authorizationValue.substring(7);
    let user: LocalUser = {
      token: tk
    }
    this.storage.setLocalUser(user);
  }

  logout(){
    this.storage.setLocalUser(null);
  }
}
