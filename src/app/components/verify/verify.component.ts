import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent {

  verifyForm: FormGroup;

  constructor(private auth: AuthService) {
    this.verifyForm = new FormGroup({
      code: new FormControl('', Validators.required)
    })
  }

}
