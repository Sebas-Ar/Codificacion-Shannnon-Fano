import React, { useState, useEffect } from 'react'
import Head from 'next/head'

const Home = () => {

  const [mensaje, setMensaje] = useState('')
  const [repeticiones, setRepeticiones] = useState([])
  const [alfabeto, setAlfabeto] = useState([])
  const [longitudM, setLongitudM] = useState(0)
  const [longitudN, setlongitudN] = useState(0)
  const [orden, setOrden] = useState([]);
  const [ordenLetras, setOrdenLetras] = useState([])
  const [codificacion, setCodificacion] = useState([])
  const [entropia, setEntropia] = useState(0)
  const [Longitud, setLongitud] = useState(0)
  const [compresion, setCompresion] = useState(0);
  const [eficiencia, setEficiencia] = useState(0)

  const setText = e => {
    setMensaje(e.target.value)
  }

  useEffect(() => {




    let cont = 0; // Contador de repeticiones de cada simbolo
    let amplitud = [] //
    let unico = []


    let vectorMensaje = Array.from(mensaje)

    //obtenemos los simbolos del mensaje sin repetición
    let uniqs = vectorMensaje.filter(function (item, index, array) { //aplicamos la funcion .filter para seleccionar
      return array.indexOf(item) === index;                          // los simbolos, ignorando las repeticiones
    })

    setLongitudM(vectorMensaje.length) // guardamos el tamaño del mensaje
    setlongitudN(uniqs.length) // guardamos el tamaño del alfabeto

    setAlfabeto(uniqs)

    // -------- Obtenemos las veces que se repite cada simbolo en el mensaje ------------

    for (let i = 0; i < vectorMensaje.length; i++) { //Recorremos el vector del mensaje

      cont = 0 // inicializamos el contador que va a encontrar el numero de repericiones

      for (let j = 0; j < vectorMensaje.length; j++) { //comparamos la primera letra
        if (vectorMensaje[i] === vectorMensaje[j]) {   //y contamos un areptecición cada vez que
          cont = cont + 1;                             //esa primera letra sea encontrada al
        }                                              //recorrer el vector mensaje.
      }                                                //Asi con cada una de las letras

      amplitud[i] = cont + vectorMensaje[i]  //asignamos el numero de repeticiones a cada simbolo

      unico = amplitud.filter(function (item, index, array) {  //eliminamos los valores repetidos
        return array.indexOf(item) === index;
      })

    }

    setRepeticiones(unico)

    // -------------- Ordenar por Probabilidad --------------------------
    let vectorProbabilidad = []
    let vectorOrdenado = []
    let vectorLetras = []
    let mayor = 0;
    let posicion = 0;
    let probabilidades = []

    // separamos las veces que se repite cada simbolo en un vector diferente.,
    // el cual será nuestro vector de probabilidad
    for (let i = 0; i < unico.length; i++) {
      vectorProbabilidad[i] = parseInt(unico[i].split('', 1), 10)//aplicamos parseInt para la repeticion a un entero,
      //                                                           luego .split para volverlo un vector y seleccionar el 
      //                                                           primer valor. que es el que guardamos.

      probabilidades[i] = parseInt(unico[i].split('', 1), 10)// este veclor es lo mismo que el anterior
    }

    // Ordenamos el vector de probabildad de mayor a menor
    // para poder ordenar los simbolos de mayor a menor probabilidad 

    for (let i = 0; i < unico.length; i++) { //elegimos el primero valor del vector

      mayor = 0 //inicializamos el valor que va a encontrar el valor mayor

      for (let j = 0; j < unico.length; j++) {//recorremos el vector nuevamente
        //                                              para poder compara el valor seleccionado
        //                                              con el resto

        if (mayor < vectorProbabilidad[j]) { //cada vez que encuentre un valor mayor
          mayor = vectorProbabilidad[j]      //almacenamos el valor
          posicion = j                       //almacenamos la posicion
        }

      }
      vectorOrdenado[i] = mayor //creamos el vector que se va ordenando de mayor a menor 

      vectorLetras[i] = uniqs[posicion] // del mismo modo que ordenamos las probabilidades,
      // ordenamos los simbolos

      vectorProbabilidad[posicion] = 0// finalmente volvemos 0 el valor mayor que encontramos 
      //                                       para no confundirlo con el siguiente valor mayor

      // ---------------- VOLVEMOS A REPETIR EL BUCLE HASTA ORDENAR AMBOS VECTORES
    }

    setOrden(vectorOrdenado)
    setOrdenLetras(vectorLetras)
    
    // ------------ empezar distribuir -----------------------------

    let tramasNumeros = []
    let binarios = []
    let trama = []
    let tramaLetras = []
    let letras = []
    let suma = 0
    let mitad = 0
    let posMitad = 0
    let tamañoDerecha = 0
    let tamañoIzquierda = 0

    let tamaño = 0;

    let izquierda = 0;
    let derecha = 0;

    tramasNumeros[0] = vectorOrdenado //guardamos las probabilidades en la primera posicion de un vector,
    //                                //donde posteriormente iremos agregando la parte izquierda y derecha
    //                                //con sus respectios 1's y 0's en las siguientes posiciones de dicho 
    //                                //vector al final del siguiente bucle

    tramaLetras[0] = vectorLetras //hacemos lo mismo con las letras

    let lenght = vectorOrdenado.length

    for (let j = 0; j < lenght - 1; j++) {//el bucle se va a repetir la cantidad de letras - 1


      trama = tramasNumeros[0] //guaradamos la primera posicion de probabilidades,
      //                       //que acabamos de agregar, en un vector

      letras = tramaLetras[0] //igualmente con las letrasA
      
      suma = 0; // inicializamos la valible que va a encontrar la suma de las probabilidades
      
      for (let i = 0; i < trama.length; i++) { //recorremos el vector de probabilidades
        suma += trama[i]                       //y sumamos cada posicion
      }
      
      mitad = 0 //inicializamos la varible que va a encontrar el valor mas cercano a la mitad
                //por la izquierda

      posMitad = 0 //inicializamos la variable donde guardaremos la posicion donde trazar la linea

      for (let i = 0; i < trama.length; i++) {//recorremos el vector de probabilidades
        mitad += trama[i]                     //empezamos a sumar las posiciones
        if (mitad <= suma / 2) {              //este if va a guarda la ultima
          posMitad = i                        //posicion de la izquierda de la mitad
          izquierda = mitad                   //tambien guardamos el valor sumado en ese punto
          derecha = mitad + trama[i+1]        //y el valor de la derecha
        }
      }

      if (suma / 2 - izquierda > derecha - suma / 2) {//calculamos la diferencia que hay entre el
        posMitad += 1                                 //valor de la derecha a la mitad y lo mismo con
      }                                               //el de la izquierda. entonces guardamos la posicion
      //                                              //que este mas cercana, osea la menor

      tamañoDerecha = 0 //inicializamos una variable donde guardar el tamaño de la derecha
      for (let i = posMitad + 1; i < letras.length; i++) {//recorremos la parte derecha
        letras[i] += '1'                                  //a cada letra le agregamos un '1'
        tamañoDerecha += 1                                //sumamos la cantidad de posiciones para
      }                                                   //hallar el tamaño de la derecha

      tamañoIzquierda = 0 //realizamos el mismo ejercicio con la izquierda
      for (let i = posMitad; i >= 0; i--) {
        letras[i] += '0'                    //a excepcion que a esta letras le agregamos un '0'
        tamañoIzquierda += 1
      }

      let letrasDerecha = letras.splice(posMitad + 1, tamañoDerecha)//recortamos el vector de letras 
      //                                                            //para sacar solo la parte derecha
      let letrasIzquierda = letras.splice(0, posMitad + 1)//recortamos el vector de letras para  
      //                                                  //sacar la parte izquierda

      let numerosDerecha = trama.splice(posMitad + 1, tamañoDerecha)//recortamos el vector de probabilidades
      //                                                            //para sacar solo la parte derecha
      let numerosIzquierda = trama.splice(0, posMitad + 1)//recortamos el vector de probabilidades para
      //                                                  //sacar la parte izquierda

      let sizeDerecha = letrasDerecha.length //obtenemos la cantidad de letras de la derecha
      let sizeIzquierda = letrasIzquierda.length//obtenemos la cantidad de letras de la izquierda

      if (sizeIzquierda === 1) {          //si solo tenemos una letra a la izquierda
        binarios.push(letrasIzquierda[0]) //guardamos esa letra con los 1's y 0's
      }                                   //en el vector final
      
      if (sizeDerecha === 1) {            //si solo tenemos una letra a la derecha
          binarios.push(letrasDerecha[0]) //guardamos esa letra con los 1's y 0's
      }                                   //en el vector final
      
      tramaLetras.shift()//eliminamos el vector de letras que acabamos de analizar

      if (sizeIzquierda > 1) {            //si son más de 1 letra a la izquierda
        tramaLetras.push(letrasIzquierda) //agregamos ese vector a la ultima posicion  
      }                                   //para analizarlo nuevamente en el bucle

      if (sizeDerecha > 1) {           //si son más de 1 letra a la derecha
        tramaLetras.push(letrasDerecha)//agregamos ese vector a la ultima posicion  
      }                                //para analizarlo nuevamente en el bucle

      tramasNumeros.shift()//eliminamos el vector de probabilidades que acabamos de analizar

      if (numerosIzquierda.length > 1) {    //si son más de 1 probabilidad a la izquierda
        tramasNumeros.push(numerosIzquierda)//guardamos ese vector para analizarlo 
      }                                     //nuevamente en el bucle

      if (numerosDerecha.length > 1) {    //si son más de 1 probabilidad a la derecha
        tramasNumeros.push(numerosDerecha)//guardamos ese vector para analizarlo 
      }                                   //nuevamente en el bucle
  
    }

    

    let sumatoriaEntropia = 0
    let sumatoriaLongitud = 0
    let comp = 0
    let eficien = 0

    for (let i = 0; i < binarios.length; i++) {
      sumatoriaEntropia -= ((probabilidades[i] / vectorMensaje.length) * (Math.log2(probabilidades[i] / vectorMensaje.length)))
    }

    setEntropia(sumatoriaEntropia.toFixed(3))

    console.log(probabilidades)
    console.log(binarios)
    console.log(unico)
    let probabilidadesOrdenado = []

    for (let i = 0; i < unico.length; i++) {
      for (let j = 0; j < binarios.length; j++) {
        if(binarios[i][0][0] === unico[j][1]) {
          console.log(binarios[j][0])
          probabilidadesOrdenado[i] = parseInt(unico[j][0])
        }
      }
    }

    console.log(probabilidadesOrdenado)

    for (let i = 0; i < binarios.length; i++) {
      sumatoriaLongitud += (probabilidadesOrdenado[i] / vectorMensaje.length) * (binarios[i].length - 1)
    }

    setLongitud(sumatoriaLongitud.toFixed(3))

    comp = (Math.log2(uniqs.length) / sumatoriaLongitud)

    setCompresion(comp.toFixed(3))

    eficien = sumatoriaEntropia / sumatoriaLongitud

    setEficiencia(eficien.toFixed(3))


    console.log(binarios)


    let trama2 = ''
    let binarios2 = []

    for (let i = 0; i < binarios.length; i++) {
      binarios2[i] = binarios[i]
    }

    for (let i = 0; i < binarios2.length; i++) {
      binarios2[i] = binarios2[i].split('')
    }

    for (let i = 0; i < binarios2.length; i++) {
      binarios2[i].shift()
    }

    for (let i = 0; i < binarios2.length; i++) {
      binarios2[i] = binarios2[i].join('')
    }

    console.log('binarios2')
    console.log(binarios2)


    for (let i = 0; i < mensaje.length; i++) {
      for (let j = 0; j < binarios.length; j++) {
        if (binarios[j][0] === mensaje[i]) {
          trama2 += binarios2[j]
        }
      }
    }

    console.log(trama2)

    //agregamos una flecha entre el simbolo y su secuancia Binaria
    for (let i = 0; i < binarios.length; i++) {
      binarios[i] = binarios[i].split('')
      binarios[i][0] = binarios[i][0] + ' -> '
    }

    setCodificacion(binarios) 

  }, [mensaje])




  return (
    <div className="container">
      <Head>
        <title>CODIFICACIÓN SHANNON - FANO</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>SHANNON - FANO</h1>

      <main>
        <div className="textos">

          <input type="text" onChange={setText} />
          <br />
          <p>{'M = {' + mensaje + '}'}</p>
          <br />
          <p>{'A = {' + alfabeto + '}'}</p>
          <br />
          <p>{'Lm = {' + longitudM + '}'}</p>
          <br />
          <p>{'n = {' + longitudN + '}'}</p>
          <br />
          <p>{'Entropia: ' + entropia}</p>
          <br />
          <p>{'longitud: ' + Longitud}</p>
          <br />
          <p>{'compresión: ' + compresion}</p>
          <br />
          <p>{'eficiencia: ' + eficiencia * 100 + '%'}</p>
        </div>

        <div>
          {
            codificacion.map(dato => (
              <p key={dato}>{dato}</p>
            ))
          }
        </div>
      </main>

      <footer>
        <div className="text">
          <p>Sebastian Arias</p>
          <div className="linea"></div>
          <p>Camila Hernandez</p>
          <div className="linea"></div>
          <p>Camilo Duran</p>
        </div>
        <a
          href="https://www.usta.edu.co/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Universidad Santo Tomás <img src="/img/usta.png" alt="ZEIT Logo" />
        </a> <br />
      </footer>

      <style jsx>{`

          h1 {
            color: white;
          }

      .container {
        min-height: 100vh;
        padding: 0 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      input {
        border-radius: 20px;
        border: 1px solid #33333344;
        padding: 10px;
        outline: none;
        text-align: center;
      }

      .text {
        display: grid;
        grid-template-columns: 1fr 1px 1fr 1px 1fr;
        width: 500px;
        display: gird;
        align-items: center;
        justify-items: center;
      }

      .linea {
        width: 2px;
        height: 15px;
        background-color: white;
      }

      .text > p {
        width: 150px;
      }

      .textos > p {
        text-align: center;
        margin: 0;
      }

      main {
        padding: 5rem 0;
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        justify-items: center;
        border-radius: 30px;
        margin: 10px;
        padding: 30px;
        background: #2C3E5044;
      }

      :globla(body) {
        background: linear-gradient(180deg, #4ecdc4 0%, #556270 100%);
      }

      footer {
        width: 100%;
        height: 100px;
        border-top: 1px solid #eaeaea;
        display: grid;
        justify-items: center;
      }

      p {
        color: white;
      }

      footer img {
        margin-left: 0.5rem;
      }

      footer a {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      img {
       width: 30px; 
      }

      a {
        text-decoration: none;
        color: white;
      }

      footer img {
        margin-left: 0.5rem;
      }

      footer a {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      footer p {
        align-self: center;
        text-align: center;
      }

    `}</style>

      <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
    </div>
  )
}

export default Home
