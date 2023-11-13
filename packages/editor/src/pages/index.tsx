import { Layout } from "antd";
import ComponentsMarket from './componentsMarket';
const { Header, Sider, Content } = Layout;

export default function HomePage() {
  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider collapsible style={{backgroundColor: '#fff', border: '1px solid grey'}}>
        我是侧边
        <ComponentsMarket />
      </Sider>
      <Layout className="site-layout">
        <Header style={{padding: 0, backgroundColor: '#fff', border: '1px solid grey'}}>
            <div>
              我是头部
            </div>
        </Header>
        <Content style={{margin: '0 16px', backgroundColor: '#fff', border: '1px solid grey'}}>
          我是内容
        </Content>
      </Layout>
    </Layout>
  );
}
