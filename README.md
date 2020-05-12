# Expressive Cryptography ft. Brainbox

Expressive Cryptography ft. Brainbox is an interactive GUI where the user can implement and play around with different cryptographic primitives, using which various cryptographic protocols can be built. This extended GUI interface, adopted from Brainbox, simulates primitives like hashing (eg., SHA256), HMAC, AES and Elliptical Curve. The author lessons made available on this platform will walk the user through different complex schemes that are pre-built, explaining the implementation and functionality of each of them. This GUI does not require any extensive prerequisite knowledge of cryptography or programming. It is designed in a way that allows the user to drag-and-drop different components, connect them and view the resulting output of their custom design.

## Implemented Protocols

1. Password-based registration and login protocol
2. Authenticated symmetric cryptography
3. Authenticated hybrid cryptography

## Dependencies
The project has the following dependencies:
* Node version: 11.15.0
* Yarn version: 1.22.4

## Run from Source Code

This project is developed with yarn to build the webpack. YARN runs on Node.js, so if you don't have npm installed already, go ahead and install it.

### Install dependencies with npm
```
yarn install
```
### Run the backend server
Clone the repository and cd to the brainbox folder. Then run the following command from within the brainbox folder:
```
cd app/backend
node index.js
```
### Run the webpack builder in *dev* mode
Open a second console and run:
```
yarn dev
```
### Open localhost on your browser
http://localhost:7400/

