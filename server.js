var express = require('express')
var handlebars = require('handlebars')
var expressHandlebars = require('express-handlebars')

var app = express()
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

var port = process.env.PORT || 3000

app.use(express.static('public'))

//DIMENSIONS
var board = new Array(64);

//This function initializes an array to have formatting for black and white spaces.
function init(board){
    var a,b;
    a={space: 'B', item: ' '};
    b={space: 'W', item: ' '};
    var j=0;
    for(var r=0;r<64;r++){
        if(r%2==j){
            board[r]={space: 'B', item: ' ', coord: r};
        }
        else{
            board[r]={space: 'W', item: ' ', coord: r};
        }
        if((r+1)%8==0){
            if(j==0){
                j=1;
            }
            else{
                j=0;
            }
            // b = [a, a = b][0]; //swap
        }
    }
}

function setup_board(board){
    var j=8;
    for(var i=0;i<j;i++){
        if(i==0||i==7){
            board[i].item='♜';
        }
        else if(i==1||i==6){
            board[i].item='♞';
        }
        else if(i==2||i==5){
            board[i].item='♝';
        }
        else if(i==3){
            board[i].item='♛';
        }
        else if(i==4){
            board[i].item='♚';
        }

        if(i==7){
            j+=8;
        }
        if(i<16&&i>7){
            board[i].item='♟';
        }

        if(i==15){
            j=64;
            i=48;
        }
        if(i<56&&i>47){
            board[i].item='♙';
        }
        else if(i==57||i==62){
            board[i].item='♘';
        }
        else if(i==58||i==61){
            board[i].item='♗';
        }
        else if(i==59){
            board[i].item='♕';
        }
        else if(i==60){
            board[i].item='♔';
        }
        else if(i==56||i==63){
            board[i].item='♖';
        }
    }

    console.log("BOARD: ", board);
}

init(board);
setup_board(board);

app.post('/move/:x/:y', function(req,res,next){
    var to=req.params.y,
        from=req.params.x;
    board[to].item=board[from].item;
    board[from].item=' ';
    console.log('====' ,board);
    res.send("Moved");
    next();
})
app.get('/', function(req, res){
    res.status(200).render('board', {
        board: board
    });
    console.log("done");
})
app.listen(port, function(){
    console.log("Server running...");
})