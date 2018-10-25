import Loadable from 'react-loadable';
import MyContentLoader from '../containers/MyContentLoader';

/**
 * 开发人员开发的功能页面组件
 * 1. 这里的功能页面整个页面中位于右下主功能区的功能页面
 * 2. 这里的功能页面可能是业务功能页面，也可能是业务辅助支撑性质的功能页面
 */

/**
 * 首页
 */
export const Home = Loadable({
    loader: () => import('../pages/Home'),
    loading: MyContentLoader
});

/**
 * 菜单管理
  */

export const Menu = Loadable({
    loader: () => import('../pages/Menu'),
    loading: MyContentLoader
});

/**
 * 功能管理
 */
export const Function = Loadable({
    loader: () => import('../pages/Function'),
    loading: MyContentLoader
});

/**
 * 角色管理
 */
export const Role = Loadable({
    loader: () => import('../pages/role'),
    loading: MyContentLoader
});

/**
 * 角色权限管理 :
 */
export const RolePermission = Loadable({
    loader: () => import('../pages/rolePermission'),
    loading: MyContentLoader
});

/**
 * 角色用户管理 : 管理属于某个角色的用户
 */
export const RoleUser = Loadable({
    loader: () => import('../pages/roleUser'),
    loading: MyContentLoader
});

/**
 * 用户角色管理 : 管理某个用户所属的角色
 */
export const UserRole = Loadable({
    loader: () => import('../pages/userRole'),
    loading: MyContentLoader
});

/**
 * 用户管理
 */
export const User = Loadable({
    loader: () => import('../pages/user'),
    loading: MyContentLoader
});


/**
 * 资源找不到错误页面
 */
export const Page404 = Loadable({
    loader: () => import('../pages/Page404'),
    loading: MyContentLoader
});

/**
 * 无权访问错误页面
 */
export const Page403 = Loadable({
    loader: () => import('../pages/Page403'),
    loading: MyContentLoader
});

/**
 * 请求日志展示页面
 */
export const RequestLog = Loadable({
    loader: () => import('../pages/RequestLog'),
    loading: MyContentLoader
});
// example
export const PermissionTest = Loadable({
    loader: () => import('../pages/example/PermissionTest'),
    loading: MyContentLoader
});
export const SearchForm = Loadable({
    loader: () => import('../pages/example/JsonForm/SearchForm'),
    loading: MyContentLoader
});

export const CommonForm = Loadable({
    loader: () => import('../pages/example/JsonForm/CommonForm'),
    loading: MyContentLoader
});
export const DynamicForm = Loadable({
    loader: () => import('../pages/example/JsonForm/DynamicForm'),
    loading: MyContentLoader
});

