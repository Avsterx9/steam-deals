export interface IOwners {
  lower_bound: number;
  upper_bound: number;
}

export interface IPrice {
  final: number;
  initial: number;
  discount: number;
}

export interface IGame {
  steam_appid: number;
  name: string;
  index: number;
  ccu_yesterday: number;
  header_image: string;
  developers: string[];
  publishers: string[];
  positive: number;
  negative: number;
  positive_percent: number;
  owners: IOwners;
  price: IPrice;
  short_description: string;
  detailed_description: string;
  screenshots: string[];
}
