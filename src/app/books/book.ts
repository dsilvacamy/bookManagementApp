export interface IBook{
    //bookId:number;
    //we required id for in-memory web api
    id:number;
    bookName:string;
    bookCode:string;
    category:string;
    tags?: string[];
    description:string;
    releaseDate: string;
    price: number;
    starRating:number;
    imageUrl:string;
}

export interface BookResolved{
    book: IBook;
    //here we return error along with resolver data
    error?: any;
}