
/// <reference path="./ICord.ts"/>

namespace mark {

  export interface IState {
    files: IFile[];
    cordsList: Map<string, ICord>;
    current: number;
  };

}
