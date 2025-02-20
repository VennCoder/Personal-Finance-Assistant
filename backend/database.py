import sqlite3

DB_NAME = "finance.db"

def init_db():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    # Create transactions table if it doesn't exist
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT,
            category TEXT,
            amount REAL
        )
    ''')

    # Create savings_goals table if it doesn't exist
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS savings_goals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            goal_name TEXT NOT NULL,
            target_amount REAL NOT NULL,
            saved REAL DEFAULT 0,
            deadline TEXT NOT NULL
        )
    ''')

    conn.commit()
    conn.close()

def add_transaction(date, category, amount):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO transactions (date, category, amount) VALUES (?, ?, ?)", (date, category, amount))
    conn.commit()
    conn.close()

def save_goal(goal_name, target_amount, deadline):
    conn = sqlite3.connect('finance.db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO savings_goals (goal_name, target_amount, saved, deadline) VALUES (?, ?, 0, ?)",
                   (goal_name, target_amount, deadline))
    conn.commit()
    conn.close()

def get_goals():
    conn = sqlite3.connect('finance.db')
    cursor = conn.cursor()
    cursor.execute("SELECT goal_name, target_amount, saved, deadline FROM savings_goals")
    goals = cursor.fetchall()
    conn.close()
    return [{"goal_name": row[0], "target_amount": row[1], "saved": row[2], "deadline": row[3]} for row in goals]

def delete_goal(goal_name):
    conn = sqlite3.connect('finance.db')
    cursor = conn.cursor()
    cursor.execute("DELETE FROM savings_goals WHERE goal_name = ?", (goal_name,))
    conn.commit()
    conn.close()

def get_transactions(start_date=None, end_date=None, category=None):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    query = "SELECT date, category, amount FROM transactions WHERE 1=1"
    params = []

    if start_date:
        query += " AND date >= ?"
        params.append(start_date)

    if end_date:
        query += " AND date <= ?"
        params.append(end_date)

    if category:
        query += " AND category = ?"
        params.append(category)

    cursor.execute(query, params)
    data = cursor.fetchall()
    conn.close()

    # Convert list of tuples to list of dictionaries
    transactions = [{"date": row[0], "category": row[1], "amount": row[2]} for row in data]
    return transactions
