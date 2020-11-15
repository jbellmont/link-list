// Results page functions
if (document.body.dataset.title === 'results') {
  const displaySubmittedURL = () => {
    // Checks to see if user is on the results page
    if (document.getElementById('submission-container')) {
      const localStorageData = JSON.parse(window.localStorage['linkListData']);
      const submittedURL = localStorageData[localStorageData.length - 1].url;
      document.querySelector('.submitted-url').textContent = `${submittedURL}`;
    } else {
      return;
    }
  };
  
  displaySubmittedURL();
}