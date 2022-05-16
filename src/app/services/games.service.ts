import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {IGame} from "../game-interfaces/game";
import {Observable} from "rxjs";

enum OpinionType {
  POSITIVE = 0,
  NEGATIVE = 1,
}

@Injectable({
  providedIn: "root",
})
export class GamesService {
  private backendURL: string = environment.backendURL + "/apps";
  OpinionType = OpinionType;

  constructor(private http: HttpClient) {}

  public getRandomGames(amount: number) {
    let params = new HttpParams().set("amount", amount).set("detailed", false);

    return this.http.get(this.backendURL + "/top100in2weeks/random", {withCredentials: true, params});
  }

  public getTopGames(skipAmount: number, amount: number) {
    let params = new HttpParams().set("skip", skipAmount).set("amount", amount);

    return this.http.get(this.backendURL + "/top100in2weeks", {withCredentials: true, params});
  }

  public getGame(id: string): Observable<IGame> {
    return this.http.get<IGame>(this.backendURL + "/id/" + id);
  }

  getOpinionPercent(game: IGame, opinionType: OpinionType) {
    if (opinionType == OpinionType.NEGATIVE) {
      return ((game.negative / (game.positive + game.negative)) * 100).toFixed(2);
    }
    return ((game.positive / (game.positive + game.negative)) * 100).toFixed(2);
  }

  mouseEnter(div: any) {
    div.style.width = "100%";
    div.children[0].style.visibility = "visible";
    div.children[0].style.opacity = 1;
  }

  mouseLeave(game: IGame, positive: any, negative: any) {
    positive.style.width = `${this.getOpinionPercent(game, OpinionType.POSITIVE)}%`;
    positive.children[0].style.visibility = "hidden";
    positive.children[0].style.opacity = 0;
    negative.style.width = `${this.getOpinionPercent(game, OpinionType.NEGATIVE)}%`;
    negative.children[0].style.visibility = "hidden";
    negative.children[0].style.opacity = 0;
  }
}
