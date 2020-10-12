var database;
var playerPos;
var track;
var player1, player2, players;
var ground1, ground2, grounds;
var player1_img, player2_img,track_img, hurdle_img;
var game, player, form;
var gameState, playerCount, allPlayers;
var resetButton;
var obstacleGroup1, obstacleGroup2, obstacleGroups;

function preload(){
  player1_img = loadImage('images/player1.png');
  player2_img = loadImage('images/player2.png');
  track_img = loadImage('images/olympic.jpg');
  hurdle_img = loadImage('images/hurdle.png');
}

function setup(){
  createCanvas(displayWidth, displayHeight);

  database = firebase.database();
  console.log(database);

  ground1 = createSprite(width/2, height - 20, width, 40);
  ground2 = createSprite(width/2, height/2, width, 40);
  grounds = [ground1, ground2]

  // track = createSprite(width/2, height/2, 10, 10);
  // track.addImage(track_img);
  // track.scale = 3;

  obstacleGroup1 = new Group();
  obstacleGroup2 = new Group();
  obstacleGroups = [];

  players =[];

  resetButton = createButton('reset');
  resetButton.position(100, 100);

  game = new Game();
  game.getGameState();
}

function draw(){
  background('lightblue');

  if(playerCount == 2){
    game.updateGameState(1);
  }

  if(gameState == 1){
    game.play();
  }

  if(gameState == 2){
    game.end();
  }

  resetButton.mousePressed( () => {
    game.updateGameState(0);
    player.updatePlayerCount(0);
    database.ref('players').remove();
  })

  //getPlayerPosition();

  

  //updatePlayerPosition();
  drawSprites();
}



function getPlayerPosition(){
  database.ref('player').on('value', (data) => {
    playerPos = data.val();
    console.log(playerPos);

    player1.x = playerPos.x;
    player1.y = playerPos.y;
  })
}

function updatePlayerPosition(){
  database.ref('player').update( {
    x: player1.x,
    y: player1.y
  })
}