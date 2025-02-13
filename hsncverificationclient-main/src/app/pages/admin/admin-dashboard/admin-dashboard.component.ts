import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Data } from '../../../../assets/data/data';
import { ApplicationApi } from '../../../@core/backend/common/api/application.api';
import { UserData } from '../../../@core/interfaces/common/users';

@Component({
  selector: 'ngx-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  protected readonly unsubscribe$ = new Subject<void>();
  admin: any
  countdata: any;
  mergeOptions: {};
  options: {};
  data1:any;
  data2: any;
  data3: any;
  data4: any;
  themeSubscription: any;

  constructor(
    private api: ApplicationApi,
    private authService : NbAuthService,
    private router : Router,
    public toasterService: NbToastrService,
    private formBuilder:FormBuilder,
    protected globalVar:Data,
    private usersService: UserData,
    private theme: NbThemeService  ) {
    this.usersService.getCurrentUser().pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => {
        this.admin = user;
        if(this.admin.is_email_verified == true && this.admin.is_otp_verified == true){
          if(this.admin.role != 'admin'  && this.admin.role != 'subAdmin'){
            this.router.navigate(['auth/logout']);
          }
        }else{
          this.router.navigate(['auth/logout']);
        }
        
      })   
   }



  ngOnInit(): void {  
    this.api.getPortalwaiseApplicationCount().subscribe((data: any)=>{
      if(data['status']==200){
        this.countdata=data['data'];
        this.mergeOptions={
          series:[
            {
              data: [
                { value: this.countdata.total, name: 'Total' },
                { value: this.countdata.apply, name: 'Pending' },
                { value: this.countdata.signed, name: 'Signed ' },
                { value: this.countdata.done, name: 'Sent ' },
                // { value: this.countdata.print, name: 'Print' },
                // { value: this.countdata.done, name: 'Courier/Email Sent' },
              ]
            }
          ]
        }

        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {  
          const echarts: any = config.variables.echarts;
            this.options = {
            backgroundColor: echarts.bg,
            color: ['#3366FF','#5DADE2','#73C6B6','#F1C40F' ,'#E74C3C'],
            // color: ['#5DADE2','#73C6B6','#F1C40F','#E67E22' ,'#E74C3C'],

                        // color: ['#000000','#000000','#000000','#000000' ,'#000000'],

            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)',
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: ['Total', 'Pending', 'Signed ', 'Sent '],
              textStyle: {
                color: echarts.textColor,
              },
            },
            series: [
              {
                name: 'Application',
                type: 'pie',
                radius: '80%',
                center: ['50%', '50%'],
                data: [
                  { value: this.countdata.total, name: 'Total' },
                  { value: this.countdata.apply, name: 'Pending' },
                  { value: this.countdata.signed, name: 'Signed ' },
                  { value: this.countdata.done, name: 'Sent ' },
                  // { value: this.countdata.done, name: 'Courier/Email Sent' },
                ],
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: echarts.itemHoverShadowColor,
                  },
                },
                label: {
                  normal: {
                    textStyle: {
                      color: echarts.textColor,
                    },
                  },
                },
                labelLine: {
                  normal: {
                    lineStyle: {
                      color: echarts.axisLineColor,
                    },
                  }, 
                },
              },
            ],
          };
        });
      }
      else{
        this.toasterService.danger('Unsuccessful!!!','Error',{duration: 3000});
      }
    })
    
   

  }

}

