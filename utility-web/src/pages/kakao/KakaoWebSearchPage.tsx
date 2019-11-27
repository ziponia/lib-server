import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import KakaoClient from "../../api/kakao";
import qs from "query-string";

import { Input, List, Pagination } from "antd";
import { useLocation, useHistory } from "react-router";
import ReactJson from "react-json-view";

type Props = {};

const KakaoWebSearchPage: React.FC<Props> = props => {
  const location = useLocation();
  const history = useHistory();
  const parseQuery: any = qs.parse(location.search);

  const [q, setQuery] = useState(parseQuery.q);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const logHistory = () => {
    history.push({
      search: qs.stringify({
        q
      })
    });
  };

  useEffect(() => {
    if (q && q.length > 0) {
      callApi();
    } else {
      setData({});
      history.push({
        search: undefined
      });
    }
  }, [location.search]);

  const callApi = async () => {
    setLoading(true);
    try {
      const { data } = await KakaoClient.webSearch({
        query: parseQuery.q,
        page: parseQuery.page
      });
      setData(data);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const pageChangeHandler = (page: number) => {
    const search = qs.stringify({
      ...parseQuery,
      page
    });

    history.push({ search });
  };

  return (
    <Layout title="웹 서치" subTitle="by kakao">
      <Input.Search
        placeholder="검색어를 입력 해주세요..."
        size="large"
        onChange={e => setQuery(e.target.value)}
        style={{ display: "block", marginBottom: 20 }}
        enterButton
        onSearch={logHistory}
        loading={loading}
        disabled={loading}
        value={q}
      />
      <ReactJson src={data} />
      {/* {data && (
        <>
        {data && <ReactJson src={data} />}
          <List
            itemLayout="horizontal"
            dataSource={data.documents}
            loading={loading}
            style={{ flex: 1 }}
            renderItem={item => (
              <List.Item style={{ padding: 6 }}>
                <List.Item.Meta
                  title={
                    <div style={{ display: "flex" }}>
                      <a
                        href={item.url}
                        target="_blank"
                        dangerouslySetInnerHTML={{ __html: item.title }}
                      ></a>

                      <span style={{ flex: 1 }}></span>

                      <span>
                        {moment(item.datetime).format("YYYY. MM. DD")}
                      </span>
                    </div>
                  }
                  description={
                    <div
                      dangerouslySetInnerHTML={{ __html: item.contents }}
                    ></div>
                  }
                />
              </List.Item>
            )}
          />
          <Pagination
            total={data.meta.totalCount}
            current={Number(parseQuery.page) || 1}
            onChange={pageChangeHandler}
            style={{ height: 32 }}
            disabled={loading}
          />
        </>
      )} */}
    </Layout>
  );
};

export default KakaoWebSearchPage;
