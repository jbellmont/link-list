// Global variables
let currentPage = 1;
const linksPerPage = 20;

// First visit localStorage dummy data
const dummyData = [
  {
    url: 'https://digitalmediametrics.com/',
  },
  {
    url: 'http://google.com/',
  },
  {
    url: 'https://stackoverflow.com/',
  },
];

// Checks if first visit to app. Updates localStorage to true/false
const checkFirstVisit = () => {
  if (!localStorage.getItem('linkListfirstVisit')) {
    return localStorage.setItem('linkListfirstVisit', true);
  } else {
    return localStorage.setItem('linkListfirstVisit', false);
  }
};

// Render functions
const renderLinkList = (page) => {
  // If first visit, populate with dummy data
  if (localStorage.getItem('linkListfirstVisit') === 'true') {
    localStorage.setItem('linkListData', JSON.stringify(dummyData));
  } 
  // Parse local storage data and render HTML for each link
  const data = JSON.parse(localStorage.getItem("linkListData"));
  // Loop setup, to ensure links are rendered based on current page
  page--;
  const start = linksPerPage * page;
  const end = start + linksPerPage;
  const slicedData = data.slice(start, end);
  for (let i = 0; i < slicedData.length; i++) {
    createLinkListItem(slicedData[i], i);
  }
};

const renderAfterDataChange = () => {
  // Remove all list items and then re-render with updated localStorage data
  const linkList = document.getElementById('link-list-container');
  linkList.innerHTML = "";
  renderLinkList(currentPage);
}

const createLinkListItem = (linkData, index) => {
  const linkList = document.getElementById('link-list-container');
  const newLink = document.createElement('div');
  newLink.classList.add('link-wrapper');
  // Creates a link list item from linkData, which is a localStorage array value
  newLink.innerHTML = `<div data-id=${index}>
  <h3>#${index + 1}</h3>
  <a href="">${linkData.url}</a>
  <button type="button" class="btn btn-edit-link">Edit</button>
  <button type="button" class="btn btn-delete-link">Delete</button>
  </div>
  `;
  linkList.append(newLink);
};

const createPaginationButton = (page) => {
  const button = document.createElement('button');
  button.textContent = page;
  button.classList.add('btn-pagination-number')
  const paginationWrapper = document.getElementById('pagination-button-wrapper');
  paginationWrapper.appendChild(button);
};

const renderPaginationButtons = () => {
  const data = JSON.parse(localStorage.getItem("linkListData"));
  numberOfButtons = Math.ceil(data.length / linksPerPage);
  for (let i = 0; i < numberOfButtons; i++) {
    createPaginationButton(i + 1);
  }
};

// Pagination button functions
const onChangeCurrentPageClick = (e) => {
  currentPage = Number(e.target.textContent);
  renderAfterDataChange();
};
window.addEventListener('click', (e) => { // Attach event listener for the pagination buttons
  if (e.target.matches('.btn-pagination-number')) {
    onChangeCurrentPageClick(e);
  }
});

const onPreviousPageClick = () => {
  if (currentPage !== 1) {
    currentPage--;
    renderAfterDataChange();
  }
  return;
};
document.getElementById('btn-previous-page').addEventListener('click', onPreviousPageClick);

const onNextPageClick = () => {
  const data = JSON.parse(localStorage.getItem("linkListData"));
  numberOfPages = Math.ceil(data.length / linksPerPage);
  if (currentPage !== numberOfPages) {
    currentPage++;
    renderAfterDataChange();
  }
  return;
};
document.getElementById('btn-next-page').addEventListener('click', onNextPageClick);


// URL form validation
const checkValidURL = (form) => {
  // Regex check to see if the url string is valid  
  let url = '';
  if (form === 'create') {
    url = document.getElementById('create-link-input').value;
  } else if (form === 'edit') {
    url = document.getElementById('edit-link-input').value;
  } else {
    return;
  }
  const regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
  if (regex.test(url)) {
    return true;
  } else {
    return false;
  }
};

// Form functions
const onCreateLinkSubmit = (e) => {
  e.preventDefault();
  // URL form validation check
  if (!checkValidURL('create')) {
    return;
  };
  // Update a copy of localSorage data locally, and then push to browser localStorage 
  const url = document.getElementById('create-link-input').value;
  const newLocalStorageData = JSON.parse(localStorage.linkListData);
  newLocalStorageData.push({url});
  localStorage.setItem('linkListData', JSON.stringify(newLocalStorageData));
  // Remove all list items and then re-render with updated localStorage data
  renderAfterDataChange();
  // navigate to the Results page
  window.location.href = 'results.html';
  return;
};
const createLinkForm = document.getElementById('create-link-form');
createLinkForm.addEventListener('submit', onCreateLinkSubmit);

// Link item button functions
const onDeleteLinkItemClick = (e) => {
  if (e.target.matches('.btn-delete-link')) {
    // Update a copy of localSorage data locally, and then push to browser localStorage 
    const newLocalStorageData = JSON.parse(localStorage.linkListData);
    const linkIndex = e.target.parentNode.dataset.id; // from custom HTML attribute
    newLocalStorageData.splice(linkIndex, 1);
    localStorage.setItem('linkListData', JSON.stringify(newLocalStorageData));
    // Remove all list items and then re-render with updated localStorage data
    renderAfterDataChange();
  }
  return;
};
document.addEventListener('click', onDeleteLinkItemClick);

const onEditLinkItemClick = (e) => {
  if (e.target.matches('.btn-edit-link')) {
    const editURLformContainer = document.getElementById('edit-link-container');
    editURLformContainer.style.display = 'block';
    const editLinkInputField = document.getElementById('edit-link-input');
    const localStorageData = JSON.parse(localStorage.linkListData);
    editLinkInputField.value = localStorageData[e.target.parentNode.dataset.id].url;
    // Give the form the ID of the currently edited link item
    const editURLform = document.getElementById('edit-link-form');
    editURLform.setAttribute('data-id', e.target.parentNode.dataset.id);
  }
  return;
};
document.addEventListener('click', onEditLinkItemClick);

// Edit URL form overlay functions
const editURLform = document.getElementById('edit-link-form');
const onUpdateLinkSubmit = (e) => {
  e.preventDefault();
  if (!checkValidURL('edit')) {
    return;
  }
  // Update a copy of localSorage data locally, and then push to browser localStorage 
  const url = document.getElementById('edit-link-input').value;
  const newLocalStorageData = JSON.parse(localStorage.linkListData);
  const linkIndex = editURLform.dataset.id;
  newLocalStorageData.splice(linkIndex, 1, {url});
  localStorage.setItem('linkListData', JSON.stringify(newLocalStorageData));
  // Remove all list items and then re-render with updated localStorage data
  renderAfterDataChange();
  // Close the edit URL form
  onCancelClick();
};
editURLform.addEventListener('submit', onUpdateLinkSubmit);

const onCancelClick = () => {
  const editURLformContainer = document.getElementById('edit-link-container');
  // Hide edit url form
  editURLformContainer.style.display = 'none';
};
const cancelBtn = document.getElementById('btn-cancel-edit-link');
cancelBtn.addEventListener('click', onCancelClick);

// On page load function calls
checkFirstVisit();
renderLinkList(currentPage);
renderPaginationButtons();