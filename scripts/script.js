document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Get entered username and password
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  // Check if entered credentials match the predefined values
  if (username === 'admin' && password === 'admin123') {
    // Redirect to dashboard or desired page
    window.location.href = 'index.html';
  } else {
    // Display an error message or take appropriate action
    alert('Invalid username or password. Please try again.');
  }
});

function cancelLogin() {
  // Clear input fields
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
}
