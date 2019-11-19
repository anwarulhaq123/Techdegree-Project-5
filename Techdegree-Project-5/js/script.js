/*****
*********Techdegree Project 5. Public Api Request ********
*/

const gallery = document.getElementById('gallery');
const body = document.querySelector('body');
let card = document.getElementsByClassName('card');
let users= [];





// fetch the Api from the given API
fetch('https://randomuser.me/api/?results=12&nat=ie')
  .then(res => res.json())
  .then(data => fetchUsers(data))
  .then(data => randomCard(data))
  .catch(error => console.log('Error 404 ', error))



function fetchUsers(data) {
  users = data.results;
  const randomUsers = users;

  randomUsers.forEach(user => {

    // html to add the users , and display .
    const html = `
      <div class="card">
          <div class="card-img-container">
              <img class="card-img" src="${user.picture.medium}" alt="profile picture">
          </div>
          <div class="card-info-container">
              <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
              <p class="card-text">${user.email}</p>
              <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
          </div>
      </div>`

    // Add  to gallery
    gallery.innerHTML += html;

  });

}
/*
 Modal window Or A Single Card for Random user

 */

const div = document.createElement('div');
div.className = "modal-container"
body.append(div);
const modalContainer = document.querySelector('.modal-container');
modalContainer.style.display = 'none';


function modalWindow(i) {

  const user = users[i];
  const birthdayDay = user.dob.date.substring(8, 10);
  const birthdayMonth = user.dob.date.substring(5, 7);
  const birthdayYear = user.dob.date.substring(0, 4);
  const birthday = `Birthday: ${birthdayMonth}/${birthdayDay}/${birthdayYear}`;

  // Regex for the Phone Fromate according to mockup.
  const phone = user.phone;
  const phoneFormate =  phone.replace(/\D+/g, '')
     .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');


  // Generates the HTML for the modal window //
  const modalHTML = `
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${user.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="modal-text">${user.email}</p>
                <p class="modal-text cap">${user.location.city}</p>
                <hr>
                <p class="modal-text">${phoneFormate}</p>
                <p class="modal-text">${user.location.street.number} ${user.location.street.name}. ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
                <p class="modal-text">${birthday}</p>
            </div>

            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>
        `;
  modalContainer.innerHTML = modalHTML;


  // Close Modal Button


  $('#modal-close-btn').click(function() {
    $('.modal-container').hide();
  })

  // User Next and Previous Section

  // Modal window for next User
  $('button#modal-next').click(function() {
    modalWindow(i + 1);
    $('.modal-container').show()

  })

  // Modal Window for Previous User
  $('button#modal-prev').click(function() {
    modalWindow(i - 1);
    $('.modal-container').show()

  })
  userNumber(i);
}
// Function to check the next and Previous.

function userNumber(i) {
  if (i <= 0) {
    $('button#modal-prev').hide();
  } else if (i >= 11) {
    $('button#modal-next').hide();
  }

}
// Add Event Listener to each Card Element
function randomCard() {
  for (let i = 0; i < card.length; i++) {
    card[i].addEventListener('click', function() {
      modalWindow(i);
      $('.modal-container').show();
    })

  }
}

/********************* Search Bar *******************************/

const search = document.querySelector('.search-container');
const userSearch = document.createElement('form');
userSearch.setAttribute('action', '#');
userSearch.setAttribute('method', 'get');
search.appendChild(userSearch);
search.innerHTML = `
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
`;


const searchSubmit = document.querySelector('#search-submit');
let input = document.querySelector('#search-input');
input.addEventListener('keyup', search_user);
searchSubmit.addEventListener('click', search_user);
// function to Search the User By Name.
function search_user(event) {


  for (i = 0; i < card.length; i++) {
    const name = card[i].querySelector('#name').textContent.toLowerCase();
    if (!name.includes(input.value.toLowerCase())) {
      event.preventDefault();
      card[i].style.display = "none";

    } else {
      card[i].style.display = "flex";

    }
  }

}
// Set the background image.
body.style.backgroundImage = "url('images/background.jpg')";
body.style.backgroundSize = "1000px 1000px";
