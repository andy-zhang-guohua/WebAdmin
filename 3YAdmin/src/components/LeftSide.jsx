import React from 'react';
import {Layout} from 'antd';
import LeftSideMenu from './LeftSideMenu';
import '../style/menu.less';
import logo from '../logo.svg';

/**
 * 页面布局左侧部分纯UI组件，包含上部应用名称区域和下部菜单导航区域
 */
class LeftSide extends React.PureComponent {
    render() {
        return (
            <Layout.Sider breakpoint="lg" collapsedWidth={this.props.responsive ? 0 : undefined}
                          trigger={null} collapsible collapsed={this.props.collapsed} style={{background: '#fff'}}>
                <div className="logo" style={{paddingLeft: this.props.collapsed ? '14px' : '6px'}}>
                    <img src={logo} alt=""/>
                    <h3>Web管理界面</h3>
                </div>
                <LeftSideMenu menus={this.props.menus} mode="inline" onOpenChange={this.props.openMenu}
                              selectedKeys={[this.props.selectedKey]} openKeys={this.props.openKeys}/>
            </Layout.Sider>
        )
    }
}

export default LeftSide;