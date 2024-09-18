const logoutBtn = document.querySelector('#nav-logout')

logoutBtn.addEventListener('click', async (event) => {
  event.preventDefault();

  const response = await fetch('/api/users/logout', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/')
    console.log('You are now logged out');
  } else {
    alert(response.statusText);
  }
})

const profileLogoutBtn = document.querySelector('#logout-btn')

profileLogoutBtn.addEventListener('click', async (event) => {
  event.preventDefault();

  const response = await fetch('/api/users/logout', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/')
    console.log('You are now logged out');
  } else {
    alert(response.statusText);
  } 
})