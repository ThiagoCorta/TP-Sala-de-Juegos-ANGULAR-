import { NgModule } from "@angular/core";
// importo del module principal
import { RouterModule } from "@angular/router";
import { AdivinaElNumeroComponent } from "../componentes/adivina-el-numero/adivina-el-numero.component";
import { AdivinaMasListadoComponent } from "../componentes/adivina-mas-listado/adivina-mas-listado.component";
import { AgilidadAritmeticaComponent } from "../componentes/agilidad-aritmetica/agilidad-aritmetica.component";
import { AgilidadMasListadoComponent } from "../componentes/agilidad-mas-listado/agilidad-mas-listado.component";
import { ErrorComponent } from "../componentes/error/error.component";
import { JuegosComponent } from "../componentes/juegos/juegos.component";
import { JugadoresListadoComponent } from "../componentes/jugadores-listado/jugadores-listado.component";
import { ListadoDePaisesComponent } from "../componentes/listado-de-paises/listado-de-paises.component";
import { ListadoComponent } from "../componentes/listado/listado.component";
import { LoginComponent } from "../componentes/login/login.component";
import { MapaDeGoogleComponent } from "../componentes/mapa-de-google/mapa-de-google.component";
import { MenuCardComponent } from "../componentes/menu-card/menu-card.component";
import { PiedraPapelTijeraComponent } from "../componentes/piedra-papel-tijera/piedra-papel-tijera.component";
import { PrincipalComponent } from "../componentes/principal/principal.component";
import { QuienSoyComponent } from "../componentes/quien-soy/quien-soy.component";
import { RegistroComponent } from "../componentes/registro/registro.component";
import { TatetiComponent } from "../componentes/tateti/tateti.component";

// declaro donde quiero que se dirija
const MiRuteo = [
  { path: "Jugadores", component: JugadoresListadoComponent },
  { path: "", component: PrincipalComponent },
  { path: "Login", component: LoginComponent },
  { path: "Mapa", component: MapaDeGoogleComponent },
  { path: "QuienSoy", component: QuienSoyComponent },
  { path: "Registro", component: RegistroComponent },
  { path: "Principal", component: PrincipalComponent },
  { path: "Listado", component: ListadoComponent },
  { path: "Paises", component: ListadoDePaisesComponent },

  {
    path: "Juegos",
    component: JuegosComponent,
    children: [
      { path: "", component: MenuCardComponent },
      { path: "Adivina", component: AdivinaElNumeroComponent },
      { path: "AdivinaMasListado", component: AdivinaMasListadoComponent },
      { path: "AgilidadaMasListado", component: AgilidadMasListadoComponent },
      { path: "Agilidad", component: AgilidadAritmeticaComponent },
      { path: "PPT", component: PiedraPapelTijeraComponent },
      { path: "Tateti", component: TatetiComponent },
    ],
  },
  { path: "**", component: ErrorComponent },
  { path: "error", component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(MiRuteo)],
  exports: [RouterModule],
})
export class RuteandoModule {}
