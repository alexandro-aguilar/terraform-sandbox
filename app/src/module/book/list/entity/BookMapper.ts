import BaseMapper from'@commons/domain/mapper/BaseMapper';

import Book from './Book';
import BookDto from './BookDto';


  export default class BookMapper extends BaseMapper<Book, BookDto> {
    protected transform(entity: Book): BookDto {
      return {
        id: entity.id,
        author: entity.auhtor,
        category: entity.category
      }
    }
  }
