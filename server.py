from flask import Flask, render_template, url_for, request, redirect
import csv
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')
@app.route('/elements')
def elements():
    return render_template('elements.html')

@app.route('/<string:page_name>')
def html_page(page_name):
    return render_template(page_name)

def write_to_file(data):
    with open('database.txt', mode='a') as database:
        email = data["email"]
        name = data["name"]
        message = data["message"]
        file = database.write(f'\n{email},{name},{message}')

def write_to_csv(data):
    with open('database.csv', mode='a') as database2:
        email = data["email"]
        name = data["name"]
        message = data["message"]
        csv_writer = csv.writer(database2, delimiter=',', newline='', quotechar='"', quoting=csv.QUOTE_MINIMAL)
        csv_writer.writerow([email,name,message])

@app.route('/submit_form', methods=['POST', 'GET'])
def submit_form():
    if request.method =='POST':
        data = request.form.to_dict()
        write_to_csv(data)
        return redirect('/thankyou.html#thankyou')
    else:
        return 'something went wrong'

@app.route('/yelpcamp', methods=['GET'])
def yelp():
    return redirect("https://yelp-camp-jo67.onrender.com", code=302)