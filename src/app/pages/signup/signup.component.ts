import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signup',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  
  constructor(private userService:UserService, private router:Router){}
    public users = {
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    phoneNo: '',
    role:''
  };

  submit(){
    return this.userService.addUsers(this.users).subscribe((data)=>{
      console.log(data)
        Swal.fire({
                          title: 'Success!',
                          text: 'successfully Signup.',
                          icon: 'success',
                          confirmButtonText: 'OK'
                        }).then(() => {
                        this.router.navigate(['login']);
                        });
      
    }
  
    );
  }
}
