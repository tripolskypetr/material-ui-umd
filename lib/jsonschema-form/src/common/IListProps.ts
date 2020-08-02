
/// <reference path="./IField.ts"/>

namespace form {

  type handlerParams = {
    order: -1 | 0 | 1,
    orderBy: string,
  };

  export interface IListProps {
    /**
     * Позволяет загружать данные в компонент
     */
    handler: (params?: handlerParams) => Promise<any> | Function | any;
    /**
     * Вызывается после клика по строке. Подразумевается
     * переход на страницу с обработчиком One, получающим
     * параметр id из адресной строки...
     */
    click: (object) => void;
    /**
     * Массив полей, выводимый в компоненте
     */
    fields: IField[];
    /**
     * Префикс для формирования ключей элементов
     */
    prefix?: string;
    /**
     * Плейсхолдер, показываемый во время загрузки данных
     */
    LoadPlaceholder?: null | material.Element;
    /**
     * Стиль таблицы (опционально)
     */
    style?: React.CSSProperties;
    /**
     * Класс таблицы (опционально)
     */
    className?: string;
  };

}
