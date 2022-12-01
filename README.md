# Next-Casino (Working Title)
Do you like Casino games but don't want to gamble? Then look no further than Next-Casino (working title).
Next-Casino is a free casino games web application built in Next.js that is currently in development.

## Project Description

Next-Casino seeks to be a web app were anyone can come and play their favorite casino games for free and without betting, the only risk is losing, the only reward is winning. The project is still under development and currently the only functional game is Black Jack (see about future games in the road map section). 

Next-Casino is built in the Next.js framework and is a single-page application that dynamically switches between games, account management, and the home menu only utilizing React components. Next-Casino is set up to use Firebase Authentication for user authorization and the Firebase Firestore for tracking user's individual game stats (amount of games played, number of wins, number of loses, number of ties). Currently Next-Casino utilizes the [Deck of Cards API](https://www.deckofcardsapi.com/) for fetching card and deck information, however this will change with further development (see more in road map section)

  
## Technologies Used

* JavaScript
* HTML/CSS
* React
* React Query
* Next.js
* Firebase
* Bootstrap
* Deck of Cards API

## Set-up

After cloning the repo and opening it, run either yarn install or npm install to install the dependencies.
```
yarn install

--------------

npm install
```
Once all the dependencies are installed you can run yarn dev or npm run dev to start a development server.

```
yarn dev

--------------

npm run dev
```

To build a production version just run yarn build or npm run build.
```
yarn build

--------------

npm run build
```
To preview your built version run yarn start or npm run start.
```
yarn start

--------------

npm run start
```

## Hooking up to Firebase
To hook up the application to your Firebase Authentication or Firestore you need to add an .env.local file to the project and load the Firebase config information that Firebase provides you in the following format.
```
NEXT_PUBLIC_REACT_FIREBASE_APP_API_KEY=<your api key here>
NEXT_PUBLIC_REACT_FIREBASE_APP_AUTH_DOMAIN=<your auth domain here>
NEXT_PUBLIC_REACT_FIREBASE_APP_PROJECT_ID=<your porject id here>
NEXT_PUBLIC_REACT_FIREBASE_APP_STORAGE_BUCKET=<your storage bucket info here>
NEXT_PUBLIC_REACT_FIREBASE_APP_MESSAGING_SENDER_ID=<your messaging sender id here>
NEXT_PUBLIC_REACT_FIREBASE_APP_APP_ID=<your app id here>
```

## Using the App

### Home Menu
Upon loading the webpage you will be greeted with home menu.

![Home Menu](https://i.gyazo.com/85349aaf7d10fd68f489ddbdb67f0629.jpg)

To play any of the games you need to be signed in, if you click on a game you will be prompted to signup.

![Signup Menu](https://i.gyazo.com/135e87157b220c8de42baf69a4ce769c.png)

Currently accounts only require the standard Firebase email and password rules, email must have a .x (such as .com, or .net, or .anything) and passwords must be at least 6 characters long. Also a user name of at least 4 character is required to submit the form.

Once signed in you can play any of the available games (currently only Black Jack). If you click on a game that is not available a popup modal will inform you that the game is not yet available.

![Coming Soon Modal](https://i.gyazo.com/2ad018bc3d7630d31fc4a06948f81343.png)

### Black Jack
If you are singed in and click on the Black Jack card or button then the Black Jack component will mount and the Home Menu dismounts.

![Black Jack Screen](https://i.gyazo.com/2b5ef4c45d45a657ae0b7a4962820d4c.png)

At the top of the Black Jack component is the current user's lifetime stats for Black Jack.

![Black Jack User Stats](https://i.gyazo.com/96112c0cfe0cfb8fd50862fd77b2efa1.png)

Below the user stats are the Dealer and the Player with the Dealer on top and Player on the bottom.

![Black Jack Table](https://i.gyazo.com/6f9808ede8a521bdb111241305138053.png)

In each of these components there is a 'Value' that displays the calculated total card value of the current hand, for the dealer it does not calculate their hidden card.
The player's user name will appear below the 'Hold' and 'Hit' buttons, in this example the player's user name is TestName.
 
 Upon  clicking on the "Hit' button the player will get a new card their new value will be calculated.
 In this example the player was dealt a 3 and a 5 with a total value of 9
 
![Player Hand Before Hitting](https://i.gyazo.com/9e8de28775e9e91ae17a665255b61044.png)

After hitting the player gets a new card which is a 10 and their total value updates to 19

![Player Hand After Hitting](https://i.gyazo.com/a68297a83fea5d44b71cb64f558081f6.png)

Upon clicking the 'Hold' button the player will no longer be able to hit and the dealer takes over.

![After Holding](https://i.gyazo.com/2c3cca0b835bf82903653398e2618583.png)

In the above example the player held at 19 and the dealer on had an Ace and a 7 valuing at 18.

Ordinarily a dealer won't hit above 16, but since this is a one on one scenario the dealer will still hit if their value is lower than the players.

So the dealer hits and gets a 9 since the 9 + 18 would total over 21 the Ace's value now becomes 1 so the dealers new total value is 17, which is still lower than the player's 19 so the dealer hits again.

Now the dealer is dealt a 7 which pushes their total 24 causing them to bust.

The round over modal pops up with the results and the player's lifetime stats update, the player can then choose to play again or return to the Home Menu.

## Road Map
Below are the items that are either under development or are planned for future development. Items labeled with (MVP) are part of the minimum viable project

#### More Games
* Three Card Poker (MVP)
* Roulette (MVP)
* Snail Race (MVP)
* Slot Machine
* Craps

#### UI/UX
* Improved Error Handling With Detailed Warnings (MVP)
* Layout Must Work Well With All Devices (MVP)
* Detailed Styles (MVP)
* Smoother Transitions When Getting New Cards (MVP)

#### Card Logic
* Move Away From Deck of Cards API with a custom built C# based API (MVP)
* Off-load some the current value calculations to the API
* Abstract Card Fetching - will come with Three Card Poker (MVP)

#### User Info and Stats
* Add Ability For User To Change Their User Name (MVP)
* Add Global Leaderboards (MVP)
* Add Ability To Hide Stats

## Known Bugs
#### Bugs that are followed by (Might be fixed) are bugs that are believed to be fixed, but since they are very rare or can't easily be replicated it is yet to be confirmed.

When both the player and dealer are dealt a perfect 21 upon the initial deal the dealer will still draw a new card. The game is still correctly ending as a tie regardless of the dealers 3rd card. (Might be fixed)

On some platforms a user might be able to sign up without a user name. (Might be fixed)