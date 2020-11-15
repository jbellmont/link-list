// Overview page functions
if (document.body.dataset.title === 'overview') {
  // Global variables
  let currentPage = 1;
  const linksPerPage = 20; // determines how many links are rendered, per page


  // First visit localStorage dummy data
  const dummyData = [
    {url: 'https://digitalmediametrics.com/'},
    {url: 'http://google.com/'},
    {url: 'https://stackoverflow.com/'},
  ];

  const checkFirstVisit = () => {
    // If not first or second visit, exit function
    if (window.localStorage['linkListfirstVisit'] === 'false') {
      return;
    // If first visit, update localStorage
    } else if (!window.localStorage['linkListfirstVisit']) {
      return window.localStorage.setItem('linkListfirstVisit', 'true');
    // If second visit, update localStorage
    } else {
      return window.localStorage.setItem('linkListfirstVisit', 'false');
    }
  };


  // Render functions
  const renderLinkList = (page) => {
    // Populate with dummy data if first visit to app
    if (window.localStorage.getItem('linkListfirstVisit') === 'true') {
      window.localStorage.setItem('linkListData', JSON.stringify(dummyData));
      // Set to false so items are editable
      window.localStorage.setItem('linkListfirstVisit', 'false');
    }
    
    // Parse local storage data and render divs for each Link Item
    const data = JSON.parse(window.localStorage['linkListData']);
    // Loop setup, to ensure correct Link Items are rendered based on current page
    page--;
    const start = linksPerPage * page;
    const end = start + linksPerPage;
    const slicedData = data.slice(start, end);
    let linkNumber = start; // number rendered on each Link Item
    for (let i = 0; i < slicedData.length; i++) {
      createLinkItem(slicedData[i], linkNumber);
      linkNumber++;
    }
  };

  const renderAfterDataChange = () => {
    // Remove all Link Items and re-render with updated localStorage data
    const linkList = document.getElementById('link-list-container');
    linkList.innerHTML = '';
    renderLinkList(currentPage);
  }

  const createLinkItem = (linkData, index) => {
    // Creates Link Item DOM element
    const linkList = document.getElementById('link-list-container');
    const newLinkItem = document.createElement('div');
    newLinkItem.classList.add('link-wrapper');
    // Creates a List Item using localStorage data
    newLinkItem.innerHTML = `<div class="link-list-item" data-id=${index}>
          <h3 class="link-number">${index + 1}</h3>
          <a href="${linkData.url}" class="link-url">${linkData.url}</a>
          <div class="link-buttons">
            <button type="button" class="link-buttons-btn btn-edit-link"><i class="fas fa-edit"></i></button>
            <button type="button" class="link-buttons-btn btn-delete-link"><i class="fas fa-trash-alt"></i></button>
          </div>
        </div>`;
    linkList.append(newLinkItem);
  };

  const createPaginationButton = (page) => {
    const newButton = document.createElement('button');

    // Adds the page number
    if (page === currentPage) {
      // underlines active page number
      newButton.innerHTML = `<u>${page}</u>`; 
    } else {
      newButton.textContent = page;
    }

    // Styles the new button
    newButton.classList.add('btn-pagination-number');
    newButton.classList.add('btn-pag');
    newButton.classList.add('btn');

    // Appends the new button to the pagination wrapper
    const paginationWrapper = document.getElementById('pagination-button-wrapper');
    paginationWrapper.appendChild(newButton);
  };

  const renderPaginationButtons = () => {
    // Renders a pagination button for each page of 20 Link Items
    const data = JSON.parse(window.localStorage['linkListData']);
    const numberOfButtons = Math.ceil(data.length / linksPerPage);
    const paginationWrapper = document.getElementById('pagination-button-wrapper');
    paginationWrapper.innerHTML = ''; // Clears previous render before new render
    for (let i = 0; i < numberOfButtons; i++) {
      createPaginationButton(i + 1);
    }
  };


  // URL form validation
  const checkValidURL = (form) => {
    let url = '';

    // Sets which input field the function will refer to
    if (form === 'create') {
      url = document.getElementById('create-link-input').value;
    } else if (form === 'edit') {
      url = document.getElementById('edit-link-input').value;
    } else {
      return;
    }

    // If user tries to submit an empty value, show error message
    if (url === '' && form === 'create') {
      // Show error message in Create Link Item form
      const errorMessage = document.getElementById('create-link-error-message');
      errorMessage.style.display = 'block';
      errorMessage.textContent = 'Please enter a valid URL, including http(s)://';
    } else if (url === '' && form === 'edit') {
      // Show error message in edit Link Item form
      const errorMessage = document.getElementById('edit-link-error-message');
      errorMessage.style.display = 'block';
      errorMessage.textContent = 'Please enter a valid URL, including http(s)://';
    }

    // Check for valid URL using regex depending on which form you are in
    const regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    if (regex.test(url)) {
      return true;
    } else if (!regex.test(url) && form === 'create') {
      // Show error message in Create Link Item form
        const errorMessage = document.getElementById('create-link-error-message');
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Please enter a valid URL, including http(s)://';
        return false;
    } else {
        // Show error message in edit Link Item form
        const errorMessage = document.getElementById('edit-link-error-message');
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Please enter a valid URL, including http(s)://';
        return false;
    }
  };


  // Create Link Item function
  const onCreateLinkSubmit = (e) => {
    e.preventDefault();

    // URL form validation. If invalid URL, display error msg and exit function
    if (!checkValidURL('create')) {
      return;
    };

    // Update data locally, and then push to browser localStorage 
    const url = document.getElementById('create-link-input').value;
    const localStorageData = JSON.parse(window.localStorage['linkListData']);
    localStorageData.push({url});
    window.localStorage.setItem('linkListData', JSON.stringify(localStorageData));

    // Navigate to the Results page
    window.location.href = 'results.html';
    return;
  };
  const createLinkForm = document.getElementById('create-link-form');
  createLinkForm.addEventListener('submit', onCreateLinkSubmit);


  // Link Item buttons interaction functions
  const onDeleteLinkItemClick = (e) => {
    // Checks if click event registered on delete button or delete icon
    if (e.target.classList.contains('btn-delete-link') || 
        e.target.classList.contains('fa-trash-alt')) {
            // Save a reference to the URL id. Account for clicks on button/icon
            let linkIndex = 0;
            if (e.target.classList.contains('btn-delete-link')) { // button
              linkIndex = e.target.parentNode.parentNode.dataset.id;
            } else if (e.target.classList.contains('fa-trash-alt')) { // icon
              linkIndex = e.target.parentNode.parentNode.parentNode.dataset.id;
            }
            
            // Delete Link Item Overlay
            // Make overlay visible
            const deleteLinkOverlay = 
                document.getElementById('delete-link-container-overlay');
            deleteLinkOverlay.style.display = 'block';

            // Populate overlay URL box
            const localStorageData = 
                JSON.parse(window.localStorage['linkListData']);
            const urlDiv = document.querySelector('.submitted-url-delete');
            urlDiv.innerHTML = `${localStorageData[linkIndex].url}`;

            // Add event listener to the Yes button
            const yesBtn = document.getElementById('btn-delete-yes');
            yesBtn.addEventListener('click', () => {
              // Close overlay
              deleteLinkOverlay.style.display = 'none';

              // Update localSorage data locally, and push to browser localStorage 
              const newLocalStorageData = 
                  JSON.parse(window.localStorage['linkListData']);
              newLocalStorageData.splice(linkIndex, 1);
              window.localStorage.setItem('linkListData', 
                  JSON.stringify(newLocalStorageData));

              // If deletion leaves a blank page, navigate to previous page
              if ((currentPage > 1) && 
                  (JSON.parse(window.localStorage['linkListData']).length) % 20 === 0) {
                currentPage--;
              }
              // Remove all List Items and then render with updated localStorage data
              renderAfterDataChange();
              renderPaginationButtons();
            });

            // Add event listener to the Yes button
            const noBtn = document.getElementById('btn-delete-no');
            noBtn.addEventListener('click', () => {
              // Close overlay
              deleteLinkOverlay.style.display = 'none';
            });
        }
    return;
  };
  document.addEventListener('click', onDeleteLinkItemClick);

  const onEditLinkItemClick = (e) => {
    // Checks if click event registered on edit button or edit icon
    if (e.target.classList.contains('btn-edit-link') || 
        e.target.classList.contains('fa-edit')) {
            // Save a reference to the URL id. Account for clicks on button/icon
            let linkIndex = 0;
            if (e.target.classList.contains('btn-edit-link')) { // button
              linkIndex = e.target.parentNode.parentNode.dataset.id;
            } else if (e.target.classList.contains('fa-edit')) { // icon
              linkIndex = e.target.parentNode.parentNode.parentNode.dataset.id;
            }

            // Edit Link Item Overlay
            // Make overlay visible
            const editURLformContainer = 
                document.getElementById('edit-link-container-overlay');
            editURLformContainer.style.display = 'block';

            // Populate the overlay URL box
            const editLinkInputField = document.getElementById('edit-link-input');
            const localStorageData = JSON.parse(window.localStorage['linkListData']);
            editLinkInputField.value = localStorageData[linkIndex].url;

            // Gives the Edit Link Item form the relevant Link Item ID 
            const editURLform = document.getElementById('edit-link-form');
            editURLform.setAttribute('data-id', linkIndex);
        }
    return;
  };
  document.addEventListener('click', onEditLinkItemClick);


  // Edit Link Item form overlay functions
  const onUpdateLinkSubmit = (e) => {
    e.preventDefault();

    // Form validation check
    if (!checkValidURL('edit')) {
      return;
    }

    // Update localSorage data locally, and then push to browser localStorage 
    const url = document.getElementById('edit-link-input').value;
    const newLocalStorageData = JSON.parse(window.localStorage['linkListData']);
    const linkIndex = editURLform.dataset.id;
    newLocalStorageData.splice(linkIndex, 1, {url});
    window.localStorage.setItem('linkListData', JSON.stringify(newLocalStorageData));

    // Remove all list items and then re-render with updated localStorage data
    renderAfterDataChange();
    // Close the Edit Link Item form
    onCancelClick();
  };
  const editURLform = document.getElementById('edit-link-form');
  editURLform.addEventListener('submit', onUpdateLinkSubmit);

  const onCancelClick = () => {
    const editURLformContainer = 
        document.getElementById('edit-link-container-overlay');

    // Hide edit url form
    editURLformContainer.style.display = 'none';
    const errorMessage = document.getElementById('edit-link-error-message');

    // Remove error message for next time a user opens the Edit Link Item overlay
    errorMessage.innerHTML = '';
  };
  const cancelBtn = document.getElementById('btn-cancel-edit-link');
  cancelBtn.addEventListener('click', onCancelClick);


  // Pagination buttons interaction functions
  const onChangeCurrentPageClick = (e) => {
    currentPage = Number(e.target.textContent);

    // Remove any error message present
    document.getElementById('create-link-error-message').innerText = '';
    
    // Renders new Link Item list based on updated current page
    renderAfterDataChange();

    // Updates active page pagination button
    renderPaginationButtons();
  };
  // Listens for pagination button click 
  window.addEventListener('click', (e) => { 
    if (e.target.matches('.btn-pagination-number')) {
      onChangeCurrentPageClick(e);
    }
  });

  const onPreviousPageClick = () => {
    if (currentPage !== 1) {
      currentPage--;
      renderAfterDataChange();
      renderPaginationButtons();
    }
    return;
  };
  // Listens for previous page button click 
  document.getElementById('btn-previous-page').addEventListener('click', onPreviousPageClick);

  const onNextPageClick = () => {
    const data = JSON.parse(window.localStorage['linkListData']);
    const numberOfPages = Math.ceil(data.length / linksPerPage);
    if (currentPage !== numberOfPages) {
      currentPage++;
      renderAfterDataChange();
      renderPaginationButtons();
    }
    return;
  };
  // Listens for next page button click 
  document.getElementById('btn-next-page').addEventListener('click', onNextPageClick);


  // On page load function calls
  checkFirstVisit();
  renderLinkList(currentPage);
  renderPaginationButtons();
}