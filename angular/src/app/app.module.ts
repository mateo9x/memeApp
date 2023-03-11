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
import {LogoutComponent} from "./component/authenticate/logout/logout.component";
import {ProfileNavComponent} from "./component/profile/profile-nav/profile-nav.component";
import {MemeListComponent} from "./component/meme/list/meme-list.component";
import {IconModule} from "./module/icon.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MemeComponent} from "./component/meme/meme.component";
import {TooltipModule} from "primeng/tooltip";
import {MemeDetailComponent} from "./component/meme/detail/meme-detail.component";

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    LogoutComponent,
    ProfileNavComponent,
    MemeListComponent,
    MemeComponent,
    MemeDetailComponent
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
    IconModule,
    FontAwesomeModule,
    TooltipModule
  ],
  providers: [MessageService, { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
