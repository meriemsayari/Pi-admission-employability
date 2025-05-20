from flask import Flask, request, jsonify, render_template, redirect, url_for
import pickle
import pandas as pd
import numpy as np
import os
import pickle


from flask_cors import CORS
app = Flask(__name__)
CORS(app)

# Load the score prediction model
model_path = 'modele_prediction_score.pkl'
if os.path.exists(model_path):
    with open(model_path, 'rb') as file:
        model = pickle.load(file)
else:
    print(f"Warning: Model file '{model_path}' not found. Score predictions will not work.")
    model = None

# Load the employability prediction model
employability_model_path = 'modele_employabilite.pkl'
if os.path.exists(employability_model_path):
    with open(employability_model_path, 'rb') as file:
        employability_model = pickle.load(file)
else:
    print(f"Warning: Model file '{employability_model_path}' not found. Employability predictions will not work.")
    employability_model = None

@app.route('/')
def index():
    """Render the main page with the prediction form."""
    return render_template('index.html')

@app.route('/employability')
def employability():
    """Render the employability prediction form."""
    return render_template('employability.html')

@app.route('/about')
def about():
    """Render the about page."""
    return render_template('about.html')

@app.route('/history')
def history():
    """Render the prediction history page."""
    return render_template('history.html')

@app.route('/predict', methods=['POST'])
def predict():
    """Handle score prediction requests via form or API."""
    try:
        # Check if request is form data or JSON
        if request.content_type and 'application/json' in request.content_type:
            # API request with JSON data
            data = request.get_json(force=True)
        else:
            # Form submission
            data = {
                'id_concours': request.form.get('id_concours'),
                'moy_bac_et': request.form.get('moy_bac_et'),
                'resultat': request.form.get('resultat')
            }

        # Convert inputs to appropriate types
        # For categorical 'resultat' field
        input_data = pd.DataFrame({
            'id_concours': [int(data['id_concours'])],
            'moy_bac_et': [float(data['moy_bac_et'])],
            'resultat': [data['resultat']]  # Keep as string for categorical value
        })
        
        if model is None:
            return jsonify({'error': 'Model not loaded'}), 500
            
        # Make prediction
        prediction = model.predict(input_data)
        prediction_value = "%.2f" % prediction[0]  # Get the string value for categorical prediction

        # For form submissions, render result page
        if request.content_type is None or 'application/json' not in request.content_type:
            return render_template(
                'result.html', 
                prediction=prediction_value,
                input_data=data
            )

        # For API requests, return JSON
        return jsonify({'prediction': prediction_value})

    except Exception as e:
        print(f"Error during prediction: {str(e)}")  # Add more logging
        error_message = str(e)
        # Return appropriate response based on request type
        if request.content_type is None or 'application/json' not in request.content_type:
            return render_template('error.html', error=error_message)
        return jsonify({'error': error_message}), 400

@app.route('/predict-employability', methods=['POST'])
def predict_employability():
    """Handle employability prediction requests via form or API."""
    try:
        # Check if request is form data or JSON
        if request.content_type and 'application/json' in request.content_type:
            # API request with JSON data
            data = request.get_json(force=True)
            
            # If input is already provided as a list
            if 'input' in data:
                input_values = data['input']
                
                # Convert string numbers to float
                input_values[3] = float(input_values[3])
                input_values[4] = float(input_values[4])
            else:
                # Create from individual parameters
                input_values = [
                    data.get('sexe', ''),
                    data.get('code_nationalite', ''),
                    data.get('code_gouv', ''),
                    float(data.get('score_final', 0)),
                    float(data.get('moy_bac_et', 0)),
                    data.get('nature_bac', ''),
                    data.get('code_cursus', ''),
                    data.get('code_diplome', ''),
                    data.get('code_spec', '')
                ]
        else:
            # Form submission
            input_values = [
                request.form.get('sexe', ''),
                request.form.get('code_nationalite', ''),
                request.form.get('code_gouv', ''),
                float(request.form.get('score_final', 0)),
                float(request.form.get('moy_bac_et', 0)),
                request.form.get('nature_bac', ''),
                request.form.get('code_cursus', ''),
                request.form.get('code_diplome', ''),
                request.form.get('code_spec', '')
            ]
            
            # Save form data for template rendering
            data = {
                'sexe': input_values[0],
                'code_nationalite': input_values[1],
                'code_gouv': input_values[2],
                'score_final': input_values[3],
                'moy_bac_et': input_values[4],
                'nature_bac': input_values[5],
                'code_cursus': input_values[6],
                'code_diplome': input_values[7],
                'code_spec': input_values[8]
            }
        
        if employability_model is None:
            return jsonify({'error': 'Employability model not loaded'}), 500
        
        # Try multiple approaches to feed data to the model
        try:
            # Approach 1: Try with list directly
            print("Trying with direct list...")
            prediction = employability_model.predict([input_values])
            employability_value = int(prediction[0])
        except Exception as e1:
            print(f"List approach failed: {str(e1)}")
            try:
                # Approach 2: Try with dataframe with numeric columns
                print("Trying with dataframe with numeric columns...")
                input_df = pd.DataFrame([input_values], columns=list(range(9)))
                prediction = employability_model.predict(input_df)
                employability_value = int(prediction[0])
            except Exception as e2:
                print(f"Numeric columns approach failed: {str(e2)}")
                try:
                    # Approach 3: Try with dataframe with named columns based on your postman example
                    print("Trying with dataframe with named columns...")
                    input_df = pd.DataFrame({
                        'sexe': [input_values[0]],
                        'code_nationalite': [input_values[1]],
                        'code_gouv': [input_values[2]],
                        'score_final': [input_values[3]],
                        'moy_bac_et': [input_values[4]],
                        'nature_bac': [input_values[5]],
                        'code_cursus': [input_values[6]],
                        'code_diplome': [input_values[7]],
                        'code_spec': [input_values[8]]
                    })
                    prediction = employability_model.predict(input_df)
                    employability_value = int(prediction[0])
                except Exception as e3:
                    print(f"Named columns approach failed: {str(e3)}")
                    try:
                        # Approach 4: Try with numpy array
                        print("Trying with numpy array...")
                        input_array = np.array([input_values])
                        prediction = employability_model.predict(input_array)
                        employability_value = int(prediction[0])
                    except Exception as e4:
                        print(f"Numpy array approach failed: {str(e4)}")
                        raise Exception("All approaches failed. Check model input requirements.")
        
        # For form submissions, render result page
        if request.content_type is None or 'application/json' not in request.content_type:
            return render_template(
                'employability_result.html', 
                employability=employability_value,
                input_data=data
            )
        
        # For API requests, return JSON
        return jsonify({'employabilite': employability_value})
            
    except Exception as e:
        print(f"Error during employability prediction: {str(e)}")  # Add more logging
        error_message = str(e)
        # Return appropriate response based on request type
        if request.content_type is None or 'application/json' not in request.content_type:
            return render_template('error.html', error=error_message)
        return jsonify({'error': error_message}), 400
    

from flask import Flask, request, jsonify, render_template, redirect, url_for
import pickle
import pandas as pd
import numpy as np
import os
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
import json
import sqlalchemy as db

# Add these revised functions to your app.py

def connect_db():
    """Connect to the database."""
    try:
        # Replace with your actual database connection details
        connection_string = "sqlite:///candidates.db"  # Example SQLite database
        engine = db.create_engine(connection_string)
        return engine
    except Exception as e:
        print(f"Database connection error: {str(e)}")
        raise

def get_data(engine):
    """Get candidate data from the database."""
    try:
        # This is a simplified example - replace with your actual query
        query = """
        SELECT moy_bac_et, score_final
        FROM candidates
        """
        df = pd.read_sql(query, engine)
        return df
    except Exception as e:
        print(f"Data retrieval error: {str(e)}")
        # If no data is available, create sample data for demonstration
        df = pd.DataFrame({
            'moy_bac_et': np.random.uniform(8, 20, 100),
            'score_final': np.random.uniform(30, 95, 100)
        })
        return df

def perform_clustering(n_clusters=3):
    """Perform KMeans clustering and return data for visualization."""
    try:
        # Initialize
        engine = connect_db()
        df = get_data(engine)
        
        # Store original data for plotting
        data_for_viz = df.copy()
        
        # Clustering
        scaler = StandardScaler()
        X = scaler.fit_transform(df[['moy_bac_et', 'score_final']])
        
        kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
        df['cluster'] = kmeans.fit_predict(X)
        
        # Add cluster info to original data
        data_for_viz['cluster'] = df['cluster']
        
        # Convert to format suitable for JavaScript visualization
        chart_data = []
        for _, row in data_for_viz.iterrows():
            chart_data.append({
                'x': float(row['moy_bac_et']),
                'y': float(row['score_final']),
                'cluster': int(row['cluster'])
            })
        
        # Generate statistics
        stats = df.groupby('cluster').agg({
            'moy_bac_et': ['mean', 'min', 'max'],
            'cluster': 'count'
        })
        
        stats_score = df.groupby('cluster').agg({
            'score_final': ['mean', 'min', 'max']
        })
        
        # Format statistics for template
        cluster_stats = {}
        for cluster_id in stats.index:
            cluster_stats[int(cluster_id)] = {
                'count': int(stats.loc[cluster_id, ('cluster', 'count')]),
                'bac_mean': round(float(stats.loc[cluster_id, ('moy_bac_et', 'mean')]), 2),
                'bac_min': round(float(stats.loc[cluster_id, ('moy_bac_et', 'min')]), 2),
                'bac_max': round(float(stats.loc[cluster_id, ('moy_bac_et', 'max')]), 2),
                'score_mean': round(float(stats_score.loc[cluster_id, ('score_final', 'mean')]), 2),
                'score_min': round(float(stats_score.loc[cluster_id, ('score_final', 'min')]), 2),
                'score_max': round(float(stats_score.loc[cluster_id, ('score_final', 'max')]), 2)
            }
        
        return chart_data, cluster_stats, None
        
    except Exception as e:
        print(f"Error in cluster analysis: {str(e)}")
        return None, None, str(e)
    finally:
        if 'engine' in locals():
            engine.dispose()

# Update the visualization route
@app.route('/visualization', methods=['GET', 'POST'])
def visualization():
    """Handle visualization page requests."""
    # Default parameters
    params = {
        'n_clusters': 3,
    }
    
    # Update parameters from form if POST request
    if request.method == 'POST':
        params['n_clusters'] = int(request.form.get('n_clusters', 3))
    
    # Generate the clustering data
    chart_data, cluster_stats, error = perform_clustering(n_clusters=params['n_clusters'])
    
    # Convert data to JSON for JavaScript
    chart_data_json = json.dumps(chart_data)
    cluster_stats_json = json.dumps(cluster_stats)

    if request.content_type is None or 'application/json' not in request.content_type:
        # Render the template
        return render_template(
            'visualization.html',
            chart_data=chart_data_json,
            cluster_stats=cluster_stats,
            cluster_stats_json=cluster_stats_json,
            error=error,
            params=params
        )

    return jsonify({
        'chart_data':chart_data_json,
            'cluster_stats':cluster_stats,
            'cluster_stats_json':cluster_stats_json,
            'params':params})
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)