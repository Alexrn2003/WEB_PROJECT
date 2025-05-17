from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import sensor_simulator

app = Flask(__name__)
app.secret_key = 'clave-secreta'

USUARIO = "alex"
CONTRASENA = "1234"

@app.route('/')
def index():
    if 'usuario' in session:
        return render_template('home.html', nombre=session['usuario'])
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        usuario = request.form['usuario']
        contrasena = request.form['contrasena']
        if usuario == USUARIO and contrasena == CONTRASENA:
            session['usuario'] = usuario
            return redirect(url_for('index'))
        else:
            return render_template('login.html', error="Credenciales incorrectas")
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('usuario', None)
    return redirect(url_for('login'))

@app.route('/api/sensores')
def api_sensores():
    data = sensor_simulator.get_sensor_data()
    return jsonify(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

