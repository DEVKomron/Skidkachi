export class CreateReviewDto {
    discountId: number;
    userId: number;
    text: string;
    rating: number;
    photo?: string ;
}
