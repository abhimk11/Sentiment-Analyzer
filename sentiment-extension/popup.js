document.getElementById("analyzeBtn").addEventListener("click", () => {
    const reviewText = document.getElementById("reviewText").value;

    fetch("http://localhost:8090/api/sentiment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ sentiment: reviewText })
    })
        .then(response => response.json())
        .then(data => {
            const resultElement = document.getElementById("result");
            let emoji = "";
            let colorClass = "";

            switch (data.sentiment) {
                case "Positive":
                    emoji = "😊";
                    colorClass = "text-success";
                    break;
                case "Negative":
                    emoji = "😡";
                    colorClass = "text-danger";
                    break;
                default:
                    emoji = "😐";
                    colorClass = "text-warning";
            }

            resultElement.className = `fw-bold fs-5 ${colorClass}`;
            resultElement.textContent = `Sentiment: ${data.sentiment} ${emoji}`;
        })
        .catch(error => {
            console.error("Error:", error);
            const resultElement = document.getElementById("result");
            resultElement.className = "text-danger fw-bold";
            resultElement.textContent = "Failed to analyze sentiment.";
        });
});
