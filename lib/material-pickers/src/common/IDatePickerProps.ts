namespace pickers {

  export interface IDatePickerProps {
    DateTimeFormat?: (...args: any[]) => any;
    animation?: (...args: any[]) => any;
    autoOk?: boolean;
    cancelLabel?: React.ReactNode;
    container?: 'dialog' | 'inline';
    containerStyle?: any;
    disableYearSelection?: boolean;
    firstDayOfWeek?: number;
    hideCalendarDate?: boolean;
    initialDate?: any;
    locale?: string;
    maxDate?: any;
    minDate?: any;
    mode?: 'portrait' | 'landscape';
    okLabel?: React.ReactNode;
    onAccept?: (...args: any[]) => any;
    onDismiss?: (...args: any[]) => any;
    onShow?: (...args: any[]) => any;
    open?: boolean;
    openToYearSelection?: boolean;
    shouldDisableDate?: (...args: any[]) => any;
    style?: any;
    utils?: any;
  };

} // namespace pickers
