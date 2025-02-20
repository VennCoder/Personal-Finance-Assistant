import spacy
from database import get_transactions

nlp = spacy.load("en_core_web_sm")

def process_query(query):
    doc = nlp(query.lower())

    if "spend" in query and "last week" in query:
        transactions = get_transactions()

        # FIX: Access "amount" instead of row[3]
        total_spent = sum(row["amount"] for row in transactions)  
        return f"You spent a total of ${total_spent} last week."

    return "Sorry, I didn't understand your query."
