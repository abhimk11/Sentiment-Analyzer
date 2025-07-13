package com.sentiment_analyzer.controller;

import com.sentiment_analyzer.entity.SentimentResponse;
import com.sentiment_analyzer.service.SentimentAnalyzerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class SentimentController {

    @Autowired
    SentimentAnalyzerService service;

    @GetMapping
    public String HelloWorld(){
        return "Controller is Working!!!";
    }

    @PostMapping("/sentiment")
    public ResponseEntity<SentimentResponse> getSentiment(@RequestBody SentimentResponse text){
        String str = service.analyze(text.getSentiment());
        return ResponseEntity.ok(new SentimentResponse(str));
    }
}
