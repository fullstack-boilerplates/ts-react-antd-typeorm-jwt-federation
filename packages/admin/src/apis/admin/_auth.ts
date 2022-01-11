import fetch from 'cross-fetch'
import { JWT_HEADER_KEY } from '../../common/consts'

export default async (req, ctx) => {
  let token = req.headers[JWT_HEADER_KEY]
  if (!token) throw '尚未登录|not logged in！'
  let isAdmin = await request(
    `${process.env.PKG_SHARED_LIBS_URL}/apis/user/isAdmin`, [token])
  if (!isAdmin) throw '需要管理员权限|not admin!'
  return ctx
}

async function request(url: string, params: any) {
  const response = await fetch(
    url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params)
  })

  const { error, data } = await response.json() as any;
  if (error)
    throw error
  return data
}