
/// <reference path="./dist/form-tools.d.ts"/>
/// <reference path="./dist/router-tools.d.ts"/>

declare module "one" {
  type formNamespace = typeof globalThis.form;
  type routerNamespace = typeof globalThis.router;
  export const form: formNamespace;
  export const router: routerNamespace;
}
