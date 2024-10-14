import BaseEntity from'@commons/domain/entity/BaseEntity';
import { Column, Entity } from 'typeorm';

  /**
   * Book Entity
   */
  @Entity({ name: 'book' })
  export default class Book extends BaseEntity {

    @Column('varchar', { length: 128, default: '' })
    title: string;
    
    @Column('varchar', { length: 256, default: '' })
    auhtor: string;

    @Column('varchar', { length: 256, default: '' })
    category: string;


    constructor(title: string, author: string, category: string) {
      super();
      this.title = title;
      this.auhtor = author;
      this.category = category;
    }
  }