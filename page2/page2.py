from flask import Flask, request, jsonify, render_template
from transformers import pipeline

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    # получаем файл изображения из запроса
    image = request.files.get('image')
    
    # загружаем обученную модель
    model = pipeline('object-detection', model='danilovabg/detection_project')
    
    # выполняем предсказание на входном изображении
    result = model(image)
    
    # возвращаем результаты предсказания в формате JSON
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
