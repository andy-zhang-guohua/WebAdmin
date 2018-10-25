/**
 * 菜单页面映射表,也就是菜单，系统资源映射表,每一项是一个<菜单名称,页面URL>对，此文件内容由开发人员在每提供一个新的功能页面时加入一项
 *
 * 1. 将每个菜单名称关联到一个开发人员实现的页面的URL上
 * 2. 系统提供的菜单管理功能中，每个新增的菜单的名称必须是该映射表中的某个key,菜单显示文字可以随意设置
 * 3. 开发人员每开发出一个新的页面，可以在这里为其指定一个菜单名称并关联到相应的页面URL
 * 4. 菜单名称类似该功能的系统全局唯一id，会被代码和运营人员共同使用，所以建议总是使用命名js变量的方式命名，并告知运营人员其语义
 * 5. 菜单的显示名称运营人员可以根据自己或者团队的喜好来设置，建议为汉字
 */
export default {
    menu: "/app/system/menu",
    function: "/app/permission/function",
    role: "/app/permission/role",
    rolepermission: "/app/permission/rolepermission",
    roleuser: "/app/permission/roleuser",
    userrole: "/app/permission/userrole",
    user_index: "/app/user",
    department: "/app/department",
    article: "/app/cms/article",
    requestlog: "/app/requestlog",
    error_404: '/app/example/404',
    error_403: '/app/example/403',
    permission_test: '/app/example/permissiontest',
    search_form: '/app/example/searchform',
    common_form: '/app/example/commonform',
    dynamic_form: '/app/example/dynamicform'
}





