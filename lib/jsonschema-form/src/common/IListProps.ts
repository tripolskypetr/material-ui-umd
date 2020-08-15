
/// <reference path="./IField.ts"/>
/// <reference path="./SelectionMode.ts"/>
/// <reference path="./IListHandlerInput.ts"/>
/// <reference path="./IListHandlerResult.ts"/>

namespace form {

  export interface IListProps {
    /**
     * Позволяет загружать данные в компонент
     */
    handler: (params?: IListHandlerInput) => Promise<IListHandlerResult> | IListHandlerResult;
    /**
     * Вызывается после клика по строке. Подразумевается
     * переход на страницу с обработчиком One, получающим
     * параметр id из адресной строки...
     */
    click: (object: any) => void;
    /**
     * Массив полей, выводимый в компоненте
     */
    fields: IField[];
    /**
     * Класс корневого элемента таблицы
     */
    className: string;
    /**
     * Возможность выбирать элементы. Доступны опции
     * single (radio-button), multiple (checkbox), none
     */
    selection: SelectionMode;
    /**
     * Коллбек, вызываемый после клика по элементу
     */
    select: (object: any[]) => void;
    /**
     * Коллбек, вызываемый для удаления элемента
     */
    delete: (object: any) => void;
    /**
     * Значения по-умолчанию для пагинации. Значение
     * total будет переопределяться исходя из доступности
     * соответствующего поля ответа
     */
    limit: number;
    offset: number;
    total: number;
  };

} // namespace form
