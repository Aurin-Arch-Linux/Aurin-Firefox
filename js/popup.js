document.addEventListener('DOMContentLoaded', function() {
  
  var searchDiv = document.getElementById('searchpop');
  var searchResults = document.getElementById('searchResults');

  searchButton.addEventListener('click', function() {
    var query = searchInput.value.trim();
    if (query !== '') {
      chrome.runtime.sendMessage({ action: 'searchAUR', query: query }, function(response) {
        if (response.success) {
          handleSearchResults(response.data);
        } else {
          console.error('Error:', response.error);
        }
      });
    }
  });

function handleSearchResults(data) {
  var resultsContainer = document.getElementById('searchResults');
  resultsContainer.innerHTML = ''; // Clear previous results

  if (data.results && data.results.length > 0) {
    var ul = document.createElement('ul');
    data.results.forEach(function(package) {
      var li = document.createElement('li');

      // Create anchor element for package name
      var nameLink = document.createElement('a');
      nameLink.textContent = package.Name;
      nameLink.href = 'aurin://' + encodeURIComponent(package.Name);
      
      var nameBold = document.createElement('strong');
      nameBold.appendChild(nameLink);
      // Create element for package description
      var description = document.createElement('span');
      description.textContent = ' - ' + package.Description;

      // Append name and description to list item
      li.appendChild(nameBold);
      li.appendChild(description);

      // Append list item to the list
      ul.appendChild(li);
    });
    resultsContainer.appendChild(ul);
  } else {
    var message = document.createElement('p');
    message.textContent = 'No results found';
    resultsContainer.appendChild(message);
  }

  // Hide search box and button, show search results
  searchDiv.style.display = 'none';
  resultsContainer.style.display = 'block';
}



});
