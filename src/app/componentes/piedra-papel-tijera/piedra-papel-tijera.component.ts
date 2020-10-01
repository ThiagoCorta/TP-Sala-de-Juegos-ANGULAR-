import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../servicios/auth.service";

@Component({
  selector: "app-piedra-papel-tijera",
  templateUrl: "./piedra-papel-tijera.component.html",
  styleUrls: ["./piedra-papel-tijera.component.css"],
})
export class PiedraPapelTijeraComponent {
  public userScore: number = 0;
  public compScore: number = 0;
  public userSelected: string;
  public compSelected: string;
  public action: string;
  public status: string;
  public compWeapons = ["piedra", "papel", "tijera"];

  constructor(private authService: AuthService) {}
  userPick(userWeapon: string): void {
    this.userSelected = userWeapon;
    console.log(this.userSelected);
    setTimeout(() => {
      const randomNum = Math.floor(Math.random() * 3);
      this.compSelected = this.compWeapons[randomNum];
      console.log(this.compSelected);
      this.checkResult();
    }, 1000);
  }

  clearField() {
    setTimeout(() => {
      this.status = "";
      this.userSelected = "";
      this.compSelected = "";
    }, 1500);
  }

  win(user, comp) {
    this.userScore++;
    this.userSelected = user;
    this.compSelected = comp;
    this.action = "le gana";
    this.status = ". Ganaste!";
    this.clearField();
    this.authService.gano();
  }

  lose(user, comp) {
    this.compScore++;
    this.userSelected = user;
    this.compSelected = comp;
    this.action = "Pierde Contra";
    this.status = ". Perdiste!";
    this.clearField();
    this.authService.perdio();
  }

  draw(user, comp) {
    this.userSelected = user;
    this.compSelected = comp;
    this.action = "y";
    this.status = ". Empatas!";
    this.clearField();
  }

  checkResult() {
    const userChoice = this.userSelected;
    const compChoice = this.compSelected;
    switch (userChoice + compChoice) {
      case "piedratijera":
      case "papelpiedra":
      case "tijerapapel":
        this.win(userChoice, compChoice);
        break;
      case "piedrapapel":
      case "tijerapiedra":
      case "papeltijera":
        this.lose(userChoice, compChoice);
        break;
      default:
        this.draw(userChoice, compChoice);
        break;
    }
  }
}
