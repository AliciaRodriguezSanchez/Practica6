import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { NewuserComponent } from './pages/newuser/newuser.component';
import { OutOfServiceComponent } from './pages/out-of-service/out-of-service.component';
import { Error404Component } from './pages/error404/error404.component';

export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: 'home' },
    { path: "home", component: HomeComponent },
    { path: "user/:id", component: UserComponent },
    { path: "newuser", component: NewuserComponent },
    { path: "updateuser/:id", component: NewuserComponent },
    { path: "outofservices", component: OutOfServiceComponent },
    { path: "**", component: Error404Component }
];
