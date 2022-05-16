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
  public games: IGame[] = [];
  bannerDisplayed = false;
  isRandomChecked: boolean = false;
  titleText: string = "";
  gameDisplayMode!: string;

  constructor(private gamesService: GamesService) {
    if (!localStorage.getItem("cookieBannerDisplayed")) this.bannerDisplayed = true;
    this.getTopGames();
  }

  hideCookieContainer() {
    localStorage.setItem("cookieBannerDisplayed", "true");
    this.bannerDisplayed = false;
  }

  getRandomGames() {
    this.titleText = "🎲 Check one of those Games!";
    this.gameDisplayMode = "Random";

    this.gamesService.getRandomGames(20).subscribe(
      (res: any) => {
        this.games = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getTopGames() {
    this.titleText = "🔥 Top Games in the last 2 weeks";
    this.gameDisplayMode = "Trending";

    this.gamesService.getTopGames(0, 20).subscribe(
      (res: any) => {
        this.games = res;
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

  switchGames() {
    this.isRandomChecked = !this.isRandomChecked;

    if (this.isRandomChecked) {
      this.getRandomGames();
      return;
    }
    this.getTopGames();
  }

  abbreviateNumber(num: number) {
    let SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

    let tier = (Math.log10(Math.abs(num)) / 3) | 0;
    if (tier == 0) return num;

    let suffix = SI_SYMBOL[tier];
    let scale = Math.pow(10, tier * 3);

    let scaled = num / scale;

    return scaled.toFixed(1) + suffix;
  }
}
