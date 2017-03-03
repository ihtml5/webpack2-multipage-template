import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class Tumenu extends Component {
    state = {
        current: 'mail',
    }
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }
    render() {
        return (
            <Menu
                onClick={this.handleClick}
                style={{ width: 200 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                <SubMenu key="sub1" title={<span><Icon type="mail" /><span>组件化</span></span>}>
                    <Menu.Item key="1">React</Menu.Item>
                    <SubMenu key="sub3" title="React生态">
                        <Menu.Item key="7"><a href="http://redux.js.org" target="_blank" title="状态管理解决方案">redux</a></Menu.Item>
                        <Menu.Item key="8"><a href="http://github.com/ReactTraining/react-router" target="_blank" title="路由解决方案">react-router</a></Menu.Item>
                        <Menu.Item key="9"><a href="http://ant.design" target="_blank" title="优秀的组件库">ant design</a></Menu.Item>
                    </SubMenu>
                    <Menu.Item key="2">Vue</Menu.Item>
                    <Menu.Item key="3">Jquery</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>工程化</span></span>}>
                <Menu.Item key="5">Webpack</Menu.Item>
                <Menu.Item key="6">Gulp</Menu.Item>
                </SubMenu>
                <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
            </Menu>
        );
    }
}

export default Tumenu;