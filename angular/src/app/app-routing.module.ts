import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignInComponent} from "./component/authenticate/sign-in/sign-in.component";
import {LogoutComponent} from "./component/authenticate/logout/logout.component";
import {MemePendingListComponent} from "./component/meme/list/pending/meme-pending-list.component";
import {MemeApprovedListComponent} from "./component/meme/list/approved/meme-approved-list.component";

const routes: Routes = [
  { path: '', component: MemeApprovedListComponent, title: 'Główna' },
  { path: 'pending', component: MemePendingListComponent, title: 'Oczekujące' },
  { path: 'logout', component: LogoutComponent, title: 'Wyloguj się' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
