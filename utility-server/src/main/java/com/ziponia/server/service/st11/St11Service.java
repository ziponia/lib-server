package com.ziponia.server.service.st11;

import com.ziponia.st11.St11Client;
import com.ziponia.st11.request.ProductSearchRequest;
import com.ziponia.st11.response.ProductSearchResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class St11Service {

    @Autowired
    private St11Client st11Client;

    public ProductSearchResponse products(ProductSearchRequest request) {
        return st11Client.productSearch(request);
    }
}
