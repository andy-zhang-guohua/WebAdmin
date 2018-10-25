import React from 'react';
import {Route, Switch} from 'react-router-dom';
import AuthorizedRoute from '../containers/AuthorizedRoute';
import * as LoadablePageComponents from '../app-metadata/LoadablePageComponents'

//此处配置只对非Tab模式有效,Tab模式在menuMapToComponent.js配置
export default () => (
    <Switch>
        <Route exact path="/app/home" component={LoadablePageComponents.Home}/>
        <AuthorizedRoute exact path="/app/system/menu" component={LoadablePageComponents.Menu}/>
        <AuthorizedRoute exact path="/app/permission/function" component={LoadablePageComponents.Function}/>
        <AuthorizedRoute exact path="/app/permission/role" component={LoadablePageComponents.Role}/>
        <AuthorizedRoute exact path="/app/permission/rolepermission" component={LoadablePageComponents.RolePermission}/>
        <AuthorizedRoute exact path="/app/permission/roleuser" component={LoadablePageComponents.RoleUser}/>
        <AuthorizedRoute exact path="/app/permission/userrole" component={LoadablePageComponents.UserRole}/>
        <AuthorizedRoute exact path="/app/user/index" component={LoadablePageComponents.User}/>
        <AuthorizedRoute exact path="/app/requestlog" component={LoadablePageComponents.RequestLog}/>
        {/* example */}
        <AuthorizedRoute exact path="/app/example/404" component={LoadablePageComponents.Page404}/>
        <AuthorizedRoute exact path="/app/example/403" component={LoadablePageComponents.Page403}/>
        <AuthorizedRoute exact path="/app/example/permissiontest" component={LoadablePageComponents.PermissionTest}/>
        <AuthorizedRoute exact path="/app/example/searchform" component={LoadablePageComponents.SearchForm}/>
        <AuthorizedRoute exact path="/app/example/commonform" component={LoadablePageComponents.CommonForm}/>
        <AuthorizedRoute exact path="/app/example/dynamicform" component={LoadablePageComponents.DynamicForm}/>
        {/* end example */}
        <Route component={LoadablePageComponents.Page404}/>
    </Switch>

)
