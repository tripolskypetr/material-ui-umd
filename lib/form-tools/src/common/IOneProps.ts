
/// <reference path="./IField.ts"/>

namespace form {

  export interface IOneProps<Field = IField> {
    /**
     * Позволяет загружать данные в компонент
     */
    handler?: any | (Promise<any>);
    /**
     * Вызывается при ошибке в handler
     */
    fallback?: (e: Error) => void;
    /**
     * Вызываются при фокусировки по филду
     * в компоненте и потере фокуса
     */
    focus?: () => void;
    blur?: () => void;
    /**
     * Вызывается, когда все поля успели отрисоваться
     * в первый раз, после появления формы
     */
    ready?: () => void;
    /**
     * Вызывается после изменения и передает измененный
     * объект прикладному программисту
     */
    change?: (object: any, initial?: boolean) => void;
    /**
     * Массив полей, выводимый в компоненте
     */
    fields: Field[];
    /**
     * Префикс для формирования ключей элементов
     */
    prefix?: string;
    /**
     * Плейсхолдер, показываемый во время загрузки данных
     */
    LoadPlaceholder?: null | material.Element;
  }

} // namespace form
