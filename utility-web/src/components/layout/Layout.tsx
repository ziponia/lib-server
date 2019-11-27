import React, { useEffect, useState } from "react";
import { Layout as AntLayout, Menu as AntMenu, Icon, PageHeader } from "antd";
import { useLocation, useHistory, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const { Header, Sider, Content } = AntLayout;
const { SubMenu } = AntMenu;

type Props = {
  title?: string;
  subTitle?: string;
  style?: React.CSSProperties;
};

type INavigation = {
  key: string;
  title: string;
  children?: INavigation[];
};

const routes: INavigation[] = [
  {
    key: "/",
    title: "홈"
  },
  {
    key: "/kakao",
    title: "kakao",
    children: [
      {
        key: "/web-search",
        title: "웹 서치"
      },
      {
        key: "/address",
        title: "주소 검색"
      },
      {
        key: "/coord2Region",
        title: "좌표 -> 행정구역정보 변환"
      },
      {
        key: "/translate",
        title: "번역"
      },
      {
        key: "/thumbnail-crop",
        title: "썸네일 추출"
      }
    ]
  }
];

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
