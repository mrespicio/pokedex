const pkmCount = 151;

let pokedex = {}; //contains each pokemon entry
const pdList = document.getElementById('pd-container'); //append each pokemon here

const pkmDisplay = document.getElementById('pokemon-display'); 
let pkmHolder = 1;

let expander = document.getElementById('expandable');
let listSize = document.getElementById('pokedex-list');

// populate pokedex list
document.addEventListener('DOMContentLoaded', async () =>{
    for(let i = 1; i<= 9; i++){
        await getPokemon(i);
        let pkm = document.createElement('div');
        pkm.id = i; 

        //create sprites
        let pkmIm = document.createElement('img');
        pkmIm.src = pokedex[i]['icon-sprites']; 
  
        // display types
        let type1 = document.createElement('div');
        type1.innerText =  pokedex[i]['type-one'];

        let type2 = document.createElement('div');
        type2.innerText = pokedex[i]['type-two']; 

        pkm.innerText = `${i} ${pokedex[i]['name']}`

        // functionality to clicking on pokemon names
        pkm.addEventListener('click', updatePokemon); 

        // append sprites to div w/ pokemon name on pokedex
        pkm.prepend(pkmIm);
        pdList.append(pkm);
    }
    // expand card shows detail and should minimize the right sidebar
    let expandBtn = document.getElementById('expand');
    let expStatus = document.getElementById('expandable');
    expandBtn.addEventListener('click', () => {
        if(expStatus.classList.contains('collapsed')) expandCard();
        else collapseCard();
    }); 
    //console.log(pokedex);
});



// changes pokemon on display when clicked on on the pokedex list
function updatePokemon(){
    pkmHolder = this.id;
    // update title and image
    document.getElementById('pkm-img').src = pokedex[this.id]['img'];
    document.getElementById('pkm-title').innerText = "#" +  this.id + " " + (pokedex[this.id].name).toUpperCase();

    // update types
    document.getElementById('type-one').innerText = pokedex[this.id]['type-one'];
    if(pokedex[this.id]['type-two'] == 'none') document.getElementById('type-two').innerText = '';
    else document.getElementById('type-two').innerText = pokedex[this.id]['type-two'];

    // left boxes

    // update right boxes
}

/* abilities variables */
function collapseCard(){
    // collapse the #expandable id, update styles
    expander.classList.remove('expanded');
    expander.classList.add('collapsed');
    listSize.classList.add('list-default');
    listSize.classList.remove('list-small');
}

function clearItem(item){
    while(item.lastElementChild) {
        item.removeChild(item.lastElementChild)
    }
}

// display information
function expandCard(){
    // expand the #expandable id, update styles
    expander.classList.remove('collapsed');
    expander.classList.add('expanded');
    listSize.classList.remove('list-default')
    listSize.classList.add('list-small');

    // information and description for pokemon
    let info = document.getElementById('pkm-info');
    let tax = pokedex[pkmHolder]['taxonomy'];
    let height = pokedex[pkmHolder]['height'];
    let weight = pokedex[pkmHolder]['weight'];
    info.innerText = `The ${tax} | ${height} | ${weight}`

    // append description
    let description = document.getElementById('pkm-description');
    description.innerText = pokedex[pkmHolder]['desc'];

    // append evolution chain
    let evoChain = document.getElementById('evo-box');
    evoChain.innerText = `this pokemon evolves from ${pokedex[pkmHolder]['evo-from']}`
    // pkmEvo
    let evolveFrom = pokedex[pkmHolder]['evo-from'];
    if(evolveFrom == null) console.log('none');
    else console.log(`this pokemon evolves from ${evolveFrom}`);


    let evolveChainArr = pokedex[pkmHolder]['evo-chain'];
    console.log(`this pokemon evolves to ${evolveChainArr}`)




    // append abilities
    //let abilities = document.getElementById('abilities-box');
    let regAb = document.getElementById('regular-abilities');
    let hidAb = document.getElementById('hidden-abilities');
    let abArray = pokedex[pkmHolder]['abilities'];

    clearItem(regAb);
    clearItem(hidAb);

    abArray.forEach(ob => {
        let tempAb = document.createElement('p');
        tempAb.innerText = ob['ability']['name'];
        if(ob['is_hidden'] == true) hidAb.appendChild(tempAb);
        else regAb.appendChild(tempAb);
    }); 


    // append catch rate
    let catchRate = document.getElementById('catch-box');
    catchRate.innerText = `Catch Rate: ${pokedex[pkmHolder]['catch-rate']}`; 

    //append habitat
    let habitat = document.getElementById('hab-box');
    habitat.innerText = `Habitat: ${pokedex[pkmHolder]['habitat']}`

    // append stats
    let stats = document.getElementById('stats-nums'); //append to this
    let statsArr = pokedex[pkmHolder]['stats'];
    let statHolder = document.createElement('div'); // append each stat to this

    // clear previous status
    clearItem(stats);

    statsArr.forEach(item => {
        let temp = document.createElement('p');
        temp.innerText = item['base_stat'];
        statHolder.appendChild(temp);
    });
    stats.append(statHolder);

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

    // from regular pokemon info
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

    // from species
    //console.log(pkmSpc);
    let pkmDesc = pkmSpc['flavor_text_entries'][0]['flavor_text'];
    let pkmTx = pkmSpc.genera[7]['genus'];
    let pkmHap = pkmSpc['base_happiness'];
    let pkmCR = pkmSpc['capture_rate'];
    let pkmEgg = pkmSpc['egg_groups'];
    let pkmHatch = pkmSpc['hatch_counter'];
    let pkmHab = pkmSpc['habitat']['name'];

    let pkmEvoFrom;
    try{
        pkmEvoFrom = pkmSpc['evolves_from_species']['name'];
    }
    catch{
        pkmEvoFrom = 'none';
    }

    // get chain from species
    //let chain = "https://pokeapi.co/api/v2/pokemon-species/" + num.toString();
    response = await fetch(pkmSpc['evolution_chain']['url']);
    let pkmEv = await response.json();
    let evoArr = pkmEv['chain']['evolves_to'][0]['species']['name']; // second evo
    console.log(pkmEv);

 
    /*
    // from evo chain
    let chain = "https://pokeapi.co/api/v2/evolution-chain/" + num.toString();
    response = await fetch(chain);
    let pkEv = await response.json();
    
    // return array
    let evoArr;
    try{
        evoArr = pkEv['chain']['evolves_to'][0]['species']['name'];
    }
    catch{
        evoArr = 'none';
    }

    //let reqArr = pkEv['chain']['evolves_to'];
    //console.log(evoArr); */

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
        "stats" : pkmStats,
        "moveset" : pkmMoves,
        "evo-sprites" : pkmSprites,
        "icon-sprites" : pkmIcon,

        //evolution
        "evo-from" : pkmEvoFrom,
        "evo-chain" : evoArr, // array with pokes it evolves into
        //"evo-chain-req" : idk // array w/ requirements to evolve pok

    }
}