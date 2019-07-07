var turn

var board = document.getElementById('game_board');
console.log(board);
board.addEventListener('click', click_event);
function click_event(event){
    if(event.target.classList.contains('sqr')){
        if(event.target.innerText){
            event.target.innerText='';
            console.log(event.target);
        }
    }
}
