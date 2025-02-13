import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { HttpService } from './http.service';

@Injectable()
export class ThirdPartyApplicationsApi {
  private readonly apiController: string = 'thirdPartyApplications';

  constructor(private api: HttpService,
    private http:HttpClient) { }

    addThirdPartyApplications(item){
        return this.http.post(`${environment.apiUrl}/agent/addThirdPartyApplications`, item)
    } 
    
    getThirdPartyApplications(id){
      return this.http.get(`${environment.apiUrl}/agent/getThirdPartyApplications?id=`+id)
    }

    addStudent(studentData){
      return this.http.post(`${environment.apiUrl}/agent/addStudents`, studentData);
    }

    getVerificationTypes(user_id){
      return this.http.get(`${environment.apiUrl}/agent/VerificationTypes?user_id=${user_id}`)
    }

    checkStepper(user_id){
      return this.http.get(`${environment.apiUrl}/agent/checkStepper?user_id=${user_id}`);
    }

    saveVerificationTypes(verificationData,user_id){
      return this.http.post(`${environment.apiUrl}/agent/VerificationTypes`, {"verificationData" :verificationData, "user_id" :user_id })
    }

    saveDocumentDetails(type,documentDetailsData,user_id){
      return this.http.post(`${environment.apiUrl}/agent/documentDetails`, {type : type,documentDetailsData : documentDetailsData, user_id : user_id})
    }

    validateDocumentDetails(user_id,type){
      return this.http.get(`${environment.apiUrl}/agent/validateDocumentDetails?user_id=${user_id}&type=${type}`)
    }

    getDocumentDetails(user_id){
      return this.http.get(`${environment.apiUrl}/agent/documentDetails?user_id=${user_id}`)
    }

    getInstitutionDetails(user_id){
      return this.http.get(`${environment.apiUrl}/agent/institutionalDetails?user_id=${user_id}`);
    }

    saveInstitutionDetails(type,instituteData,selectedDelivery,selectedDeliveryMode,user_id){
      return this.http.post(`${environment.apiUrl}/agent/institutionalDetails`,{'type' : type,'instituteData' : instituteData,'selectedDelivery':selectedDelivery,'selectedDeliveryMode':selectedDeliveryMode,'user_id' : user_id});
    }

    getPreviewData(user_id){
      return this.http.get(`${environment.apiUrl}/agent/getPreviewData?user_id=${user_id}`);
    }

    getPaymentAmount(user_id){
      return this.http.get(`${environment.apiUrl}/agent/getPaymentAmount?user_id=${user_id}`);
    }

    getAllStudents(page,name,email){
      return this.http.get(`${environment.apiUrl}/agent/getAllStudents?page=${page}&name=${name}&email=${email}`);
    }

    getStudentDetails(user_id){
      return this.http.get(`${environment.apiUrl}/agent/getStudentDetails?user_id=${user_id}`);
    }

    getAllApplications(user_id){
      return this.http.get(`${environment.apiUrl}/agent/getAllApplications?user_id=${user_id}`);
    }

    getErrataDetails(id){
      return this.http.get(`${environment.apiUrl}/agent/errataDetails?id=${id}`);
    }

    saveErrataDetails(data){
      return this.http.post(`${environment.apiUrl}/agent/errataDetails`,{errataDetails : data});
    }

    deletefile(doc_id){
      return this.http.post(`${environment.apiUrl}/student/deletefile`, {"doc_id":doc_id })
    }

    getSupportiveData(user_id){
      return this.http.get(`${environment.apiUrl}/agent/getSupportiveData?user_id=${user_id}`);
    }

    editStudent(studentData,user_id){
      return this.http.post(`${environment.apiUrl}/agent/editStudent`, {'studentData':studentData,'user_id':user_id});
    }
}