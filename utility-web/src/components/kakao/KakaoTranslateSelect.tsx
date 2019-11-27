import React from "react";
import { Select } from "antd";
import { SelectValue } from "antd/lib/select";

const { Option } = Select;

type Props = {
  style?: React.CSSProperties;
  value: IKakaoTranslateLang;
  onChange?: (e: IKakaoTranslateLang) => void;
};

const KakaoTranlateSelect: React.FC<Props> = props => {
  return (
    <Select
      showSearch
      style={{ flex: 1, ...props.style }}
      onChange={props.onChange}
      value={props.value}
      placeholder="Select a person"
      optionFilterProp="children"
      filterOption={(input: any, option: any) => {
        console.log(input, option);
        return (
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        );
      }}
    >
      <Option value="kr">한국어</Option>
      <Option value="en">영어</Option>
      <Option value="jp">일본어</Option>
      <Option value="cn">중국어</Option>
      <Option value="vi">베트남어</Option>
      <Option value="id">인도네시어어</Option>
      <Option value="ar">아랍어</Option>
      <Option value="bn">뱅갈어</Option>
      <Option value="de">독일어</Option>
      <Option value="es">스페인어</Option>
      <Option value="fr">프랑스어</Option>
      <Option value="hi">힌디어</Option>
      <Option value="it">이탈리아어</Option>
      <Option value="ms">말레이시아어</Option>
      <Option value="nl">네덜란드어</Option>
      <Option value="pt">포르투갈어</Option>
      <Option value="ru">러시아어</Option>
      <Option value="th">태국어</Option>
      <Option value="tr">터키어</Option>
    </Select>
  );
};

export default KakaoTranlateSelect;
