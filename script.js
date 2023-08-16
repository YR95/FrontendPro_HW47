let idPost = 0;
let dataPost;
let dataPostComments=[] ;
let buttonSubmmit = document.createElement("input");
buttonSubmmit.type = "button";
buttonSubmmit.id = "buttonSubmmit";
buttonSubmmit.value = "Get comments";
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
    dataPost = JSON.stringify(json).replaceAll(",", ", <br>");
    console.log('everything is ok');
    console.log(json);
    renderPost();
  })
  .catch((response) => {         // bad scenario

    console.log(response.status, response.statusText);
  });
});

buttonSubmmit.addEventListener("click", (ev) => {
  fetch(`https://jsonplaceholder.typicode.com/todos/${idPost}/comments`)
  .then((response) => {

    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  })
  .then((json) => {
    dataPostComments = json;
    console.log('comments are loaded');
    console.log(json);
    renderPostComments();
  })
  .catch((response) => {
    console.log(response.status, response.statusText);
  });
});

function renderPost() {
  document.body.innerHTML = "";
  let div = document.createElement("div");
  div.id = "postId";
  div.style.background = "aqua";
  div.style.fontSize = "36px";
  div.innerHTML += dataPost;
  document.body.append(div, buttonSubmmit);
}

function renderPostComments() {
  document.body.innerHTML = "";
  let div = document.createElement("div");
  div.id = "comments";
  div.style.background = "yellow";

  dataPostComments.forEach(function (value) {
    let p = document.createElement("p");
    p.innerText = JSON.stringify(value);
    p.style.padding = "20px";
    div.append(p);
  });

  document.body.append(div);
}