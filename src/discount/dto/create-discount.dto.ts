export class CreateDiscountDto {
    storeId : number;
    title:string;
    description:string;
    discount_percent:number;
    start_date : string;
    end_date:string;
    categoryId:number;
    discount_value:number;
    special_link:string;
    is_active:boolean;
    discountTypeId:number
}
