import { Route } from "shared-libs/src/exports/react-router-dom"
import Adminhome from '../pages/Home'
import UserList from 'shared-libs/src/exports/UserList'
import UserEdit from 'shared-libs/src/exports/UserEdit'
import BookList from '../pages/books/List'
import BookEdit from '../pages/books/Edit'

export const AdminRoute = () => {
  return <Route
    path="/admin"
    render={({ match: { url } }) => (
      <>
        <Route path={`${url}/`} component={Adminhome} exact />
        <Route path={`${url}/home`} component={Adminhome} />
        <Route path={`${url}/users/`} component={UserList} exact />
        <Route path={`${url}/users/list`} component={UserList} />
        <Route path={`${url}/users/create`} component={UserEdit} />
        <Route path={`${url}/users/edit/:id`} component={UserEdit} />
        <Route path={`${url}/books/`} component={BookList} exact />
        <Route path={`${url}/books/list`} component={BookList} />
        <Route path={`${url}/books/create`} component={BookEdit} />
        <Route path={`${url}/books/edit/:id`} component={BookEdit} />
      </>
    )}
  />
}