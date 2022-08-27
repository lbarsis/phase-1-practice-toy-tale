let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector('.add-toy-form');
  const toyUrl = 'http://localhost:3000/toys'
  const toyCollection = document.querySelector('#toy-collection')

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch(toyUrl)
  .then(resp => resp.json())
  .then(loadToys)

  toyForm.addEventListener('submit', submitData)

  function loadToys(toys) {
    toys.forEach(createToyCard)
  }
  
  function submitData(e) {
    e.preventDefault()
    const getToyName = document.querySelectorAll('.input-text')[0].value
    const getToyImg = document.querySelectorAll('.input-text')[1].value
  
    const configurationObject = {
      method:'POST',
      headers: {
        "Content-Type": 'application/json',
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: getToyName,
        image: getToyImg,
        likes: 0
      })
    }
  
    fetch(toyUrl, configurationObject)
    .then(resp => resp.json())
    .then(createToyCard)
  }
  
  function createToyCard(toy) {
    const card = document.createElement('div')
    const toyName = document.createElement('h2')
    const toyImg = document.createElement('img')
    const toyLikesEl = document.createElement('p')
    const likeBtn = document.createElement('button')
  
    card.classList.add('card')
    toyImg.classList.add('toy-avatar')
    likeBtn.classList.add('like-btn')
  
    likeBtn.id = toy.id
  
    toyName.textContent = toy.name
    toyImg.src = toy.image
    toyLikesEl.textContent = `${toy.likes} Likes`
    likeBtn.textContent = 'Like ❤️'
  
    card.appendChild(toyName)
    card.appendChild(toyImg)
    card.appendChild(toyLikesEl)
    card.appendChild(likeBtn)
    
    toyCollection.appendChild(card)

    likeBtn.addEventListener('click', likeEvent => {
      const toyID = likeEvent.target.id
      const toyLikes = toy.likes++
      
      fetch(`http://localhost:3000/toys/${toyID}`, {
          method:'PATCH',
          body: JSON.stringify({
            likes: toyLikes+1
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        })
        .then(resp => resp.json())
        .then(toy => toyLikesEl.textContent = `${toy.likes} Likes`)
    })
  }
});

