import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../../../environments/environment';
import { HttpService } from './http.service';

@Injectable()
export class ApplicationProcessApi {
  
  private readonly apiController: string = 'applicationProcess';

  constructor(private api: HttpService,
    private http:HttpClient) { }

    saveVerificationTypes(verificationData){
        return this.http.post(`${environment.apiUrl}/student/VerificationTypes`, {"verificationData" :verificationData})
    }

    getVerificationTypes(){
        return this.http.get(`${environment.apiUrl}/student/VerificationTypes`)
    }

    getCourses(college){
        return this.http.get(`${environment.apiUrl}/student/courses?college=${college}`)
    }

    getColleges(){
        return this.http.get(`${environment.apiUrl}/student/colleges`)
    }

    saveDocumentDetails(type,documentDetailsData){
        
        return this.http.post(`${environment.apiUrl}/student/documentDetails`, {type : type,documentDetailsData : documentDetailsData})
    }

    getDocumentDetails(){
       return this.http.get(`${environment.apiUrl}/student/documentDetails`)
    }

    validateDocumentDetails(type){
        return this.http.get(`${environment.apiUrl}/student/validateDocumentDetails?type=${type}`)
    }

    getFileDetails(file,user_id){
        return this.http.get(`${environment.apiUrl}/student/getFileDetails?file=${file}&user_id=${user_id}`)
    }

    getCourseDetails(course,pattern){
        const encodedCourseName = encodeURIComponent(course)
        return this.http.get(`${environment.apiUrl}/student/courseDetails?course=${encodedCourseName}&pattern=${pattern}`)
    }

    getInstitutionDetails(){
        return this.http.get(`${environment.apiUrl}/student/institutionalDetails`);
    }
    
    saveInstitutionDetails(type,instituteData,selectedDelivery,selectedDeliveryMode){
        return this.http.post(`${environment.apiUrl}/student/institutionalDetails`,{'type' : type,'instituteData' : instituteData,'selectedDelivery':selectedDelivery,'selectedDeliveryMode':selectedDeliveryMode});
    }

    getPreviewData(){
        return this.http.get(`${environment.apiUrl}/student/getPreviewData`);
    }

    getPaymentAmount(){
        return this.http.get(`${environment.apiUrl}/student/getPaymentAmount`);
    }

    paymentrequest(user_id, app_name, app_email, amount){
        return this.http.post(`${environment.apiUrl}/payment/paymentrequest`, {"user_id":user_id,"app_email":app_email, "amount":amount, "app_name":app_name})
    }

    PaymentDetails(order_id){
        return this.http.post(`${environment.apiUrl}/payment/PaymentDetails`, {"order_id":order_id})
    }

    OnlinePaymentChallan(user_id,transaction_id,payment_amount,payment_status,application_id,payment_date_time, order_id){
        return this.http.post(`${environment.apiUrl}/payment/OnlinePaymentChallan`,{user_id:user_id,payment_amount:payment_amount,transaction_id:transaction_id,date_time:payment_date_time,status_payment:payment_status,application_id:application_id,order_id:order_id});
    }
    
    checkStepper(){
        return this.http.get(`${environment.apiUrl}/student/checkStepper`);
    }

    getAllApplications(){
        return this.http.get(`${environment.apiUrl}/student/getAllApplications`);
    }

    generatepdfform(app_id){
        return this.http.post(`${environment.apiUrl}/student/generatepdfform`,{"app_id":app_id})
    }

    paymentreceipt(app_id){
        return this.http.post(`${environment.apiUrl}/student/paymentreceipt`,{"app_id":app_id})
    }

    deletefile(doc_id){
        return this.http.post(`${environment.apiUrl}/student/deletefile`, {"doc_id":doc_id })
      }

    
      deletedoc(id,type){
        return this.http.delete(`${environment.apiUrl}/student/deletedoc?id=${id}&type=${type}`)
    }

    downloadFiles(documentFile):Observable<Blob>{
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.get(`${environment.apiUrl}/student/downloadFiles?documentFile=`+documentFile, { headers: headers, responseType: 'blob'}).map(
            (res) => {
                return new Blob([res], { type: 'application/pdf' });
            });
        
    }

    feedBack(satisfy, recommend, staff, experience, exp_prob, suggestion,user_id){
        return this.http.post(`${environment.apiUrl}/payment/feedBack`,{"satisfy":satisfy, "recommend":recommend, "staff":staff, "experience":experience, "exp_prob":exp_prob, "suggestion":suggestion, "user_id":user_id});
    }

    mergeDocuments(user_id,app_id){
        return this.http.get(`${environment.apiUrl}/payment/mergeDocuments?user_id=${user_id}&app_id=${app_id}`);
    }

    downloadTemplate(){
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.get(`${environment.apiUrl}/student/downloadTemplate`, { headers: headers, responseType: 'blob'}).map(
            (res) => {
                return new Blob([res], { type: 'application/pdf' });
            });
    }

    getApplicationsDetails(){
        return this.http.get(`${environment.apiUrl}/student/getApplicationsDetails`);
    }

    mergedocument(user_id,app_id){
        return this.http.get(`${environment.apiUrl}/student/mergedocument?userId=${user_id}&app_id=${app_id}`);
    }

    // for merge documents
    downloadpdf(documentFile):Observable<Blob>{
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.get(`${environment.apiUrl}/application/downloadpdf?documentFile=${documentFile}`, { headers: headers, responseType: 'blob'}).map(
            (res) => {
                return new Blob([res], { type: 'application/pdf' });
            });
        
    }

    generateSerialNumbers(user_id,app_id){
        return this.http.get(`${environment.apiUrl}/student/generateSerialNumbers?user_id=${user_id}&app_id=${app_id}`);
    }

    resetPasswordValues(data){  
              return  this.http.post(`${environment.apiUrl}/auth/resetpassword`,{"data" : data}); 
      }
      verifyUser(token){  
              return  this.http.get(`${environment.apiUrl}/auth/verify-emails?token=${token}`); 
      };

      getSupportiveData(){
        return this.http.get(`${environment.apiUrl}/student/getSupportiveData`);
    }
} 