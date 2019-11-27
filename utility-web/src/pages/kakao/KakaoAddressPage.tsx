import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { Input } from "antd";
import { useLocation, useHistory } from "react-router";
import qs from "query-string";
import { AutoComplete } from "antd";
import KakaoClient from "../../api/kakao";
import ReactJson from "react-json-view";

type Props = {};

const KakaoAddressPage: React.FC<Props> = props => {
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
      const { data } = await KakaoClient.addressSearch({
        query: parseQuery.q
      });
      setData(data);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout title={"주소 검색"} subTitle="by kakao">
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
    </Layout>
  );
};

export default KakaoAddressPage;
