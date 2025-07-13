document.getElementById("analyzeBtn").addEventListener("click", () => {
  const reviewText = document.getElementById("reviewText").value;

  fetch("http://localhost:8090/api/sentiment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ sentiment: reviewText })  // ✅ FIXED HERE
  })
    .then(response => response.json())
    .then(data => {
      console.log("Received:", data);  // Optional debug
      document.getElementById("result").textContent = `Sentiment: ${data.sentiment}`;
    })
    .catch(error => {
      console.error("Error:", error);
      document.getElementById("result").textContent = "Failed to analyze sentiment.";
    });
});
