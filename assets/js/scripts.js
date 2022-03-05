const btnBuscar = document.querySelector("#buscar");
const numeroBuscar = document.querySelector("#numeroSuperhero");
const soloNumeros = /\d/;
// datos superhero
const detalleContenedor = document.querySelector("#detalleContenedor");
const nombreSuperhero = document.querySelector("#nombreSuperhero");
const imageSuperhero = document.querySelector("#imageSuperhero");
const tableSuperhero = document.querySelector("#detalleSuperhero");
const publicadoPor = document.querySelector("#publicadoPor");
const conexiones = document.querySelector("#conexiones");

btnBuscar.addEventListener("click", (event) => {
    event.preventDefault();
    const characterId = numeroBuscar.value;
    if(!soloNumeros.test(characterId)){
        alert("Ingrese un Número");
    }
    else{
    console.log("id ",characterId);
            fetch(`https://www.superheroapi.com/api.php/4905856019427443/${characterId}`)
            .then((respuesta) => {
                respuesta.json().then((data) => {
                    const nombre = data.name;
                    const image = data.image.url;
                    const publicadoPorDetalle = data.biography.publisher;
                    const primeraAparicion = data.biography["first-appearance"];
                    const ocupacion = data.work.occupation;
                    const altura = data.appearance.height.valueOf();
                    const peso = data.appearance.weight.valueOf();
                    const conexionesDetalle = data.connections["group-affiliation"];
                    const alias = data.biography.aliases.valueOf();
                    const valoresPoderes = [];


                    nombreSuperhero.innerHTML = nombre;
                    imageSuperhero.innerHTML = `<img src="${image}" alt="${nombre}" width="200px">`;
                    publicadoPor.innerHTML ="Publicado por: " + publicadoPorDetalle;
                    conexiones.innerHTML = conexionesDetalle;

                    Object.keys(data.powerstats).forEach(key => {
                        valoresPoderes.push({
                                y:  parseInt(data.powerstats[key]),
                                label: key,
                            })
                        })

                    detalleContenedor.style.visibility = "visible";
                   let contenidoTabla = `<tr>
                    <td>Ocupación:</td><td>${ocupacion}</td></tr>
                    <tr>
                    <td>Primera Aparición:</td>
                      <td>${primeraAparicion}</td>
                     </tr>
                    <tr>
                       <td>Altura:</td>
                       <td>${altura}</td>
                    </tr>
                    <tr>
                    <td>Peso:</td>
                    <td>${peso}</td>
                    </tr>`;

                    tableSuperhero.innerHTML = contenidoTabla;

                    //Canvas
                    var chart = new CanvasJS.Chart("chartContainer", {
                        theme: "light2",
                        animationEnabled: true,
                        title: {
                            text: "Estadisticas de poder para "+ nombre
                        },
                        subtitles: [{
                            text: "Alias: "+ alias,
                            fontSize: 16
                        }],
                        data: [{
                            type: "pie",
                            indexLabelFontSize: 18,
                            radius: 80,
                            indexLabel: "{label} - {y}",
                            yValueFormatString: "###0.0\"%\"",
                            click: explodePie,
                            dataPoints: valoresPoderes
                        }]
                    });
                    chart.render();

                    function explodePie(e) {
                        for(var i = 0; i < e.dataSeries.dataPoints.length; i++) {
                            if(i !== e.dataPointIndex)
                                e.dataSeries.dataPoints[i].exploded = false;
                        }
                    }
                })
            })
    }
});
