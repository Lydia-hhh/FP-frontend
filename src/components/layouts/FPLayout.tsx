
import React, {useState} from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Employs from "../pages/Employs";
import Monitor from "../pages/Monitor";
import {useNavigate} from "react-router-dom";

const { Header, Content, Footer } = Layout;

// const items = new Array(15).fill(null).map((_, index) => ({
//     key: index + 1,
//     label: `nav ${index + 1}`,
// }));

const items=[{key:'0',label:'employee'},{key:'1',label: 'monitor'}]

export function FPLayout(){
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [component,setComponent]=useState<any>(<Employs/>)

    return(
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['0']}
                    items={items}
                    style={{ flex: 1, minWidth: 0 }}
                    onSelect={({ item, key, keyPath, selectedKeys, domEvent }: any)=>{
                        if(key==='0'){setComponent(<Employs/>)}
                        else if(key==='1'){setComponent(<Monitor/>)}
                        else {setComponent(<div></div>)}
                    }}
                />
            </Header>
            <Content style={{ padding: '0 48px' }}>
                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 280,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {component}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                 ©{new Date().getFullYear()} Created by Shanghai  TAP
            </Footer>
        </Layout>

    )
}

export default FPLayout;