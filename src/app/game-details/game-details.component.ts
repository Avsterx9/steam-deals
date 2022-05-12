import {Component, OnInit} from "@angular/core";
import {GamesService} from "../services/games.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Observable, switchMap} from "rxjs";
import {IGame} from "../game-interfaces/game";
import {Location} from "@angular/common";

@Component({
  selector: "app-game-details",
  templateUrl: "./game-details.component.html",
  styleUrls: ["./game-details.component.sass"],
})
export class GameDetailsComponent implements OnInit {
  gameDetails!: Observable<IGame>;

  constructor(private http: GamesService, private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    this.gameDetails = this.route.paramMap.pipe(switchMap((params: ParamMap) => this.http.getGame(params.get("id")!)));
  }

  goToGames() {
    this.location.back();
  }
}
