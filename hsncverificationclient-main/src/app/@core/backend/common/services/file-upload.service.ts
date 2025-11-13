import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root',
})

export class FileUploadService {
  private fileList: string[] = new Array<string>();
  private fileList$: Subject<string[]> = new Subject<string[]>()

  constructor(private http: HttpClient) {}

  addUser(id: number, profileImage: File,errataFlag:Boolean): Observable<any> {
    var formData: any = new FormData();
    formData.append('id', id);
    formData.append('errataFlag', errataFlag);
    formData.append('avatar', profileImage);

    var url = environment.apiUrl+'/upload';
    return this.http
      .post(url, formData, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(catchError(this.errorMgmt));
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => {
      return errorMessage;
    });
  }

  public upload(fileName: string, fileContent: string): void {
    this.fileList.push(fileName);
    this.fileList$.next(this.fileList);
  }
 
  public download(fileName: string): void {
 
  }
 
  public remove(fileName): void {
    this.fileList.splice(this.fileList.findIndex(name => name === fileName), 1);
    this.fileList$.next(this.fileList);
  }
 
  public list(): Observable<string[]> {
    return this.fileList$;
  }
 
  private addFileToList(fileName: string): void {
    this.fileList.push(fileName);
    this.fileList$.next(this.fileList);
  }
}
