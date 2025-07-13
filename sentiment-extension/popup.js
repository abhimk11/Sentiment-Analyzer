const analyzeBtn = document.getElementById("analyzeBtn");
const spinner = document.getElementById("loadingSpinner");
const resultElement = document.getElementById("result");
const copyBtn = document.getElementById("copyBtn");

analyzeBtn.addEventListener("click", () => {
    const reviewText = document.getElementById("reviewText").value;

    spinner.classList.remove("d-none");
    resultElement.textContent = "";
    copyBtn.classList.add("d-none");

    fetch("http://localhost:8090/api/sentiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sentiment: reviewText })
    })
        .then(response => response.json())
        .then(data => {
            spinner.classList.add("d-none");

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
                case "Very Negative":
                    emoji = "😡";
                    colorClass = "text-danger";
                    break;
                default:
                    emoji = "😐";
                    colorClass = "text-warning";
            }

            resultElement.className = `fw-bold fs-5 ${colorClass}`;
            resultElement.textContent = `Sentiment: ${data.sentiment} ${emoji}`;
            copyBtn.classList.remove("d-none");

            // Save to history
            const history = JSON.parse(localStorage.getItem("sentimentHistory")) || [];
            const record = {
                timestamp: new Date().toLocaleString(),
                text: reviewText,
                sentiment: data.sentiment,
                emoji: emoji
            };
            history.unshift(record); // add to the start
            localStorage.setItem("sentimentHistory", JSON.stringify(history.slice(0, 5))); // limit to 5 entries
            loadHistory();
        })
        .catch(error => {
            spinner.classList.add("d-none");
            console.error("Error:", error);
            resultElement.className = "text-danger fw-bold";
            resultElement.textContent = "Failed to analyze sentiment.";
        });
});

// Copy button functionality
copyBtn.addEventListener("click", () => {
    if (resultElement.textContent) {
        navigator.clipboard.writeText(resultElement.textContent)
            .then(() => {
                copyBtn.textContent = "Copied!";
                setTimeout(() => {
                    copyBtn.textContent = "Copy Result";
                }, 1500);
            })
            .catch(err => console.error("Copy failed:", err));
    }
});

function loadHistory() {
    const historyList = document.getElementById("historyList");
    historyList.innerHTML = "";

    const history = JSON.parse(localStorage.getItem("sentimentHistory")) || [];
    history.forEach(item => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.innerHTML = `<strong>${item.sentiment} ${item.emoji}</strong> 
                        <br/><em>${item.text}</em> 
                        <br/><small>${item.timestamp}</small>`;
        historyList.appendChild(li);
    });
}


document.addEventListener("DOMContentLoaded", loadHistory);
document.getElementById("clearHistoryBtn").addEventListener("click", () => {
    if (confirm("Are you sure you want to clear the sentiment history?")) {
        localStorage.removeItem("sentimentHistory");
        loadHistory();
    }
});



