import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Markdown from "react-markdown";

type Props = {};

const MainPage: React.FC<Props> = props => {
  const [md, setMd] = useState();
  useEffect(() => {
    fetch(`https://raw.githubusercontent.com/ziponia/lib/master/README.md`)
      .then(text => text.text())
      .then(mark => setMd(mark));
  }, []);
  return (
    <Layout>
      <Markdown source={md} />
    </Layout>
  );
};

export default MainPage;
