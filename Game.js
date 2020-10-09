class Game{
  constructor(){

  }

  getGameState(){
    database.ref('gameState').on('value', function(data){
      gameState = data.val();
      console.log(gameState);
      if(gameState == 0){
        player = new Player();
        player.getPlayerCount();

        form = new Form();
        form.display();
      }
    })

    
    player1 = createSprite(400, 800, 20, 20);
    player1.addImage(player1_img);

    player2 = createSprite(400, 400, 20, 20);
    player2.addImage(player2_img);
    player2.scale = 0.2;

    player1.collide(ground1);
    player2.collide(ground2);

    players = [player1, player2];
    grounds = [ground1, ground2];
  }

  updateGameState(state){
    database.ref('/').update({gameState: state})
  }
  
  play(){
    form.hide();
    Player.getPlayerInfo();

    this.spawnObstacles();

    var ySpacing = 200;
    var index = 0;

    for(var plr in allPlayers){

      players[index].velocityY = 2;
      players[index].collide(grounds[index]);

      allPlayers[plr].xPos = players[index].x;
      allPlayers[plr].yPos = players[index].y;

      if(player.index == index + 1){
        if(keyDown('space')){
          players[index].y -= 100;
        }  

        players[index].y += 10;

        // if(obstacleGroups[index].isTouching(players[index])){
        //   gameState = 2; 
        // }
        
      }

      

      index++;

      text(allPlayers[plr].name + " - x: " + allPlayers[plr].xPos + " , y: " + allPlayers[plr].yPos, 200, ySpacing);
      ySpacing += 50 
    }

    player.updatePlayerInfo();
  }

   spawnObstacles(){
    if(frameCount%150 == 0){
      var obstacle1 = createSprite(width, ground1.y- 90, 10, 10);
      obstacle1.velocityX = -7;
      obstacle1.debug = true;
      obstacle1.setCollider('rectangle', 0, 0, 50, 100);
      obstacle1.addImage(hurdle_img);
      obstacleGroup1.add(obstacle1)
  
      var obstacle2 = createSprite(width, ground2.y- 90, 10, 10);
      obstacle2.velocityX = -7;
      obstacle2.debug = true;
      obstacle2.setCollider('rectangle', 0, 0, 50, 100);
      obstacle2.addImage(hurdle_img);
      obstacleGroup2.add(obstacle2);

      obstacleGroups = [obstacleGroup1, obstacleGroup2]
    }
  }

  end(){
    alert('Game Over');
  }
}