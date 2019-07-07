var express = require('express')
var handlebars = require('handlebars')
var expressHandlebars = require('express-handlebars')

var app = express()
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

var port = process.env.PORT || 3000

app.use(express.static('public'))

//DIMENSIONS
var max_rows = 8,
    max_cols = 8,
    board = []

for(var i=0; i<max_rows; i++){
    board[i]= new Array(8).fill(' ');
}

//This function initializes an array to have formatting for black and white spaces.
function init(board,rm,cm){
    for(var r=0;r<rm;r++){        
        for(var c=0;c<cm;c++){
            //if even row even col OR odd row odd col
            if((c%2==0 && r%2==0)||(c%2!=0 && r%2!=0)){
                board[r][c]={space: 'B', item: ' '};
            }
            else{
                board[r][c]={space: 'W', item: ' '};
            }
        }
    }
}
init(board,max_rows,max_cols);

function setup_board(board){
    max=board[0].length;
    for(var i=0;i<max;i++){
        board[1][i].item='♙';
        board[max-2][i].item='♟';
        if(i==0||i==(max-1)){
            board[0][i].item='♖';
            board[max-1][i].item='♜';
        }
        else if(i==1||i==(max-2)){
            board[0][i].item='♘';
            board[max-1][i].item='♞';
        }
        else if(i==2||i==(max-3)){
            board[0][i].item='♗';
            board[max-1][i].item='♝';
        }
        else if(i==3){
            board[0][i].item='♕';
            board[max-1][i].item='♛';
        }
        else if(i==4){
            board[0][i].item='♔';
            board[max-1][i].item='♚';
        }        
    }
}
setup_board(board);

console.log("BOARD:", board)
app.get('/', function(req, res){
    res.status(200).render('board', {
        board_rows: board
    })
    console.log("done")
})
app.listen(port, function(){
    console.log("Server running...")
})