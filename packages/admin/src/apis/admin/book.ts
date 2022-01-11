import { FindManyOptions, Like } from 'typeorm'
import { IBook } from '../../common/consts'
import { Book } from '../../common/db/Book'

const DEFAULT_PAGE_SIZE = 10

type ListOptions = {
  pageSize?: number,
  page?: number,
  find?: FindManyOptions<Book>,
  filters?: any
}

export type ListResult = {
  total: number,
  pageSize: number,
  page: number,
  list: IBook[]
}

export const add = async (obj: Partial<IBook>) => {
  if (!obj.name) throw 'name 不可以为空|name needed!'
  await Book.insert(obj)
}

export const list = async (options: ListOptions = {}): Promise<ListResult> => {
  let { pageSize = DEFAULT_PAGE_SIZE, page = 1, find = {}, filters = {} } = options
  let { where = {} } = find
  for (let k in filters) {
    where[k] = Like(`%${filters[k]}%`)
  }
  let findOption = {
    ...find,
    where
  }
  return {
    page,
    pageSize,
    total: await Book.count(findOption),
    list: await Book.find({
      ...findOption,
      skip: (page - 1) * pageSize,
      take: pageSize,
    })
  }
}

export const update = async (obj: { [key: string]: any, id: number }) => {
  let { id, ...rest } = obj
  if (!id) throw 'id needed!'
  return await Book.update({ id }, rest)
}

export const del = async (id: number) => await Book.delete({ id })
export const findById = async (id: number | string) => await Book.findOne(id)

export const fieldContains = async (field: any, value: string) => {
  let arr = await Book.find({
    select: [field],
    where: {
      [field]: Like(`%${value}%`)
    }
  })
  return arr.map(x => x[field])
}

export const exists = async (name: string) => {
  if (await Book.count({ name })) return true
  return false
}