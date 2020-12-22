namespace mobxApp {

  const {
    makeObservable,
    observable,
    computed,
    action,
  } = mobx;

  const {
    createKey,
  } = form;

  const {
    usePrompt,
  } = pickers;

  export namespace services {

    interface ICartItem {
      id?: string;
      title: string;
      price: number;
    }

    /**
     * Применять состояние mobx следует сразу, как только
     * появляются вычисляемые поля: попытка считать total
     * отдельно от содержимого корзины потенциально посадит
     * главного бухгалтера на бутылку
     * Single Responsibility
     */
    export class ItemService extends BaseService {

      count = 0;
      inc = () => this.count++;
      dec = () => this.count--;

      cartList: ICartItem[] = [];

      constructor() {
        super();
        makeObservable(this, {
          cartList: observable,
          count: observable,
          inc: action,
          dec: action,
          total: computed,
          addToCart: action,
          changeTitle: action,
          removeFromCart: action,
        });
        this.enableLogging(this);
      }

      addToCart(item: ICartItem) {
        this.cartList.push({
          id: item.id || createKey(),
          ...item,
        });
      }

      removeFromCart(itemId: string) {
        this.cartList = this.cartList
          .filter(({id}) => id !== itemId);
      }

      changeTitle(itemId: string, newTitle: string) {
        this.cartList.forEach((item) => {
          if (item.id === itemId) {
            item.title = newTitle;
          }
        })
      }

      get total() {
        return this.cartList
          .reduce((acm, cur) => acm + cur.price, 0);
      }

    } // class AuthService

  } // namespace services

} // namespace mobxApp
