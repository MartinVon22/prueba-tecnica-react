## VS-Code Plugins A Instalar:

    * Material Icon Theme
    * ESLint
    * Prettier

## Scripts disponibles para la aplicación Front-End:

    En la aplicación, puedes ejecutar los siguientes comandos:

    * npm start

        Lanza la aplicación en modo de desarrollo
        Abrir http://localhost:3000 para visualizar la misma en el navegador.

    * npm run lint

        Comprueba todo el código y hace un fix general del mismo.

    * npm run build

        Compila la aplicación para Modo Desarrollo en la carpeta "build"

    * npm run test

        Si bien se intentó integrar con Cypress para hacer un seguimiento de testing, por falta de tiempo y conocimiento no se pudo lograr integrar Cypress en el proyecto.

## Autocrítica

    Luego de terminar el desarrollo del Proyecto, me he dado cuenta que pude haber hecho algunas cosas un poco mejor. Por ejemplo el uso de Typescript me da la oportunidad
    de que tanto las funciones como las variables puedan tener un tipo y así llevar un control más preciso de la respuestas de las mismas o el uso de las variables.

    En la página que muestra el detalle del producto, pude haber puesto una regla la cual indica que si no se ha pasado un ID de producto mediante un state de la navegación,..
    ..regrese hacia el listado de Productos.

    El diseño es adaptativo para cualquier plataforma y se usó Material UI (MUI). Si bien se intentó llevar el mayor orden posible en cuanto a la estructura del diseño, creo que..
    ..han quedado algunos puntos para pulir.

    He volcado todos mis conocimientos en este proyecto en cuanto a realización y estructuración tanto de archivos, carpetas, funciones, como también en estrategias. Se que quizás,
    hay mejores maneras de realizar las tareas de la prueba técnica pero haciendo un poco de autocrítica y valorando mi trabajo creo que he logrado buenos resultados.

## Un poco más

    He combinado el uso de cookies con el storage del navegador, para tener más precisión en cuanto a los datos que devuelve la API. Guardo toda la información de la API, en el
    LocalStorage del navegador, y activo una cookie que tiene 1 hora de duración para indicar que los datos fueron persistidos en el storage. Si la cookie expira o es eliminada, la información vuelve a traerse desde la API, y si la Cookie aún no ha expirado pero los datos fueron borrados del LocalStorage, entonces también se traen nuevamente desde la API. Cada vez que la página que lista los Productos se recarga, si se cumplen las reglas anteriores los datos son tomados desde el LocalStorage, así teniendo una mayor rapidez encuanto al renderizado. Las imágenes son cargadas via lazy loading, los componentes que son renderizados por las rutas también.
