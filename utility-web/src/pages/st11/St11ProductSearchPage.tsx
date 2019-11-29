import React, { useState, useEffect, useRef } from "react";
import Layout from "../../components/layout/Layout";
import { useLocation, useHistory } from "react-router";
import St11Client from "../../api/st11";
import qs from "query-string";
import { Input, List, Statistic, Icon, Radio } from "antd";
import styled from "styled-components";
import ReactJson from "react-json-view";
import { RadioChangeEvent } from "antd/lib/radio";

type Props = PageProps & {};

const St11ProductSearchPage: React.FC<Props> = props => {
  const location = useLocation();
  const history = useHistory();
  const parseQuery: any = qs.parse(location.search);
  const [q, setQuery] = useState(parseQuery.q);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ProductSearchResopnse>();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (q && q.length > 0) {
      callApi();
    } else {
      setData(undefined);
      history.push({
        search: undefined
      });
    }
  }, [location.search]);

  const callApi = async () => {
    setLoading(true);
    try {
      const { data } = await St11Client.productSearch({
        keyword: parseQuery.q,
        pageSize: 10,
        pageNum: parseQuery.page,
        sortCd: parseQuery.sortCd || "CP"
      });
      setData(data);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const numberFormat = (n: number) => {
    return new Intl.NumberFormat("ko-KR").format(n);
  };

  const keywordChangeHandler = () => {
    const newQuery = {
      ...qs.parse(location.search),
      pageNum: undefined
    };

    history.push({
      search: qs.stringify(newQuery)
    });

    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  const orderChangeHandler = (e: RadioChangeEvent) => {
    const newQuery = {
      ...qs.parse(location.search),
      sortCd: e.target.value,
      pageNum: undefined
    };

    history.push({
      search: qs.stringify(newQuery)
    });

    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  const pageChangeHandler = (pageNum: number) => {
    const newQuery = {
      ...qs.parse(location.search),
      page: pageNum
    };

    history.push({
      search: qs.stringify(newQuery)
    });

    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  return (
    <Layout title={props.title} subTitle="by 11번가">
      <div style={{ display: "flex" }}>
        <Input.Search
          placeholder="검색어를 입력 해주세요..."
          size="large"
          onChange={e => setQuery(e.target.value)}
          style={{
            display: "block",
            marginBottom: 20,
            flex: 1,
            marginRight: 50
          }}
          enterButton
          onSearch={keywordChangeHandler}
          loading={loading}
          disabled={loading}
          value={q}
        />
        <Radio.Group
          size="large"
          onChange={orderChangeHandler}
          value={parseQuery.sortCd || "CP"}
        >
          <Radio.Button value="CP">인기도순</Radio.Button>
          <Radio.Button value="A">누적판매순</Radio.Button>
          <Radio.Button value="G">평가높은순</Radio.Button>
          <Radio.Button value="I">후기/리뷰많은순</Radio.Button>
          <Radio.Button value="L">낮은가격순</Radio.Button>
          <Radio.Button value="H">높은가격순</Radio.Button>
          <Radio.Button value="N">최근등록순</Radio.Button>
        </Radio.Group>
      </div>
      <Content>
        <ContentChild ref={contentRef}>
          <List
            style={{
              flex: 1,
              overflowY: "auto"
            }}
            pagination={{
              total: (data && data.products.totalCount) || 1,
              current: parseQuery.page ? Number(parseQuery.page) : 1,
              onChange: pageChangeHandler
            }}
            dataSource={data && data.products.products}
            loading={loading}
            itemLayout="vertical"
            renderItem={item => (
              <List.Item
                key={item.productCode}
                style={{ display: "flex" }}
                actions={[
                  <span>
                    판매자 {item.sellerNick}({item.seller})
                  </span>,
                  <span>리뷰 {item.reviewCount}</span>,
                  <span>평점 {item.rating}</span>,
                  <span>배송 {item.delivery}</span>,
                  <span>만족도 {item.buySatisfy}</span>
                ]}
                extra={
                  <div>
                    <img
                      width="100%"
                      height="100%"
                      style={{ objectFit: "contain" }}
                      alt="thumbnail"
                      src={item.productImage150}
                    />
                  </div>
                }
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <List.Item.Meta
                    title={
                      <a href={item.detailPageUrl} target="_blank">
                        {item.productName}
                      </a>
                    }
                  />
                  <span style={{ flex: 1 }}></span>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Statistic
                      title="가격"
                      value={item.productPrice}
                      valueStyle={{
                        textDecoration:
                          item.productPrice !== item.salePrice
                            ? "line-through"
                            : "none",
                        fontSize: 15
                      }}
                      suffix="원"
                    />

                    {item.productPrice !== item.salePrice && (
                      <>
                        <Icon
                          type="arrow-right"
                          style={{ margin: "0 10px", fontSize: 18 }}
                        />
                        <Statistic
                          title="할인 된 가격"
                          value={item.salePrice}
                          valueStyle={{ fontSize: 15 }}
                          suffix="원"
                        />
                      </>
                    )}
                  </div>
                </div>
              </List.Item>
            )}
          />
        </ContentChild>
        <ContentChild>
          <ReactJson src={data ? data : {}} style={{ flex: 1 }} />
        </ContentChild>
      </Content>
    </Layout>
  );
};

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const ContentChild = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

export default St11ProductSearchPage;
