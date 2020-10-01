import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "firebase";
import * as firebase from "firebase/app";
import { BehaviorSubject } from "rxjs";
import { LoginPayload, ResgisterPayload } from "../clases/auth";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public userData: User;
  public isLoged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor(public authService: AngularFireAuth) {}

  public loginEmailAndPassword(payload: LoginPayload) {
    return new Promise((resolve, reject) => {
      this.authService
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          (res) => {
            this.userData = res.user;
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
}
