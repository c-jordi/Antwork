#todo

##20.02 till 1pm

- UX: Make it mobile friendly -- DONE
- Connect the restart button that will allow to restart the simulation with new parameters -- DONE
- Make the contrast Bar -- DONE
- Build the scheduler
- Make the graph that giacomo asked for
  - Make the data visualisation module
- BONUS: Work on the modules to place the nodes and to create node events

##21.02 till 11am

- Make some presets for the layouts that can be selected
- Work on the scheduler

##21.02 till 1.30pm

- Preparation for meeting taking place at 4pm

## Functionalities

- Add the shortcut link to animation with presets
- Focus on finishing the report first
- Focus on getting all the graphs together today and performing the analysis
- Add more initial configurations

# Last push:

## Sat 11.04:

- ~~sync the code with a github repo~~
- ~~combine the api and workers scripts in the main scripts~~
- ~~combine the definition of the presets~~
- ~~reapply the transformations that were done to the code in the main code~~:
  - ~~callback function for the database~~
  - ~~version of the analysis run~~
- ~~make the connectivity measure work when the nodes are changed~~

## Mon 13.04:

- ~~Remove periodic conditions on the switch~~
- ~~Change the color or erase the connectivity graph~~
- ~~Make the time switch condition~~
- Make all the graphs needed for analysis
- ~~Adjust the report to Giacomo's recommendations~~
- ~~Add the feature to adjust fps~~
- ~~Make the shortcut module for the report~~
- ~~Try to include the markdown in the webpage~~

## Tue 14.04:

- ~~Make the svg with a timer, that switch between all the states every 4 secs~~
- Make the repo public
- Place on personal website jordi.co

### To run:

- For: 12,13,14,15,16,17,18
  http://127.0.0.1:8080/api?numberOfAgents=4500&alpha=1&beta=0.2&size=100%2C100&k=0.03&epsilon=0.5&s0=10000&layoutId=9&runs=100&frames=500

- 4 figures:

- Trying to find the optimal density:
  http://127.0.0.1:8080/api?numberOfAgents=400&alpha=1&beta=0.2&size=90%2C70&k=0.03&epsilon=0.5&s0=10000&layoutId=NAND&runs=50&frames=1000
  with:
  - 2000,
  - 2500,
  - 3000,
  - 3250
  - 3500
  - 4000

## Wed 15.04:

- Finish the analysis
  - ~~How the density affects the average connectivity~~
  - ~~How can the position of the nodes be optimized to improve reliability in the formation of the desired network~~
    - ~~you can keep the 800 interval, 3250 nodes, export the adjacency matrix~~
    - ~~For this measure which links tend to form most often~~
  - ~~How long would it take for it to switch between the AND gate and the NAND gate ~~
- ~~Add the bibliography~~
- Upload the website to c-jordi.github
- ~~Connect your page to your domain name~~
- Send email to Giacomo

## If we have time:

http://127.0.0.1:8080/api?numberOfAgents=4500&alpha=1&beta=0.2&size=100%2C100&k=0.03&epsilon=0.5&s0=10000&layoutId=22&runs=50&frames=10000
