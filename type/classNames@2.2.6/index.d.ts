
interface ClassArray extends Array<ClassValue> { }

interface ClassDictionary {
  [id: string]: any;
}

type ClassValue = string | number | ClassDictionary | ClassArray | undefined | null | boolean;
  
declare function classNames(...classes: ClassValue[]): string;
