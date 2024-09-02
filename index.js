import reddit from './redditapi';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Form Event Listener
searchForm.addEventListener('submit', (e)=> {
    // Get search term
    const searchTerm = searchInput.value;
    // Get sort
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    // Get limit

    const searchLimit = document.getElementById('limit').value;

    // Check input

    if(searchTerm === ''){
        // show message
        showMessage('Please add a search term', 'alert-danger');
    }

    // clear input
    searchInput.value = '';

    // Search Reddit
    reddit.search(searchTerm, searchLimit, sortBy)
     .then(results => {
        let output = '<div class="row row-cols-1 row-cols-md-3 g-4">';
        // Loop through posts
        results.forEach(post => {
            // Check for image
            const image = post.preview ? post.preview.images[0].source.url : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg';
            output += `
                  <div class="col">
                    <div class="card">
                        <img src="${image}" class="card-img-top" alt="Post Image">
                        <div class="card-body">
                            <h5 class="card-title">${post.title}</h5>
                            <p class="card-text">${truncateText(post.selftext, 100)}</p>
                        </div>
                        <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a>
                        <hr> 
                        <span class="badge bg-secondary">Subreddit: ${post.subreddit}</span>
                        <span class="badge bg-dark">Score: ${post.score}</span>
                    </div>
                </div>
            `;
        })
        output += '</div>';
        document.getElementById('results').innerHTML = output;
     })
    e.preventDefault();

})

// Show Message
function showMessage(message, className){
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
   
    document.querySelector('.messagell').appendChild(div);

    // Timeout alert
    setTimeout(()=> {
        document.querySelector('.alert').remove();
    }, 3000);

}

// Truncate Text
function truncateText(text, limit){
    const shortened = text.indexOf(' ', limit);
    if(shortened == -1) return text;
    return text.substring(0, shortened);
}