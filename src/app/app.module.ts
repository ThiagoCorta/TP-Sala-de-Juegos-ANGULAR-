import { AgmCoreModule } from "@agm/core";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppComponent } from "./app.component";
import { AdivinaElNumeroComponent } from "./componentes/adivina-el-numero/adivina-el-numero.component";
import { AdivinaMasListadoComponent } from "./componentes/adivina-mas-listado/adivina-mas-listado.component";
import { AgilidadAritmeticaComponent } from "./componentes/agilidad-aritmetica/agilidad-aritmetica.component";
import { AgilidadMasListadoComponent } from "./componentes/agilidad-mas-listado/agilidad-mas-listado.component";
import { AnagramaComponent } from "./componentes/anagrama/anagrama.component";
import { CabeceraComponent } from "./componentes/cabecera/cabecera.component";
import { ErrorComponent } from "./componentes/error/error.component";
import { GamepongComponent } from "./componentes/gamepong/gamepong.component";
import { InputJugadoresComponent } from "./componentes/input-jugadores/input-jugadores.component";
import { JuegosComponent } from "./componentes/juegos/juegos.component";
import { JugadoresListadoComponent } from "./componentes/jugadores-listado/jugadores-listado.component";
import { ListadoDePaisesComponent } from "./componentes/listado-de-paises/listado-de-paises.component";
import { ListadoDeResultadosComponent } from "./componentes/listado-de-resultados/listado-de-resultados.component";
import { ListadoComponent } from "./componentes/listado/listado.component";
import { ListadosComponent } from "./componentes/listados/listados.component";
import { LoginComponent } from "./componentes/login/login.component";
import { MapaDeGoogleComponent } from "./componentes/mapa-de-google/mapa-de-google.component";
import { MenuCardComponent } from "./componentes/menu-card/menu-card.component";
import { MenuComponent } from "./componentes/menu/menu.component";
import { PiedraPapelTijeraComponent } from "./componentes/piedra-papel-tijera/piedra-papel-tijera.component";
import { PrincipalComponent } from "./componentes/principal/principal.component";
import { QuienSoyComponent } from "./componentes/quien-soy/quien-soy.component";
import { RegistroComponent } from "./componentes/registro/registro.component";
import { ScoresheetComponent } from "./componentes/tateti/scoresheet/scoresheet.component";
import { SquareComponent } from "./componentes/tateti/square/square.component";
import { TatetiComponent } from "./componentes/tateti/tateti.component";
import { SexoPipe } from "./pipes/sexo.pipe";
import { RuteandoModule } from "./ruteando/ruteando.module";
import { ArchivosJugadoresService } from "./servicios/archivos-jugadores.service";
import { AuthService } from "./servicios/auth.service";
import { JuegoServiceService } from "./servicios/juego-service.service";
import { JugadoresService } from "./servicios/jugadores.service";
import { MiHttpService } from "./servicios/mi-http/mi-http.service";
import { PaisesService } from "./servicios/paises.service";

const firebaseConfig = {
  apiKey: "AIzaSyB9AF796m5yv-WrN6Ygxc2ZXx_Vld4UcS4",
  authDomain: "sala-de-juegos-efa73.firebaseapp.com",
  databaseURL: "https://sala-de-juegos-efa73.firebaseio.com",
  projectId: "sala-de-juegos-efa73",
  storageBucket: "sala-de-juegos-efa73.appspot.com",
  messagingSenderId: "1066707355402",
  appId: "1:1066707355402:web:db2eb7e471ea924f131cf3",
  measurementId: "G-CKEGX5FG30",
};
@NgModule({
  declarations: [
    AppComponent,
    AdivinaElNumeroComponent,
    ListadoDeResultadosComponent,
    ErrorComponent,
    PrincipalComponent,
    LoginComponent,
    AgilidadAritmeticaComponent,
    MenuComponent,
    AdivinaMasListadoComponent,
    AgilidadMasListadoComponent,
    ListadoComponent,
    ListadosComponent,
    JuegosComponent,
    RegistroComponent,
    MenuCardComponent,
    CabeceraComponent,
    QuienSoyComponent,
    AnagramaComponent,
    ListadoDePaisesComponent,
    MapaDeGoogleComponent,
    JugadoresListadoComponent,
    InputJugadoresComponent,
    SexoPipe,
    PiedraPapelTijeraComponent,
    TatetiComponent,
    SquareComponent,
    ScoresheetComponent,
    GamepongComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RuteandoModule,
    HttpModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyB6f8x4IjRlesQ3oETc6BXYQHVRTOlY3Ys",
    }),
    NgbModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
  ],
  providers: [
    JuegoServiceService,
    MiHttpService,
    PaisesService,
    ArchivosJugadoresService,
    JugadoresService,
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
