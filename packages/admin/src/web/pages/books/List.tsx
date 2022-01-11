import { Button, notification, PageHeader, Space, Table } from "shared-libs/src/exports/antd"
import { useEffect, useState } from "react"
import { Link } from "shared-libs/src/exports/react-router-dom"
import { fieldContains, del, list as listBook, ListResult } from "../../../apis/admin/book"
import { Modal } from "shared-libs/src/exports/antd"
import { getSearchFilterProps } from '../../utils/filter'

const { confirm } = Modal

const List = () => {
  let [options, setOptions] = useState({} as any)
  let [loading, setLoading] = useState(0)
  let [data, setData] = useState({} as ListResult)

  useEffect(() => {
    if (!options) return
    setLoading(x => x + 1)
    listBook(options).then(d => {
      setData(d)
      setLoading(x => x - 1)
    }).catch(e => {
      notification.error({
        message: e.toString()
      })
      setLoading(x => x - 1)
    })
  }, [options])
  const { filters = {} } = options

  const { page = 1, pageSize = 10, total = 0, list = [] } = data

  return <div>
    <PageHeader>User</PageHeader>
    <Space style={{ marginBottom: 16 }}>
      <Link to="/admin/books/create">
        <Button type="link">Create</Button>
      </Link>
    </Space>
    <Table
      dataSource={list}
      loading={!!loading}
      rowKey={'id'}
      columns={[
        {
          title: 'name',
          dataIndex: 'name',
          key: 'name',
          ...getSearchFilterProps(
            async val => await fieldContains('name', val),
            val => setOptions({
              ...options,
              filters: {
                name: val
              }
            })
          ),
          filteredValue: [filters.name || '']
        },{
          title: 'intro',
          dataIndex: 'intro',
          key: 'intro',
          ...getSearchFilterProps(
            async val => await fieldContains('intro', val),
            val => setOptions({
              ...options,
              filters: {
                intro: val
              }
            })
          ),
          filteredValue: [filters.intro || '']
        } , {
          title: 'operations',
          key: 'operations',
          render: (x, u) => <>
            <Link to={`/admin/users/edit/${u.id}`}><Button type="link">修改</Button></Link>
            <Button onClick={() => confirm({
              title: 'confirm',
              content: `delete  ${u.name}?`,
              onOk: async () => {
                try {
                  await del(u.id)
                  notification.success({
                    placement: 'bottomRight',
                    message: 'success'
                  })
                  setOptions({ ...options })
                } catch (e) {
                  notification.error({
                    placement: 'bottomRight',
                    message: 'fail',
                    description: e.toString()
                  })
                }
              },
              onCancel: () => { }
            })}>delete</Button>
          </>
        },
      ]}
      onChange={({ pageSize, current }, filters, sorter: any) => {
        let { find = {} } = options
        console.log(`onChange!`)
        setOptions({
          find: {
            ...find,
            order: sorter.order
              ? {
                [sorter.field as string]: sorter.order === 'ascend' ? 1 : -1
              }
              : undefined
          }, page: current, pageSize
        })
      }}
      pagination={{
        pageSize,
        current: page,
        total,
        showQuickJumper: true,
      }}

    />
  </div>
}

export default List