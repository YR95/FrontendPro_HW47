let idPost = 0;
document.querySelector("#inputId").addEventListener("change", (el) => {
  idPost = el.target.value;
  console.log(idPost);

  fetch(`https://jsonplaceholder.typicode.com/todos/${idPost}`)
  .then((response) => {
    // 1. check response.ok
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response); // 2. reject instead of throw
  })
  .then((json) => {//good scenario
    console.log('everything is ok');
    console.log(json);
  })
  .catch((response) => {         // bad scenario

    console.log(response.status, response.statusText);
  });
});
