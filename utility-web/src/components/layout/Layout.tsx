import React, { useEffect, useState } from "react";
import { Layout as AntLayout, Menu as AntMenu, Icon, PageHeader } from "antd";
import { useLocation, useHistory, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { routes } from "../../routes";

const { Header, Sider, Content } = AntLayout;
const { SubMenu } = AntMenu;

type Props = {
  title?: string;
  subTitle?: string;
  style?: React.CSSProperties;
};

const Layout: React.FC<Props> = props => {
  const router = useLocation();

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {props.title} - {props.subTitle}
        </title>
      </Helmet>
      <AntLayout>
        <Sider width={200} style={{ backgroundColor: "#fff" }}>
          <AntMenu
            mode="inline"
            selectedKeys={[router.pathname]}
            style={{ height: "100%", borderRight: 0 }}
          >
            {routes.map(route => {
              if (!route.children) {
                return (
                  <AntMenu.Item key={route.key}>
                    {route.title}
                    <Link to={route.key} />
                  </AntMenu.Item>
                );
              } else {
                return (
                  <AntMenu.ItemGroup title={route.title} key={route.key}>
                    {route.children &&
                      route.children.map(child => (
                        <AntMenu.Item key={`${route.key}${child.key}`}>
                          {child.title}
                          <Link to={`${route.key}${child.key}`} />
                        </AntMenu.Item>
                      ))}
                  </AntMenu.ItemGroup>
                );
              }
            })}
          </AntMenu>
        </Sider>
        <AntLayout style={{ padding: "0 24px 0 24px" }}>
          <Header
            style={{ backgroundColor: "#fff", padding: "24px 24px 0 24px" }}
          >
            <PageHeader title={props.title} subTitle={props.subTitle} />
          </Header>
          <Content
            style={{
              background: "#fff",
              padding: 24,
              margin: 0,
              minHeight: 280,
              overflowY: "auto",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              ...props.style
            }}
          >
            {props.children}
          </Content>
        </AntLayout>
      </AntLayout>
    </>
  );
};

Layout.defaultProps = {
  title: "API Web Site",
  subTitle: "by ziponia"
};

export default Layout;
