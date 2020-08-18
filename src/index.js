const ul = document.querySelector('ul');

const displayFriends = async() => {
  const result = await fetch('/api/friends');
  const data = await result.json();

  const html = data.map( friend => {
    return `
      <li id='${friend.name}-entry'>${friend.name}</li>
      <div id='${friend.id}'>
        <span>${friend.rating}</span>
        <button id='${friend.rating}+'>+</button>
        <button id='${friend.rating}-'>-</button>
        <button>x</button>
        <p></p>
      </div>
    `;
  }).join('');
  ul.innerHTML = html;
}

const handleFriendOptions = () => {
  ul.addEventListener('click', async function(event) {
    try{
      const target = event.target;
      if (target.tagName === 'BUTTON') {
        if (target.innerHTML === '+') {
          changeRating(target, 1);
        } else if (target.innerHTML === '-') {
          changeRating(target, -1);
        } else if (target.innerHTML === 'x') {
          await fetch(`/api/friends/${event.target.parentNode.id}`, {
            method: 'DELETE'
          })
          displayFriends();
        }
      }
    }
    catch(err) {
      console.error(err)
    }
  });
}

const addFriend = async () => {
  const createButton = document.getElementById('create-friend');

  createButton.addEventListener('click', async function() {
    let newFriend = document.getElementById('new-friend').value;
    await fetch(`/api/friends`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newFriend
      })
    });
    document.getElementById('new-friend').value = ""; // clear input box
    displayFriends();
  });
}

const changeRating = async (target, direction) => {
  let rating = parseInt(target.id.slice(0, -1)) + direction;

  await fetch(`/api/friends/${target.parentNode.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      rating: rating
    }),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  });

  displayFriends();
}

displayFriends();
handleFriendOptions();
addFriend();
