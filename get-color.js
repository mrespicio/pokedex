
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