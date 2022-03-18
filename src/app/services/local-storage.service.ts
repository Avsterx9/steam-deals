import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  constructor() {}

  update(name: string, data: any): void {
    localStorage.setItem(name, JSON.stringify(data));
  }

  getAndParse(name: string): any {
    return JSON.parse(localStorage.getItem(name) as string);
  }
}
