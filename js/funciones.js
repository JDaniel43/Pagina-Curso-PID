const pokeImg = document.querySelector('[data-poke-img]');
const pokeStats = document.querySelector('[data-poke-stacks]');
const pokeImgConatainer = document.querySelector('[data-poke-img-container]');


const TYPECOLORS = {
    electric:'#FFEA70',
    normal: '#B093398',
    fire: '#ff675C',
    water: '#0596C7',
    ice:'#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F'

};



function consumirApi(){
    console.log("hola")
    var pokemon = $("#nombre").val();
    var setting = {
        "url": "https://pokeapi.co/api/v2/pokemon/" + pokemon,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "text/plain"
        },
        "data": "malo",
    };

    $.ajax(setting).done(function (response) {
        const IMG = response.sprites.front_default;
        const {stats, types, name, id} = response;
        
        pokeImg.setAttribute('src',IMG)
        $('#id').text('N°'+id);
        $('#pokedex').hide();
        $('#name').text(name);
        setColor(types);
        tipoPokemon(types);
        statsPokemon(stats);
    });

    const setColor = types => {
        const color1 = TYPECOLORS[types[0].type.name];
        const color2 = types[1] ? TYPECOLORS[types[1].type.name] : TYPECOLORS.default;
        console.log(color1,color2);
        //$("#img").css({"background":`radial-gradient ( ${color2} 33%, ${color1} 33%)`,"backgroundSize":'5px 5px'} );
        pokeImg.style.background =`radial-gradient ( ${color2} 33%, ${color1} 33%)`;
        pokeImg.style.backgroundSize = '5px 5px';

    };
    const tipoPokemon = types =>{
        var tipos = []
        for (var i = 0; i < types.length; i++ ){
            tipos[i] = types[i].type.name;
        };
        if (tipos.length == 1){
            $("#tipo").html( tipos[0] );
        
        } else {
            $("#tipo").html( tipos[0] +"<br>"+ tipos[1]);
        };   
    };

    const statsPokemon = stats => {
        pokeStats.innerHTML = '';
        stats.forEach(stats => {
            const statElement = document.createElement("div");
            const statElementName = document.createElement("h6");
            const statElementAmount = document.createElement("h6");
            statElementName.textContent = stats.stat.name;
            statElementAmount.textContent = stats.base_stat;
            statElement.appendChild(statElementName);
            statElement.appendChild(statElementAmount);
            pokeStats.appendChild(statElement);
        });

    };
    function error (){
        alert("pokemon no encontrado");
    };
};