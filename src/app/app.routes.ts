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
import { AllUsersComponent } from './pages/Customer_Work/all-users/all-users.component';
import { UserBusComponent } from './pages/Company_Work/user-bus/user-bus.component';
import { UpdateBusComponent } from './pages/Company_Work/update-bus/update-bus.component';
import { PeopleBusServiceComponent } from './pages/people-bus-service/people-bus-service.component';
import { LocalBusComponent } from './pages/local-bus/local-bus.component';
import { BrtComponent } from './pages/brt/brt.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { YourVehicleBookingComponent } from './pages/Customer_Work/your-vehicle-booking/your-vehicle-booking.component';
import { VehicleInfoComponent } from './pages/vehicle-info/vehicle-info.component';
import { RechargeCardComponent } from './pages/recharge-card/recharge-card.component';
import { KarachiComponent } from './pages/karachi/karachi.component';
import { RentalInfoComponent } from './pages/rental-info/rental-info.component';
import { UserVehiclesComponent } from './pages/Company_Work/user-vehicles/user-vehicles.component';
import { UpdateVehiclesComponent } from './pages/Company_Work/update-vehicles/update-vehicles.component';
import { BusInfoComponent } from './pages/bus-info/bus-info.component';
import { IndividualBusComponent } from './pages/individual-bus/individual-bus.component';
import { TravellingHistoryComponent } from './pages/travelling-history/travelling-history.component';



export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path:'signup', component:SignupComponent},
    {path:'login', component:LoginComponent},
    {path:'customer', component:CustomerComponent},
    {path:'bus', component:BusComponent},
    {path: 'route/:busId/:userId', component:RouteComponent},
    {path: 'schedule/:busId/:busRouteId/:userId', component:BusScheduleComponent},
    {path: 'fare/:busId/:busRouteId/:userId', component:FareComponent},
    {path: 'fare-details/:busId/:userId', component:FareDetailsComponent},
    {path:'vehicle', component:VehicleComponent},
    {path:'firstView', component:FirstViewComponent},
    {path:'companyFirstView', component:CompanyFirstViewComponent},
    {path:'carBooking', component:CarBookingComponent},
    {path:'booking', component:BookingComponent},
    {path:'bus_booking', component:BusBookingComponent},
    {path:'transaction', component:TransactionComponent},
    {path:'home', component:HomeComponent},
    {path:'userBus', component:UserBusComponent},
    {path:'userVehicles', component:UserVehiclesComponent},
    {path:'updateBus', component:UpdateBusComponent},
    {path:'updateVehicles', component:UpdateVehiclesComponent},
    {path:'allUser', component:AllUsersComponent},
    {path:'peopleBus', component:PeopleBusServiceComponent},
    {path:'localBus', component:LocalBusComponent},
    {path:'brt', component:BrtComponent},
    {path:'about', component:AboutUsComponent},
    {path:'vehicleInfo', component:VehicleInfoComponent},
    {path:'cardRecharge', component:RechargeCardComponent},
    {path:'karachi', component:KarachiComponent},
    {path:'rentalInfo', component:RentalInfoComponent},
    {path:'busInfo', component:BusInfoComponent},
    {path:'indBusInfo', component:IndividualBusComponent},
    {path:'travellingHistory', component:TravellingHistoryComponent},
    {path:'booking-history', component:YourVehicleBookingComponent},
    { path: '**', redirectTo: 'home'}
];
