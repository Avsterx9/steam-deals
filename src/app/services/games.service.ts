import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class GamesService {
  private backendURL: string = environment.backendURL;

  constructor(private http: HttpClient) {}

  public getRandomGames(amount: number, detailed: boolean) {
    let params = new HttpParams().set("amount", amount).set("detailed", detailed);

    return this.http.get(this.backendURL + "/top100in2weeks/random", {withCredentials: true, params});
  }
}
