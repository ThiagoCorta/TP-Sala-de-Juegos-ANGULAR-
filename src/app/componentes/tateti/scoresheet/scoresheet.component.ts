import { Component, OnInit } from "@angular/core";
import { TatetiService } from "../tateti.service";

@Component({
  selector: "app-scoresheet",
  templateUrl: "./scoresheet.component.html",
  styleUrls: ["./scoresheet.component.css"],
})
export class ScoresheetComponent implements OnInit {
  playerScores$ = this.scoreService.playerScores$;
  constructor(private scoreService: TatetiService) {}

  ngOnInit() {}
}
