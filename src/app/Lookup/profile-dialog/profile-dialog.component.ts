import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.css'],
})
export class ProfileDialogComponent {

  constructor(private ref:DynamicDialogRef, public messageService: MessageService,private cookieService: CookieService){}

  Name: string = this.cookieService.get('Username');
  Email: string = this.cookieService.get('Email');
  Mobile: Number = 8975146604;

  enableName: boolean = true;
  enableEmail: boolean = true;
  enableMobile: boolean = true;
  enableSave: boolean = false;

  enableEdit(a: string) {
    if (a == 'Name') {
      this.enableName = false;
      this.enableSave = true;
    } else if (a == 'Email') {
      this.enableEmail = false;
      this.enableSave = true;
    } else {
      this.enableMobile = false;
      this.enableSave = true;
    }
  }

  Save(){
    this.ref.close();
    this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Profile Updated.',});
  }
  
}
