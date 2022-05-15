import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UtilService {
  constructor() {}

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
