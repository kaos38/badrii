// Authentication utilities for KuberJi Mandir

// Mock users database (for demo purposes)
const MOCK_USERS = [
  {
    id: '1',
    name: 'Demo User',
    email: 'user@temple.com',
    password: 'demo123'
  },
  {
    id: '2',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test123'
  }
];

// Simulate user registration
export function registerUser(userData) {
  const { name, email, password } = userData;
  
  // Check if user already exists
  const existingUser = MOCK_USERS.find(u => u.email === email);
  if (existingUser) {
    return { success: false, error: 'User already exists' };
  }
  
  // Create new user
  const newUser = {
    id: String(MOCK_USERS.length + 1),
    name,
    email,
    password
  };
  
  MOCK_USERS.push(newUser);
  
  return { 
    success: true, 
    user: { id: newUser.id, name: newUser.name, email: newUser.email }
  };
}

// Simulate user login
export function loginUser(email, password) {
  const user = MOCK_USERS.find(u => u.email === email && u.password === password);
  
  if (user) {
    return { 
      success: true, 
      user: { id: user.id, name: user.name, email: user.email }
    };
  }
  
  return { success: false, error: 'Invalid credentials' };
}

// Session management using localStorage
export function saveSession(user) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('kuberji_user', JSON.stringify(user));
  }
}

export function getSession() {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('kuberji_user');
    return user ? JSON.parse(user) : null;
  }
  return null;
}

export function clearSession() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('kuberji_user');
  }
}

export function isAuthenticated() {
  return getSession() !== null;
}
