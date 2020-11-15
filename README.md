# Link List

A web app that allows you to save bookmarks in a list

**[Live link](https://jbellmont.github.io/link-list)**


## Installation instructions
1. In your terminal, select a directory and use `git clone https://github.com/jbellmont/link-list.git` to download the files
2. Open the directory in your IDE. If using Visual Studio Code, type `cd link-list` to move into the directory and use `code .` command to open the project.
3. Create a local server and view `index.html` to start using the app. The functionality will not work if you open the HTML files locally (i.e. not using a local server). 

## Technologies used
- HTML5
- CSS3 (bespoke and responsive styling, incl. Google Fonts and Font Awesome, for fonts and icons)
- JavaScript (incl. localStorage for client-side persistent storage)

## Requirements met
- Developed JavaScript web app that maintains list of bookmarks
- User can add, edit and delete any link in list
- Only uses front-end technologies
- Custom form validation for URL input
- Links persist after page reload, navigating to another URL and closing the browser
- Followed Google's HTML, CSS and JavaScript style guidelines

**Bonus**
- JavaScript compiled into single minified file using Google Closure Compiler (mini.js)

## Design features
**All pages**
- Responsive design across screen sizes

**Overview page**
- On first visit, three links from dummy data populate the app
- Form at top of app that allows user to submit a link. This form uses custom form validation
- Successful link submissions are storaged as JSON data in the browser's localStorage. This means if expanding the data structure, new properties can be easily added (e.g. link category)
- **Non-briefed feature:** an error message is shown if the form validation fails
- 20 links max per page are displayed
- Once number of links exceeds 20, the user can navigate to the next page using the pagination buttons
- Includes numbered pagination navigation with next and previous link buttons 
- **Non-briefed feature:** Edit link button opens an overlay to edit and submit an updated link
- **Non-briefed feature:** Delete link button opens an overlay to ask the user for confirmation before deleting

**Results page**
- Contains a message thanking the user for a submission
- Displays the user’s submitted URL
- Includes a link back to the Overview page


## Limitations
- CSS uses custom variables, which are not supported in Microsoft IE. [95% of all users will be supported](https://caniuse.com/?search=custom%20variables), regardless
- No cap on the number of links you can add, which may cause visual issues if too many pagination number buttons are created and they stretch the UI
- Uses localStorage; if a user deletes their localStorage, all links are lost
- New links are added at the end of the list, which means the user will have to always scroll to the last page to view
- List order is static (no sorting)
- Duplicate bookmarks can be added
- Rogue domain endings will still pass the regex check (e.g. '.commmmm')

## Proposed features for the future
- Hosting data on server (in database) and build an API with CRUD routes for http requests instead of using localStorage
- Search bar - to search for a specific link, useful if list grows in length
- Buttons to sort list (by date added, alphabetically, etc.)
- Link categories - labels each link, which opens possibilities to sorting or filtering by link category (e.g. on display 'sports' links)
- Drag and drop links to manually change order
