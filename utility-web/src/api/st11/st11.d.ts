interface ProductSearchRequest {
  keyword: string;
  pageNum?: number;
  pageSize?: number;
  sortCd?: "CP" | "A" | "G" | "I" | "L" | "H" | "N";
  option?: string;
  targetSearchPrd?: "KOR" | "ENG";
}

interface ProductSearchResopnse {
  products: {
    totalCount: number;
    products: {
      productCode: string;
      productName: string;
      productPrice: number;
      productImage: string;
      productImage100: string;
      productImage110: string;
      productImage120: string;
      productImage130: string;
      productImage140: string;
      productImage150: string;
      productImage170: string;
      productImage200: string;
      productImage250: string;
      productImage270: string;
      productImage300: string;
      text1: string;
      text2: string;
      sellerNick: string;
      seller: string;
      sellerGrd: string;
      rating: string;
      detailPageUrl: string;
      salePrice: number;
      delivery: string;
      reviewCount: number;
      buySatisfy: number;
      minorYn: string;
      benefit: { discount: number; mileage: number };
    }[];
  };
}
