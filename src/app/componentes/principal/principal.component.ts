import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "../../servicios/auth.service";

@Component({
  selector: "app-principal",
  templateUrl: "./principal.component.html",
  styleUrls: ["./principal.component.css"],
})
export class PrincipalComponent implements OnInit {
  public status: any = {
    isFirstOpen: true,
    isFirstDisabled: false,
  };
  public isLoged$: BehaviorSubject<boolean>;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoged$ = this.authService.isLoged$;
  }
}
