import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private auth: AuthService) {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('')
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    if ( this.registerForm.valid ) {
      const { username, password, email, phone } = this.registerForm.value

      this.auth.registerUser(username, password, email, phone).then(res => {
        console.log('great success')
        // redirect to verify page
      })
      .catch(err => {
        console.log('u succ')
      })
    }

  }

}
