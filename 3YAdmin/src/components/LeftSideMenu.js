import React from 'react';
import {Icon, Menu} from 'antd';
import {Link} from 'react-router-dom';
import MenuResourceMapping from '../app-metadata/MenuPageRouterMapping';


// 本模块是针对左侧导航菜单条的纯UI组件
// 1. 菜单的数据都由外部提供;
// 2. 提供的菜单数据是已经根据当前用户权限过滤之后确定要显示的菜单项;
// 3. 菜单项是否指向被实现的页面由 MenuResourceMapping 提供， MenuResourceMapping 是一个键值对集合<菜单名称,对应页面的URL>;
// 3.1 如果某个菜单项虽然被创建出来但是没有开发出相应的页面，则该菜单项文字显示为红色且不可点击;
// 3.2 如果某个菜单项有对应的页面，则页面主工作区域(页面的右下主体部分)展示相应的页面的内容;

const {SubMenu, Item} = Menu;

/**
 * 渲染一个菜单项(不考虑是否有子菜单，只渲染菜单项本身)
 * @param name  菜单名称
 * @param title 菜单展示文字
 * @param icon 菜单展示文字前面的图标
 * @return {*}
 */
const renderMenuItem = ({name, title, icon}) => {
    const link = MenuResourceMapping[name];// 菜单对应的页面的链接，不存在的话表明该菜单虽然被定义，但是没有被开发人员实现
    const textColor = link ? "#333" : "#f00";
    const menuItemTitle = renderMenuItemTitle(icon, textColor, title);
    return <Item key={name}>{link ? <Link to={link}>{menuItemTitle}</Link> : menuItemTitle}</Item>;
}

const renderMenuItemTitle = (icon, textColor, text) => {
    const reactNodeIcon = icon && <Icon type={icon} style={{color: '#08c'}}/>;
    const reactNodeMenuItemTitle = <span>{reactNodeIcon}<span style={{color: textColor}}>{text}</span></span>;
    return reactNodeMenuItemTitle;
}

const renderSubMenu = ({name, title, icon, children}) => {
    const textColor = "#333";
    const menuItemTitle = renderMenuItemTitle(icon, textColor, title);
    return <SubMenu key={name} title={menuItemTitle}>
        {children && children.map(
            (item) => {
                // 是否有需要在左边导航菜单栏中展示的子菜单项
                const hasChildrenMenuToDisplayInLeftSideBar = item.children && item.children.filter(s => s.leftMenu).length > 0;
                return hasChildrenMenuToDisplayInLeftSideBar ? renderSubMenu(item) : renderMenuItem(item);
            }
        )}
    </SubMenu>;
}

export default ({menus, ...props}) => {
    return <Menu {...props}>
        {menus && menus.map(
            (item) => {
                if (!item.leftMenu)
                    return null;

                // 是否有子菜单
                const hasChildren = item.children && item.children.length;
                return hasChildren ? renderSubMenu(item) : renderMenuItem(item);
            }
        )}
    </Menu>;
}