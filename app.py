from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
import os
import smtplib
from email.mime.text import MIMEText

app = Flask(__name__)
CORS(app)

# Database configuration
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'marvel_site.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Database Models
class QuizResult(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    score = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    answers = db.Column(db.String(500), nullable=False)

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    subject = db.Column(db.String(200), nullable=False)
    message = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

# Create database tables
with app.app_context():
    db.create_all()

# Test endpoint to check database
@app.route('/api/test-db', methods=['GET'])
def test_db():
    try:
        # Try to query the database
        contacts = Contact.query.all()
        return jsonify({
            'success': True,
            'message': 'Database is working',
            'contact_count': len(contacts)
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Database error: {str(e)}'
        }), 500

# Quiz endpoints
@app.route('/api/submit-quiz', methods=['POST'])
def submit_quiz():
    try:
        data = request.json
        score = data.get('score')
        answers = data.get('answers')
        
        new_result = QuizResult(
            score=score,
            answers=str(answers)
        )
        db.session.add(new_result)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Quiz result saved successfully',
            'score': score
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@app.route('/api/leaderboard', methods=['GET'])
def get_leaderboard():
    try:
        results = QuizResult.query.order_by(QuizResult.score.desc()).limit(10).all()
        leaderboard = [{
            'score': result.score,
            'date': result.date.strftime('%Y-%m-%d %H:%M:%S')
        } for result in results]
        
        return jsonify({
            'success': True,
            'leaderboard': leaderboard
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

# Contact form endpoints
@app.route('/api/contact', methods=['POST'])
def submit_contact():
    try:
        data = request.json
        name = data.get('name')
        email = data.get('email')
        subject = data.get('subject')
        message = data.get('message')

        if not all([name, email, subject, message]):
            return jsonify({
                'success': False,
                'message': 'All fields are required'
            }), 400

        # Save to database
        new_contact = Contact(
            name=name,
            email=email,
            subject=subject,
            message=message
        )
        db.session.add(new_contact)
        db.session.commit()

        return jsonify({
            'success': True,
            'message': 'Message sent successfully!'
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@app.route('/api/contact/messages', methods=['GET'])
def get_contact_messages():
    try:
        messages = Contact.query.order_by(Contact.date.desc()).all()
        return jsonify({
            'success': True,
            'messages': [{
                'id': msg.id,
                'name': msg.name,
                'email': msg.email,
                'subject': msg.subject,
                'message': msg.message,
                'date': msg.date.strftime('%Y-%m-%d %H:%M:%S')
            } for msg in messages]
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)