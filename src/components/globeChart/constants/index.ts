import { ICity } from "../types";

const monterrey: [number, number] = [25.6802019, -100.315258];
const tokyo: [number, number] = [35.652832, 139.839478];
const newYork: [number, number] = [40.712776, -74.005974];
const benalmadena: [number, number] = [36.5987, -4.516];
const sydney: [number, number] = [-33.8688, 151.2093];
const kinshasa: [number, number] = [-4.4419, 15.2663];
const honolulu: [number, number] = [21.3069, -157.8583];

export const CITIES: ICity[] = [
  {
    name: "Monterrey",
    country: "Mexico",
    color: "rgba(0,125,200,0.5)",
    fixColor: "rgb(0,125,200)",
    latitude: monterrey[0],
    longitude: monterrey[1],
  },
  {
    name: "Tokyo",
    country: "Japan",
    color: "rgba(0,200,125,0.5)",
    fixColor: "rgb(0,200,125)",
    latitude: tokyo[0],
    longitude: tokyo[1],
  },
  {
    name: "New York",
    country: "USA",
    color: "rgba(200,0,125,0.5)",
    fixColor: "rgb(200,0,125)",
    latitude: newYork[0],
    longitude: newYork[1],
  },
  {
    name: "Benalmadena",
    country: "Spain",
    color: "rgba(125,0,200,0.5)",
    fixColor: "rgb(125,0,200)",
    latitude: benalmadena[0],
    longitude: benalmadena[1],
  },
  {
    name: "Sydney",
    country: "Australia",
    color: "rgba(125,200,0,0.5)",
    fixColor: "rgb(125,200,0)",
    latitude: sydney[0],
    longitude: sydney[1],
  },
  {
    name: "Kinshasa",
    country: "Congo",
    color: "rgba(0,0,0,0.5)",
    fixColor: "rgb(0,0,0)",
    latitude: kinshasa[0],
    longitude: kinshasa[1],
  },
  {
    name: "Honolulu",
    country: "USA",
    color: "rgba(125,125,125,0.5)",
    fixColor: "rgb(125,125,125)",
    latitude: honolulu[0],
    longitude: honolulu[1],
  },
];
