# Stickiess Note
I have used Reactjs to create an stickynotes web application.

Functionalities created in this task are:
- Create new note
- Edit note
- Delete all notes
- Change color of new note
- Minimal styling on UI layout


## Code structure
- stickies app
    - sticky_notes
        - public
        - src
            - Components
                - Home
                    - Home.jsx
                    - Home.module.scss
                - StickyNote
                    - StickyNote.jsx
                    - StickyNote.module.scss
            - Media
            - App.js
            - index.js
            - index.css
        - package.json
        - package-lock.json
        - ReadMe.md

This is the folder structure for this task and what it includes in each folder. In components folder you will find folders of all the components made in this web application along with it's functionalities.

App.js renders the component Home.
Home is responsiable for rendering navBar and body.
## How to run application?
### Windows or Mac
- Clone git repository https://github.com/ziihh/Stickies_webapp.git
- From the root folder of the repository run the following command;
    - cd sticky_webapp
    - npm install
    - npm start
- The web application can be view by navigating to http://localhost:3000/

## Explaination
There are some layout inconsistecy from browser to browser, as i have tried to balance my focus on both UI and functionality.
The icons used in this task are taken from this source https://www.flaticon.com/.
In this task i have used:
- Reactjs
- Jquery
- scss modules
- npm for package mangement