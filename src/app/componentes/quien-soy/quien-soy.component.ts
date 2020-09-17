import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-quien-soy",
  templateUrl: "./quien-soy.component.html",
  styleUrls: ["./quien-soy.component.css"],
})
export class QuienSoyComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  navigateGithub() {
    window.open("https://github.com/thiagocorta", "_blank");
  }
}
