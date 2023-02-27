const pkmCount = 151;

let pokedex = {}; //contains each pokemon entry
const pdList = document.getElementById('pd-container'); //append each pokemon here

const pkmDisplay = document.getElementById('pokemon-display'); 
let pkmHolder = 1;

// populate pokedex list
document.addEventListener('DOMContentLoaded', async () =>{
    for(let i = 1; i<= 10; i++){
        await getPokemon(i);
        let pkm = document.createElement('div');
        pkm.id = i; 

        //create sprites
        let pkmIm = document.createElement('img');
        pkmIm.src = pokedex[i]['icon-sprites']; 

        pkm.innerHTML = `${i} ${pokedex[i]['name']}`

        pkm.addEventListener('click', updatePokemon); 

        pkm.prepend(pkmIm);
        pdList.append(pkm);
    }
    document.getElementById('expand').addEventListener('click', expandCard); //add event listener to expand button
    console.log(pokedex);
});

function updatePokemon(){
    //console.log(this.id)
    pkmHolder = this.id;
    document.getElementById('pkm-img').src = pokedex[this.id]['img'];
    document.getElementById('pkm-title').innerText = "#" +  this.id + " " + (pokedex[this.id].name).toUpperCase();
}


function expandCard(){
    let expander = document.getElementById('expand');
    expander.classList.add('expanded');

    let info = document.getElementById('pkm-info');
    info.classList.add('info-box');
    let tax = pokedex[pkmHolder]['taxonomy'];
    let height = pokedex[pkmHolder]['height'];
    let weight = pokedex[pkmHolder]['weight'];
    info.innerText = `${tax} | ${height} | ${weight}`
    //info.append(infoText);


    // append description
    let description = document.getElementById('pkm-description');
    description.classList.add('desc-box');
    description.append(pokedex[pkmHolder]['desc']);
}

/*
let description = document.createElement('div');
function expandCard(num){
    // enter expanded view
    pkmDisplay.classList.add('expanded'); //add expanded style, make card bigger

    console.log('you clicked on the ' + num)
    // description
    description.innerText = pokedex[this.id]['name'];
    pkmDisplay.append(description);
}  */

async function getPokemon(num){
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();
    let response = await fetch(url)
    let pkm = await response.json();

    //console.log(pkm);
    let pkmName = pkm.name; //return string
    let pkmTypes = pkm.types; //return array
    let pkmImg = pkm.sprites.other['official-artwork']['front_default']; //return img
    let pkmHeight = pkm.height;
    let pkmWeight = pkm.weight;
    let pkmAb = pkm.abilities; //return array
    let pkmExp = pkm['base_experience'];
    let pkmStats = pkm.stats;
    let pkmMoves = pkm.moves;
    let pkmSprites = pkm.sprites['front_default'];
    let pkmIcon = pkm.sprites['versions']['generation-vii']['icons']['front_default'];

    response = await fetch(pkm.species.url);
    let pkmSpc = await response.json(); //pokemon species 

    console.log(pkmSpc);
    let pkmDesc = pkmSpc['flavor_text_entries'][0]['flavor_text'];
    let pkmTx = pkmSpc.genera[7]['genus'];
    let pkmHap = pkmSpc['base_happiness'];
    let pkmCR = pkmSpc['capture_rate'];
    let pkmEgg = pkmSpc['egg_groups'];
    let pkmHatch = pkmSpc['hatch_counter'];
    let pkmHab = pkmSpc.habitat;
    //let pkmEvo = pkmSpc['evolution_chain'];

    // pokemon object
    pokedex[num] = {
        // in small card view
        "name" : pkmName, 
        "img" : pkmImg, 
        "types" : pkmTypes,

        // expanded view left side
        "taxonomy" : pkmTx,
        "height" : pkmHeight,
        "weight" : pkmWeight,
        "desc" : pkmDesc,

        // misc info
        "abilities" : pkmAb,
        "base-exp" : pkmExp,
        "base-hap" : pkmHap,
        "catch-rate" : pkmCR,
        "egg-group" : pkmEgg,
        "hatch-counter" : pkmHatch,
        "habitat" : pkmHab,

        // info needed for other stuff
        //"evo-chain" : pkmEvo,
        "stats" : pkmStats,
        "moveset" : pkmMoves,
        "evo-sprites" : pkmSprites,
        "icon-sprites" : pkmIcon
    }
}