import httpClient from "../httpClient";

const St11Client = {
  productSearch: async (params: ProductSearchRequest) => {
    return httpClient.get<ProductSearchResopnse>(`/11st/products`, { params });
  }
};

export default St11Client;
