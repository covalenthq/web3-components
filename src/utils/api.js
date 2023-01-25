export const getDataFromCovalentAPI = (URL) => {
  let headers = new Headers()
  const authString = `${process.env.REACT_APP_COVALENT_API_KEY}:`
  headers.set('Authorization', 'Basic ' + window.btoa(authString))
  return fetch(URL, { method: 'GET', headers: headers }).then((resp) => {
    if (resp.status === 200) return resp.json()
    else throw new Error('Invalid response')
  })
}
