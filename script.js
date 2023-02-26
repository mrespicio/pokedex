const pkmCount = 151;

// object containing all pokemon and their info

let pokedex = {}; //name, img, types, description, species, height, weight 

const pdList = document.getElementById('pd-container'); //append each pokemon here

document.addEventListener('DOMContentLoaded', async () =>{
    // ...create pokedex
    await getPokemon(1);
    console.log(pokedex);

})

async function getPokemon(num){
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();
    let response = await fetch(url)
    let pkm = await response.json();

    console.log(pkm);

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

    response = await fetch(pkm.species.url);
    let pkmSpc = await response.json(); //pokemon species 
    console.log(pkmSpc);
    let pkmDesc = pkmSpc['flavor_text_entries'][0]['flavor_text'];
    let pkmTx = pkmSpc.genera[7];
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
        "sprites" : pkmSprites
    }
}
