# ts-react-antd-typeorm-jwt-federation

使用 module federation

## 结构 | structure

```
+ packages
+--- shared-libs 包含注册登录，权限验证，用户管理，公共库| contains user management, authentication and shared libs 
+--- admin 包含后台部分的路由，图书管理 | contain routes for admin part and book management
+--- site 整合路由，后台，添加首页 | compose site  
```

## 运行 | try it out

```
cd packages/shared-libs
npm i
start powershell {npm run dev}

cd ../admin
npm i
start powershell {npm run dev}

cd ../site
npm i
start powershell {npm run dev}
```

open http://localhost:3003