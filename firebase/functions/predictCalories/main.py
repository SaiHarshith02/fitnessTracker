import functions_framework
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import joblib
import os
import json
from pathlib import Path

# Global model cache
_model = None

def load_model():
    """Load or initialize the ML model"""
    global _model

    if _model is not None:
        return _model

    # Check if model file exists
    model_path = os.path.join(os.path.dirname(__file__), 'model.pkl')

    if os.path.exists(model_path):
        _model = joblib.load(model_path)
    else:
        # Initialize a default model (in production, this should be pre-trained)
        # For now, we'll create a simple model that can be replaced with a real one
        _model = RandomForestRegressor(n_estimators=100, max_depth=6, random_state=1)

        # Create dummy training data for demonstration
        # In production, this should be loaded from your actual training data
        X_dummy = np.array([
            [25, 24, 30, 120, 98.6, 1],  # age, BMI, duration, heart_rate, body_temp, gender(male=1)
            [30, 25, 45, 130, 98.8, 1],
            [35, 26, 20, 110, 98.5, 0],
            [28, 23, 60, 140, 99.0, 1],
            [40, 27, 30, 125, 98.7, 0],
        ])
        y_dummy = np.array([250, 350, 200, 450, 280])  # calories burned

        _model.fit(X_dummy, y_dummy)

    return _model

@functions_framework.http
def predictCalories(request):
    """
    HTTP Cloud Function for calorie prediction

    Expected JSON request body:
    {
        "age": 25,
        "BMI": 24,
        "duration": 45,
        "heart_rate": 130,
        "body_temperature": 98.6,
        "gender": "male"
    }
    """

    # Enable CORS
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
        return '', 204, headers

    try:
        # Parse request
        request_json = request.get_json()

        if not request_json:
            return {
                'success': False,
                'error': 'No JSON data provided',
                'message': 'Please provide input data as JSON'
            }, 400

        # Extract parameters
        age = request_json.get('age')
        bmi = request_json.get('BMI')
        duration = request_json.get('duration')
        heart_rate = request_json.get('heart_rate')
        body_temperature = request_json.get('body_temperature')
        gender = request_json.get('gender', 'male').lower()

        # Validate required fields
        if any(v is None for v in [age, bmi, duration, heart_rate, body_temperature]):
            return {
                'success': False,
                'error': 'Missing required parameters',
                'message': 'Required: age, BMI, duration, heart_rate, body_temperature'
            }, 400

        # Validate parameter ranges
        if not (10 <= age <= 100):
            return {
                'success': False,
                'error': 'Invalid age',
                'message': 'Age must be between 10 and 100'
            }, 400

        if not (15 <= bmi <= 40):
            return {
                'success': False,
                'error': 'Invalid BMI',
                'message': 'BMI must be between 15 and 40'
            }, 400

        if not (0 < duration <= 480):
            return {
                'success': False,
                'error': 'Invalid duration',
                'message': 'Duration must be between 1 and 480 minutes'
            }, 400

        if not (40 <= heart_rate <= 200):
            return {
                'success': False,
                'error': 'Invalid heart rate',
                'message': 'Heart rate must be between 40 and 200 BPM'
            }, 400

        if not (35 <= body_temperature <= 42):
            return {
                'success': False,
                'error': 'Invalid body temperature',
                'message': 'Body temperature must be between 35 and 42 °C'
            }, 400

        # Encode gender (1 for male, 0 for female)
        gender_encoded = 1 if gender in ['male', 'm', '1'] else 0

        # Prepare features
        features = np.array([[age, bmi, duration, heart_rate, body_temperature, gender_encoded]])

        # Load model and make prediction
        model = load_model()
        prediction = model.predict(features)[0]

        # Ensure prediction is positive
        prediction = max(int(round(prediction)), 50)

        return {
            'success': True,
            'caloriesBurned': prediction,
            'message': 'Calculation successful',
            'details': {
                'age': age,
                'BMI': bmi,
                'duration': duration,
                'heart_rate': heart_rate,
                'body_temperature': body_temperature,
                'gender': gender
            }
        }, 200

    except ValueError as e:
        return {
            'success': False,
            'error': 'Invalid input type',
            'message': str(e)
        }, 400

    except Exception as e:
        return {
            'success': False,
            'error': 'Internal server error',
            'message': str(e)
        }, 500
