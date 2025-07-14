import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { OrderService } from 'src/app/Service/Order.Service';

@Component({
   selector: 'app-login-dialog',
   templateUrl: './login-dialog.component.html',
   styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {
  
  constructor(private orderService:OrderService, public messageService: MessageService, private ref:DynamicDialogRef){}

   Logincomp : boolean = true;

   EnableSignUp(){
      this.Logincomp=false;
      this.clearInput();
   }
   EnableLogin(){
      this.Logincomp=true;
      this.clearInput();
   }

   //Login Binding
   email: string = ''; 
   password: string = '';
   Message:string='';
   
   //Register Binding
   username:string='';
   Remail: string = ''; 
   Rpassword: string = '';

   clearInput(){
    this.email='';
    this.password='';
    this.username='';
    this.Remail='';
    this.Rpassword='';
   }

  submitLoginForm() {
    if(this.email==='' || this.password === ''){
      this.messageService.add({ severity: 'error', summary: 'Invalid Details', detail: 'Please Enter Login Details',});
    }else{
    this.orderService.loginUser(this.email, this.password).subscribe(
        (response) => {
          if (response.success) {
            console.log('Login successful:', response.message);
            this.ref.close({ username: response.username, email: response.email });

          } else {
            this.messageService.add({ severity: 'error', summary: 'Invalid', detail: response.message,});
            console.error('Login failed:', response.message);
          }
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error ', detail: 'Server failed',});
          console.error('Login failed:', error);
        }
      );
  }
}
  
  submitRegisterForm() {
    if(this.Remail==='' || this.Rpassword === '' || this.username === ''){
      this.messageService.add({ severity: 'error', summary: 'Invalid Details', detail: 'Please Enter Details',});
    }else if(!this.Remail.includes('@gmail.com')){
      this.messageService.add({ severity: 'error', summary: 'Invalid Email', detail: 'Please Enter Valid Email',});
    }
    else{
    this.orderService.registerUser(this.username, this.Remail, this.Rpassword).subscribe(
        (response) => {
          if (response.success) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message,});
          console.log('Registration successful:', response);
          this.EnableLogin();
          }else {
            this.messageService.add({ severity: 'error', summary: 'Invalid', detail: response.message,});
            console.error('Registration failed:', response.message);
          }
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error ', detail: 'Server failed',});
          console.error('Registration failed:', error);
        }
      );
  }
}



}
