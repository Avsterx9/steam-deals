import {Component} from "@angular/core";
import {GamesService} from "../services/games.service";
import {IGame} from "../game-interfaces/game";

enum OpinionType {
  POSITIVE,
  NEGATIVE,
}

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.sass"],
})
export class HomepageComponent {
  OpinionType = OpinionType;
  public randomGames: IGame[] = [];
  bannerDisplayed: boolean = false;


  constructor(private gamesService: GamesService) {
    if (!localStorage.getItem("cookieBannerDisplayed")) this.bannerDisplayed = true;
    this.getRandomGames();
  }

   hideCookieContainer() {
    localStorage.setItem("cookieBannerDisplayed", "true");
    this.bannerDisplayed = false;
  }

  getRandomGames() {
    this.gamesService.getRandomGames(10).subscribe(
      (res: any) => {
        this.randomGames = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getOpinionPercent(game: IGame, opinionType: OpinionType) {
    if (opinionType == OpinionType.NEGATIVE) {
      return ((game.negative / (game.positive + game.negative)) * 100).toFixed(2);
    }
    return ((game.positive / (game.positive + game.negative)) * 100).toFixed(2);
  }

  mouseEnter(div: any) {
    div.style.width = "100%";
    div.children[0].style.display = "block";
  }

  mouseLeave(game: IGame, positive: any, negative: any) {
    positive.style.width = `${this.getOpinionPercent(game, OpinionType.POSITIVE)}%`;
    positive.children[0].style.display = "none";
    negative.style.width = `${this.getOpinionPercent(game, OpinionType.NEGATIVE)}%`;
    negative.children[0].style.display = "none";
  }
}
