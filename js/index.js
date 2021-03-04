const URL_ALL_POKEMONs = 'https://pokeapi.co/api/v2/pokemon?limit=151';
let allPokemonsInfo=[];
let correctAnswer = '';

//DOM 
const $pokeImage = document.getElementById("poke-image");
const $answersList = document.getElementById("poke-answers");

const getRandomNumbers = (max=150) =>Math.round(Math.random() * max +1);

const getAllPokemons =  async ( ) =>{
  
  const request = await fetch(URL_ALL_POKEMONs);
  const allPokemons = await request.json();
  allPokemonsInfo = [...allPokemons.results]; 
  //console.log(allPokemonsInfo);
  //console.log(getRandomNumbers());
   getAnwers()
          
};

const getAnwers = (answers = 3) => {
  const options = []; //creo un array para las opciones.
  let randomNumber = getRandomNumbers(); //guardo un numero al azar.
  let currentPokemon = allPokemonsInfo[randomNumber]; //elijo un pokemon al azar.
  options.push(currentPokemon); //y meto en el array del options el pokemon.

  //mientras que el arrays de las options sea menor alas cantidad de respuesta que quiero sigo agregando pokemons al aray
  while (options.length < answers) {
    randomNumber = getRandomNumbers();
    currentPokemon = allPokemonsInfo[randomNumber];

    //busco si en el array options  en los attributos name son diferente al name del pok. que guarde en currentpokemon, si es dieferente ahora si lo pongo en el array
    if (options.find(({ name }) => currentPokemon.name !== name)) {
      options.push(currentPokemon);
    }
  }
  //console.log(options);
  //guardo los names de los pokemon de las options
  let allAnswers = options.map((answer) => answer.name);

  //El substring() método devuelve un subconjunto de un objeto String.
  //sintaxis : cadena.substring(indiceA[, indiceB'])
  //El método replace() devuelve una nueva cadena con algunas o todas las coincidencias de un patrón, siendo cada una de estas coincidencias reemplazadas por remplazo. El patrón puede ser una cadena o una RegExp, y el reemplazo puede ser una cadena o una función que será llamada para cada coincidencia. Si el patrón es una cadena, sólo la primera coincidencia será reemplazada.
  //cadena.replace(regexp|substr, newSubStr|function[,  flags]);
  //obtengo solo los caracteres del string desdepues del caracter 34 que seria solo el id  y con replace elimino la barra final para tener solo el <numero> </numero>
  getPokeImage(options[0].url.substring(34).replace("/", " "));

  //GUARDO LA RESPUESTA CORRECTA
  correctAnswer = options[0].name;
  console.log(correctAnswer);

  //desordenos los nombres ya que el primero siempre sera el correcto
  allAnswers = allAnswers.sort(() => Math.random() - 0.5);
  writeAnswers(allAnswers);
  //console.log(allAnswers);
};

const getPokeImage =  async (id) =>{
   const request = await fetch(`https://pokeapi.co/api/v2/pokemon-form/${id}`);
  const pokeInfo = await request.json();
  
  console.log(pokeInfo);
  $pokeImage.src =pokeInfo.sprites.front_default;
  
};

const writeAnswers = (answers) => {
  const $fragment = document.createDocumentFragment();

  for (const answer of answers) {
    const $li = document.createElement('li');
    $li.textContent= answer;
    $fragment.appendChild($li);
  } 
  $answersList.appendChild($fragment);
};
 $answersList.addEventListener('click',(e) =>{
   //confirmo que sea haga click en un tag que sea Li
    if (e.target.tagName === 'LI') {
      //Y COMPARO QUE EL TEXTCONTENT DEL LI SEA IGUAL A LA RESPUESTA COREECTA GUARDADA
        if (e.target.textContent === correctAnswer) {
          console.log("CORREcTO");
        }else{
          console.log("FALLASTE");
        }
    }
 });
getAllPokemons();

