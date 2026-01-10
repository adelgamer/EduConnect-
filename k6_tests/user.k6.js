import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '30s', target: 3000 },
    { duration: '30s', target: 10 },
  ],
  // iteration: 1
}

export default function () {
  // 1- login and retreive credentials
  const payload = {
    email: "omar@educonnect.com",
    password: "Adel@2002"
  }
  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
  const response = http.post('http://localhost:3001/auth/login', JSON.stringify(payload), params);
  check(response, {
    'Login: Under 1s': (r) => r.timings.duration <= 1000,
    'Login: All requests succedded': (r) => r.status === 200,
  })


  // Sending request to GET /user
  const getUsers = http.get("http://localhost:3001/user");
  // check(getUsers, {
  //   'Users: Under 1s': (r) => r.timings.duration <= 1000,
  //   'Users: All requests succedded': (r) => r.status === 200,
  // })


  // Sending request to GET /user/{id}
  const getUser = http.get(`http://localhost:3001/user/e4aeeb86-108d-433a-83e9-87d990cfd9a9`);


  // Sending request to GET /user/academic-year/{id}
  const updateUserAcademicYear = http.put(`http://localhost:3001/user/academic-year/e4aeeb86-108d-433a-83e9-87d990cfd9a9`, JSON.stringify({
    academicYear: "M1"
  }), params);


  sleep(1)
}