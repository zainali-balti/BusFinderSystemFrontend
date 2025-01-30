import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { CustomerComponent } from './pages/Customer_Work/customer/customer.component';
import { BusComponent } from './pages/Company_Work/bus/bus.component';
import { VehicleComponent } from './pages/Company_Work/vehicle/vehicle.component';
import { BusStopComponent } from './pages/Company_Work/bus-stop/bus-stop.component';
import { RouteComponent } from './pages/Company_Work/route/route.component';
import { BusScheduleComponent } from './pages/Company_Work/bus-schedule/bus-schedule.component';
import { FareComponent } from './pages/Company_Work/fare/fare.component';



export const routes: Routes = [
    {path:'signup', component:SignupComponent},
    {path:'login', component:LoginComponent},
    {path:'customer', component:CustomerComponent},
    {path:'bus', component:BusComponent},
    {path: 'bus-stop/:busId', component: BusStopComponent},
    {path: 'route/:busId/:stopId', component:RouteComponent},
    {path: 'schedule/:busId/:stopId/:routeId', component:BusScheduleComponent},
    {path: 'fare/:busId/:stopId/:routeId', component:FareComponent},
    {path:'vehicle', component:VehicleComponent},
    { path: '**', redirectTo: 'login' }
];
