import {
  Alert, Button, PageHeader, Space, Spin, Form, Input,
  notification,
} from "shared-libs/src/exports/antd"

import { useState } from "react"
import { Link, useParams } from "shared-libs/src/exports/react-router-dom"
import { add, findById, update, exists } from "../../../apis/admin/book"
import { swr } from '../../utils/swr'
import { nameValidator } from "../../utils/validators"

const { useForm } = Form

const Edit = () => {
  let { id=0 } = useParams() as { id?: string }
  let [loading, value, error] = swr(async () => id ? await findById(id) : {})
  let [form] = useForm()
  let [operating, setOperating] = useState(false)
  return <div>
    <PageHeader>Book {id ? `Edit#${id}` : `Create`}</PageHeader>
    <Space style={{ marginBottom: 16 }}>
      <Link to="/admin/books/list">
        <Button type="link">List</Button>
      </Link>
    </Space>
    {(() => {
      if (loading) return <Spin size="large" />
      if (error) return <Alert type="error" message={error.toString()} />
      return <Form
        initialValues={value}
        form={form}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={id ? [] : [{
            validator: async (_, val) => {
              nameValidator(val)
              if (await exists(val)) throw `名称重复|name exists!`
            }
          }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Intro"
          name="intro"
        >
          <Input />
        </Form.Item>


        <Form.Item shouldUpdate >
          {() => <Button type="primary" disabled={
            form.getFieldsError()
              .filter(({ errors }) => errors.length)
              .length > 0
          }
            onClick={async () => {
              setOperating(true)
              try {
                if (id) {
                  //更新
                  await update({
                    ...form.getFieldsValue(),
                    id: parseInt(id as string),
                  })
                } else {
                  //创建
                  await add(form.getFieldsValue())
                }
                notification.open({
                  message: 'cuccess',
                  type: 'success',
                  placement: 'bottomRight'
                })
                if (!id) {
                  form.resetFields()
                }
              } catch (e) {
                notification.open({
                  message: 'fail',
                  type: 'error',
                  description: e.toString(),
                  placement: 'bottomRight'
                })
              } finally {
                setOperating(false)
              }
            }}
            loading={operating}
          >{id ? 'update' : 'create'}</Button>}
        </Form.Item>
      </Form>
    })()}
  </div>
}

export default Edit