

 //Cat(s)Api ..? check for discrepancies in modules
class CatApi {
  //Notice use of the `static` keyword
  static getAllCats() {
    return fetch('http://localhost:5000/api/v1/cats').then(response => {
      return response.json()
    }).catch(error => {
      return error
    })
  }

  /*'PUT' call */
  //This f(n) will be invoked from inside the updateCat action creator f(n) in src/actions/catActions.js
  static updateCat(cat) { //dispatchs updateCat action and is invoked directly from <CatPage>,
    const request = new Request(`http://localhost:5000/api/v1/cats/${cat.id}`,
      {
        method: 'PUT',
        headers: new Headers({
          'Content-Type':'application/json'
        }),
        body: JSON.stringify({cat: cat})
      })//close request
  }

  /*'POST' call */
  static createCat(cat) {
    const request = new Request('http://localhost:5000/api/v1/cats/', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(({cat: cat}))
    })//close request

    return fetch(request).then( response => {
      return response.json()
    }).catch( error => {
      throw(error)
    })
  }//close createCat()

}//close class: CatApi

export default CatApi
