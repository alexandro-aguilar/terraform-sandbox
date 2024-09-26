import 'reflect-metadata';
import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * @abstract BaseEntity
 * @classdesc Base class for all entities.
 * @property {string} id - The id of the entity.
 * @property {Date} createdAt - The date when the entity was created.
 * @property {string} createdBy - The user that created the entity.
 * @property {Date} updatedAt - The date when the entity was updated.
 * @property {string} updatedBy - The last user that updated the entity.
 * @property {boolean} active - The active status of the entity.
 */

export default abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column('varchar', { length: 50, default: 'user' })
  createdBy: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column('varchar', { length: 50, default: 'user' })
  updatedBy: string;

  @Column('bool', { default: 'true' })
  active: boolean;
}