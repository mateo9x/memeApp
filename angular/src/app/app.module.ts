import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppInterceptor} from "./config/app.interceptor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SignInComponent} from "./component/authenticate/sign-in/sign-in.component";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {CheckboxModule} from "primeng/checkbox";
import {MegaMenuModule} from "primeng/megamenu";
import {MenubarModule} from "primeng/menubar";
import {LogoutComponent} from "./component/authenticate/logout/logout.component";
import {ProfileNavComponent} from "./component/profile/profile-nav/profile-nav.component";
import {MemePendingListComponent} from "./component/meme/list/pending/meme-pending-list.component";
import {MemeApprovedListComponent} from "./component/meme/list/approved/meme-approved-list.component";

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    LogoutComponent,
    ProfileNavComponent,
    MemeApprovedListComponent,
    MemePendingListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    CheckboxModule,
    MegaMenuModule,
    MenubarModule
  ],
  providers: [MessageService, { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
