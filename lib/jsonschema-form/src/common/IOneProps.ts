
/// <reference path="./IField.ts"/>

namespace form {

  export interface IOneProps {
    handler: () => Promise<object> | object;
    change: (object) => void;
    fields: IField[];
    LoadPlaceholder?: null | material.Component;
  }

} // namespace form
