import { LocalUser } from './../models/local_user';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from './../models/credenciais.dto';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { StorageServive } from './storage.service';
import { JwtHelper} from 'angular2-jwt';

@Injectable()
export class AuthService{

  jwtHelper: JwtHelper = new JwtHelper();

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

  refreshToken(){
    return this.http.post(
      `${API_CONFIG.baseUrl}/auth/refresh_token`,
      {},
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

  successfulLogin(authorizationValue : string){
    let tk = authorizationValue.substring(7);
    let user: LocalUser = {
      token: tk,
      email: this.jwtHelper.decodeToken(tk).sub
    }
    this.storage.setLocalUser(user);
  }

  logout(){
    this.storage.setLocalUser(null);
  }
}
