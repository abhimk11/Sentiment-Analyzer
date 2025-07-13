package com.sentiment_analyzer.service;

import edu.stanford.nlp.ling.CoreAnnotation;
import edu.stanford.nlp.ling.CoreAnnotations;
import edu.stanford.nlp.pipeline.Annotation;
import edu.stanford.nlp.pipeline.StanfordCoreNLP;
import edu.stanford.nlp.sentiment.SentimentCoreAnnotations;
import edu.stanford.nlp.util.CoreMap;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Properties;

@Service
public class SentimentAnalyzerService {

    private final StanfordCoreNLP pipeline;

    public SentimentAnalyzerService() {
        Properties props = new Properties();
        props.setProperty("annotators","tokenize, ssplit, parse, sentiment");
        this.pipeline = new StanfordCoreNLP(props);
    }

    public String analyze(String text) {
        Annotation annotation = new Annotation(text);
        pipeline.annotate(annotation);

        List<CoreMap> sentences = annotation.get(CoreAnnotations.SentencesAnnotation.class);

        if (sentences == null || sentences.isEmpty()) {
            return "Neutral";
        }

        // Option 1: Return sentiment of the longest sentence (usually most meaningful)
        CoreMap longestSentence = sentences.get(0);
        for (CoreMap sentence : sentences) {
            if (sentence.toString().length() > longestSentence.toString().length()) {
                longestSentence = sentence;
            }
        }

        return longestSentence.get(SentimentCoreAnnotations.SentimentClass.class);
    }

//Works but not give proper results
//    public String analyze(String text) {
//        Annotation annotation = new Annotation(text);
//        pipeline.annotate(annotation);
//
//        List<CoreMap> sentences = annotation.get(CoreAnnotations.SentencesAnnotation.class);
//
//        if(sentences == null||sentences.isEmpty())
//        {return "Neutral";}
//
//        int totalScore = 0;
//        for(CoreMap sentence:sentences){
//            String sentiment = sentence.get(SentimentCoreAnnotations.SentimentClass.class);
//            switch (sentiment) {
//                case "Very positive": totalScore += 2; break;
//                case "Positive": totalScore += 1; break;
//                case "Negative": totalScore -= 1; break;
//                case "Very negative": totalScore -= 2; break;
//            }
//        }
//        return totalScore>1? "Positive":
//                totalScore < -1 ? "Negative" : "Neutral";
//    }

//without ML
//    public String analyze(String text){
//        text = text.toLowerCase();
//        if (text.contains("bad") || text.contains("poor") || text.contains("worst")) return "Negative";
//        else if (text.contains("good") || text.contains("great") || text.contains("excellent")) return "Positive";
//        else return "Neutral";
//    }
}
