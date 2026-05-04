<<<<<<< HEAD
var nameInput = document.getElementById("bookmarkName");
var urlInput = document.getElementById("bookmarkURL");
var btn = document.getElementById("submitBtn");
var table = document.getElementById("tableContent");
var darkBtn = document.getElementById("darkModeBtn");
var searchInput = document.getElementById("searchInput");
var bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

function showNotification(message, type = "success") {
  var notif = document.createElement("div");

  notif.className = `notification ${type}`;
  notif.innerHTML = message;

  document.body.appendChild(notif);

  setTimeout(function () {
    notif.remove();
  }, 3000);
}

function isValid(name, url) {
  if (name.length < 3) return false;

  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function save() {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function render(list = bookmarks) {
  table.innerHTML = "";

  if (list.length === 0) {
    table.innerHTML = `
      <tr>
        <td colspan="4" class="empty">💔 No bookmarks found</td>
      </tr>
    `;
    return;
  }

  for (var i = 0; i < list.length; i++) {
    table.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${list[i].name}</td>
        <td>
          <a href="${list[i].url}" target="_blank" class="btn btn-sm btn-primary">
            Visit
          </a>
        </td>
        <td>
          <button class="btn btn-sm btn-danger delete-btn" data-index="${i}">
            Delete
          </button>
        </td>
      </tr>
    `;
  }
}

btn.onclick = function () {
  var name = nameInput.value.trim();
  var url = urlInput.value.trim();

  if (!isValid(name, url)) {
    showNotification("❌ Invalid Data", "error");
    return;
  }

  btn.innerHTML = "Saving...";
  btn.disabled = true;

  setTimeout(function () {
    bookmarks.push({ name: name, url: url });

    save();
    render();

    nameInput.value = "";
    urlInput.value = "";

    btn.innerHTML = "Add Bookmark";
    btn.disabled = false;

    showNotification("✨ Added Successfully", "success");
  }, 500);
};

table.onclick = function (e) {
  if (e.target.classList.contains("delete-btn")) {
    var index = e.target.dataset.index;

    bookmarks.splice(index, 1);

    save();
    render();

    showNotification("🗑 Deleted Successfully", "delete");
  }
};

searchInput.oninput = function () {
  var value = searchInput.value.toLowerCase();

  var filtered = bookmarks.filter(function (item) {
    return item.name.toLowerCase().includes(value);
  });

  render(filtered);
};

darkBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    darkBtn.innerHTML = `<i class="fa-solid fa-sun"></i>`;
  } else {
    darkBtn.innerHTML = `<i class="fa-solid fa-moon"></i>`;
  }
});

render();
=======
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





>>>>>>> c27af9746391e2e5bc8fc370cca84fea26720a30
