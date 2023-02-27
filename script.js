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


        /*
        // display types
        let type1 = document.createElement('div');
        type1.innerText =  pokedex[i]['type-one'];

        let type2 = document.createElement('div');
        type2.innerText = pokedex[i]['type-two']; */

        pkm.innerText = `${i} ${pokedex[i]['name']}`

        // functionality to clicking on pokemon names
        pkm.addEventListener('click', updatePokemon); 

        // append divs with sprites in front/to the left
        pkm.prepend(pkmIm);
        pdList.append(pkm);
    }
    // expand card shows detail and should minimize the right sidebar
    document.getElementById('expand').addEventListener('click', expandCard); 
    console.log(pokedex);
});

function updatePokemon(){
    pkmHolder = this.id;
    document.getElementById('pkm-img').src = pokedex[this.id]['img'];
    document.getElementById('pkm-title').innerText = "#" +  this.id + " " + (pokedex[this.id].name).toUpperCase();
    document.getElementById('type-one').innerText = pokedex[this.id]['type-one'];
    if(pokedex[this.id]['type-two'] == 'none') document.getElementById('type-two').innerText = '';
    else document.getElementById('type-two').innerText = pokedex[this.id]['type-two'];
}


// when card expands also make side bar smaller
function expandCard(){
    let expander = document.getElementById('expand');
    expander.classList.add('expanded');

    let info = document.getElementById('pkm-info');
    info.classList.add('info-box');
    let tax = pokedex[pkmHolder]['taxonomy'];
    let height = pokedex[pkmHolder]['height'];
    let weight = pokedex[pkmHolder]['weight'];
    info.innerText = `The ${tax} | ${height} | ${weight}`

    // append description
    let description = document.getElementById('pkm-description');
    description.classList.add('desc-box');
    description.innerText = pokedex[pkmHolder]['desc'];
}

async function getPokemon(num){
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();
    let response = await fetch(url)
    let pkm = await response.json();

    //console.log(pkm);
    let pkmName = pkm.name; //return string
    let pkmTypeA = pkm.types[0]['type']['name']; 

    //not every pokemon have two types
    let pkmTypeB;
    try{
        pkmTypeB = pkm.types[1]['type']['name'];
    } catch(e){
        pkmTypeB = 'none';
    }

    //console.log(pkmTypeA);
    //console.log(pkmTypeB);

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

    //console.log(pkmSpc);
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
        "type-one" : pkmTypeA,
        "type-two" : pkmTypeB,

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