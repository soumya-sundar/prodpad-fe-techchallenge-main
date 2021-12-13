# ProdPad Development Test

## The Challenge

### Brief

Securetronix Ltd require an internal chat client for their company so that everyone can communicate. They can't find anything suitable on the market so they've asked us to prototype one and they want to call it Flack. One of our junior developers has thrown together a proof of concept, though it needs some love. Securetronix have decided to go with it which means we now need to make it production ready as well as being maintainable for other developers going forward. They have also asked for a couple of additional features before going live.

Note: This is a completely fictional challenge and client, so don't worry about ripping into code etc!

### Tasks

Take the codebase provided and tidy it up - the setup and code should be more maintainable and understandable for future developers. In addition to this, add the two extra features that Securetronix have requested, which are:

1. To be told via the UI when someone else is typing.
2. To be able to see a history of all previous chat when they load up the client. 

_For the second task you can assume that the server-side code never falls over, so you can just save chat history in memory server-side._

### Additional Requirements

Please timebox 3 hours for this challenge. 

This exercise is about starting a conversation, not about creating the "best" technical implementation.

Your implementation should be provided as a public GitHub repository, with instructions on how to run the code locally.

Your implementation should be of a quality that you consider production-ready.

### We will be looking at:

- Your approach to refactoring the code to be maintainable and understandable for future developers.
- Your implementation of the new features and your approach to making them extendable and future-proof. 

Everything you need to know about the challenge should be in this document here, but do reach out to us if you have questions. 

---

## The Setup

For initial setup of the project, ensure you're using Node version 12 and run...

`npm install`

### Run Server for Development / Production

To run the server hosting the WebSocket run...

`node server/main.js`

### Development

To build the project for active development and live reloading run...

`npm run dev` and visit http://localhost:1337

### Build for Production

To build a production version of the application run...

`npm run build`

---