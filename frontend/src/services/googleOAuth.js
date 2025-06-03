import { jwtDecode } from 'jwt-decode';
import { googleLogout } from '@react-oauth/google';

export const handleGoogleLogin = (credentialResponse) => {
  try {
    const decoded = jwtDecode(credentialResponse.credential);
    localStorage.setItem('user', JSON.stringify(decoded));
    return decoded;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

export const handleGoogleLogout = () => {
  googleLogout();
  localStorage.removeItem('user');
};
