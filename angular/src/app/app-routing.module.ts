import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LogoutComponent} from "./component/authenticate/logout/logout.component";
import {MemeListComponent} from "./component/meme/list/meme-list.component";
import {MemeDetailComponent} from "./component/meme/detail/meme-detail.component";
import {SignUpComponent} from "./component/authenticate/sign-up/sign-up.component";

const routes: Routes = [
  {path: '', component: MemeListComponent, title: 'Główna'},
  {path: 'pending', component: MemeListComponent, title: 'Oczekujące'},
  {path: 'user/:id', component: MemeListComponent, title: 'Memy użytkownika'},
  {path: 'tags/:id', component: MemeListComponent, title: 'Memy po tagu'},
  {path: 'meme/:id', component: MemeDetailComponent, title: 'Szczegóły mema'},
  {path: 'meme/random', component: MemeDetailComponent, title: 'Losowy memy'},
  {path: 'logout', component: LogoutComponent, title: 'Wyloguj się'},
  {path: 'sign-up', component: SignUpComponent, title: 'Zarejestruj się'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
