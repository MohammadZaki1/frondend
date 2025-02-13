

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NbToastrService } from '@nebular/theme';

import { UserData, User } from '../../../@core/interfaces/common/users';
import { EMAIL_PATTERN, NUMBERS_PATTERN } from '../../../@auth/components';
import {NbAuthOAuth2JWTToken, NbTokenService} from '@nebular/auth';
import {UserStore} from '../../../@core/stores/user.store';

export enum UserFormMode {
  VIEW = 'View',
  EDIT = 'Edit',
  ADD = 'Add',
  EDIT_SELF = 'EditSelf',
}

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  userForm: FormGroup;

  protected readonly unsubscribe$ = new Subject<void>();
  Loginrole: string;
  user_id: number;
  editProfile = false;
  role: string;

  get firstName() { return this.userForm.get('firstName'); }

  get lastName() { return this.userForm.get('lastName'); }

  get marksheetName() { return this.userForm.get('marksheetName'); }

  get roles() { return this.userForm.get('role'); }

  get email() { return this.userForm.get('email'); }

  get mobile () { return this.userForm.get('mobile'); }

 

  mode: UserFormMode;
  setViewMode(viewMode: UserFormMode) {
    this.mode = viewMode;
  }

  constructor(private usersService: UserData,
    private router: Router,
    private route: ActivatedRoute,     
    private tokenService: NbTokenService,
    private userStore: UserStore,
    private toasterService: NbToastrService,
    private fb: FormBuilder) {
    if(this.route.snapshot.queryParamMap.get('profile') == 'true'){
      this.editProfile = true;
    }
  }

  ngOnInit(): void {
    this.initUserForm();
    this.loadUserData();

    this.role =this.userStore.getUser()['role'];
    var role;
    
    if(this.route.snapshot.paramMap.get('role')){
      role = this.route.snapshot.paramMap.get('role') ;
    }else{
      role = this.role;
    }  

  }

  initUserForm() {
    this.userForm = this.fb.group({
      id: this.fb.control(''),
      role: this.fb.control(''),
      firstName: this.fb.control('', [Validators.minLength(3), Validators.maxLength(20)]),
      lastName: this.fb.control('', [Validators.minLength(3), Validators.maxLength(20)]),
      marksheetName: this.fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      // age: this.fb.control('', [Validators.required, Validators.min(1),
      //   Validators.max(120), Validators.pattern(NUMBERS_PATTERN)]),
      email: this.fb.control('', [
        Validators.required,
        Validators.pattern(EMAIL_PATTERN)
      ]),
      mobile: this.fb.control('', [Validators.minLength(10), Validators.maxLength(10)]),
    });
  }

  get canEdit(): boolean {
    return this.mode !== UserFormMode.VIEW;
  }


  loadUserData() {
    const id = this.route.snapshot.paramMap.get('id');
    const isProfile = this.route.snapshot.queryParamMap.get('profile');
    if (isProfile) {
      this.setViewMode(UserFormMode.EDIT_SELF);
      this.loadUser();
    } else {
      if (id) {
        const currentUserId = this.userStore.getUser().id;
        this.setViewMode(currentUserId.toString() === id ? UserFormMode.EDIT_SELF : UserFormMode.EDIT);
        this.loadUser(id);
      } else {
        this.setViewMode(UserFormMode.ADD);
      }
    }
  }

  loadUser(id?) {
    const loadUser = this.mode === UserFormMode.EDIT_SELF
      ? this.usersService.getCurrentUser() : this.usersService.get(id);
    loadUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => {
        this.userForm.setValue({
          id: user.id ? user.id : '',
          role: user.role ? user.role : '',
          firstName: user.firstName ? user.firstName : '',
          lastName: user.lastName ? user.lastName : '',
          marksheetName: user. marksheetName ? user. marksheetName : '',
          email: user.email,
          mobile: user.mobile ? user.mobile: '',
        });
    
        // this is a place for value changes handling
        // this.userForm.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {   });
      });

      this.userStore.onUserStateChange()
      .pipe(
        takeUntil(this.unsubscribe$),
      )
      .subscribe((user: User) => {
        this.userForm.setValue({
          id: user.id ? user.id : '',
          role: user.role ? user.role : '',
          firstName: user.firstName ? user.firstName : '',
          lastName: user.lastName ? user.lastName : '',
          marksheetName: user. marksheetName ? user. marksheetName : '',
          email: user.email,
          mobile: user.mobile ? user.mobile: '',
        });
      });
  }


  convertToUser(value: any): User {
    const user: User = value;
    return user;
  }

  save() {
    const user: User = this.convertToUser(this.userForm.value);

    let observable = new Observable<User>();
    if (this.mode === UserFormMode.EDIT_SELF) {
      this.usersService.updateCurrent(user).subscribe((result: any) => {
          this.tokenService.set(new NbAuthOAuth2JWTToken(result, 'email', new Date()));
          this.handleSuccessResponse();
        },
        err => {
          this.handleWrongResponse();
        });
    } else {
      observable = user.id
        ? this.usersService.update(user)
        : this.usersService.create(user);
    }

    observable
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
          this.handleSuccessResponse();
        },
        err => {
          this.handleWrongResponse();
        });
  }

  handleSuccessResponse() {
    this.toasterService.success('', `Item ${this.mode === UserFormMode.ADD ? 'created' : 'updated'}!`);
    this.back();
  }

  handleWrongResponse() {
    this.toasterService.danger('', `This email has already taken!`);
  }

  back() {
    this.router.navigate(['/pages']);
  }

  ngOnDestroy(): void {
    // this.unsubscribe$.next();
    // this.unsubscribe$.complete();
  }
}
