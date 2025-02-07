export class CreateCategoryDto {
    name: string;
    description: string;
    parentCategoryId: number | null
}
