import * as LoadablePageComponents from './LoadablePageComponents'

/**
 * <菜单名称,内容页面实现组件> 映射表,此文件内容由开发人员在每提供一个新的功能页面组件时加入一项
 */

//key为与后端返回菜单的name相对应
export default {
    "menu": LoadablePageComponents.Menu,
    "home": LoadablePageComponents.Home,
    "function": LoadablePageComponents.Function,
    "role": LoadablePageComponents.Role,
    "rolepermission": LoadablePageComponents.RolePermission,
    "roleuser": LoadablePageComponents.RoleUser,
    "userrole": LoadablePageComponents.UserRole,
    "user_index": LoadablePageComponents.User,
    "page404": LoadablePageComponents.Page404,
    "page403": LoadablePageComponents.Page403,
    "requestlog": LoadablePageComponents.RequestLog,
    "error_404": LoadablePageComponents.Page404,
    "error_403": LoadablePageComponents.Page403,
    'permission_test': LoadablePageComponents.PermissionTest,
    "search_form": LoadablePageComponents.SearchForm,
    "common_form": LoadablePageComponents.CommonForm,
    "dynamic_form": LoadablePageComponents.DynamicForm
}