export interface Theme {
  isDark: boolean;
  backgroundLight: string;
  backgroundDark: string;
  fontColor: string;
  primaryColor: string;
}

export class LightTheme implements Theme {
  isDark: boolean = false;
  backgroundDark: string = "rgb(224, 224, 224)";
  backgroundLight: string = "rgb(255, 255, 255)";
  fontColor: string = "rgb(0, 0, 0)";
  primaryColor: string = "rgb(60, 0, 225)";
}

export class DarkTheme implements Theme {
  isDark: boolean = true;
  backgroundDark: string = "rgb(26, 26, 26)";
  backgroundLight: string = "rgb(31, 31, 31)";
  fontColor: string = "rgb(231, 231, 231)";
  primaryColor: string = "rgb(60, 0, 225)";
}
