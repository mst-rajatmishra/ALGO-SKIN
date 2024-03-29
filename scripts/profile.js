function selectUser(username) {
    document.getElementById('selectedUser').textContent = username;
    // Populate user details (replace with actual data)
    document.getElementById('username').value = username;
    document.getElementById('password').value = '*****'; // Example password (hidden)
    document.getElementById('role').value = 'User'; // Example role (replace with actual role)
  }
  
  function editUser() {
    // Handle edit functionality
    alert('Edit button clicked');
  }
  
  function deleteUser() {
    // Handle delete functionality
    alert('Delete button clicked');
  }
  
  function addUser() {
    // Handle add functionality
    alert('Add button clicked');
  }
// Sample user data (replace with actual data or fetch from a database)
let users = [
    { username: 'John Doe', password: 'password123', role: 'Admin' },
    { username: 'Jane Smith', password: 'pass456', role: 'User' },
    // Add more user objects as needed
  ];
  
  function selectUser(username) {
    const user = users.find(user => user.username === username);
    if (user) {
      document.getElementById('selectedUser').textContent = username;
      document.getElementById('username').value = user.username;
      document.getElementById('password').value = '*****'; // Example password (hidden)
      document.getElementById('role').value = user.role;
    }
  }
  
  function editUser() {
    const username = document.getElementById('username').value;
    const userIndex = users.findIndex(user => user.username === username);
    if (userIndex !== -1) {
      // Update user data (e.g., show a form for editing)
      alert(`Edit user: ${username}`);
    } else {
      alert('User not found');
    }
  }
  
  function deleteUser() {
    const username = document.getElementById('username').value;
    const userIndex = users.findIndex(user => user.username === username);
    if (userIndex !== -1) {
      // Delete user from the array
      users.splice(userIndex, 1);
      clearUserDetails();
      alert(`User ${username} deleted`);
    } else {
      alert('User not found');
    }
  }
  
  function clearUserDetails() {
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('role').value = '';
    document.getElementById('selectedUser').textContent = '';
  }
  
  function addUser() {
    // Show a form or modal for adding a new user (example alert for demo)
    alert('Show form/modal for adding a user');
  }
  