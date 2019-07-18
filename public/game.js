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
            selection=document.querySelectorAll('.Possible');
            selection.forEach(function(element){element.classList.remove('Possible')});
            selection=false;
        }
        event.target.classList.add('Selected')
        console.log("Clicked: ", event.target.classList);
        selection=event.target;
        calc_mov(event.target);
    }
    else if(event.target.classList.contains('Possible')){
        move(event);
    }
}

function move(event){
    if(!event.target.innerText){
        var request=new XMLHttpRequest();
        var url='/move/'+parseInt(document.querySelector('.Selected').id)+'/'+parseInt(event.target.id);
        request.open('POST', url);
        request.send();
        console.log('MOVED',url);

    }
}

function calc_mov(target){
    var position=parseInt(target.id);
    var possible=[];
    console.log(position);

    if(target.innerText=='♟'||target.innerText=='♙'){
        if(target.innerText=='♟'){
            var pos=position+8;
            console.log(pos, 'eval', pos<64);
            if(pos<64){
                console.log("Possible:", pos);
                possible.push(document.getElementById((position+8)));
            }
            pos=position+16;
            if(pos<64){
                console.log("Possible:", pos);
                possible.push(document.getElementById((position+16)));
            }
            console.log('POS: ', possible);
            possible.forEach(function(element){
                element.classList.add('Possible');
            })
        }
        else if(target.innerText=='♙'){
            var pos=position-8;
            if(pos>0){
                console.log("Possible:", pos);
                possible.push(document.getElementById((position-8)));
            }
            pos=position-16;
            if(pos>0){
                console.log("Possible:", pos);
                possible.push(document.getElementById((position-16)));
            }
            possible.forEach(function(element){
                element.classList.add('Possible');
            })
        }
    }
}