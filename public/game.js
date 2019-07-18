var turn;
var selection=false;

var reload = new XMLHttpRequest();
reload.open("GET","/", true);


var board = document.getElementById('game_board');
console.log(board);
board.addEventListener('click', click_event);
function click_event(event){
    if(event.target.classList.contains('sqr') && event.target.innerText){
        if(selection){
            selection=document.querySelector('.Selected');
            selection.classList.remove('Selected');
        }
        event.target.classList.add('Selected')
        console.log("Clicked: ", event.target.classList);
        selection=event.target;
        calc_mov(event.target);
    }
}
function calc_mov(target){
    var position=target.id;
    var possible=[];
    var pos;
    console.log(position);

    if(target.innerText=='♟'||target.innerText=='♙'){
        if(target.innerText=='♟'){
            if((position+8)<64){
                console.log("Possible:", position+8);
                possible.push(document.getEementById((position+8)));
            }
            if((position+16)<64){
                console.log("Possible:", position+16);
                possible.push(document.getElementById((position+16)));
            }
            console.log('POS: ', possible);
            possible.forEach(function(element){
                element.classList.add('Possible')
            })
        }
        else if(target.innerText=='♙'){
            possible+=getElementById(position-16);
            possible+=getElementById(position-8);
        }
    }
}