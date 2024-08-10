from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
import jwt 
import datetime

# Inicialización
app = Flask(__name__)
CORS(app)

# Conexión a MySQL
app.config['MYSQL_HOST'] = 'localhost' 
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'nuevo'

# Clave secreta para Flask y JWT
app.secret_key = "sE$cRe8To*"  # Asegúrate de que la clave sea segura y difícil de adivinar
app.config['SECRET_KEY'] = app.secret_key

mysql = MySQL(app)

@app.route('/login', methods=['POST'])
def login():
    correo_institucional = request.json['correo_institucional']
    password = request.json['password']

    cur = mysql.connection.cursor()

    cur.execute("SELECT * FROM administrador WHERE correo_institucional=%s AND password=%s", (correo_institucional, password))
    admin = cur.fetchone()

    cur.execute("SELECT * FROM estudiante WHERE correo_institucional=%s AND password=%s", (correo_institucional, password))
    estudiante = cur.fetchone()

    cur.execute("SELECT * FROM docente WHERE correo_institucional=%s AND password=%s", (correo_institucional, password))
    docente = cur.fetchone()

    cur.close()

    user = None
    user_type = None

    if admin:
        user = {
            "idAdministrador": admin[0],
            "tipo_identificacion": admin[1],
            "numero_identificacion": admin[2],
            "nombre_completo": admin[3],
            "correo_institucional": admin[4],            
            "password": admin[5],
            "programa": admin[6],
        }
        user_type = 'administrador'
    elif estudiante:
        user = {
            "idEstudiante": estudiante[0],
            "tipo_identificacion": estudiante[1],
            "numero_identificacion": estudiante[2],
            "nombre_completo": estudiante[3],
            "correo_institucional": estudiante[4],            
            "password": estudiante[5],
            "carrera": estudiante[6]
            }
        user_type = 'estudiante'
    elif docente:
        user = {
            "idDocente": docente[0],
            "tipo_identificacion": docente[1],
            "numero_identificacion": docente[2],
            "nombre_completo": docente[3],
            "correo_institucional": docente[4],            
            "password": docente[5],
            "carrera": docente[6],
            "idCargo": docente[7]
            }
        user_type = 'docente'

    if user:
        token = jwt.encode({
            'correo_institucional': correo_institucional,
            'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=15)
        }, app.config['SECRET_KEY'], algorithm="HS256")

        return jsonify({
            'token': token,
            'user_type': user_type,
            'user': user
        }), 200
    
    return jsonify({'message': 'Credenciales inválidas'}), 401

@app.route('/protegida', methods=['GET'])
def protegida():
    token = request.headers.get('Authorization')

    if not token:
        return jsonify({'message': 'Token faltante'}), 403

    try:
        data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        return jsonify({'message': 'Acceso concedido', 'correo_institucional': data['correo_institucional']}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token expirado'}), 403
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Token inválido'}), 403

# ruta para consultar todos los registros docentes
@app.route('/getAll/docente', methods=['GET'])
def getAllDocente():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM docente')
        rv = cur.fetchall()
        cur.close()

        payload = []
        content = {}

        for result in rv:
            content = {'idDocente': result[0],'tipo_identificacion': result[1], 'numero_identificacion': result[2], 'nombre_completo': result[3], 'correo_institucional': result[4], 'password': result[5], 'carrera': result[6], 'idCargo': result[7]}

            payload.append(content)
            content = {}

        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e}) 

# ruta para consultar todos los registros estudiantes
@app.route('/getAll/estudiante', methods=['GET'])
def getAllEstudiante():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM estudiante')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'idEstudiante': result[0], 'tipo_identificacion': result[1], 'numero_identificacion': result[2], 'nombre_completo': result[3], 'correo_institucional': result[4], 'password': result[5], 'carrera': result[6]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e}) 

# ruta para consultar todos los registros estudiantes proyectos
@app.route('/getAll/proyecto', methods=['GET'])
def getAllProyecto():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM proyecto')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'idProyecto': result[0], 'titulo': result[1], 'descripción': result[2], 'archivo': result[3], 'fecha_subida': result[4], 'nota': result[5], 'idEstado':result[6]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})
    
@app.route('/getAll/grafica/2', methods=['GET'])
def grafica_2():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT carrera, COUNT(*) AS total FROM estudiante GROUP BY carrera')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'carrera': result[0], 'total': result[1]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})
    
@app.route('/getAll/grafica/3', methods=['GET'])
def grafica3():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT carrera, COUNT(*) AS total FROM docente GROUP BY carrera')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'carrera': result[0], 'total': result[1]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})
    
@app.route('/getAll/grafica/4', methods=['GET'])
def grafica4():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT estudiante.nombre_completo, COUNT(foro.idEstudiante) "Total Retroalimentaciones" FROM foro JOIN estudiante ON foro.idEstudiante = estudiante.idEstudiante GROUP BY estudiante.nombre_completo')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'nombre_completo': result[0], 'total_retroalimentaciones': result[1]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})
    
@app.route('/getAll/grafica/5', methods=['GET'])
def getAllProyectoGrafica1():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT estado.descripcion "Estado", COUNT(*) as total FROM proyecto JOIN estado ON estado.idEstado = proyecto.idEstado GROUP BY estado.descripcion')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'estado': result[0], 'total': result[1]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})
    
@app.route('/getAll/grafica/6', methods=['GET'])
def grafica6():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT docente.nombre_completo, COUNT(foro.idDocente) "Total Retroalimentaciones" FROM foro JOIN docente ON foro.idDocente = docente.idDocente GROUP BY docente.nombre_completo')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'nombre_completo': result[0], 'total_retroalimentaciones': result[1]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

@app.route('/getAll/subir', methods=['GET'])
def getAllsubir():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM subir')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'idEstudiante': result[0], 'idProyecto': result[1]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e}) 

@app.route('/getAll/evaluar', methods=['GET'])
def getAllEvaluar():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM evaluar')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'idDocente': result[0], 'idProyecto': result[1], 'nota': result[2]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e}) 


@app.route('/getAll/foro', methods=['GET'])
def getAllforo():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM foro')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'idForo': result[0],'asunto':result[1],'descripción':result[2], 'idDocente':result[3], 'idEstudiante':result[4], 'idProyecto': result[5]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e}) 


# ruta para consultar por parametro
@app.route('/getAll/estudiante/<id>',methods=['GET'])
def getAllByIdEstudiante(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM estudiante WHERE idEstudiante = %s', (id,))
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'idEstudiante': result[0], 'tipo_identificación': result[1], 'numero_identificación': result[2], 'nombre_completo': result[3], 'correo_institucional': result[4], 'password': result[5], 'carrera': result[6]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

@app.route('/getAll/docente/<id>',methods=['GET'])
def getAllByIdDocente(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM docente WHERE idDocente = %s', (id,))
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'idDocente': result[0], 'nombre_completo': result[1], 'tipo_identificación': result[2], 'numero_identificación': result[3], 'correo_institucional': result[4], 'password': result[5], 'carrera': result[6], 'idCargo': result[7]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

@app.route('/getAll/proyecto/<id>',methods=['GET'])
def getAllByIdProyecto(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM proyecto WHERE idProyecto = %s', (id))
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'idProyecto': result[0], 'titulo': result[1], 'descripción': result[2], 'archivo': result[3], 'fecha_subida': result[4], 'nota': result[5], 'idEstado':result[6]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e}) 

@app.route('/getAll/proyecto/idEstado/<id>',methods=['GET'])
def getAllByProyectoIdEstado(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM proyecto WHERE idEstado = %s', (id))
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'idProyecto': result[0], 'titulo': result[1], 'descripción': result[2], 'archivo': result[3], 'fecha_subida': result[4], 'nota': result[5], 'idEstado':result[6]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e}) 

# @app.route('/getAll/proyecto/titulo/<titulo>',methods=['GET'])
# def getAllByNombre(titulo):
#     try:
#         cur = mysql.connection.cursor()
#         cur.execute('SELECT * FROM proyecto WHERE titulo = %s', (titulo,))
#         rv = cur.fetchall()
#         cur.close()
#         payload = []
#         content = {}
#         for result in rv:
#             content = {'idProyecto': result[0], 'titulo': result[1], 'descripción': result[2], 'archivo': result[3], 'fecha_subida': result[4], 'nota': result[5], 'idEstado':result[6]}
#             payload.append(content)
#             content = {}
#         return jsonify(payload)
#     except Exception as e:
#         print(e)
#         return jsonify({"informacion":e})

#### ruta para crear un registro########
@app.route('/add_estudiante', methods=['POST'])
def add_estudiante():
    try:
        if request.method == 'POST':

            tipo_identificación = request.json['tipo_identificación']         
            numero_identificación = request.json['numero_identificación'] 
            nombre_completo = request.json['nombre_completo']                 
            correo_institucional = request.json['correo_institucional']     
            password = request.json['password']                           
            carrera = request.json['carrera']
                                           
            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO estudiante (tipo_identificación, numero_identificación, nombre_completo, correo_institucional, password, carrera) VALUES (%s,%s,%s,%s,%s,%s)", (tipo_identificación, numero_identificación, nombre_completo, correo_institucional, password, carrera))
            mysql.connection.commit()
            return jsonify({"informacion":"Registro exitoso"})

    except Exception as e:
        print(e)
        return jsonify({"informacion":e})
    
#### ruta para crear un registro########
@app.route('/add_docente', methods=['POST'])
def add_docente():
    try:
        if request.method == 'POST':
            nombre_completo = request.json['nombre_completo']                 
            tipo_identificacion = request.json['tipo_identificacion']         
            numero_identificacion = request.json['numero_identificacion'] 
            correo_institucional = request.json['correo_institucional']     
            password = request.json['password']                           
            carrera = request.json['carrera']
            idCargo = request.json['idCargo']                               
            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO docente (nombre_completo, tipo_identificacion, numero_identificacion, correo_institucional, password, carrera, idCargo) VALUES (%s,%s,%s,%s,%s,%s,%s)", (nombre_completo, tipo_identificacion, numero_identificacion, correo_institucional, password, carrera, idCargo))
            mysql.connection.commit()
            return jsonify({"información":"Registro exitoso"})

    except Exception as e:
        print(e)
        return jsonify({"información":e})

@app.route('/add_proyecto', methods = ['POST'])
def add_proyecto():
    try:
        if request.method == 'POST':
            titulo = request.json['titulo']
            descripción = request.json['descripción']
            archivo = request.json['archivo']
            idEstudiante = request.json['idEstudiante']
            
            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO proyecto (titulo, descripción, archivo) VALUES (%s,%s,%s)", (titulo, descripción, archivo))
            mysql.connection.commit()

            idProyecto = cur.lastrowid

            cur.execute("INSERT INTO subir (idEstudiante, idProyecto) VALUES (%s, %s)", (idEstudiante, idProyecto))
            mysql.connection.commit()

            return jsonify({"información": "Registro exitoso"})
    except Exception as e:
        print(e)
        return jsonify({"información":e})

@app.route('/add_foro', methods = ['POST'])
def add_foro():
    try:
        if request.method == 'POST':
            asunto = request.json['asunto']
            descripción = request.json['descripción']
            nota = request.json['nota']
            idDocente = request.json['idDocente']
            idEstudiante = request.json['idEstudiante']
            idProyecto = request.json['idProyecto']
            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO foro (asunto, descripción, nota, idDocente, idEstudiante, idProyecto) VALUES (%s,%s,%s,%s,%s,%s)", (asunto, descripción, nota, idDocente, idEstudiante, idProyecto))
            mysql.connection.commit()
            return jsonify({"información": "Registro exitoso"})
    except Exception as e:
        print(e)
        return jsonify({"información":e})

@app.route('/add_evaluar', methods = ['POST'])
def add_evaluar():
    try:
        if request.method == 'POST':
            idDocente = request.json['idDocente']
            idProyecto = request.json['idProyecto']
            nota = request.json['nota']
            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO evaluar (idDocente, idProyecto, nota) VALUES (%s,%s,%s)", (idDocente, idProyecto, nota))
            mysql.connection.commit()
            return jsonify({"información": "Registro exitoso"})
    except Exception as e:
        print(e)
        return jsonify({"información":e})


######### ruta para actualizar################
@app.route('/update/estudiante/<id>', methods=['PUT'])
def update_estudiante(id):
    try:
        tipo_identificación = request.json['tipo_identificación']         
        numero_identificación = request.json['numero_identificación'] 
        nombre_completo = request.json['nombre_completo']                 
        correo_institucional = request.json['correo_institucional']     
        password = request.json['password']                           
        carrera = request.json['carrera']

        cur = mysql.connection.cursor()
        cur.execute("""
        UPDATE estudiante
        SET tipo_identificación = %s,
            numero_identificación = %s,
            nombre_completo = %s,
            correo_institucional = %s,
            password = %s,
            carrera = %s
        WHERE idEstudiante = %s
        """, (tipo_identificación, numero_identificación, nombre_completo, correo_institucional, password, carrera, id))
        mysql.connection.commit()
        return jsonify({"informacion":"Registro actualizado"})
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

@app.route('/update/docente/<id>', methods=['PUT'])
def update_docente(id):
    try:
        nombre_completo = request.json['nombre_completo']                 
        tipo_identificacion = request.json['tipo_identificacion']         
        numero_identificacion = request.json['numero_identificacion'] 
        correo_institucional = request.json['correo_institucional']     
        password = request.json['password']                           
        carrera = request.json['carrera']
        idCargo = request.json['idCargo']

        cur = mysql.connection.cursor()
        cur.execute("""
        UPDATE docente
        SET nombre_completo = %s,
            tipo_identificacion = %s,
            numero_identificacion = %s,
            correo_institucional = %s,
            password = %s,
            carrera = %s,
            idCargo = %s
        WHERE idDocente = %s
        """, (nombre_completo, tipo_identificacion, numero_identificacion, correo_institucional, password, carrera, idCargo, id))
        mysql.connection.commit()
        return jsonify({"informacion":"Registro actualizado"})
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

@app.route('/update/proyecto/<id>', methods=['PUT'])
def update_proyecto(id):
    try:
        titulo = request.json['titulo']                 
        descripción = request.json['descripción'] 
        archivo = request.json['archivo']     
        nota = request.json['nota']                           
        idEstado = request.json['idEstado']

        cur = mysql.connection.cursor()
        cur.execute("""
        UPDATE proyecto
        SET titulo = %s,
            descripción = %s,
            archivo = %s,
            nota = %s,
            idEstado = %s
        WHERE idProyecto = %s
        """, (titulo, descripción, archivo, nota, idEstado, id))
        mysql.connection.commit()
        return jsonify({"informacion":"Registro actualizado"})
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

@app.route('/delete_estudiante/<id>', methods = ['DELETE'])
def delete_estudiante(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute('DELETE FROM estudiante WHERE idEstudiante = %s', (id,))
        mysql.connection.commit()
        return jsonify({"informacion":"Registro eliminado"}) 
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

@app.route('/delete_docente/<id>', methods = ['DELETE'])
def delete_docente(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute('DELETE FROM docente WHERE idDocente = %s', (id,))
        mysql.connection.commit()
        return jsonify({"informacion":"Registro eliminado"}) 
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

@app.route('/delete_proyecto/<id>', methods = ['DELETE'])
def delete_proyecto(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute('DELETE FROM proyecto WHERE idProyecto = %s', (id,))
        mysql.connection.commit()
        return jsonify({"informacion":"Registro eliminado"}) 
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

# starting the app
if __name__ == "__main__":
    app.run(port=3000, debug=True)