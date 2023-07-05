// Fetch the blogs from blogs.json
fetch('blogs.json')
  .then(response => response.json())
  .then(data => {
    const searchBar = document.getElementById('searchBar');
    const typeFilter = document.getElementById('typeFilter');
    const blogList = document.getElementById('blogList');

    // Function to filter blogs based on title and type
    const filterBlogs = () => {
      const searchText = searchBar.value.toLowerCase();
      const selectedType = typeFilter.value.toLowerCase();

      const filteredBlogs = data.filter(blog => {
        const blogTitle = blog.title.toLowerCase();
        const blogType = blog.type.toLowerCase();

        const titleMatch = blogTitle.includes(searchText);
        const typeMatch = selectedType === '' || blogType === selectedType;

        return titleMatch && typeMatch;
      });

      displayBlogs(filteredBlogs);
    };

    // Initial display of all blogs
    displayBlogs(data);

    // Event listeners for search bar and filter dropdown
    searchBar.addEventListener('input', filterBlogs);
    typeFilter.addEventListener('change', filterBlogs);
  });

const displayBlogs = (blogs) => {
  blogList.innerHTML = '';

  blogs.forEach(blog => {
    const blogEntry = document.createElement('div');
    blogEntry.classList.add('blog-entry');

    const blogLink = document.createElement('a');
    blogLink.href = blog.link;
    blogLink.textContent = blog.title;
    blogLink.classList.add('blog-title'); // Add a class for styling if needed

    const blogDescription = document.createElement('p');
    blogDescription.textContent = blog.description;

    const blogImageLink = document.createElement('a');
    blogImageLink.href = blog.link;
    const blogImage = document.createElement('img');
    blogImage.src = blog.photo;
    blogImage.alt = blog.title;
    blogImageLink.appendChild(blogImage);

    blogEntry.appendChild(blogImageLink);
    blogEntry.appendChild(blogLink);
    blogEntry.appendChild(blogDescription);

    blogList.appendChild(blogEntry);
  });
};
