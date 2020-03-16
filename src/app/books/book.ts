export interface IBook{
    //bookId:number;
    //we required id for in-memory web api
    id:number;
    bookName:string;
    bookCode:string;
    tags?: string[];
    releaseDate:string;
    description:string;
    price:number;
    starRating:number;
    imageUrl:string;
}