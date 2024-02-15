export interface ICategory {
  id?: number;
  name: string;
  intial_duration?: string;
  intial_price?: number;
  then_duration?: string;
  then_price?: number;
  discount_duration?: string;
  discount_price?: number;
  isExcept:boolean;
  isSubscription:boolean;

}
