import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Layout} from 'antd';
import './App.css';
import RightSideHeaderContainer from '../containers/RightSideHeaderContainer';
import LeftSideContainer from '../containers/LeftSideContainer';
import RightSideBreadcrumbContainer from '../containers/RightSideBreadcrumbContainer';
import MyNavTabs from '../containers/MyNavTabs';
import {getToken} from '../utils/token';
import {getAccessMenu, getUserInfo} from '../services/api';
import {updateUserInfo} from '../redux/reducers/user';
import {updateAccessMenu} from '../redux/reducers/app';
import util from '../utils/util';
import AppRouters from '../routers/AppRouters';
import constantMenu from '../constantMenu';


const {Content} = Layout;

class App extends Component {
    state = {
        collapsed: false,
        responsive: false,
        navTabShow: false,
        navTabTop: 65
    }

    componentDidMount() {
        this.initAppData();//数据初始化完后再触发一次render
        this.getClientWidth();//判断屏幕尺寸再触发一次render(不需要可去掉)
        window.onresize = () => {
            this.getClientWidth();
        }
        setTimeout(() => {
            let loading = document.getElementById("StartLoading");
            loading && document.body.removeChild(loading);
        }, 200);
    }

    componentWillUpdate(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.initChildData(nextProps)
        }
    }

    getClientWidth = () => {    // 获取当前浏览器宽度并设置responsive管理响应式
        const clientWidth = document.body.clientWidth;
        this.setState({
            responsive: clientWidth <= 992,
            collapsed: clientWidth <= 992
        });
        if (clientWidth < 576) {
            this.setState({
                navTabTop: 193
            });
            return;
        }
        if (clientWidth < 768) {
            this.setState({
                navTabTop: 129
            });
            return;
        }
        if (clientWidth >= 768) {
            this.setState({
                navTabTop: 65
            });
            return;
        }
    }
    toggle = () => {
        this.refs['LeftSideContainer'].wrappedInstance.setOpenKeys(this.state.collapsed);//https://github.com/ant-design/ant-design/issues/8911
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    toggleNavTab = () => {
        this.setState({navTabShow: !this.state.navTabShow});
    }
    initAppData = async () => { //获取用户信息,菜单,权限列表(整个应用就一种layout布局,App就是相当母版页,不必在AuthorizedRoute里每次路由跳转的时候判断是否需要获取,是否登录也在此处判断)
        //没有登录，跳转到登录界面，并记下当前路径
        const token = getToken();
        if (!token) {
            this.props.history.push('/login');
            return;
        }
        const [infoRes, menuRes] = await Promise.all([getUserInfo(), getAccessMenu()]);
        console.log("menus", menuRes);
        const permission = [...infoRes.data.userRole, ...infoRes.data.userPermission];
        const isAdmin = infoRes.data.isAdmin;
        const userInfo = {
            name: infoRes.data.userName,
            avatar: infoRes.data.avatarUrl,
            isAdmin: isAdmin,
            permission: permission
        }
        localStorage.setItem("permission", JSON.stringify(permission));
        localStorage.setItem("isAdmin", isAdmin);
        menuRes.data.push(...constantMenu);
        const openAccessMenu = util.openAccessMenu(menuRes.data);
        const moduleList = menuRes.data.filter(item => {
            console.log("current menu item:",item);
            return item.leftMenu
        });
        console.log("moduleList:", moduleList);
        const currentModule = moduleList[0].name;
        const moduleMenu = moduleList[0].children;
        this.props.updateAccessMenu({
            currentModule: currentModule,
            accessMenu: menuRes.data,
            openAccessMenu: openAccessMenu,
            moduleMenu: moduleMenu,
            modules: moduleList
        });
        this.props.updateUserInfo(userInfo);
        this.initChildData(this.props);
    }

    initChildData(props) {
        this.refs['LeftSideContainer'].wrappedInstance.initMenu(props.location.pathname);
    }

    render() {
        console.log("App render");
        return (
            <Layout>
                <LeftSideContainer
                    ref={'LeftSideContainer'}
                    responsive={this.state.responsive}
                    collapsed={this.state.collapsed}
                >
                </LeftSideContainer>
                <Layout style={{background: '#fff'}}>
                    <RightSideHeaderContainer collapsed={this.state.collapsed} toggle={this.toggle}
                                              toggleNavTab={this.toggleNavTab}
                                              navTabshow={this.state.navTabShow}>
                    </RightSideHeaderContainer>
                    <MyNavTabs style={{
                        top: this.state.navTabTop,
                        position: 'fixed',
                        zIndex: 9,
                        width: '100%',
                        display: this.state.navTabShow ? 'block' : 'none'
                    }} show={this.state.navTabShow}/>
                    <RightSideBreadcrumbContainer style={{
                        padding: '10px 10px 10px 17px',
                        background: 'rgb(250, 250, 250)',
                        marginTop: this.state.navTabTop + 59 + (this.state.navTabShow ? 0 : -59)
                    }}/>
                    <Content style={{padding: 24, background: '#fff'}}>
                        <AppRouters/>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    const {name} = state.user;
    return {name};
};
const mapDispatchToProps = dispatch => {
    return {
        updateUserInfo: (info) => {
            dispatch(updateUserInfo(info))
        },
        updateAccessMenu: (accessMenu) => {
            dispatch(updateAccessMenu(accessMenu))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
