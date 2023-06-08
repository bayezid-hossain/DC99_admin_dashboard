import jwtConfig from '@iso/config/jwt.config';
import jwtDecode from 'jwt-decode';

class JwtAuth {
  // Function to save a cookie
  saveCookie = (name, value, expirationDays) => {
    const date = new Date();
    date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
  };

  login = async (userInfo) => {
    if (!userInfo.email || !userInfo.password) {
      return { error: 'please fill in the input' };
    }

    return await fetch(jwtConfig.fetchUrl, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    })
      .then((response) => response.json())
      .then((res) => {
        const result = {};
        if (res.token) {
          result.profile = jwtDecode(res.token);
          result.token = res.token;
          result.success = res.success;
          result.message = res.message;
          //console.log(res.token);
          // Save the token as a cookie with a 7-day expiration
          this.saveCookie('token', res.token, 7);

          return result;
        } else {
          return res;
        }
      })
      .catch((error) => ({ error }));
  };
}
export default new JwtAuth();
