import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

import { Subscription } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { LoginPayload } from "../../clases/auth";
import { AuthService } from "../../servicios/auth.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  private subscription: Subscription;
  usuario = "";
  clave = "";
  progreso: number;
  progresoMensaje = "esperando...";
  logeando = true;
  ProgresoDeAncho: string;

  clase = "progress-bar progress-bar-info progress-bar-striped ";

  public form: FormGroup;
  public failedLogin: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
    this.progreso = 0;
    this.ProgresoDeAncho = "0%";
  }

  ngOnInit() {}

  public login() {
    const payload: LoginPayload = {
      email: this.form.get("email").value,
      password: this.form.get("password").value,
    };
    this.authService.loginEmailAndPassword(payload).then(
      (res) => {
        console.log(res);
        this.router.navigate(["/Principal"]);
      },
      (err) => {
        console.log(err);
        this.errorLogin();
      }
    );
  }

  public errorLogin() {
    this.form.controls["email"].setErrors({ incorrect: true });
    this.form.controls["password"].setErrors({ incorrect: true });
    this.failedLogin = true;
  }

  MoverBarraDeProgreso() {
    this.logeando = false;
    this.clase = "progress-bar progress-bar-danger progress-bar-striped active";
    this.progresoMensaje = "NSA spy...";
    let timer = TimerObservable.create(200, 50);
    this.subscription = timer.subscribe((t) => {
      console.log("inicio");
      this.progreso = this.progreso + 1;
      this.ProgresoDeAncho = this.progreso + 20 + "%";
      switch (this.progreso) {
        case 15:
          this.clase =
            "progress-bar progress-bar-warning progress-bar-striped active";
          this.progresoMensaje = "Verificando ADN...";
          break;
        case 30:
          this.clase =
            "progress-bar progress-bar-Info progress-bar-striped active";
          this.progresoMensaje = "Adjustando encriptación..";
          break;
        case 60:
          this.clase =
            "progress-bar progress-bar-success progress-bar-striped active";
          this.progresoMensaje = "Recompilando Info del dispositivo..";
          break;
        case 75:
          this.clase =
            "progress-bar progress-bar-success progress-bar-striped active";
          this.progresoMensaje = "Recompilando claves facebook, gmail, chats..";
          break;
        case 85:
          this.clase =
            "progress-bar progress-bar-success progress-bar-striped active";
          this.progresoMensaje = "Instalando KeyLogger..";
          break;

        case 100:
          console.log("final");
          this.subscription.unsubscribe();

          break;
      }
    });
    //this.logeando=true;
  }

  llenarLogin() {
    this.form.get("email").patchValue("thiago.corta@gmail.com");
    this.form.get("password").patchValue("123456");
  }
}
