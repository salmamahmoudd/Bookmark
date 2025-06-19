var bookmarkNameInput = document.getElementById('bookmarkName');
var bookmarkURLInput = document.getElementById('bookmarkURL');
var submitBtn = document.getElementById('submitBtn');
var tableContent = document.getElementById('tableContent');
var boxInfo = document.querySelector('.box-info'); 
var closeBtn = document.getElementById('closeBtn');
var bookmarks = []; 
function showError() {
  boxInfo.classList.remove('d-none'); 
}

closeBtn.onclick = function() {
  boxInfo.classList.add('d-none'); 
}

function isValid(siteName, siteURL) {
  if(siteName.length < 3) return false;
  if(!siteURL.startsWith('http://') && !siteURL.startsWith('https://')) return false;
  return true;
}

function addBookmark(name, url) {
  var bookmark = {
    name: name,
    url: url
  };

  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

function renderTable() {
  tableContent.innerHTML = '';

  for(var i = 0; i < bookmarks.length; i++) {
    var tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${bookmarks[i].name}</td>
      <td><a href="${bookmarks[i].url}" target="_blank" class="btn btn-primary">Visit</a></td>
      <td><button class="btn btn-danger delete-btn" data-index="${i}">Delete</button></td>
    `;

    tableContent.appendChild(tr);
  }

  var deleteButtons = document.querySelectorAll('.delete-btn');
  for(var j = 0; j < deleteButtons.length; j++) {
    deleteButtons[j].onclick = function() {
      var index = this.getAttribute('data-index');
      deleteBookmark(index);
    }
  }
}

function deleteBookmark(index) {
  bookmarks.splice(index, 1);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  renderTable();
}

function loadBookmarks() {
  var data = localStorage.getItem('bookmarks');
  if(data) {
    bookmarks = JSON.parse(data);
  }
  renderTable();
}

loadBookmarks(); 
submitBtn.onclick = function() {
  var siteName = bookmarkNameInput.value.trim();
  var siteURL = bookmarkURLInput.value.trim();

  if(!isValid(siteName, siteURL)) {
    showError();
    return;
  }

  addBookmark(siteName, siteURL);


  bookmarkNameInput.value = '';
  bookmarkURLInput.value = '';

  renderTable();
}





