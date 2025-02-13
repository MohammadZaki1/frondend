import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { HttpService } from './http.service';

@Injectable()
export class RegisterUserApi {
  private readonly apiController: string = 'registeruser';

  constructor(private api: HttpService,
    private http:HttpClient) { }

    getRegisterUser(){
      return this.http.get(`${environment.apiUrl}/getRegisterUser`)
    }

    //Get IP Adress using http://freegeoip.net/json/?callback
  getIpAddress() {
    return this.http
      .get('https://ipapi.co/json/')
      // .get('http://ip-api.com/json')
      .map(response => response || {})
  }

  emailValues(data){
    try{
      return this.http.post(`${environment.apiUrl}/checkEmail`,{data: data});
    }catch(error){
    }
  }

  
  sendOtp(user_id){
    return this.http.get(`${environment.apiUrl}/get_otp?user_id=${user_id}`);
    
  }
  
  updateOtp(user_id,otp){
    return this.http.post(`${environment.apiUrl}/update_otp`,{user_id :user_id, otp:otp});
  }

  logOutActivity(email){
    return this.http.get(`${environment.apiUrl}/logOutActivity?email=${email}`);
  }


   

}