import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { IBook } from "../consts"

@Entity()
export class Book extends BaseEntity implements IBook {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 128, unique: true })
  name: string

  @Column({ type: 'varchar', length: 512 })
  intro: string
}
