export interface IPokeData {
  name: string;
  types: string[];
  img: string;
  audio: string;
}

export interface IRawPokeData {
  name: string;
  sprites: {
    front_default: string;
  };
  cries: {
    latest: string;
    legacy: string;
  };
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
}
