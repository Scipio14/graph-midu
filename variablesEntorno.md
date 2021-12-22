# Manejo de las variables de entorno

1. Para usar las variables de entorno en una aplicación de Nodejs lo primero que se requiere es installar un paquete que se llama _dotenv_ .
2. Una vez instalado el paquete lo que se necesita es crear un archivo denominado _.env_ . El nombre del archivo tiene que ser obligatoriamente ese mismo. **No se le puede cambiar el nombre**, de otra forma no va a funcionar.  
   En ese archivo se va a introducir las variables de entorno que se quieran proteger como puede ser el número de puerto, la contraseña de acceso a una API o la conexión a una base de datos externa. Para ello se creará la variable de la siguiente forma:

```
PORT = 8969
DB = Esto es una prueba
```

Como se ve las variables no llevan comillas, ni tampoco se separan por comas ni punto y coma. Se definen una después de la otra.

3. El último paso es mandar a llamar a la dependencia **dotenv**. Eso lo hacemos en sintaxis antigua mediante el require

```javascript
require("dotenv").config();
```

En ES6 o sintaxis moderna usando babel lo que se utiliza la sintaxis del **import** de la siguiente manera:

```javascript
import {} from "dotenv/config";
```

De esta forma se puede utilizar las variables de entorno definidas.  
Por último recordar que el archivo .env debe de quedar ubicado en la raíz del proyecto.

4. Para proteger ese archivo hay que incluirlo en el _.gitignore_ que se crea del proyecto.
