import { Component, OnDestroy, OnInit } from "@angular/core";
import { takeUntil, tap } from "rxjs/operators";
import { Jugador } from "../../clases/jugador";
import { Subject } from "rxjs";
import { AuthService } from "../../servicios/auth.service";
@Component({
  selector: "app-jugadores-listado",
  templateUrl: "./jugadores-listado.component.html",
  styleUrls: ["./jugadores-listado.component.css"],
})
export class JugadoresListadoComponent implements OnInit, OnDestroy {
  public jugadores: Jugador[] = [];
  protected ngUnsubscribe: Subject<any> = new Subject();
  constructor(private rankingService: AuthService) {}

  ngOnInit() {
    this.rankingService
      .getAllPlayers()
      .pipe(
        takeUntil(this.ngUnsubscribe),
        tap((jugadores) => console.log(jugadores))
      )
      .subscribe((jugadores) => (this.jugadores = jugadores));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
