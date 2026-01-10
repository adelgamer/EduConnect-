import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1000,
  duration: "30s",
  // iteration: 100,
}

let isLoggedIn = false;
export default function () {
  // 1- login and retreive credentials
  // if (!isLoggedIn) {
  var payload = {
    email: "omar@educonnect.com",
    password: "Adel@2002"
  }
  var params = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
  const response = http.post('http://localhost:3001/auth/login', JSON.stringify(payload), params);
  isLoggedIn = true
  // }

  const getUsers = http.get("http://localhost:3001/user");

  sleep(1)
}