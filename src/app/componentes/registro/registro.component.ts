import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ResgisterPayload } from "src/app/clases/auth";
import { AuthService } from "../../servicios/auth.service";
//para poder hacer las validaciones
//import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"],
})
export class RegistroComponent implements OnInit {
  /* constructor( private miConstructor:FormBuilder) { }
  email=new FormControl('',[Validators.email]);
  formRegistro:FormGroup=this.miConstructor.group({
    usuario:this.email
  });*/
  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  ngOnInit() {}

  tryRegister() {
    const payload: ResgisterPayload = {
      email: this.form.get("email").value,
      password: this.form.get("password").value,
    };
    console.log(payload);
    this.authService.doRegister(payload).then(
      (res) => {
        console.log(res);
        this.router.navigate(["/"]);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
