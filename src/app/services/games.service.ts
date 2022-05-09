import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {IGame} from "../game-interfaces/game";
@Injectable({
  providedIn: "root",
})
export class GamesService {
  private backendURL: string = environment.backendURL + "/apps";

  constructor(private http: HttpClient) {}

  public getRandomGames(amount: number) {
    let params = new HttpParams().set("amount", amount).set("detailed", false);

    return this.http.get(this.backendURL + "/top100in2weeks/random", {withCredentials: true, params});
  }

  public getTopGames(skipAmount: number, amount: number) {
    let params = new HttpParams().set("skip", skipAmount).set("amount", amount);

    return this.http.get(this.backendURL + "/top100in2weeks", {withCredentials: true, params});
  }
}
