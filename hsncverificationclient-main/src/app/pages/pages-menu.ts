import { NbMenuItem } from '@nebular/theme';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserStore } from '../@core/stores/user.store';
import { UsersApi } from '../@core/backend/common/api/users.api';

@Injectable()
export class PagesMenu {

  constructor(private userStore: UserStore,
    private usersApi: UsersApi,) {
    //this.usersApi.notification(this.userStore.getUser()['id']);
  }

  getMenu(role,type): Observable<NbMenuItem[]> {


    const adminMenu = [
      {
        title: 'Dashboard',
        icon: 'home-outline',
        // icon: 'pie-chart-outline',
        link: '/pages/admindashboard',
        data :{
          resource : 'admindashboard'
        },
        home: false,
        children: undefined,
        hidden : false
      },
      {
        title: 'Role Management',
        icon: 'layers-outline',
        link: '/pages/rolemanagement',
        data :{
          resource : 'rolemanagement'
        },
        home: true,
        children: undefined,
        hidden : false
      },
      {
        title: 'Student Management',
        icon: 'trending-up-outline',
        link: '/pages/studentmanagement',
        data :{
          resource : 'studentmanagement'
        },
        home: false,
        children: undefined,
        hidden : false
      },
      {
        title: 'Total Applications',
        icon: 'person-outline',
        link: '/pages/adminTotal',
        data :{
          resource : 'adminTotal'
        },
        home: false,
        children: undefined,
      },
      {
        title: 'Pending Applications',
        icon: 'activity-outline',
        link: '/pages/adminPending',
        home: false,
        data :{
          resource : 'adminPending'
        },
        children: undefined,
      },

      // {
      //   title: 'Verified Applications',
      //   icon: 'layers-outline',
      //   link: '/pages/adminVerified',
      //   home: false,
      //   children: undefined,
      // },
      {
        title: 'signed Applications',
        icon: 'layers-outline',
        link: '/pages/adminSigned',
        home: false,
        data :{
          resource : 'adminSigned'
        },
        children: undefined,
      },
      // {
      //   title: 'Print Applications',
      //   icon: 'layers-outline',
      //   link: '/pages/adminPrint',
      //   home: false,
      //   children: undefined,
      // },
       {
        title: 'Sent Applications',
        // icon: 'checkmark-circle-outline',
        icon: 'email-outline',
        link: '/pages/adminEmailed',
        home: false,
        data :{
          resource : 'adminEmailed'
        },
        children: undefined,
      },
      {
        title: 'Student feedback',
        icon: 'radio-outline',
        // icon :'external-link-outline',
        link: '/pages/studentfeedback',
        data :{
          resource : 'studentfeedback'
        },
        home: false,
        children: undefined,
        hidden : false
      },
      
    {
      title:'Payments',
      // icon:'person-outline',
      icon:'briefcase-outline',
      link: '/pages/adminpayment',
      data :{
        resource : 'adminpayment'
      },
      home: false,
      children: undefined,
      hidden : false
    },
    {
      title:'Reports',
      // icon:'person-outline',
      icon:'map-outline',
      link: '/pages/adminReport',
      data :{
        resource : 'adminReport'
      },
      home: false,
      children: undefined,
      hidden : false
    }
  ];

    const userMenu = [

      {
        title: 'Dashboard',
        icon: 'pie-chart-outline',
        link: '/pages/student-dashboard',
        home: true,
        children: undefined,
      },
      {
        title: 'Help',
        icon: 'layers-outline',
        link: '/pages/help',
        home: false,
        children: undefined,
      },
      
    ];

    const paid =[

      {
        title: 'Dashboard',
        icon: 'pie-chart-outline',
        link: '/pages/student-dashboard',
        home: true,
        children: undefined,
      },
      {
        title: 'My Application',
        icon :'grid-outline',
        link: '/pages/Myapplication',
        home: true,
        children: undefined,
      },
      {
        title: 'Help',
        icon: 'layers-outline',
        link: '/pages/help',
        home: false,
        children: undefined,
      },
    ];

    const agentMenu = [

      {
        title: 'Dashboard',
        icon: 'pie-chart-outline',
        link: '/pages/agent-dashboard',
        home: false,
        children: undefined,
      },
      {
        title: 'List Student',
        icon: 'pie-chart-outline',
        link: '/pages/listAgentApplication',
        home: false,
        children: undefined,
      },
      
    ];


    if (role == 'admin' || role == 'subAdmin') {
      return of([...adminMenu,]);
    }

    else if (role == 'student' && type == 'unpaid') {
      return of([...userMenu, ]);
    }
    else if (role == 'agent') {
      return of([...agentMenu, ]);
    }
    else if(role == 'student' && type == 'paid'){ 
      return of([...paid])
    }

    //return of([...dashboardMenu, ...menu]);
   // return of([ ...menu]);
  }
}