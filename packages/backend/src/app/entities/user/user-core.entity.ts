import { BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm'

export abstract class UserCore extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number

  @Column('varchar', { name: 'first_name', nullable: true })
  firstName: string | null

  @Column('varchar', { name: 'last_name', nullable: true })
  lastName: string | null

  @Column('varchar', { nullable: true })
  email: string | null

  @Column('varchar', { nullable: true })
  tel: string | null

  @CreateDateColumn({ name: 'created_at' })
  readonly createdAt: Date
}
