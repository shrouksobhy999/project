    const apiUrl = 'https://7aa2-34-145-211-166.ngrok-free.app/predict_churn';

        async function makePrediction() {
            // Gather form data
            const tenure = parseInt(document.getElementById("tenure").value);
            const monthlyCharges = parseFloat(document.getElementById("monthlyCharges").value);

            // Check if any numerical input is 0, which triggers a churn prediction
            if (tenure === 0 || monthlyCharges === 0) {
                document.getElementById("result").innerText = "Prediction: Churn";
                return;
            }

            const formData = {
                num__tenure: tenure,
                num__MonthlyCharges: monthlyCharges,
                cat__PaymentMethod: document.getElementById("paymentMethod").value,
                cat__Contract_TwoYear: parseInt(document.getElementById("contract").value),
                cat__OnlineSecurity_Yes: parseInt(document.getElementById("onlineSecurity").value),
                cat__TechSupport_Yes: parseInt(document.getElementById("techSupport").value),
                cat__MultipleLines_Yes: parseInt(document.getElementById("multipleLines").value),
                cat__InternetService_Yes: parseInt(document.getElementById("internetService").value), // New feature
            };

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();
                document.getElementById("result").innerText = result.churn_prediction
                    ? `Prediction: ${result.churn_prediction}`
                    : `Error: ${result.error}`;

            } catch (error) {
                console.error('Error:', error);
                document.getElementById("result").innerText = "Error in making prediction.";
            }
        }