var turn;

var reload = new XMLHttpRequest();
reload.open("GET","/", true);


var board = document.getElementById('game_board');
console.log(board);
board.addEventListener('click', click_event);

function click_event(event){
    var selection=document.querySelector('.Selected');
    if(event.target.classList.contains('sqr') && event.target.innerText){
        if(selection!=null){
            deselect(selection);
        }
        event.target.classList.add('Selected')
        console.log("Clicked: ", event.target.classList);
        selection=event.target; 
        calc_mov(event.target);
    }
    else if(event.target.classList.contains('Possible') && !event.target.innerText){
        move(event, selection);
        deselect(selection);
    }
    else{
        if(selection){
            deselect(selection);
        }
    }
}

function deselect(selection){
    selection=document.querySelector('.Selected');
    selection.classList.remove('Selected');
    selection=document.querySelectorAll('.Possible');
    selection.forEach(function(element){element.classList.remove('Possible')});
    selection=false;
}

function move(event, selected){
    if(event.target.innerText!=' '){
        move_update(selected);
        event.target.innerText = selected.innerText;
        selected.innerText=' ';
    }
}

async function move_update(selected){
    var request=new XMLHttpRequest();
    var url='/move/'+parseInt(selected.id)+'/'+parseInt(event.target.id);
    request.open('POST', url);
    request.send();
    console.log('Sent');
}

function calc_mov(target){
    var position=parseInt(target.id);
    var possible=[];
    console.log(position);
    if(target.innerText=='♟'||target.innerText=='♙'){
        pawn_mvmt(target, position, possible);
    }
    else if(target.innerText=='♜'||target.innerText=='♖'){
        rook_mvmt(target, position, possible);
    }
}

function pawn_mvmt(target, position, possible){
    var nxt_pos, check, direction,
        blocked=false;
    if(target.innerText=='♟'){
        direction=8;
    }
    else if(target.innerText=='♙'){
        direction=-8;
    }
    nxt_pos=position;
    for(var i=0;i<2;i++){
        nxt_pos+=direction;
        check=document.getElementById(nxt_pos);
        if(nxt_pos>0 && nxt_pos<64){
            console.log("Possible Move: ", nxt_pos);
            if(!check.innerText){
                if(!blocked){
                    possible.push(check);
                }
            }
            else{
                blocked=true;
            }
        }
    }
    possible.forEach(function(element){
        element.classList.add('Possible');
    })
}

function rook_mvmt(target, position, possible){
    var nxt_pos, check, direction,
        blocked=false;
    if(target.innerText=='♜'){
        direction=8;
    }
    else if(target.innerText=='♖'){
        direction=-8;
    }
    nxt_pos=position;
    for(var i=0;i<8;i++){
        nxt_pos+=direction;
        check=document.getElementById(nxt_pos);
        if(nxt_pos>0 && nxt_pos<64){
            console.log("Possible Move: ", nxt_pos);
            if(!check.innerText){
                if(!blocked){
                    possible.push(check);
                }
            }
            else{
                blocked=true;
            }
        }
    }
    possible.forEach(function(element){
        element.classList.add('Possible');
    })
}