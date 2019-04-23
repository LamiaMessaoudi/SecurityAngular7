import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AccueilComponent } from './accueil/accueil.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthGuardService} from './services/auth-guard.service';
import {AuthService} from './services/auth.service';
import {TokenStorageService} from './services/token-storage.service';
import {HttpClientModule} from '@angular/common/http';
import { ListUserComponent } from './admin/list-user/list-user.component';
import { AddUserComponent } from './admin/add-user/add-user.component';
import { ModifyUserComponent } from './admin/modify-user/modify-user.component';
import { DeleteUserComponent } from './admin/delete-user/delete-user.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { ChangeRoleComponent } from './admin/change-role/change-role.component';
import { ModalChangeRoleComponent } from './admin/modal-change-role/modal-change-role.component';
import { ProfilComponent } from './User/profil/profil.component';
import { SignatureComponent } from './User/signature/signature.component';
import { VerificationComponent } from './User/verification/verification.component';

const appRoutes: Routes = [
  {path: 'auth/signin' , component: SigninComponent},
  {path: 'auth/signup' , component: SignupComponent},
  {path: 'listUser/addUser' , component: AddUserComponent},
  {path: 'user/signature' , component: SignatureComponent},
  {path: 'user/verification' , component: VerificationComponent},

  {path: 'listUser' , component: ListUserComponent},
  {path: 'changeRole' , component:ChangeRoleComponent},
  {path: 'espaceUser' , component:ProfilComponent},


]
@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HeaderComponent,
    FooterComponent,
    AccueilComponent,
    ListUserComponent,
    AddUserComponent,
    ModifyUserComponent,
    DeleteUserComponent,
    ChangeRoleComponent,
    ModalChangeRoleComponent,
    ProfilComponent,
    SignatureComponent,
    VerificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ModalModule.forRoot()
  ],
  providers: [
    AuthGuardService,
    AuthService,
    TokenStorageService,
    BsModalService
  ],
  bootstrap: [AppComponent],
  entryComponents:[
    DeleteUserComponent,
    ModifyUserComponent,
    ModalChangeRoleComponent

  ]
})
export class AppModule { }
