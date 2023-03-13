import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LogoutComponent} from "./component/authenticate/logout/logout.component";
import {MemeListComponent} from "./component/meme/list/meme-list.component";
import {MemeDetailComponent} from "./component/meme/detail/meme-detail.component";
import {SignUpComponent} from "./component/authenticate/sign-up/sign-up.component";
import {ForgotPasswordComponent} from "./component/authenticate/forgot-password/forgot-password.component";
import {NewPasswordComponent} from "./component/authenticate/new-password/new-password.component";
import {LoginGuard} from "./config/login-guard";
import {AnonymousGuard} from "./config/anonymous-guard";
import {PageNotFoundComponent} from "./handler/page-not-found/page-not-found.component";
import {NewMemeComponent} from "./component/meme/new-meme/new-meme.component";
import {ProfileSettingsComponent} from "./component/profile/settings/profile-settings.component";

const routes: Routes = [
  {path: '', component: MemeListComponent, title: 'Główna'},
  {path: 'pending', component: MemeListComponent, title: 'Oczekujące'},
  {path: 'user/:id', component: MemeListComponent, title: 'Memy użytkownika'},
  {path: 'tags/:id', component: MemeListComponent, title: 'Memy po tagu'},
  {path: 'meme/:id', component: MemeDetailComponent, title: 'Szczegóły mema'},
  {path: 'meme/random', component: MemeDetailComponent, title: 'Losowy memy'},
  {path: 'logout', component: LogoutComponent, title: 'Wyloguj się', canActivate: [LoginGuard]},
  {path: 'sign-up', component: SignUpComponent, title: 'Zarejestruj się', canActivate: [AnonymousGuard]},
  {path: 'forgot-password', component: ForgotPasswordComponent, title: 'Odzyskiwanie hasła', canActivate: [AnonymousGuard]},
  {path: 'new-password', component: NewPasswordComponent, title: 'Potwierdź nowe hasła', canActivate: [AnonymousGuard]},
  {path: 'new-meme', component: NewMemeComponent, title: 'Dodaj mema', canActivate: [LoginGuard]},
  {path: 'profile-settings', component: ProfileSettingsComponent, title: 'Ustawienia użytkownika', canActivate: [LoginGuard]},
  {path: '**', component: PageNotFoundComponent, title: 'Strona nie znaleziona'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
