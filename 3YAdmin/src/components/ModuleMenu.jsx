import React from 'react';
import {Menu} from 'antd';

/**
 * 模块菜单：一组水平方向组织的菜单项，每个菜单项对应用用于可访问的一个模块
 */
class ModuleMenu extends React.PureComponent {
    render() {
        console.log("User's modules:", this.props.modules);

        // 用于展示各个模块名称的菜单项
        const menuItems = [];
        for (let item of this.props.modules) {
            menuItems.push(
                <Menu.Item key={item.name}>
                    {item.title}
                </Menu.Item>
            );
        }
        return (
            <Menu
                onClick={this.props.updateModule}
                selectedKeys={[this.props.currentModule]}
                mode="horizontal"
                style={this.props.style}
            >
                {menuItems}
            </Menu>
        )
    }
}

export default ModuleMenu;
