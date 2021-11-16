//Add ab event listener on keyup in the input field
//run the search function on each keyup
$('input').keyup(search);

//A click on a person should toggle (show/hide) more info
// delegated event handling with "on"
//grab something that already exists -> body
//and when someones click the body only run the event
//if the click occurs inside an element that has the class person


//if the mouse is clicked in the area of "person h3" in the "body" part of the website this function will start!
$('body').on('click', '.person h3', function () {
  //This is an h3 tag inside a div.person
  //so the parent is the div.person and we search for p tagand use toggle
  //to show them if they are hidden and hide them if they are shown
  $(this).parent().find('p').toggle(400);
});


async function search() {
  //Read the value of the input filed
  let search = $('input').val();
  //Make a fetch to our namesearch route to get a search result
  let result = await (await fetch('/persons/namesearch/' + search)).json();
  displaySearchResult(result);
}

async function displaySearchResult(persons) {
  //If no persons found report this
  if (persons.length === 0) {
    $('.result').html('No information found...');
    return;
  }

  let html = 'Click on a person for more information...';
  //Loop through each person in the search result
  //and use a destructuring assignment to get person properties
  //as loop variables
  for (let { firstName, lastName, email, birthDate, imageUrl, phone, country } of persons) {
    //Add html to display the person in the div.result
    html += `
    <div class="person">
    <h3>${firstName} ${lastName}</h3>
    <p><b>Email:</b>${email}</b></p>
    <p><b>Birth date:</b> ${birthDate}</p>
    <p><img src=${imageUrl}></p>
    <p><b>Phone:</b>${phone}</p>
    <p><b>Country:</b>${country}</p>
    </div>
    `;
  }
  $('.result').html(html);
}