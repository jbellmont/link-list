// Results page functions
const displaySubmittedURL = () => {
  const localStorageData = JSON.parse(localStorage.linkListData);
  const submittedURL = localStorageData[localStorageData.length - 1].url;
  document.querySelector('.submitted-url').textContent = `${submittedURL}`;
};

window.addEventListener('DOMContentLoaded', displaySubmittedURL);