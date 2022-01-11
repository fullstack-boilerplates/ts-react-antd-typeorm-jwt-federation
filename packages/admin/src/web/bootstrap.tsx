import { Layout } from 'shared-libs/src/exports/Layout'
import { render } from "shared-libs/src/exports/react-dom"
import { AdminRoute } from './layout/AdminRoute'
import { Route } from 'shared-libs/src/exports/react-router-dom'
import Adminhome from './pages/Home'

render(<Layout routes={<>
  <Route path="/" component={Adminhome} exact />
  <AdminRoute />
</>} />, document.getElementById('react-root'))

