import { Layout } from 'shared-libs/src/exports/Layout'
import { render } from "shared-libs/src/exports/react-dom"
import { AdminRoute } from 'admin/src/exports/AdminRoute'
import { Route, NavLink } from 'shared-libs/src/exports/react-router-dom'
import Home from './pages/Home'
import { user } from 'shared-libs/src/exports/store'
import { Menu } from 'shared-libs/src/exports/antd'

const { Item } = Menu

const App = () => {
  let [currentUser] = user.use()

  return <Layout routes={<>
    <Route path="/" component={Home} exact />
    <AdminRoute />
  </>} extraMenu={currentUser?.isAdmin
    ? <Item key="/admin" > <NavLink to="/admin">后台|Admin</NavLink> </Item>

    : null} />
}

render(<App />, document.getElementById('react-root'))

