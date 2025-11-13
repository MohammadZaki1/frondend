import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { ThirdPartyApplicationsApi } from '../../../../@core/backend/common/api/thirdPartyApplications.api';
import { SharedService } from '../../../../@core/backend/common/services/shared.service';
import { User } from '../../../../@core/interfaces/common/users';
import { UserStore } from '../../../../@core/stores/user.store';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme'; 
import { Firstpaymentdialog } from '../../../student-verification/payment_dialog/paymentdialog';
import { Subscription } from 'rxjs';
import { ApplicationApi } from '../../../../@core/backend/common/api/application.api';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { ConfirmationService } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApplicationProcessApi } from '../../../../@core/backend/common/api/applicationProcess.api';
import { map, startWith } from 'rxjs/operators';
import * as _moment from 'moment';
import { Moment} from 'moment';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'nb-dialog-errataUpdate',
  templateUrl:'./errataUpdate.component.html',
  styleUrls :['./errataUpdate.component.scss'],
  providers:[{
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  },
  {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ConfirmationService]
})


export class ErrataUpdateComponent  {
    @Input() id;
    @Input() user_id;
    @Input() lock_transcript;
    @Input() upload_step;
    ErrataDetails: any;
    date = new Date();
    uploadUrl = environment.apiUrl;
    currenttoken: NbAuthJWTToken;
    errataForm: FormGroup;
    courseData: any;
    courseDetails: any;
    filteredOptions: any;
    patterns = [{name : 'Annual'},{name : 'Semester'}]
    resultClasses = [{name : 'Distinction'},{name : 'First Class'},{ name : 'Second Class'},{name : 'Pass Class'},{name : 'Fail'},{name :'ATKT'}]



  constructor( protected ref: NbDialogRef<ErrataUpdateComponent>,
    private api: ThirdPartyApplicationsApi,
    private processApi : ApplicationProcessApi,
    private toastrService: NbToastrService,
    private confirmationService: ConfirmationService,
    private authService: NbAuthService,
    private fb : FormBuilder) { }

    ngOnInit(): void {

        if(this.lock_transcript == 'requested'){
           
            
            this.errataForm = this.fb.group({
                id : new FormControl(['']),
                courseName : new FormControl(['']),
                pattern : new FormControl(['']),
                semester : new FormControl(['']),
                seatNo : new FormControl(['']),
                passingMonthYear : new FormControl(['']),
                convocationDate : new FormControl(['']),
                convocationNo : new FormControl(['']),
                transcriptNo : new FormControl(['']),
                result : new FormControl([''])
            })
            this.getCourses('');




           
            
            this.api.getErrataDetails(this.id).subscribe(data=>{
                this.ErrataDetails = data['data'];
                this.errataForm.controls.id.patchValue(this.ErrataDetails.id);
                this.errataForm.controls.courseName.patchValue(this.ErrataDetails.courseName);
                // this.errataForm.controls.pattern.patchValue(this.ErrataDetails.selectedpattern)
                this.errataForm.controls.pattern.patchValue(this.ErrataDetails.pattern)
                this.errataForm.controls.semester.patchValue(this.ErrataDetails.semester);
                this.errataForm.controls.seatNo.patchValue(this.ErrataDetails.seatNo);
                // this.errataForm.controls.passingMonthYear.patchValue(this.ErrataDetails.PassingMonthYear);
                this.errataForm.controls.passingMonthYear.patchValue(new Date(this.ErrataDetails.PassingMonthYear));
                this.errataForm.controls.convocationDate.patchValue(this.ErrataDetails.convocationDate);
                this.errataForm.controls.convocationNo.patchValue(this.ErrataDetails.convocationNo);
                this.errataForm.controls.transcriptNo.patchValue(this.ErrataDetails.transcriptNo);
                this.errataForm.controls.result.patchValue(this.ErrataDetails.resultClass);

                

                this.filteredOptions = this.errataForm.controls.courseName.valueChanges
                .pipe(
                    startWith<any>(''),
                    map(courseName => this._filter(courseName))
                )
            })
        }
    
    }

    getCourses(college){
        this.processApi.getCourses(college).subscribe(data=>{
          this.courseData = data['data'];

        })
    }

    getCourseDetails(courseName,event){
        if(courseName){
            this.processApi.getCourseDetails(courseName,event.value).subscribe(data=>{
                this.courseDetails = data['data'];
            })
        }
      }

    displayFn(courseName) {
        return courseName ? courseName : '';
    }

    displayFn1(semester) {
        return semester ? semester : '';
      }

    private _filter(value: string){
        //return this.courseData.filter((s) => new RegExp(value, 'gi').test(s.name));
        const filterValue = this._normalizeValue(value);
        return this.courseData.filter(option =>
          option.name.toLowerCase().includes(filterValue)
        );
    }
    
    private _normalizeValue(value: string): string {
        return value.toLowerCase().replace(/\s/g, "");
    }

    onBeforeSend(event) {
        //this.loadingimg = true;
        this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
            if (token.isValid()) {
                this.currenttoken = token;
                event.xhr.setRequestHeader("Authorization", `Bearer ` + this.currenttoken);
            }
        });
    }

    onUpload(event){
        const reader = new FileReader();
        var duration = 10000;
        var position = 'top-right';
        var status;
        if(event.files && event.files.length) {
            const [file] = event.files;
            reader.readAsDataURL(file);
            var json = event.originalEvent.body;
            var yourData = json.data; // or json["Data"]
            var yourStatus = json.status;
            var yourMessage = json.message; // or json["Data"]
            if (yourStatus == 200) {
                status = 'success';
                this.toastrService.show(yourMessage,'SUCCESS', { duration} );
                if(yourData.upload_step != 'requested' && yourData.lock_transcript !='requested'){
                    this.ref.close();
                }
            } else if (yourStatus == 401) {
                status = 'error';
                this.toastrService.show(yourMessage,'ERROR', { duration });
            } else if (yourStatus == 400) {
                status = 'error';
                this.toastrService.show(yourMessage, 'ERROR', { duration });
            }
        }
    }

    onSelect($event: any): void {
        var maxFileSize =  5000000;
        var imgArr = $event.files[0].name.split('.');
        var extension = imgArr[imgArr.length - 1].trim();
        if ($event.files[0].size > maxFileSize) {
            this.confirmationService.confirm({
                message: 'Maximum file size should be 7 MB.',
                header: 'Invalid File Size',
                icon: 'pi pi-info-circle',
                rejectVisible : false,
                acceptLabel: 'Ok'
            });
        }
        
        if((extension!='jpg' && extension!='jpeg' && extension!='png' && extension!='JPG' && extension!='JPEG' && extension!='PNG' && extension!='pdf' && extension!='PDF') ) {
            this.confirmationService.confirm({
                message: 'Please upload your transcript in .jpeg or .jpg or .png or .pdf formats',
                header: 'Invalid File Type',
                icon: 'pi pi-info-circle',
                rejectVisible : false,
                acceptLabel: 'Ok'
            });
        }
        
        if((extension!='jpg' && extension!='jpeg' && extension!='png' && extension!='JPG' && extension!='JPEG' && extension!='PNG' && extension!='pdf' && extension!='PDF') ) {
            this.confirmationService.confirm({
                message: 'Please upload your transcript in .jpeg or .jpg or .png or .pdf formats',
                header: 'Invalid File Type',
                icon: 'pi pi-info-circle',
                rejectVisible : false,
                acceptLabel: 'Ok'
            });
        }
    }

    dismiss(){
        this.ref.close();
    }

    // chosenMonthHandler(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    //     var passing = moment(this.errataForm.controls.passingMonthYear.value);
    //     passing.month(normalizedMonthAndYear.month());
    //     passing.year(normalizedMonthAndYear.year());
    //     this.errataForm.controls.passingMonthYear.patchValue(passing)


        // var convo = moment(this.errataForm.controls.convocationDate.value);
        // convo.month(normalizedMonthAndYear.month());
        // convo.year(normalizedMonthAndYear.year());
        // this.errataForm.controls.convocationDate.patchValue(convo)

    //     datepicker.close();
    // }


    // chosenMonthHandler(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>,subtype) {

        

    //     switch (subtype) {
    //         case "from": {
    //           var enrollmentStart = moment(this.errataForm.controls.enrollmentStart.value);
    //           enrollmentStart.month(normalizedMonthAndYear.month());
    //           enrollmentStart.year(normalizedMonthAndYear.year());
    //             this.errataForm.controls.enrollmentStart.patchValue(enrollmentStart)
    //             datepicker.close();
    //         }
    //           break;
    //         case "to": {
    //             var enrollmentEnd = moment(this.errataForm.controls.enrollmentEnd.value);
    //             enrollmentEnd.month(normalizedMonthAndYear.month());
    //             enrollmentEnd.year(normalizedMonthAndYear.year());
    //               this.errataForm.controls.enrollmentEnd.patchValue(enrollmentEnd)
    //               datepicker.close();
    //         }
    //           break;
    //         case "passing": {
    //             var passing = moment(this.errataForm.controls.passingMonthYear.value);
    //             passing.month(normalizedMonthAndYear.month());
    //             passing.year(normalizedMonthAndYear.year());
    //             // var passingYear = normalizedMonthAndYear.year();
    //             // if((this.errataForm.controls.courseName.value.includes('Master in Business Administration') || 
    //             // this.errataForm.controls.courseName.value.includes('Master of Business Administration'))
    //             // && (this.errataForm.controls.semester.value === 'Semester IV' || 
    //             // this.errataForm.controls.semester.value === 'Second Year')){
    //             //     if(passingYear >=1995 && passingYear <=2003){
    //             //         this.errataForm.patchValue({'mbaCheck':true});
    //             //     }else{
    //             //         this.errataForm.patchValue({'mbaCheck':false});
    //             //     }
    //             // }
    //               this.errataForm.controls.passingMonthYear.patchValue(passing)
    //               datepicker.close();
    //         }
    //           break;
            
    //       }

    // }






    saveDetails(){
        this.api.saveErrataDetails(this.errataForm.value).subscribe(data=>{
            this.toastrService.success("Saved Successfully");
            if(data['data'].upload_step != 'requested' && data['data'].lock_transcript !='requested'){
                this.ref.close();
            }
        })
    }
}
