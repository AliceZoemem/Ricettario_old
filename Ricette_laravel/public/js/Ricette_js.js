/**
 * Created by alice on 10/07/17.
 */

vett_ing_inseriti = new Array();
var i = 0;
var inizio = true;
$(document).ready(function() {
    $( "#ingrediente" ).autocomplete({
        source: globalIngredients
    });
} );

function start(){
    document.getElementById('inserisci_ingredienti').style.visibility= 'hidden';
    document.getElementById('inserisci_ingredienti').style.display='none';
    document.getElementById('ingrediente').value = '';
    i = 0;
}

function aggiungi(){
    var ingrediente_controllo;
    var aggiungi = false;
    var new_ingrediente = document.getElementById('ingrediente').value;
    var esiste_gia = false;

    var vett_ing = $.map(globalIngredients, function(value, index) {
        return [value];
    });
    vett_ing.forEach(function (ingrediente_controllo){
        if(ingrediente_controllo == new_ingrediente){
            aggiungi = true;
        }
    });
    vett_ing_inseriti.forEach(function (ing_inseriti_controllo) {
        if(new_ingrediente == ing_inseriti_controllo){
            esiste_gia = true;
        }
    });
    if(new_ingrediente != '' && aggiungi == true && esiste_gia != true) {
        //controllare che gli ingredienti aggiunti non si ripetano

        if(inizio == true) {
            inizio = false;
            var crea_bottone_cerca = document.createElement("BUTTON");
            var scritta_bottone_cerca = document.createTextNode('CERCA');
            crea_bottone_cerca.setAttribute("id", "btncerca");
            crea_bottone_cerca.setAttribute("onclick", "find()");
            crea_bottone_cerca.appendChild(scritta_bottone_cerca);
            document.getElementById("avvia").insertBefore(crea_bottone_cerca, document.getElementById("btncerca"));
            var crea_label_match = document.createElement("LABEL");
            var scritta_label_trovate = document.createTextNode('Ricette trovate: 0');
            crea_label_match.setAttribute("id", "trovato");
            crea_label_match.appendChild(scritta_label_trovate);
            document.getElementById("avvia").insertBefore(crea_label_match, document.getElementById("trovato"));

        }
        vett_ing_inseriti = crea(new_ingrediente);
        //alert(vett_ing_inseriti);
    }
}
function rimuovi(i) {
        document.getElementById('ing' + i).style.visibility= 'hidden';
        document.getElementById('ing' + i).style.display='none';
        document.getElementById('btn' + i).style.display='none';
        document.getElementById('btn' + i).style.display='none';
        delete vett_ing_inseriti[i];
}
function find() {
    //cerca le ricette con gli ingredienti contenuti nel vett_ing_inseriti
    vett_id_insert = Array();
    vett_ing_giusto = Array();
    vett_ing_inseriti.forEach(function(ing_errato){
        if(ing_errato != ''){
            vett_ing_giusto.push(ing_errato);
        }
    });
    $.get( "api/ingredients" , function( data) {
        data.ingredient.forEach(function (ingredient_db, i){
            vett_ing_giusto.forEach(function(ing_inserito){
                if(ing_inserito == ingredient_db.name){
                    vett_id_insert.push(ingredient_db.id);
                    console.log(vett_id_insert);
                }
            });
        });
    });
    $.get( "api/pivot" , function( data) {
        //data.
    });
    //controllo priorita


}
function crea(new_ingrediente) {
    document.getElementById('inserisci_ingredienti').style.visibility= 'visible';
    document.getElementById('inserisci_ingredienti').style.display='block';
    vett_ing_inseriti[i] = new_ingrediente;
    var crea_label = document.createElement("LI");
    var scritta_label = document.createTextNode(new_ingrediente);
    crea_label.setAttribute("id", "ing" + i);
    crea_label.appendChild(scritta_label);
    document.getElementById("lista_ing").insertBefore(crea_label,document.getElementById("ing" + i));
    var crea_bottone = document.createElement("BUTTON");
    var scritta_bottone = document.createTextNode('x');
    crea_bottone.setAttribute("id", "btn" + i);
    crea_bottone.setAttribute("onclick", "rimuovi(" + i + ")");
    crea_bottone.appendChild(scritta_bottone);
    document.getElementById("ing" + i).insertBefore(crea_bottone,document.getElementById("btn" + i));
    document.getElementById('ingrediente').value = '';
    i += 1;
    return vett_ing_inseriti;
}

