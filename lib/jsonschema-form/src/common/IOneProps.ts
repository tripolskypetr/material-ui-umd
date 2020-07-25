
/// <reference path="./IField.ts"/>

namespace form {

  export interface IOneProps {
    handler: () => Promise<any> | Function | any;
    change: (object) => void;
    fields: IField[];
    LoadPlaceholder?: null | material.Element;
  }

} // namespace form
