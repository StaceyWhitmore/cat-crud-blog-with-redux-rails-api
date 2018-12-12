class HobbyApi {
  static getAllHobbies() {
    return fetch('http://localhost:5000/api/v1/hobbies').then(response => {
      return response.json()
    }).catch( error => {
      return error //Trivia Question: But don't => f(n)'s automatically return what's enclosed obviating need for [return] statement?
    })
  }
}

export default HobbyApi
