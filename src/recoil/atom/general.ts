import { atom } from "recoil";

export const appState = atom({
  key: "currentPage",
  default: "Contracts",
});
