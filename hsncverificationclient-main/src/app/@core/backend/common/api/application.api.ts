import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { HttpService } from './http.service';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ApplicationApi {
  userId: any;
  // handleError: any;
  private readonly apiController: string = 'application';

  constructor(private api: HttpService,
  private http:HttpClient) { }

  get(url: string): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
        let objectUrl: string = null;
        this.http
            .get(url, {
                responseType: 'blob'
            })
            .subscribe(m => {
                objectUrl = URL.createObjectURL(m);
                observer.next(objectUrl);
            });

        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
                objectUrl = null;
            }
        };
    });
  }

  admindocumentdetails(userid: any, app_id: any) {
    throw new Error('Method not implemented.');
  }

  addThirdPartyApplications(agentData: { firstname: any; lastname: any; seat: any; semester: any; Document: any; college: any; branch: any; passing: any; stream: any; }) {
    throw new Error('Method not implemented.');
  }

  addApplication( studentData: {firstname: any; lastname: any; seat: any; semester: any; Document: any; reqType: any; college: any; branch: any; passing: any; stream: any; userId: any; userEmail: any; created_by: any;},emails : Set<any>){
    return this.http.post(`${environment.apiUrl}/application/addApplication`, {"studentData" :studentData, "emails":Array.from(emails)})
  }

  updateApplication(id , data,emails : Set<any>){
    return this.http.post(`${environment.apiUrl}/application/updateApplication`,{"id":id ,"data":data, "emails":Array.from(emails)})
  }

  applicationdata(user_id){
    return this.http.get(`${environment.apiUrl}/application/applicationdata?user_id=`+user_id)
  }

  documentdetailsdata(user_id){
    return this.http.get(`${environment.apiUrl}/application/documentdetailsdata?id=`+user_id)
  }

  getApplication(id){
    return this.http.get(`${environment.apiUrl}/application/getApplication?id=`+id)
  }

  getApplicationIdWise(id){
    return this.http.get(`${environment.apiUrl}/application/getApplicationIdWise?id=`+id)
  }
  
  getApplications(){
    return this.http.get(`${environment.apiUrl}/application/getApplications`)
  }

  getProcessedApplications(){
    return this.http.get(`${environment.apiUrl}/application/getProcessedApplications`)
  }

  getErrataApplications(){
    return this.http.get(`${environment.apiUrl}/application/getErrataApplications`)
  }

  getAgents(){
    return this.http.get(`${environment.apiUrl}/application/getAgents`)
  }
  
  checkApplication(email){
    return this.http.get(`${environment.apiUrl}/application/checkApplication?email=${email}`);
  } 
    
  processApplication(id){
    return this.http.post(`${environment.apiUrl}/application/processApplication`, {"id":id})
  }

  errataApplication(id,userId,errataMesg,first_name,last_name,choose_file,lastErrata){
    return this.http.post(`${environment.apiUrl}/application/errataApplication`, {"id":id,"userId":userId,"errataMesg":errataMesg,"first_name":first_name,
    "last_name":last_name,"choose_file":choose_file,"lastErrata":lastErrata})
  }

  viewDocument(url){
    return this.http.get(url)
  }

  getAllApplications(user_id){
    return this.http.get(`${environment.apiUrl}/agent/getAllApplications?user_id=${user_id}`);
  }

  //Pending Applications
  //to get all the "pending" students in student dashboard
  getAll_PendingApplications(page,name,email,type,id){
    return this.http.get(`${environment.apiUrl}/application/pending_students?page=${page}&name=${name}&email=${email}&type=${type}&id=${id}`);
  }

  rejectApplication(userId,app_id,value,outward){ 
    return this.http.post(`${environment.apiUrl}/application/rejectApplicationOfverification`,{"userId":userId,"app_id" : app_id,"value" : value,"outward" : outward});
  }

  setVerified(app_id , value,adminEmail){  
    return this.http.post(`${environment.apiUrl}/application/setVerified`,{"app_id" : app_id ,"value" : value, "adminEmail" : adminEmail});
  }

  getapplication(id){
    return this.http.get(`${environment.apiUrl}/getapplication?id=`+id)
  }

  setErrata(app_id,notes,docid,type,adminemail,userId){
    return this.http.post(`${environment.apiUrl}/setErrata`,{'app_id'  : app_id ,'notes' : notes , 'docid': docid,'type':type,'adminemail':adminemail,'userId':userId});
  }
  
  //view student details
  getAdminSideDetails(id, app_id){
    return this.http.get(`${environment.apiUrl}/application/getAdminSideDetails?id=${id}&app_id=${app_id}`)
  }

  getFileDetailsDocument(file,user_id){
    return this.http.get(`${environment.apiUrl}/application/getFileDetailsDocument?file=${file}&user_id=${user_id}`)
  }

  //Verified Application
  getAll_verifiedApplications(page,name,email){
    return this.http.get(`${environment.apiUrl}/application/verified_students?page=${page}&name=${name}&email=${email}`);
  }

  generateCertificate(userId,app_id,adminEmail){  
    return this.http.post(`${environment.apiUrl}/application/generateCertificate`,{"userId" : userId,"app_id" : app_id, "adminEmail" : adminEmail});
  }

  generateCertificates(userId,app_id,email){
    return this.http.post(`${environment.apiUrl}/application/generateCertificates`,{"userId" : userId, "app_id" : app_id, "email" : email})
    // .pipe(

    //   retry(2),
    //   catchError((this.httpError))
    // )
  }

  httpError(error : any) {
    
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  generatepdfform(user_id){
    return this.http.post(`${environment.apiUrl}/application/generatepdfform`,{"app_id" : user_id})
  }

  // Signed Application
  getAll_signedApplications(page,name,email,type){
    return this.http.get(`${environment.apiUrl}/application/signed_students?page=${page}&name=${name}&email=${email}&type=${type}`);
  }

  checksignedpdf(id , userId){
    return this.http.get(`${environment.apiUrl}/application/checksignedpdf?id=${id}&userId=${userId}`);
  }

  sendemail(id,userId,adminEmail){
    return this.http.post(`${environment.apiUrl}/application/sendEmail`,{id:id, userId : userId,"adminEmail" : adminEmail});
  }

  getVerificationLetters(id,userId){
    return this.http.get(`${environment.apiUrl}/application/getVerificationLetters?id=${id}&userId=${userId}`)
  }

  // Sent Applications
  getAll_emailedApplications(page,name,email){
    return this.http.get(`${environment.apiUrl}/application/emailed_students?page=${page}&name=${name}&email=${email}`);  
  }

  setApplicationErrata(event,id,user_id,type,app_id,message){
    return this.http.post(`${environment.apiUrl}/application/setApplicationErrata`,{event : event, id: id, user_id : user_id, type : type, app_id : app_id, message : message});  
  }

  getInstituteAddress(id,userId,dataValues){
    return this.http.get(`${environment.apiUrl}/application/getInstituteAddress?id=${id}&userId=${userId}&section=${dataValues}`)
  }

  downloadExcel(tracker,type,startDate,endDate){
    return this.http.get(`${environment.apiUrl}/application/downloadExcel?tracker=${tracker}&type=${type}&startDate=${startDate}&endDate=${endDate}`)
  }

  downloadExcelTotalApplication(tracker,type,startDate,endDate){
    return this.http.get(`${environment.apiUrl}/application/downloadExcelTotalApplication?tracker=${tracker}&type=${type}&startDate=${startDate}&endDate=${endDate}`)
  }
    
  downloadExcel_dateTotal(tracker,type,startDate,endDate){
    return this.http.get(`${environment.apiUrl}/application/downloadExcel_dateTotal?tracker=${tracker}&type=${type}&startDate=${startDate}&endDate=${endDate}`)
  }

  mergeCertificate(user_id,app_id){
    return this.http.get(`${environment.apiUrl}/application/getVerificationLetters?userId=${user_id}&app_id=${app_id}`);
  }

  regenerateCertificates(user_id,id){
    return this.http.get(`${environment.apiUrl}/application/regenerateCertificates?userId=${user_id}&id=${id}`);
  }

  //getallstudentfeedback
  getallstudentfeedback(page) {
    return this.http.get(`${environment.apiUrl}/application/student_feedback?page=${page}`);
  }
        
  downloadFiles(documentFile):Observable<Blob>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${environment.apiUrl}/application/downloadFiles?documentFile=`+documentFile, { headers: headers, responseType: 'blob'}).map((res) => {
      return new Blob([res], { type: 'application/pdf' });
    });
  }

  downloadFilesTotal(documentFile):Observable<Blob>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${environment.apiUrl}/application/downloadFilesTotal?documentFile=`+documentFile, { headers: headers, responseType: 'blob'}).map((res) => {
      return new Blob([res], { type: 'application/pdf' });
    });
  }

  downloadFilespaymenttotal(documentFile):Observable<Blob>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${environment.apiUrl}/application/downloadFilespaymenttotal?documentFile=`+documentFile, { headers: headers, responseType: 'blob'}).map((res) => {
      return new Blob([res], { type: 'application/pdf' });
    });
  }
  
  downloadpdf(documentFile):Observable<Blob>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${environment.apiUrl}/application/downloadpdf?documentFile=${documentFile}`, { headers: headers, responseType: 'blob'}).map((res) => {
      return new Blob([res], { type: 'application/pdf' });
    });
  }
  
  downloadFilesData(formPath):Observable<Blob>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${environment.apiUrl}/downloadFiles_demo?formPath=`+formPath, { headers: headers, responseType: 'blob'}).map((res) => {
      return new Blob([res], { type: 'application/pdf' });
    });
  }

  removefromreject(appl_id,user_id) {
    return this.http.post(`${environment.apiUrl}/application/removefromreject`,{'user_id':user_id,'appl_id':appl_id});
  }

  getAll_PaidApplications(page,id,name,email,year){
    return this.http.get(`${environment.apiUrl}/application/paid_students?page=${page}&id=${id}&name=${name}&email=${email}&acadYear=${year}`);
  }

  activitytracker(page, date, data, email){
    return this.http.get(`${environment.apiUrl}/application/activitytracker?page=${page}&date=${date}&data=${data}&email=${email}`);
  }

  getallstudents(page, name, email) {
    return this.http.get(`${environment.apiUrl}/application/students?page=${page}&name=${name}&email=${email}`);
  }

  status(status, userId) {
    return this.http.put(`${environment.apiUrl}/application/status`, { "status": status, "userId": userId });
  }

  //verifyotp
  verifyOtp(otp, email, userId) {
    return this.http.put(`${environment.apiUrl}/application/verifyOtp`, { "otp": otp, "email": email, "userId": userId });
  }

  getPortalwaiseApplicationCount() {
    return this.http.get(`${environment.apiUrl}/application/getPortalwaiseApplicationCount`);
  }

  getallpedingpayment(page, date, email, value) {
    return this.http.get(`${environment.apiUrl}/application/getallpedingpayment?page=${page}&date=${date}&email=${email}&value=${value}`);
  }
  
  getPaymentDetails(tab_type) {
    return this.http.get(`${environment.apiUrl}/application/getPaymentDetails?tab_type=` + tab_type);
  }
  
  setResolve(id, email, value) {
    return this.http.post(`${environment.apiUrl}/application/setResolve`, { "id": id, "email": email, "value": value });
  }

  getAll_Paydetails(page, id, name, email) {
    return this.http.get(`${environment.apiUrl}/application/getAll_Paydetails?page=${page}&id=${id}&name=${name}&email=${email}`);
  }

  getPaymentdeatils(value) {
    return this.http.get(`${environment.apiUrl}/application/getPaymentdeatils?value=${value}`);
  }

  getMenuRole(userID) {
    return this.http.get(`${environment.apiUrl}/application/role_management/getMenuRole?userID=` + userID);
  }

  saveInsDetails(data,email){
    return this.http.post(`${environment.apiUrl}/${this.apiController}/saveInsDetails`,{errataDetails : data,email:email});
  }

  admin_pass_reset(user_mail){
    return this.http.post(`${environment.apiUrl}/${this.apiController}/adminResetPassword`,{data: user_mail});
  }

  name_changes(fullname,email, contactno, marksheetname,user_id){
    return this.http.post(`${environment.apiUrl}/${this.apiController}/nameChange`,{fname :fullname,Email: email, mobileNo: contactno, nameofmarksheet: marksheetname,data: user_id});
  }

  getallsubadmin(page,name,email){
    return this.http.get(`${environment.apiUrl}/application/role_management/main?page=${page}&name=`+name+`&email=`+email);
  }

  changeSubAdminStatus(userId) {
    return this.http.post(`${environment.apiUrl}/application/role_management/changeSubAdminStatus`, { "userId": userId });
  }

  getSubAdminData(userId) {
    return this.http.get(`${environment.apiUrl}/application/role_management/getSubAdminData?userId=` + userId);
  }

  addUpdatesubAdmin(userId, subAdminData) {
    return this.http.post(`${environment.apiUrl}/application/role_management/addUpdatesubAdmin`, { "userId": userId, "subAdminData": subAdminData });
  }
  
  getRolesData(userId) {
    return this.http.get(`${environment.apiUrl}/application/role_management/getRolesData?userId=` + userId);
  }

  addupdateRole(roles,user_id){
    return this.http.post(`${environment.apiUrl}/application/role_management/setUpdateRole`,{"roles":roles,"user_id":user_id});
  }

  saveEduDetails(data){
    return this.http.post(`${environment.apiUrl}/${this.apiController}/saveEduDetails`,{errataDetails : data});
  }
} 