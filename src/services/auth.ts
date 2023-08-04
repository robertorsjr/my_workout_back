import axios from "axios";

export async function getGoogleUserByToken(access_token: string){
  return await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
}