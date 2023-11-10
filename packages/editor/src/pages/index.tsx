import { Layout } from "antd";
const { Header, Sider, Content } = Layout;

export default function HomePage() {
  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider collapsible>
        我是侧边
      </Sider>
      <Layout className="site-layout">
        <Header style={{padding: 0}}>
            <div>
              我是头部
            </div>
        </Header>
        <Content style={{margin: '0 16px'}}>
          我是内容
        </Content>
      </Layout>
    </Layout>
  );
}
