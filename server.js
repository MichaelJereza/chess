var express = require('express')
var handlebars = require('handlebars')
var expressHandlebars = require('express-handlebars')

var app = express()
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

var port = process.env.PORT || 3000

app.use(express.static('public'))

var board = []
for(var i=0;i<8;i++){
    if(i%2==0){
        board[i]={space: 'B', item: ' '}
        board[i+8]={space: 'W', item: ' '}
        board[i+16]={space: 'B', item: ' '}
        board[i+24]={space: 'W', item: ' '}
        board[i+32]={space: 'B', item: ' '}
        board[i+40]={space: 'W', item: ' '}
        board[i+48]={space: 'B', item: ' '}
        board[i+56]={space: 'W', item: ' '}
    }
    else{
        board[i]={space: 'W', item: ' '}
        board[i+8]={space: 'B', item: ' '}
        board[i+16]={space: 'W', item: ' '}
        board[i+24]={space: 'B', item: ' '}
        board[i+32]={space: 'W', item: ' '}
        board[i+40]={space: 'B', item: ' '}
        board[i+48]={space: 'W', item: ' '}
        board[i+56]={space: 'B', item: ' '}

    }
}
console.log("BOARD:", board)
app.get('/', function(req, res){
    res.setMaxListeners(200).render('board', {
        dimensions: board
    })
    console.log("done")
})
app.listen(port, function(){
    console.log("Server running...")
})