import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { HttpService } from './http.service';

@Injectable()
export class VerifyApi {
  private readonly apiController: string = 'verify';

  constructor(private api: HttpService,
    private http:HttpClient) { }

    addverify(item){
        return this.http.post(`${environment.apiUrl}/addverify`, item)
    }  

   

   

}