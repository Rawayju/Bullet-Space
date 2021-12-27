# BulletSpace
#### Video Demo:  <Placeholder>
#### Description: A pixel-y, survival, bullet-hell videogame coded with JavaScript and HTML using the Phaser Game Framework and packed into an excecutable file with Electron. 

You play as Spacen, a girl that's ready to confront her daunting first day at work as a "space debris deviator." As such, she will keep her planet safe and sound from any potential dangerous asteroids as they stray away from their orbits. Get on your debris-destroyer spaceship, survive as much time as you can, and power it up as you collect gems in this thrilling adventure!

Two months in the making, BulletSpace was made with love with the objective in mind of being a difficult survival type of game. As one, tt has no clear end, but you shall consider yourself rather skillful in the event that you manage to buy all upgrades from the shop without breaking your ship first. Set yourself tiny goals and get better at it with each try.

The game consists of 7 scenes and 6 main scripts *(located in BulletSpace > game > resources > app)*. I shall now explain each of their purposes for this game:

### SCNbootGame.js:
Loads the sound effects, music, sprites and images into memory and readies the animations. 

Once it's done with the loading, it launches the next scene.

### SCNpreStartLevel.js: 
The title screen brought to life with a simple animation and music in the background. The screen is pitch black with a sign stating "click" in middle of the screen so that Phaser's sound and music manager can start properly. Then the game logo appears swinging up and down waiting for the player to set foot onto this new journey.

### SCNstartLevel.js: 
The introductory cutscene made with help of a well known plugin-maker for Phaser's --Rex-- textbox plugin. It showcases Spacen emotions and monologue through animated dialogue and character portraits. 

Once the curscene is done or the player chooses to skip it with the SHIFT key, the next scene starts.

### SCNplayLevel.js:
By far the largest of scripts I've written, ever. This is the screen where players will spend most of the time in; the game itself. 

The file is divided into many functions as to orderly make sense of it. Those are:

- The "***create***" function, setting everything *(variables, sprites, animations, sounds, input listeners, and more)* up so that the rest of the functions can behave as expected.

As it runs, it reaches a point where it calls the next function:


- The "***addSoundsHealth***" function, preparing the music and sound effects for the game, as well as some sprites to represent the ship's "health."


- The "***update***" function that runs every frame. It calls a lot of functions to keep track of everything once certain conditions are met. For example, one of those functions is:


- The "***moveShip***" function, that handles the player's movement based on the inputs they are entering and moving sprites/animations accordingly. 


- The "***createBullet***" function, shooting bullets if the player chooses to according to the global variable of firerate and its modifier when the SHIFT key is held down. To do so, it calls a separate script called "CreateBullet.js" to keep things crystal clear.


- The "***configBullet***" function that gives the bullet we just created life, telling it where to go, and what should happen had the bullet just exited the screen, among various other things. To summarize it up, I would say it "configures" the bullet.


- The "***bulletHit***" function, called to the stage once a bullet gets in contact with an asteroid. Depending of the situation it's in, it may destroy the asteroid and spawn drops or more debris, or it may just damage whatever it just hit. 
    
To do that, it tells the asteroid to run their own, distinct "update function" located in either the "CreateBig.js," the "CreateMedium.js," or the "CreateSmall.js," whether they are a big, medium or small-sized asteroid respectively. We'll talk more about them three later.

If it just so happens to destroy something, it'll run the script to create more of that something's underlings--from big it turns into medium-sized ones, then into small ones, then into gems *(CreateGem.js)*.


- The "***damageShip***" function, triggered when the seemingly invisible hurtbox sprite that follows the middle of the ship *(1 pixel of size)* deciding how many lives should the player lose and if the player should or should not game over already. 
    
If the ship was damaged by a big asteroid, it loses a total of three points; if it was because of a medium-sized one, then it loses two health points; otherwise, it loses just one point of a maximum twelve you can have.


- The "***createTarget***" function, triggered when the player clicks on an object, mostly an asteroid. If they click on the shop icon, the shop pops up; if they click on an asteroid, the bullets one shoots automatically start following the new "target."


- The "***createAsteroids***" function, responsible for calling out to the "CreateBig.js," the "CreateMedium.js," and the "CreateSmall.js" functions and handling the handicap system that generates a pseudo-random approach to asteroid's spawnrate. 


- The "***collectGem***" function, triggered when the player overlaps with a gem, upping the ammount of money ar your disposal and destroying the gem you just collected.


- The "***randomAmbientNoisesManager***" function, a manager for random noises that appear randomly to add atmosphere to the game *(little easter eggs most poeple won't notice!)*.


- And, finally, last but not least, the "***difficulty***" function, taking care of asteroids' spawrate as time goes by, making it harder and harder by the minute. 
    
For the player to overcome this difficulty, they must buy upgrades from the store at the pause screen located in the far-up, left corner or the screen.

### PauseShop.js:
The store at the pause screen where players have the option to buy upgrades with the money they have gathered so far. Here, they can up their damage to a single class of asteroid, they can boost their firerate, the speed at which bullets go, or restore their health. There are also DPS bonuses you get from holding the SHIFT key in exchange of speed, and you can also buy upgrades to take the most out of it; those are the firerate boost and the damage to all types of asteroids boost.

Spend your money wisely! Each upgrades significantly makes things easier, but they get pretty costy pretty soon.

The shop stores all the values *(like money, damage and firerate bought)* into global variables set on ***game.js*** at the start of the game. From there, ***SCNplayLevel.js*** can easily acess them.

### Index and package.json
and other files tell **Electron** the information it needs to run this HTML5 game in the form of a .exe file.

### phaser.min.js
is the file needed for Phaser 3 to do its magic.

### The rest of files are part of Electron, except for the "assets" folder where I stored all of the images, sounds, etc. that I needed in order to fully flesh out this game.

#### BulletSpace.exe is the end result.

# That's pretty much it. I hope you all like it!