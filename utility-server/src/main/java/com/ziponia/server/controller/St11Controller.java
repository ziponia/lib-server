package com.ziponia.server.controller;

import com.ziponia.server.service.st11.St11Service;
import com.ziponia.st11.request.ProductSearchRequest;
import com.ziponia.st11.response.ProductSearchResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class St11Controller {

    @Autowired
    private St11Service st11Service;

    @GetMapping(value = "/11st/products")
    public ResponseEntity<ProductSearchResponse> products(ProductSearchRequest request) {
        ProductSearchResponse model = st11Service.products(request);
        return ResponseEntity.ok(model);
    }
}
