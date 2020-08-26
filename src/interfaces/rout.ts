import { ComponentType } from "react";

export interface IRoute {
  title: string;
  link: string;
  Component?: ComponentType;
}
