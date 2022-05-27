import {Component, OnInit} from "@angular/core";
import {GamesService} from "../services/games.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Observable, switchMap} from "rxjs";
import {IGame} from "../game-interfaces/game";
import {UtilService} from "../services/util.service";

@Component({
  selector: "app-game-details",
  templateUrl: "./game-details.component.html",
  styleUrls: ["./game-details.component.sass"],
})
export class GameDetailsComponent implements OnInit {
  gameDetails!: Observable<IGame>;

  constructor(public gamesService: GamesService, private route: ActivatedRoute, public utilService: UtilService) {}

  ngOnInit() {
    this.gameDetails = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.gamesService.getGame(params.get("id")!))
    );
  }

  mouseLeave(game: IGame, positive: any, negative: any) {
    positive.style.width = `${this.gamesService.getOpinionPercent(game, this.gamesService.OpinionType.POSITIVE)}%`;
    negative.style.width = `${this.gamesService.getOpinionPercent(game, this.gamesService.OpinionType.NEGATIVE)}%`;
    negative.children[0].style.visibility = "hidden";
    negative.children[0].style.opacity = 0;
  }

  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
}
