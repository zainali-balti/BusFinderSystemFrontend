import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { CustomerComponent } from './pages/Customer_Work/customer/customer.component';
import { BusComponent } from './pages/Company_Work/bus/bus.component';
import { VehicleComponent } from './pages/Company_Work/vehicle/vehicle.component';
import { RouteComponent } from './pages/Company_Work/route/route.component';
import { BusScheduleComponent } from './pages/Company_Work/bus-schedule/bus-schedule.component';
import { FareComponent } from './pages/Company_Work/fare/fare.component';
import { BusBookingComponent } from './pages/Customer_Work/bus-booking/bus-booking.component';
import { TransactionComponent } from './pages/Customer_Work/transaction/transaction.component';
import { FareDetailsComponent } from './pages/Company_Work/fare-details/fare-details.component';
import { BookingComponent } from './pages/Customer_Work/booking/booking.component';
import { FirstViewComponent } from './pages/Customer_Work/first-view/first-view.component';
import { CarBookingComponent } from './pages/Customer_Work/car-booking/car-booking.component';
import { CompanyFirstViewComponent } from './pages/Customer_Work/company-first-view/company-first-view.component';
import { HomeComponent } from './pages/home/home.component';



export const routes: Routes = [
    {path:'signup', component:SignupComponent},
    {path:'login', component:LoginComponent},
    {path:'customer', component:CustomerComponent},
    {path:'bus', component:BusComponent},
    {path: 'route/:busId', component:RouteComponent},
    {path: 'schedule/:busId/:busRouteId', component:BusScheduleComponent},
    {path: 'fare/:busId/:busRouteId', component:FareComponent},
    {path: 'fare-details/:busId', component:FareDetailsComponent},
    {path:'vehicle', component:VehicleComponent},
    {path:'firstView', component:FirstViewComponent},
    {path:'companyFirstView', component:CompanyFirstViewComponent},
    {path:'carBooking', component:CarBookingComponent},
    {path:'booking', component:BookingComponent},
    {path:'bus_booking', component:BusBookingComponent},
    {path:'transaction', component:TransactionComponent},
    {path:'home', component:HomeComponent},
    { path: '**', redirectTo: 'login' }
];
