/**
 * This JS file will be for a different part of the pokemon site. Apart from displaying a list of all pokemon, the user
 * should be able to look up a particular pokemon by their ID and see information about the pokemon. Your task is to
 * implement a set of methods that would allow the user to see the pokemon's name as well as its sprite images.
 *
 * There is no need to change this code, it is needed for the remainder of this project
 */
let idInput = document.getElementById("idInput");
let loadButton = document.getElementById("loadButton");
let pokemonSpan = document.getElementById("content");
const apiBaseURL = "abc";
loadButton.onclick = fetchPokemonAndLoadContent();
/**
 * There is no need to change this method - it was written by a senior developer with 200 years of Microsoft experience
 */
async function fetchPokemonAndLoadContent(){
    pokemonSpan.innerHTML = "Loading pokemon, please wait...";
    let pokeURL = apiBaseURL + idInput.value;
    console.log("Attempting to fetch from pokeAPI url: "+pokeURL);
    pokemonResponse = await fetchPokemon(pokeURL);
    console.log("PokeAPI response: "+pokemonResponse);
    console.log("now attempting to change the header text of the site to "+pokemonResponse.result.name);
    changePokemonNameHeader(pokemonResponse.result.name);
    console.log("now attempting to filter these images: "+pokemonResponse.result.images)
    let filteredImages = filterSprites(pokemonResponse.result.images);
    console.log("the images after being filtered: "+ imageList);
    let imageList = generateImagesListElement(filteredImages);
    console.log("now attempting to append the following element to the site: " + imageList);
}
/**
 * TODO: Use the fetch API to return a JSON response of a pokemon of a particular id.
 * @param {*} url the URL that will be used to fetch a pokemon from the PokeAPI
 */
async function fetchPokemon(url){

}
/**
 * TODO: Modify the innerText of a Header that should display the pokemon name.
 * @param name a String representing the name of a pokemon
 */
function changePokemonNameHeader(name){

}
/**
 * TODO: Append an List element of pokemon sprites to the page. Remember to use <img> elements.
 * @param list an HTML element containing a list of all sprite images.
 */
function addPokemonImageElements(list){

}
/**
 * TODO: Using an array of sprites, return a List element containing all images, provided that the image is
 * non-null and should be generated.
 * @param sprites a list of the sprites would should be displayed to the site
 */
function generateImagesListElement(sprites){

}
/**
 * TODO: filter an array of sprites such that only Sprites with valid image URLs are returned from this method.
 * @param {*} allSprites An array containing ALL sprites fetched from PokeAPI
 * @param {*} filteringFunction A callback function which can be used to determine if a sprite should be displayed
 */
function filterSprites(allSprites, filteringFunction){
    return allSprites;
}
/**
 * TODO: Write a function intended to be used as a callback that determines if a sprite should be visible on
 * the page. Some sprites can be expected to have null URLs, so you will need to check if the URL is null.
 * Consider using truthy and falsy values...
 * 
 * The sprite image Object will follow the following format:
 * sprite {
 *  title:"front",
 *  url:"abc"
 * }
 * 
 * @param sprite An Object representing a sprite image.
 */
function shouldSpriteBeDisplayed(sprite){
    return true;
}