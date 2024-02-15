import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { ChangepasswordComponent } from './pages/changepassword/changepassword.component';
import { ShiftComponent } from './pages/shift/shift.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { AddShiftComponent } from './pages/shift/add-shift/add-shift.component';
import { DayShiftComponent } from './pages/shift/day-shift/day-shift.component';
 import { AuthGuard } from './guard/auth.guard';
import { LostcardComponent } from './pages/lostcard/lostcard.component';
import { OffersComponent } from './pages/offers/offers.component';
import { GateComponent } from './pages/gate/gate.component';
import { CardComponent } from './pages/card/card.component';
import { CategoryComponent } from './pages/category/category.component';
export const routes: Routes = [
    {path:"",component:MainComponent,canActivate:[AuthGuard] },
    {path:"login",component:LoginComponent},
    {path:"changePassword",component:ChangepasswordComponent,canActivate:[AuthGuard]},
    {path:"adduser",component:AddUserComponent,canActivate:[AuthGuard]},

    {path:"shift",component:ShiftComponent,canActivate:[AuthGuard]},
    {path:"day-shift",component:DayShiftComponent,canActivate:[AuthGuard]},
    {path:"add-shift",component:AddShiftComponent,canActivate:[AuthGuard]},

    {path:"lost-card",component:LostcardComponent,canActivate:[AuthGuard]},
    {path:"offer",component:OffersComponent,canActivate:[AuthGuard]},

    
    {path:"gate",component:GateComponent,canActivate:[AuthGuard]},
    
    {path:"card",component:CardComponent,canActivate:[AuthGuard]},
    
    {path:"category",component:CategoryComponent,canActivate:[AuthGuard]},
    

];

 