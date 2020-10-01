import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { User } from "firebase";
import * as firebase from "firebase/app";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { LoginPayload, ResgisterPayload } from "../clases/auth";
import { Jugador } from "../clases/jugador";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public userData: User;
  public isLoged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public userRankingData: Jugador;
  constructor(
    private authService: AngularFireAuth,
    private db: AngularFirestore
  ) {}

  public loginEmailAndPassword(payload: LoginPayload) {
    return new Promise((resolve, reject) => {
      this.authService
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          (res) => {
            this.userData = res.user;
            this.getConnectedUser();
            this.isLoged$.next(true);
            resolve(res);
          },
          (err) => {
            console.log(err);
            this.isLoged$.next(false);
            reject(err);
          }
        );
    });
  }

  doRegister(payload: ResgisterPayload) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }

  public getAllPlayers(): Observable<Jugador[]> {
    return this.db
      .collection("ranking")
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          return snaps.map((snap) => {
            return <Jugador>{
              id: snap.payload.doc.id,
              ...(snap.payload.doc.data() as any),
            };
          });
        })
      );
  }

  public getConnectedUser() {
    this.getAllPlayers().subscribe((data: Jugador[]) => {
      let user = data.find((users) => users.email === this.userData.email);
      if (user) {
        this.userRankingData = user;
      } else {
        this.createPlayer();
      }
    });
  }

  public gano() {
    this.userRankingData.gano++;
    this.updatePlayer();
  }

  public perdio() {
    this.userRankingData.perdio++;
    this.updatePlayer();
  }

  public updatePlayer() {
    this.db
      .collection("ranking")
      .doc(this.userRankingData.id)
      .set(this.userRankingData);
  }

  public createPlayer() {
    this.db.collection("ranking").doc(this.db.createId()).set({
      email: this.userData.email,
      gano: 0,
      perdio: 0,
    });
  }
}
