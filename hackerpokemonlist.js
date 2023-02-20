/**
 * JS (also referred to as ECMAScript) has nothing to do with Java apart from some syntactic similarity.
 * It is usually referred to as an Interpreted language, rather than a Compiled 
 * language. This means that JavaScript code runs, from the top of the script file, without any compilation. 
 * Variables and methods in JavaScript are 'hoisted' to the top of the file prior to it being run.
 * 
 * Variables in JavaScript can be declared with let, var, or const. Only let can be block-scoped (ie the variable
 * only exists with a single for loop or if statement block). Var, let, and const all have access to global scope,
 * function scope, and lexical scope (don't worry about lexical scope.) Const variables can not be changed. Let and
 * const variables were introduced to Javascript in version ES6, and browsers that still run ES5 (Internet Explorer)
 * only have access to var.
 * 
 * The type is not provided in JavaScript because it is a loosely-typed language. JavaScript still considers types,
 * however (it considers Number, Object, Boolean, String), and will "coerse" one type into another when needed. 
 * For instance, 4=="4" is true. In this case, we could also have a comparison that considers types with ===, where 
 * 4===4 is true, but 4==="4" is false.
 * 
 * Nothing in this file needs to be changed. It can guide you through the remaining JavaScript 
 */
const apiUrl = "abc";
let allPokemon = getPokemonFromAPI(apiUrl);
loadPokemon();
/**
 * Set a variable named loadPokemonButton to a button retrieved from the DOM (document-object-model), a tree-like 
 * representation of all elements on the webpage. Once it is retrieved, set the loadPokemonButton's onclick to the 
 * loadPokemon method. Functions can be passed like variables in JavaScript. This also means that functions can be 
 * passed as a parameter to another function, so that they can be used later - this common structure is referred to 
 * as a 'callback function.' loadPokemon() is being used in this manner, and will be executed by some other function
 * in JavaScript when the click event fires.
 */
let loadPokemonButton = document.getElementById("loadButton");
loadPokemonButton.onclick = loadPokemon;
/**
 * Retrieve an input from the DOM (document-object-model) as a JS Object. value (the text that the user has written 
 * inside the box) is a property of this Object that can be read or modified.
 */
let pokemonNameInput = document.getElementById("nameInput");
/**
 * Retrieve a span from the DOM (document-object-model.) innerHTML and innerText is a properties of this Object 
 * that can be read or modified. 
 */
let pokemonSpan = document.getElementById("content");
/**
 * This function will leverage the other methods written to fetch a list of pokemon over the web, and then append them
 * to the site when loadPokemonButton.onclick fires. 
 * 
 * In ES6, Functions can also be written in Arrow Function format - eg let myfunction1 = () => {};
 */
function loadPokemon(){
    let nameSearchValue = nameInput.value;
    let filteredPokemon = filterPokemon(nameSearchValue, filterByName);
    let filteredPokemonListElement = generatePokemonList(filteredPokemon);
    appendPokemonToSpan(filteredPokemonListElement);
}
/**
 * This function will use the fetch API to set a GET request to a free online API that is expected to return an array of
 * all original Pokemon. 
 * 
 * The keywords async/await are used, because retrieving information over the web is not instantaneous, so we must inform 
 * JavaScript to 'await' the web response. 'Async' allows JavaScript to continue to run other operations while waiting, 
 * which allows the site to remain responsive and event-driven.
 * 
 * @returns An array of Pokemon objects
 */
async function getPokemonFromAPI(url){
    let pokemon = await fetch(url);
    console.log("Recieved response from pokemon API: "+ pokemon)
    return pokemon;
}
/**
 * This function will be used to generate a new list of Pokemon, using for loops to iterate over an array of Pokemon,
 * creating HTML elements to represent each pokemon.
 * Pokemon objects are quite detailed. For the sake of the site, we can assume the following JSON
 * sample structure of the Pokemon list:
 * PokemonList {
 *      results: [
 *          {name:"pikachu",
 *           abilities: ["scratch", "zap"],
 *           sprites: []
 *          },
 *          {name:"bulbasaur",
 *           abilities: ["scratch", "zap"],
 *           sprites: []
 *          }
 *      ]
 * }
 * Always be careful when dealing with JS Objects, as JS will not cause exceptions when you try to access
 * non-existent elements, rather this will result in an "undefined" value.
 * @param {} pokemonArray 
 */
function generatePokemonList(pokemonResponse){
    pokemonArray = pokemonResponse.results;
    let list = document.createElement("ul");
    for(let i = 0; i < pokemonArray.length; i++){
        let listItem = document.createElement("li");
        listItem.innerText = pokemonArray[i].name;
        console.log("Created list element: " + listItem);
    }
    
}
/**
 * Given a List element containing pokemon, clear the original contents of the span element and replace it
 * by appending the list to the actual DOM so that it will be rendered on the page.
 * @param {*} pokemonListElement 
 */
function appendPokemonToSpan(pokemonListElement){
    console.log("About to append element: "+pokemonListElement);
    pokemonSpan.innerHTML = "";
    pokemonSpan.appendChild(pokemonListElement);
}
/**
 * This function will leverage a callback function as a parameter, which will allow a function to be used within the
 * method. This might be useful if we would like to change the filterFunction that is used - what if we wanted to
 * reuse this method to filter all pokemon by their abilities?
 * 
 * This function could also be shorted as return allPokemon.filter(pokemon.name.contains(searchInput));
 * JS arrays are provided with the functions filter, map (apply a callback function to all elements), and reduce 
 * (use a callback function to combine all items into a single item eg sum).
 * @param {*} filterFunction 
 */
function filterPokemon(nameInput, filterFunction){
    
    let filteredPokemon = [];
    for(let i = 0; i < allPokemon.length; i++){
        let shouldPokemonBeDisplayed = filterFunction(allPokemon[i], nameInput)
        if(shouldPokemonBeDisplayed){
            filteredPokemon.push(allPokemon[i]);
        }
    }
    return filteredPokemon;
}
/**
 * This function will return true or false depending on if the pokemon should be displayed. It will be used as a
 * callback function in the filterPokemon function. A callback function is a function that is passed into another 
 * function as a parameter.
 * 
 * Because variables in JS are loosely typed, any value can be used as a boolean. This means that the variable
 * undergoes implicit type-coersion into a boolean when code attempts to use it as a boolean. In JS, there are
 * "truthy" and "falsy" values - 0, null, "", are "falsy" values. This means we can sometimes shorten our code
 * for cases when some value does not exist, in this case, if nameInput does not exist, assume the pokemon list
 * should be unfiltered and that any pokemon should be returned.
 */
function filterByName(pokemon, nameSearchValue){
    if(!nameSearchValue){
        return true
    }
    if(pokemon.name.contains(nameSearchValue)){
        return true;
    }else{
        return false;
    }
}