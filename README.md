# 6. Website
##Founders and Coders project no.6: Feature

--------------------------------------------
```
rev.0
initial commit

rev.1
1. add Readme.md file
```

## Planning:

The first stage of the planning was to find an idea, I was inspired by the examples listed on the project's page to create something on my own. 
I came with the idea of a speed game, it's about a set of three dots that appear on the screen randomly, one of them is a red dot, and the player must click on the red dot as fast as he can before it disappears, and he has 20 trials only.

After finding the idea I started imagining the user interface, it consists of a title on the top, a gaming in the middle and finally a game control section on the bottom which contains a start button, stop button, score, and level selector.

# Building:

I started testing the feasibility of the idea before going through the whole thing. It was very essential for me not to waste any time. 
So, I started generating some random dots on the screen and testing the click response by incrementing a counter on each click.
After that I built the user interface. 
Later on, I tried as possible to break my JS code into small specific functions to be used in different locations and for the sake of easy debugging.
Each time I tried a given functionality, I packaged it in a function with a clear descriptive name and I put it aside to be re-used.

# Debugging:

It was easy for me to debug the code as I worked progressively while trying a small piece of code each time and by breaking the whole program into specific functions with clear name.
In addition, commenting the code was very helpful when coming back another day to continue what I started, it gives a quick insight of what I was thinking when I wrote the logic.
The final stage of debugging was to try the game many times to find any bugs. One of the challenging problems was to generate a number of dots that fits the screen, for example: the game generates 600 dots for a screen width > 900px, however this number of dots will overflow on mobile devices and the user must scroll up and down to see the red dot. This bug was fixed by getting the screen heigh and width and generating the adequate number of dots while showing the game control section as well.


