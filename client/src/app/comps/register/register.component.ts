import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public fb: FormBuilder,
    public authService: AuthService,
    public r: Router) { }


  public firstForm: FormGroup
  public secondForm: FormGroup

  public formPaginator: boolean = true
  public cities = ['Jerusalem', 'Tel-Aviv', 'Petach-Tikva', 'Beer-Sheeva', 'Ashdod', 'Rishon Lezion', 'Natanya', 'Ramat-Gan', 'Bnei-Brak', 'Givatim']

  ngOnInit(): void {
    this.formPaginator = true
    this.firstForm = this.fb.group({
      idUser: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      confirmedPassword: ["", Validators.required],
    })

    this.secondForm = this.fb.group({
      name: ["", Validators.required],
      lastName: ["", Validators.required],
      city: ["", Validators.required],
      street: ["", Validators.required],
    })



  }

  public errorDisplay;

  public formValidation() {

    const { idUser, email, password, confirmedPassword } = this.firstForm.value
    if (idUser && email && password && confirmedPassword && password === confirmedPassword) {

      this.authService.register_first({ idUser, email, password }).subscribe(
        (res: any) => {

          this.formPaginator = false

        }, err => {
          console.log(err.error, 'from err')
          this.handleTheError(err.error.msg)



        }
      )



    }
    else if (password != confirmedPassword) {
      this.handleTheError(`Password does not match!`)
    }
    else {
      this.handleTheError(`Something is missing`)
    }

  }
  public displayTheError = false
  public handleTheError(txt) {
    // this.formPaginator = true
    this.displayTheError = true
    this.errorDisplay = txt

    setTimeout(() => {
      this.displayTheError = false
    }, 3000);

  }

  public handleSubmit() {
    let body = { ...this.firstForm.value, ...this.secondForm.value }
    console.log(body)
    this.authService.register_sec(body).subscribe(
      (res: any) => {

        this.r.navigateByUrl('/login')
      },
      err => {
        console.log(err)
        this.handleTheError(err.error.msg)
      })
  }




}
