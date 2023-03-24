const pkmCount = 151;

const normal = '#C3C3C3';
const fire = '#FF9141';
const grass = '#3DAB3A';
const psychic = '#F4A4FB';
const ghost = '#786A9F';
const dragon = '#8867BD';
const poison = '#8854DC';
const fairy = '#FFC0DB';
const rock = '#AE9267';
const dark = '#6A6262';
const fighting = '#CB5050';
const water = '#4A92FF';
const electric = '#EACD37';
const ice = '#8AFFF8';
const ground = '#835F3E';
const flying = '#C6E0FF';
const bug = '#D3DFA1';
const steel = '#C8C8C8';


let pokedex = {}; //contains each pokemon entry
const pdList = document.getElementById('pd-container'); //append each pokemon here

const pkmDisplay = document.getElementById('pokemon-display'); 
let pkmHolder = 1;

let expander = document.getElementById('expandable');
let listSize = document.getElementById('pokedex-list');

// populate pokedex list
document.addEventListener('DOMContentLoaded', async () =>{
    for(let i = 1; i<= 25; i++){
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
});

function getColor(type){
    let colorCode = '';
    switch(type){
        case 'normal':
            colorCode = normal;
            break;
        case 'fire':
            colorCode = fire;
            break;
        case 'grass':
            colorCode = grass;
            break;
        case 'psychic':
            colorCode = psychic;
            break;
        case 'ghost':
            colorCode = ghost;
            break;
        case 'dragon':
            colorCode = dragon;
            break;
        case 'poison':
            colorCode = poison;
            break;
        case 'fairy':
            colorCode = fairy;
            break;
        case 'rock':
            colorCode = rock;
            break;
        case 'dark':
            colorCode = dark;
            break;
        case 'fighting':
            colorCode = fighting;
            break;
        case 'water':
            colorCode = water;
            break;
        case 'electric':
            colorCode = electric;
            break;
        case 'ice':
            colorCode = ice;
            break;
        case 'ground':
            colorCode = ground;
            break;
        case 'flying':
            colorCode = flying;
            break;
        case 'bug':
            colorCode = bug;
            break;
        case 'steel':
            colorCode = steel;
            break;
        default:
            colorCode = 'normal';
            break;
    }
    return colorCode;
}

// changes pokemon on display when clicked on on the pokedex list
function updatePokemon(){
    pkmHolder = this.id;
    // update title and image
    document.getElementById('pkm-img').src = pokedex[this.id]['img'];
    document.getElementById('pkm-title').innerText = "#" +  this.id + " " + (pokedex[this.id].name).toUpperCase();

    // update types
    /* primary type */
    let typeOne = document.getElementById('type-one'); //element
    typeOne.innerText = (pokedex[this.id]['type-one']).toUpperCase(); //text

    let typeOneColor = getColor(pokedex[this.id]['type-one']); //color code
    //console.log(typeOneColor);

    typeOne.style.backgroundColor = typeOneColor;


    /* secondary type */
    let typeTwo = document.getElementById('type-two');
    // no second type
    if(pokedex[this.id]['type-two'] == 'none'){
        typeTwo.innerText = '';
        typeTwo.classList.add('collapsed');
    } 
    else{
        typeTwo.classList.remove('collapsed');
        document.getElementById('type-two').innerText = (pokedex[this.id]['type-two']).toUpperCase();
        let typeTwoColor = getColor(pokedex[this.id]['type-two']); //color code
        typeTwo.style.backgroundColor = typeTwoColor;
    } 



    // left boxes
    // info
    let tax = pokedex[pkmHolder]['taxonomy'];
    let height = pokedex[pkmHolder]['height'];
    let weight = pokedex[pkmHolder]['weight'];
    document.getElementById('pkm-info').innerText = `The ${tax} | ${height} | ${weight}`;
    // description
    document.getElementById('pkm-description').innerText = pokedex[pkmHolder]['desc'];

    // right boxes
    //update evolution chain
    appendEvolutions();

    // update abilities
    appendAbilities();

    document.getElementById('catch-box').innerText = `Catch Rate: ${pokedex[pkmHolder]['catch-rate']}`; ;
    document.getElementById('hab-box').innerText = `Habitat: ${pokedex[pkmHolder]['habitat']}`;

    // update stats
    appendStats();
}

/* abilities variables */
function collapseCard(){
    // collapse the #expandable id, update styles
    expander.classList.remove('expanded');
    expander.classList.add('collapsed');
    listSize.classList.add('list-default');
    listSize.classList.remove('list-small');
        //expand button
        document.getElementById('expand').innerText = `click to expand`;
}

function clearItem(item){
    while(item.lastElementChild) {
        item.removeChild(item.lastElementChild)
    }
}

function getTypes(){
    
}
function appendEvolutions(){
    // append evolution chain
    let evoTreeDisplay = document.getElementById('evo-box');
    evoTreeDisplay.innerText = ''; //clear chain after ever reclick
    
    // traverse evolution tree/ append to display
    // *to do: if new evolution line, display another branch
    let evoTree = pokedex[pkmHolder]['evo-tree'];
    evoTree.traverseBFS((node) => {
        let pkmEvoString = node['data']; // name and url
        let pkmEvoArr = pkmEvoString.split(' '); 

        let pkmEvoName = pkmEvoArr[0]; //pokemon name

        let pkmEvoSprite = pkmEvoArr[1]; // raw url, string
        let pkmEvoSpriteArr = pkmEvoSprite.split('/'); //string
        let currentId = Number(pkmEvoSpriteArr[6]); // pokemon id

        // create sprite
        let evoSpriteItem = document.createElement('img');
        evoSpriteItem.src = pokedex[currentId]['icon-sprites']; 

        // append name and sprite
        evoTreeDisplay.append(pkmEvoName);
        evoTreeDisplay.append(' ');
        evoTreeDisplay.appendChild(evoSpriteItem);
    });
}

function appendAbilities(){
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
}

function appendStats(){
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
// display information
function expandCard(){
    // expand the #expandable id, update styles
    expander.classList.remove('collapsed');
    expander.classList.add('expanded');
    listSize.classList.remove('list-default')
    listSize.classList.add('list-small');

    //expand button
    document.getElementById('expand').innerText = `click to collapse`;

    // information and description for pokemon
    let info = document.getElementById('pkm-info');
    let tax = pokedex[pkmHolder]['taxonomy'];
    let height = pokedex[pkmHolder]['height'];
    let weight = pokedex[pkmHolder]['weight'];
    info.innerText = `The ${tax} | ${height} | ${weight}`

    // append description
    let description = document.getElementById('pkm-description');
    description.innerText = pokedex[pkmHolder]['desc'];

    // append evolutions and abilities
    appendEvolutions();
    appendAbilities();

    // append catch rate
    let catchRate = document.getElementById('catch-box');
    catchRate.innerText = `Catch Rate: ${pokedex[pkmHolder]['catch-rate']}`; 

    //append habitat
    let habitat = document.getElementById('hab-box');
    habitat.innerText = `Habitat: ${pokedex[pkmHolder]['habitat']}`;

    // append stats
   appendStats();
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
    let pkmDesc = pkmSpc['flavor_text_entries'][0]['flavor_text'];
    let pkmTx = pkmSpc.genera[7]['genus'];
    let pkmHap = pkmSpc['base_happiness'];
    let pkmCR = pkmSpc['capture_rate'];
    let pkmEgg = pkmSpc['egg_groups'];
    let pkmHatch = pkmSpc['hatch_counter'];
    let pkmHab = pkmSpc['habitat']['name'];

    // get chain from species
    response = await fetch(pkmSpc['evolution_chain']['url']);
    let pkmEv = await response.json();

    // build tree
    function build(){
        let tree = new evoChain();
        let root = pkmEv['chain']['species']['name']; //string
        let rootSprite = pkmEv['chain']['species']['url']
        let rootData = root + ' ' + rootSprite;
        tree.add(rootData); //first evo becomes root

        let evoChainObj = pkmEv['chain']['evolves_to']; //object 
        evoChainObj.forEach((key, i) => {
            //key : 0, 1, etc
            let item = evoChainObj[i]['species']['name']; 
            let itemSprite = evoChainObj[i]['species']['url'];
            let itemData = item + ' ' + itemSprite;
            tree.add(itemData, rootData); //add second evos to root
            
            let nextEvoChainObj = evoChainObj[i]['evolves_to']; //iterate this object for next line of evolutions
            nextEvoChainObj.forEach((nextKey, j) =>{
                let nextItem = nextEvoChainObj[j]['species']['name'];
                let nextItemSprite = nextEvoChainObj[j]['species']['url'];;
                let nextItemData = nextItem + ' ' + nextItemSprite;
                tree.add(nextItemData, itemData);
                j++;
            });
            i++;
        })
        // display tree
        //tree.traverseBFS((node) => console.log('current node: ', node));
        return tree; //return object
    } //build
    let evoTree = build();
    
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
        "evo-tree" : evoTree // tree object
    } //pkm obj
} // getpokemon