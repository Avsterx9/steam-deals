import {Component, ElementRef, ViewChild} from "@angular/core";
import {GamesService} from "../services/games.service";
import {IGame} from "../game-interfaces/game";
import {UtilService} from "../services/util.service";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.sass"],
})
export class HomepageComponent {
  public games: IGame[] = [];
  bannerDisplayed = false;
  isRandomChecked: boolean = false;
  titleText: string = "";
  gameDisplayMode!: string;
  public gamesSearchList: IGame[] = [];

  // @ts-ignore
  @ViewChild("sugList") sugList: ElementRef;

  constructor(public gamesService: GamesService, public utilService: UtilService) {
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

  switchGames() {
    this.isRandomChecked = !this.isRandomChecked;

    if (this.isRandomChecked) {
      this.getRandomGames();
      return;
    }
    this.getTopGames();
  }

  onKeyUpEvent(event: any) {
    let searchPhrase = event.target.value;
    this.gamesService.getMatchingGames(searchPhrase).subscribe(
      (res: any) => {
        this.gamesSearchList = res;
        document.querySelector(".search-input")!.classList.add("active");
      },
      (err) => {
        console.log(err);
      }
    );
  }

  redirectToGameDetails(index: number) {
    window.location.href = `/${index}`;
  }
}
