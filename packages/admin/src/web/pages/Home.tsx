import { Card, PageHeader } from "shared-libs/src/exports/antd"
import { NavLink } from "shared-libs/src/exports/react-router-dom"

const Home = () => {
  return <div>
    <PageHeader>Admin</PageHeader>
    <div>
      <Card>
        <h3> <NavLink to="/admin/users/list">User管理</NavLink></h3>
      </Card>
      <Card>
        <h3> <NavLink to="/admin/books/list">Book管理</NavLink></h3>
      </Card>
    </div>
  </div>
}

export default Home