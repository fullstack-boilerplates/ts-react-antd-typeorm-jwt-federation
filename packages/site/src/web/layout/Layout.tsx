import {} from 
import { Layout as AntLayout } from 'antd'
import { BrowserRouter as Router } from "react-router-dom"
import { Header } from './Header'

const { Content, Footer } = AntLayout

// lazy 作用： webpack 代码切分，避免单个 bundle 代码过大
// const Home = lazy(() => import('../pages/site/Home'))
// const Login = lazy(() => import('../pages/site/Login'))
// const Register = lazy(() => import('../pages/site/Register'))

export const Layout = ({
  extraMenu = null,
  children = null
}) => {
  return <Router>
    <AntLayout className="layout">
      <Header>
        {extraMenu}
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </AntLayout>
  </Router>
}