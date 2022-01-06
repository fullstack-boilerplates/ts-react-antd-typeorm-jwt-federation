import { Layout } from "./layout/Layout"
import { render } from "react-dom"
import { Route } from "react-router-dom"

const Home = () => <h1>Home</h1>

render(<Layout routes={<>
  <Route path="/" component={Home} exact />
</>} />, document.getElementById('react-root'))

