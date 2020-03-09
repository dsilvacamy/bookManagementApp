export interface IBook{
    bookId:number;
    bookName:string;
    bookCode:string;
    tags?: string[];
    releaseDate:string;
    description:string;
    price:number;
    starRating:number;
    imageUrl:string;
}