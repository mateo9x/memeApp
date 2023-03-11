import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LogoutComponent} from "./component/authenticate/logout/logout.component";
import {MemeListComponent} from "./component/meme/list/meme-list.component";

const routes: Routes = [
  { path: '', component: MemeListComponent, title: 'Główna' },
  { path: 'pending', component: MemeListComponent, title: 'Oczekujące' },
  { path: 'user/:id', component: MemeListComponent, title: 'Memy użytkownika' },
  { path: 'logout', component: LogoutComponent, title: 'Wyloguj się' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
