# Link List

A client-side web app that allows users to create a list of URL bookmarks.

**[Live link](https://jbellmont.github.io/link-list)**


## Installation instructions
1. In your terminal, select a directory and use `git clone https://github.com/jbellmont/link-list.git` to download the files.
2. Open the directory in your IDE. If using Visual Studio Code, type `cd link-list` to move into the directory and use `code .` command to open the project.
3. Create a local server and view `index.html` to start using the app. The functionality will not work if you open the HTML files from your hard drive (i.e. not using a local server).

## Technologies used
- HTML5
- CSS3 (bespoke and responsive styling, incl. Google Fonts and Font Awesome, for fonts and icons)
- JavaScript (incl. localStorage for client-side persistent storage)

## Requirements met
- Developed JavaScript web app that maintains list of bookmarks.
- User can add, edit and delete any link in list.
- Only uses front-end technologies.
- Custom form validation for URL input (regex).
- Links persist after page reload, navigating to another URL or closing the browser.
- Follows Google's HTML, CSS and JavaScript style guidelines.

**Bonus**
- JavaScript compiled into single minified file using Google Closure Compiler (`mini.js`). `app.js` (for Overview) and `results.js` (for Results) are the non-compiled files for reference.

## Design features
**All pages**
- Responsive design across screen sizes.
- Uses [color palette](https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=1976D2) optimised for accessibility.
- Longer URLs are truncated with ellipses to ensure that they do not stretch or break the UI. 

**Overview page**
- On first visit, three links from dummy data populate the app.
- Form at top of app allows users to submit a link; uses custom form validation (regex).
- Successful link submissions are stored as JSON data in the browser's localStorage. This means if expanding the data structure, new properties can be easily added (e.g. link category).
- **Non-briefed feature:** an error message is shown if form validation fails.
- 20 links max per page are displayed.
- Includes numbered pagination navigation with next and previous link buttons.
- Once number of links exceeds 20, the user can navigate to the next page using the pagination buttons.
- **Non-briefed feature:** Edit link button opens an overlay to edit and submit an updated link.
- **Non-briefed feature:** Delete link button opens an overlay to ask the user for confirmation before deleting.

**Results page**
- Contains a message thanking the user for their submission.
- Displays the user’s submitted URL.
- Includes a link back to the Overview page.

## Limitations
- CSS uses custom variables (for colours and padding); this is not supported by Microsoft IE. [95% of all users will be supported](https://caniuse.com/?search=custom%20variables), regardless.
- In the custom form validation, due to same origin policy restrictions, I could not validate if URLs exist using an http request. 
- No cap on the number of links you can add, which may cause visual issues if too many pagination number buttons are created.
- If a user deletes their localStorage, all links are lost.
- List order is static (no sorting).
- Duplicate bookmarks can be added.
- Rogue domain endings will still pass the regex check (e.g. '.commmmm').

## Proposed features for the future
- Hosting data on server (in database) and build an API with CRUD routes for http requests instead of using localStorage.
- Server-side code should allow more advanced form validation, by checking if a URL exists with an http request (e.g. accept a link if status code 200 is returned).
- Search bar - to find specific links, useful if list grows in length.
- Buttons to sort list (by date added, alphabetically, etc.).
- Link categories - labels each link; opens possibilities to sorting/filtering by link category (e.g. only render 'sports' links).
- Drag and drop links to manually change order.
