import {Component, OnInit} from "@angular/core";
import {GamesService} from "../services/games.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Observable, switchMap} from "rxjs";
import {IGame} from "../game-interfaces/game";
import {Location} from "@angular/common";
import {UtilService} from "../services/util.service";

@Component({
  selector: "app-game-details",
  templateUrl: "./game-details.component.html",
  styleUrls: ["./game-details.component.sass"],
})
export class GameDetailsComponent implements OnInit {
  gameDetails!: Observable<IGame>;

  constructor(
    public gamesService: GamesService,
    private route: ActivatedRoute,
    private location: Location,
    public utilService: UtilService
  ) {}

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
}
