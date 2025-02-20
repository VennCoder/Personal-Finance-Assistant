import numpy as np
from sklearn.linear_model import LinearRegression
from database import get_transactions

def predict_expense():
    data = get_transactions()
    
    if len(data) < 2:
        return "Not enough data for prediction."

    # Convert dates into sequential indices (since ML models can't process raw dates)
    dates = np.array([i for i in range(len(data))]).reshape(-1, 1)
    amounts = np.array([row["amount"] for row in data]).reshape(-1, 1)  # FIXED index error

    model = LinearRegression()
    model.fit(dates, amounts)

    next_month = len(data)  # Predicting the next step
    prediction = model.predict([[next_month]])

    return float(prediction[0][0])

def recommend_savings():
    data = get_transactions()
    
    if not data:
        return "No transactions recorded yet. Start tracking your expenses!"

    total_spent = sum(row["amount"] for row in data)  # FIXED index error

    if total_spent < 500:
        return "You're doing great! Consider investing in mutual funds."
    elif total_spent < 1000:
        return "Try saving at least 10% of your monthly income."
    else:
        return "You're spending a lot! Cut down on non-essential expenses."
