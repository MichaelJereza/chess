var board = document.getElementById('game_board');
console.log(board);
board.addEventListener('click', click_event);
function click_event(event){
    if(event.target.classList.contains('sqr')){
        event.target.textContent='♔';
        console.log(event.target);
    }
}
