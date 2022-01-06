import { Layout } from 'shared-libs/src/web/exports'
import { render } from "react-dom"
import { AdminRoute } from './layout/AdminRoute'
import Adminhome from './pages/admin/Home'
import { Route } from 'react-router-dom'


render(<Layout routes={<>
  {/* <Route path="/" component={Adminhome} exact />
  <AdminRoute /> */}
</>} />, document.getElementById('react-root'))

