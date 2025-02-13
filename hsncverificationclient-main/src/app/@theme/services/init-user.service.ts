import { Observable } from 'rxjs';
import { User, UserData } from '../../@core/interfaces/common/users';
import { tap } from 'rxjs/operators';
import { UserStore } from '../../@core/stores/user.store';
import { Injectable } from '@angular/core';
import { NbJSThemesRegistry, NbThemeService } from '@nebular/theme';

@Injectable()
export class InitUserService {
    constructor(protected userStore: UserStore,
        protected usersService: UserData,
        protected jsThemes: NbJSThemesRegistry,
        protected themeService: NbThemeService) { }

    initCurrentUser(id,role,email,firstname,lastname,mobile,is_email_verified,is_otp_verified): Observable<User> {
      return this.usersService.getCurrentUser()
            .pipe(tap((user: User) => {
                if (user) { 
                  user.id=id;
                  user.role=role;
                  user.email=email;
                  user.firstName=firstname;
                  user.lastName=lastname;
                  user.mobile=mobile;
                  user.is_email_verified=is_email_verified;
                  user.is_otp_verified = is_otp_verified;
                  this.userStore.setUser(user);

                  if (user.settings && user.settings.themeName) {
                    if (this.jsThemes.has(user.settings.themeName)
                      && !!this.jsThemes.get(user.settings.themeName).variables.initialized) {
                      this.themeService.changeTheme(user.settings.themeName);
                    }
                  }
                }
            }));
    }
}
