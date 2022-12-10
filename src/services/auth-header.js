export default function authHeader() {
  const data = JSON.parse(localStorage.getItem("user"));
  // console.log(user.user.access_token);
  if (data && data) {
    // For Spring Boot back-end
    return { Authorization: "Bearer " + data.access_token };

    // for Node.js Express back-end
    // return { "x-access-token": user.accessToken };
  } else {
    return {};
  }
}
