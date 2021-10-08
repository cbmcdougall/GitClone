# GitClone

## A coding community forum that is accessible to anyone ...

#
# Installation & usage

## Installation
- Clone down or fork the repo

## Usage
- Use our link to access the [website](https://git-clone-blog.netlify.app/)

# Technologies implemented

- Server:
  - Express
  - Nodemon
  - cors

- Tesing:
  - Jest
  - Supertest

- Styling:
  - Font awesome framework
  - Quill library

- Deploy:
  - Client: Netlify
  - Server: Heroku

# Process

- Started by planning content of our website
- We used Figma to design the basic layout of the homepage
- The skeleton of the client side was developed first, with a homepage and message container which appeared when the user clicked 'git add'
- For the backend, we created a server using express and set up the deploy on heroku.
- Added entry page so that user can click on the previous post in the thread and get redirected to the specific post, so that the user can view, comment and use the interaction bar (emojis)
- Introduced textarea for the user to be able to type up their post
- Added a 'git push' button so that the user could submit their post
- Created a thread so that the newly created post would go into the thread with the previous pushes (posts) 
- Added a toolbar using Quill library to have essential text editor features
- Added extra UI to enhance UX such as:
  - a toggle feature to enable light and dark mode for the entire website
  - a search bar

# Challenges
- Gif
  - getting the correct gif link from the API response object
  
- Scipt
  - Missing out the 'r' in the script tag took a long time to identify
- Search bar
  - Loading data correctly
  - Checking the order of suggestions
  - Scoping
- Client side testing
  - Ongoing task

# Achievements
- Known major challenges were dealt with
- Extra UI feature 
- Smooth workflow
- Team advanced in their learning
- A fully functional website


# Significant code
- Search bar
- Emoji click to add and remove count
- Delete function

# Bugs
- No major known bugs

# Future features
- CRUD
- Sort feature
- View more posts feature

# Contributors
## Calum, Saja, Zerh