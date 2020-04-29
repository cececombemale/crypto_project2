# Brainbox - working with real device

Logic gates are the basic building blocks of any digital system. It is an electronic circuit having one or 
more than one input and only one output. The relationship between the input and the output is based on a 
certain logic. Based on this, logic gates are named as AND gate, OR gate, NOT gate etc.

Now you can  edit and run your digital circuit simulation designs online on PCs, Macs, thin clients, tablets, smart 
phones, smart TVs and e-book readers without any installation. You can use **BrainBox** in the office, 
classroom or at home and connect even your RaspberryPi to drive real physical devices.

**Test the program on http://www.brainbox-demo.de**



![image](resources/animation.gif)


# How to install it

You can start and run brainbox for different user groups.

## Single User
Ideal for your own use. Simply start and get started. No user administration or login and full access to all features.
```  
npm install -g brainbox
brainbox
```

## Shared 
Everyone has access to the simulator without registration. Drawings and documents can also be saved and you always get a unique URL when saving to access the document again later. Ideal to play with the simulator in smaller or larger groups and share your work with others.
```  
npm install brainbox
brainbox --storage shared-public
```

## Multi User
Simulator is available for everyone in a read only mode. However, only logged in persons can save or change documents. 
Private files are not publicly accessible.  Working groups and tasks can be created and distributed. Ideal for schools 
and in education.

``` 
npm install brainbox
brainbox --storage multiple-user
```


As mention before you must install brainbox via `npm`. But what is npm?

NPM is the package manager for NodeJS applications. 


It's the world's largest software registry, with approximately 3 billion downloads per 
week. Open-source developers from every continent use npm to share and borrow packages, 
and many organizations use npm to manage private development as well.


If you didn't have installed NodeJS and npm - [go ahead and install it](https://www.npmjs.com/get-npm)


See the running example on YouTube: [https://www.youtube.com/watch?v=fUkAIjTaNXI](https://www.youtube.com/watch?v=fUkAIjTaNXI)



## On Desktop
You can install the application even in your local intranet for training purpose. Just install and run the backend 
server (to store and load the circuit files) on every computer which can run a simple node.js server. 


## On a Raspberry Pi
You have **full access to the `GPIO`** pins on you RaspberryPi with the browser based digital circuit simulator. If 
node.js already running on your raspi you need just to install the simulator 
like on your desktop



# Run from source code
I develop the project with `yarn` to build my webpack. 
YARN runs on Node.js, so if you don't have npm installed already, go ahead and install it.

### Install `nodenv`
Follow the instructions given at https://github.com/nodenv/nodenv#installation

### Install dependencies with npm

```
yarn install
```

### Run the backend server
``` 
node ./app/backend/index.js
```

### Run the webpack builder in *dev* mode
open a second console and run

``` 
yarn dev
```

