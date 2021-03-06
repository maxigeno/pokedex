const URL_ALL_POKEMONs = 'https://pokeapi.co/api/v2/pokemon?limit=151';
let allPokemonsInfo=[];
let correctAnswer = '';

//DOM 
const $pokeImage = document.getElementById("poke-image");
const $answersList = document.getElementById("poke-answers");
const $loader =document.getElementById('loader')

const getRandomNumbers = (max=150) =>Math.floor(Math.round(Math.random() * max) + 1);

const getAllPokemons =  async ( ) =>{
  $loader.style.display = "block";
  const res = await fetch(URL_ALL_POKEMONs);
  const allPokemons = await res.json();
  console.log(allPokemons);
  //.map(cb) - Transforma todos los el. del array y devuelve un nuevo array.
  allPokemonsInfo = allPokemons.results.map((pokemon) => pokemon.name);
  getAnwers();
};

const getAnwers = (answers = 5) => {
  const options = []; //creo un array para las opciones.
  let currentPokemon = allPokemonsInfo[ getRandomNumbers()]; //elijo un poke. al azar.
  options.push(currentPokemon); //y meto en el array del options el pokemon.

  //mientras que el arrays  options sea menor alas cantidad de poke que quiero sigo agregando poke al aray
  while (options.length < answers) {
    const newAnswerPokemon = allPokemonsInfo[getRandomNumbers()];
    //si options no contiene el new pokemon  ,entonces si lo agrego.
    if (!options.includes(newAnswerPokemon) ) {
      options.push(newAnswerPokemon);
    }
  };
  //Guardo la respuesta correcta
  correctAnswer = options[0] ;

  //desordenos los nombres ya que el primero siempre sera el correcto
  allAnswers = options.sort(() => Math.random() - 0.5 );

  writeAnswers(allAnswers);

};

const capitalize =(word) =>word[0].toUpperCase() + word.slice(1);

const writeAnswers = (answers) => {
//vacio las opciones para q recetee a cero  a cada llamada
  $answersList.textContent= '' ;
  const $fragment = document.createDocumentFragment() ;
  for (const answer of answers) {
    const $li = document.createElement( 'li' ) ;
    $li.textContent = answer ;
    $fragment.appendChild($li) ;
  }
  $loader.style.display ='none' ;
  $pokeImage.classList.remove('game__image--show') ;
 $pokeImage.src = `/docs/assets/image/generación-1/gif/${correctAnswer}.gif`;
  $answersList.appendChild($fragment);
};

 $answersList.addEventListener('click',(e) =>{
   //confirmo que sea haga click en un tag que sea Li
    if (e.target.tagName === 'LI') {
      //Y COMPARO QUE EL TEXTCONTENT DEL LI SEA IGUAL A LA RESPUESTA COREECTA GUARDADA
        if (e.target.textContent === correctAnswer) {
          $pokeImage.classList.add("game__image--show");
          setTimeout(() =>getAnwers(), 2500 ) ;
          console.log("CORREcTO");
        }else{
          console.log("FALLASTE");
        }
    }
 });
getAllPokemons();

