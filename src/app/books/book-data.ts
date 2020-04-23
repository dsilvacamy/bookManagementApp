import {InMemoryDbService} from 'angular-in-memory-web-api';
import {IBook} from './book';

export class BookData implements InMemoryDbService {
    createDb(){
        const books :IBook[] =[{
            id: 1,
            bookName: "Parker-Pig",
            bookCode: "cbm-0001",
            releaseDate: 'March 8,2019',
            category:'Kids Book',
            description: "parker-pig is a kids reading book",
            price: 600,
            starRating: 3.2,
            imageUrl: "assets/images/parker-pig.png",
			tags: ['pig', 'parker', 'book', 'kids']
          },
          {	
			id: 2,
			bookName: "Strategy",
			bookCode: "cbm-0002",
      releaseDate: "March 8,2019",
      category:"self help book",
			description: "stratergy is a self-help book",
			price: 800,
			starRating: 4.2,
			imageUrl: "assets/images/stratergy.jpg"
          },
          {
            id: 3,
            bookName: "Lord Of The Rings",
            bookCode: "cbm-0003",
            releaseDate: "March 8,2019",
            category: "fiction",
            description: "Lord Of The Rings is a fictional book",
            price: 2500,
            starRating: 4.5,
            imageUrl: "assets/images/Lord Of The Rings.jpg",
			tags: ['Rings', 'fictional', 'lord', 'book']
          },
          {
            id: 4,
            bookName: "Harry Potter",
            bookCode: "cbm-0004",
            releaseDate: "March 8,2019",
            category:"fiction",
            description: "Harry Potter is a fictional book",
            price: 3000,
            starRating: 4.8,
            imageUrl: "assets/images/Harry Potter.jpg"
          },
          {
            id: 5,
            bookName: "My Journal",
            bookCode: "cbm-0005",
            releaseDate: "March 8,2019",
            category:"Biography",
            description: "My Journal is a biography",
            price: 800,
            starRating: 2.5,
            imageUrl: "assets/images/My Journal.jpg"
          }
          ];
        return {books};
    }
}
