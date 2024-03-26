from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
from transformers import pipeline
from sentence_transformers import SentenceTransformer
import textwrap
from pinecone import Pinecone
import numpy as np
import google.generativeai as genai


app = Flask(__name__)
CORS(app)
pc = Pinecone(api_key='b451abb9-d1ec-49a1-adb4-d667448a893c')
index = pc.Index("sample")
# Initialize the Hugging Face model
try:
    model = SentenceTransformer('all-MiniLM-L6-v2')
except Exception as e:
    print(f"Failed to load the model: {e}")
    model = None

# This will hold our text chunks and their embeddings
chunks_database = []


@app.route('/process-urls', methods=['POST'])
def process_urls():
    if not model:
        return jsonify({"error": "Model not loaded"}), 500

    data = request.get_json()
    urls = data.get('urls', [])
    results = []
    print("hii nantha process url ")
    for url in urls:
        try:
            # Extract data from the URL
            response = requests.get(url)
            soup = BeautifulSoup(response.text, 'html.parser')
            text = soup.get_text()
            print("Text mach",text)
            # Split the text into chunks
            chunks = text.split('\n')

            # Convert the chunks into embeddings
            embeddings = model.encode(chunks)
           
            # Store the chunks and embeddings in the databases
           
             # Add metadata with filename and hardcoded category
    
        # Upload embeddings and metadata to Pinecone
            
            index.upsert(vectors=[
        {
            "id": "vector", 
            "values":embeddings[0], 
            "metadata": {"genre": "Finance"}
        },
    ],
    namespace= "FinanceData")
            results.append({
                'url': url,
                'chunks': chunks,
               
            })
           
        except Exception as e:
            results.append({
                'url': url,
                'error': str(e),
            })
    print("Results",results)
    return jsonify(results)

@app.route('/query', methods=['POST'])
def query():
    if not model:
        return jsonify({"error": "Model not loaded"}), 500

    data = request.get_json()
    query = data.get('query')

    try:
        # Convert the query into an embedding
        query_embedding = model.encode([query])
        arr = np.array(query_embedding)
        print(arr.flatten())
# Perform semantic search in the vector database
        indices = index.query(
  vector=arr.flatten(),
 
)
        # Create the prompt and pass it to the LLM
        prompt = f"Query: {query}, "
        print(prompt)
        for i in indices[0]:
            prompt += f"context{i+1}: {chunks_database[i]}, "

        # Pass the prompt to the LLM and get the output
        llm_output = get_llm_output(prompt)
      
        return jsonify({
            'query': query,
            'prompt': prompt,
            'llm_output': llm_output,
        })
        
    
    except Exception as e:
        return jsonify({"SASi": str(e)}), 500
    



def get_llm_output(prompt):
    genai.configure(api_key='AIzaSyDu3wkd-GvAV31zZQktuM8MX2abWcNHXSk')
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(prompt, stream=True)
    for chunk in response:
       print(chunk.text)
       
    try:
       response.text
    except Exception as e:
       print(f'{type(e).__name__}: {e}')
       result=response.text
       return result

if __name__ == '__main__':
    app.run(debug=True)


