# DOCUMENTACIÓN
El proyecto en cuestión es una aplicación básica que realiza peticiones a una API REST.

La aplicación debe hacer lo siguiente:
- Desplegar todos los productos en el primer renderizado.
- Servir dinámicamente productos por categoría.
- Implementar un buscador de productos.
- Ordenar por nombre o precio de manera ascendente o descendente, según lo requiera el cliente.
Para ello debe realizar peticiones a una API que devuelva en formato JSON los datos filtrados.

## Tecnología
De acuerdo con lo solicitado en el ejercicio no se ha hecho uso de ningún framework. La aplicación usa las siguientes tecnologías:
- JavaScript de forma nativa
- HTML
- Bootstrap
- CSS
Se ha diseñado una vista sencilla(index.html), donde las categorías y los productos se irán cargando de forma dinámica.

## Scripts
Se ha utilizado un solo archivo, el cual es llamado desde el HTML:
index.js

Dentro de este ocurre lo siguiente:
- Se han declarado variables globales y métodos generales.
- Se han creado funciones para escuchar eventos y hacer peticiones a la API de a acuerdo a la acción realizada.
- Las funciones reciben el URL generado, modifican sus parámetros, hacen una petición a la API por medio del método fecth y obtienen una respuesta que se envía a renderizar.

## Mejoras implementadas
Se procedió a implementar puntos a mejorar en la aplicación cliente:
- Realizar búsqueda de productos al escuchar el evento de clic en un botón “Buscar”.
- Se corrigió el defecto de deformación de cards de productos agregando un ancho y alto fijo.
- Se muestra un mensaje de advertencia al intentar realizar una búsqueda de productos sin ingresar texto.
- Al presionar el botón reiniciar se limpia lo ingresado en la búsqueda y se elimina lo que se seleccionó en el filtrado.

## Vista
![image](https://user-images.githubusercontent.com/96211574/180867028-d3ee19e5-2232-445c-b157-569b04f8b318.png)

