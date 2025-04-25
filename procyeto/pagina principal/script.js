let likeCount = 0;
const likeButton = document.getElementById('like-button');
const likeCountSpan = document.getElementById('like-count');
let liked = false;

likeButton.addEventListener('click', () => {
    if (!liked) {
        likeCount++;
        likeCountSpan.textContent = likeCount;
        likeButton.classList.add('liked');
        liked = true;
    } else {
        likeCount--;
        likeCountSpan.textContent = likeCount;
        likeButton.classList.remove('liked');
        liked = false;
    }
});

function cargarComentarios() {
    const nuevosComentariosDiv = document.getElementById('nuevos-comentarios');
    const comentariosGuardados = localStorage.getItem('comentarios');

    if (comentariosGuardados) {
        const comentarios = JSON.parse(comentariosGuardados);
        comentarios.forEach(comentario => {
            const nuevoComentarioDiv = document.createElement('div');
            nuevoComentarioDiv.classList.add('comment');
            nuevoComentarioDiv.innerHTML = `
                <div class="comment-avatar"></div>
                <div class="comment-content">
                    <p class="comment-author">${comentario.nombre}</p>
                    <p>${comentario.texto}</p>
                </div>
            `;
            nuevosComentariosDiv.appendChild(nuevoComentarioDiv);
        });
    }
}

function agregarComentario() {
    const nombreInput = document.getElementById('nombre');
    const comentarioInput = document.getElementById('comentario');
    const nuevosComentariosDiv = document.getElementById('nuevos-comentarios');

    const nombre = nombreInput.value.trim();
    const comentario = comentarioInput.value.trim();

    if (nombre && comentario) {
        const nuevoComentario = { nombre: nombre, texto: comentario };

        // Cargar comentarios existentes
        const comentariosGuardados = localStorage.getItem('comentarios');
        let comentarios = comentariosGuardados ? JSON.parse(comentariosGuardados) : [];

        // Agregar el nuevo comentario
        comentarios.push(nuevoComentario);

        // Guardar los comentarios actualizados
        localStorage.setItem('comentarios', JSON.stringify(comentarios));

        // Agregar el nuevo comentario a la interfaz
        const nuevoComentarioDiv = document.createElement('div');
        nuevoComentarioDiv.classList.add('comment');
        nuevoComentarioDiv.innerHTML = `
            <div class="comment-avatar"></div>
            <div class="comment-content">
                <p class="comment-author">${nombre}</p>
                <p>${comentario}</p>
            </div>
        `;
        nuevosComentariosDiv.appendChild(nuevoComentarioDiv);

        // Limpiar el formulario
        nombreInput.value = '';
        comentarioInput.value = '';
    } else {
        alert('Por favor, introduce tu nombre y comentario.');
    }
}

function compartirEnFacebook(title, url) {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`;
    window.open(facebookUrl, '_blank');
}

function compartirEnTwitter(title, url) {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
}

function compartirEnLinkedIn(title, url) {
    const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent('Descubre la fascinante obra de Gabriel Jiménez Emán en este blog.')}&source=${encodeURIComponent(window.location.hostname)}`;
    window.open(linkedinUrl, '_blank');
}

function processData(initialValue, transformations, conditional = () => true) {
    /**
     * Applies a series of functional transformations to an initial value.
     * Offers the innovation of conditionally applying transformations.
     *
     * Args:
     * initialValue: The starting value.
     * transformations: An array of functions, where each function takes a value
     * and returns a transformed value.
     * conditional: An optional function that takes the current value as input
     * and returns a boolean indicating whether the next transformation
     * should be applied. Defaults to always true.
     *
     * Returns:
     * The final transformed value after applying the sequence of functions
     * that meet the conditional criteria.
     */
    return transformations.reduce((currentValue, transform) => {
      if (conditional(currentValue)) {
        return transform(currentValue);
      }
      return currentValue;
    }, initialValue);
  }
  
  // Ejemplo de uso:
  
  // 1. Transformaciones básicas
  const multiplyByTwo = (x) => x * 2;
  const addFive = (x) => x + 5;
  const toString = (x) => String(x);
  
  const basicTransformations = [multiplyByTwo, addFive, toString];
  const initialNumber = 10;
  const resultBasic = processData(initialNumber, basicTransformations);
  console.log(`Resultado básico: ${resultBasic}`); // Salida: "25"
  
  // 2. Transformaciones condicionales
  const addTenIfEven = (x) => (typeof x === 'number' && x % 2 === 0 ? x + 10 : x);
  const makeUpperCaseIfString = (x) => (typeof x === 'string' ? x.toUpperCase() : x);
  
  const conditionalTransformations = [multiplyByTwo, addTenIfEven, toString, makeUpperCaseIfString];
  const resultConditional1 = processData(initialNumber, conditionalTransformations);
  console.log(`Resultado condicional 1: ${resultConditional1}`); // Salida: "30"
  
  const initialOddNumber = 7;
  const resultConditional2 = processData(initialOddNumber, conditionalTransformations);
  console.log(`Resultado condicional 2: ${resultConditional2}`); // Salida: "14"
  
  // 3. Usando la función 'conditional' para controlar la aplicación de transformaciones
  const applyAddFiveOnlyIfPositive = (value) => value > 0;
  
  const transformationsWithConditional = [multiplyByTwo, addFive];
  const resultWithPositiveCondition = processData(initialNumber, transformationsWithConditional, applyAddFiveOnlyIfPositive);
  console.log(`Resultado con condición positiva: ${resultWithPositiveCondition}`); // Salida: 25
  
  const initialNegativeNumber = -3;
  const resultWithNegativeCondition = processData(initialNegativeNumber, transformationsWithConditional, applyAddFiveOnlyIfPositive);
  console.log(`Resultado con condición negativa: ${resultWithNegativeCondition}`); // Salida: -6 (addFive no se aplica)
  
  // 4. Ejemplo más complejo con diferentes tipos de datos
  const addPropertyIfObject = (obj) => (typeof obj === 'object' && obj !== null ? {...obj, newProperty: true} : obj);
  const filterArrayIfArray = (arr) => (Array.isArray(arr) ? arr.filter(item => item > 2) : arr);
  
  const complexTransformations = [addPropertyIfObject, filterArrayIfArray, JSON.stringify];
  const initialObject = { name: "John", age: 30 };
  const resultComplexObject = processData(initialObject, complexTransformations);
  console.log(`Resultado complejo (objeto): ${resultComplexObject}`); // Salida: "{\"name\":\"John\",\"age\":30,\"newProperty\":true}"
  
  const initialArray = [1, 3, 2, 4, 5];
  const resultComplexArray = processData(initialArray, complexTransformations);
  console.log(`Resultado complejo (array): ${resultComplexArray}`); // Salida: "[3,4,5]"