from flask import Flask, request, jsonify
from flask_cors import CORS
from model import predict_expense, recommend_savings
from database import init_db, add_transaction, get_transactions,save_goal, get_goals, delete_goal
from nlp import process_query

app = Flask(__name__)
CORS(app)

# Initialize database
init_db()

@app.route('/add_transaction', methods=['POST'])
def add_transaction_route():
    data = request.json
    add_transaction(data['date'], data['category'], float(data['amount']))  # Ensure amount is stored as float
    return jsonify({"message": "Transaction added successfully!"})

@app.route('/predict_expense', methods=['GET'])
def predict_expense_route():
    prediction = predict_expense()
    return jsonify({"predicted_expense": prediction})

@app.route('/recommend_savings', methods=['GET'])
def recommend_savings_route():
    suggestion = recommend_savings()
    return jsonify({"savings_suggestion": suggestion})

@app.route('/query', methods=['POST'])
def query_route():
    user_query = request.json['query']
    response = process_query(user_query)
    return jsonify({"response": response})

@app.route('/transactions', methods=['GET'])
def get_all_transactions():
    transactions = get_transactions()  # Fetch all transactions
    return jsonify({"transactions": transactions})

@app.route('/transactions/filter', methods=['POST'])
def filter_transactions():
    data = request.get_json()
    start_date = data.get("start_date")
    end_date = data.get("end_date")
    category = data.get("category")
    
    transactions = get_transactions(start_date, end_date, category)  # Ensure function supports filters
    return jsonify({"transactions": transactions})

@app.route('/budget_warning', methods=['GET'])
def budget_warning():
    transactions = get_transactions()
    
    # Convert amount to float to avoid sum errors
    total_spent = sum(float(t['amount']) for t in transactions)  
    
    budget_limit = 500  # You can make this dynamic later

    if total_spent > budget_limit:
        return jsonify({"warning": "⚠️ You are exceeding your budget!"})
    else:
        return jsonify({"message": "✅ You are within your budget."})

@app.route('/investments', methods=['GET'])
def suggest_investments():
    savings = 2000  # Example value, make this dynamic later

    if savings > 5000:
        suggestion = "📈 Consider investing in stocks or real estate."
    elif savings > 1000:
        suggestion = "💰 A high-yield savings account or mutual funds may be good."
    else:
        suggestion = "📉 Focus on saving more before investing."

    return jsonify({"investment_suggestion": suggestion})


@app.route('/set_goal', methods=['POST'])
def set_goal():
    data = request.json
    goal_name = data['goal_name']
    target_amount = data['target_amount']
    deadline = data['deadline']

    save_goal(goal_name, target_amount, deadline)
    return jsonify({"message": "Savings goal set successfully!"})

@app.route('/get_goals', methods=['GET'])
def retrieve_goals():
    goals = get_goals()
    return jsonify(goals)

@app.route('/delete_goal', methods=['DELETE'])
def remove_goal():
    data = request.json
    goal_name = data['goal_name']

    delete_goal(goal_name)
    return jsonify({"message": "Savings goal deleted successfully!"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

