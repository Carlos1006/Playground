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
    color: "rgb(4, 82, 85)",
    fixColor: "rgb(17, 159, 248)",
    latitude: monterrey[0],
    longitude: monterrey[1],
    value: 10,
  },
  {
    name: "Tokyo",
    country: "Japan",
    color: "rgb(7, 73, 23)",
    fixColor: "rgb(0,200,125)",
    latitude: tokyo[0],
    longitude: tokyo[1],
    value: 15,
  },
  {
    name: "New York",
    country: "USA",
    color: "rgb(107, 8, 94)",
    fixColor: "rgb(200,0,125)",
    latitude: newYork[0],
    longitude: newYork[1],
    value: 5,
  },
  {
    name: "Benalmadena",
    country: "Spain",
    color: "rgba(36, 5, 107, 0.83)",
    fixColor: "rgb(156, 13, 238)",
    latitude: benalmadena[0],
    longitude: benalmadena[1],
    value: 8,
  },
  {
    name: "Sydney",
    country: "Australia",
    color: "rgb(83, 32, 2)",
    fixColor: "rgb(250, 147, 12)",
    latitude: sydney[0],
    longitude: sydney[1],
    value: 12,
  },
  {
    name: "Kinshasa",
    country: "Congo",
    color: "rgb(36, 36, 36)",
    fixColor: "rgb(83, 83, 83)",
    latitude: kinshasa[0],
    longitude: kinshasa[1],
    value: 2,
  },
  {
    name: "Honolulu",
    country: "USA",
    color: "rgb(50, 75, 10)",
    fixColor: "rgb(134, 255, 22)",
    latitude: honolulu[0],
    longitude: honolulu[1],
    value: 2,
  },
];
