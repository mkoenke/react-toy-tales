import React from "react"
import "./App.css"
import Header from "./components/Header"
import ToyContainer from "./components/ToyContainer"
import ToyForm from "./components/ToyForm"

class App extends React.Component {
  state = {
    display: false,
    apiResponse: [],
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean,
    })
  }
  submitHandler = (obj) => {
    console.log(obj)
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .then((data) => {
        let newArray = [...this.state.apiResponse, data]
        this.setState({ apiResponse: newArray })
        console.log("Success:", data)
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }
  deleteHandler = (obj) => {
    console.log(obj)
    fetch(`http://localhost:3000/toys/${obj.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        // let newArray = [...this.state.apiResponse, data]
        // this.setState({ apiResponse: newArray })
        let id = obj.id
        let foundidx = this.state.apiResponse.findIndex((toy) => toy.id === id)
        this.state.apiResponse.splice(foundidx, 1)
        // console.log(this.state.apiResponse)
        this.setState({ apiResponse: this.state.apiResponse }) //or should i just call render??
        console.log("Success:", data)
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }
  likeHandler = (obj) => {
    console.log(obj)
    obj.likes = obj.likes + 1 /// do i need to do this in state??
    let data = { likes: obj.likes }

    console.log(obj.likes)
    fetch(`http://localhost:3000/toys/${obj.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((returnedToy) => {
        let id = obj.id
        let foundidx = this.state.apiResponse.findIndex((toy) => toy.id === id)
        let newArray = [...this.state.apiResponse]
        newArray[foundidx] = returnedToy
        this.setState({ apiResponse: newArray })
        console.log("Success increased likes:", returnedToy)
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }

  componentDidMount() {
    fetch("http://localhost:3000/toys")
      .then((resp) => resp.json())
      .then((data) => this.setState({ apiResponse: data }))
      .catch(console.log)
  }

  render() {
    console.log(this.state)
    return (
      <>
        <Header />
        {this.state.display ? (
          <ToyForm submitHandler={this.submitHandler} />
        ) : null}
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer
          likeHandler={this.likeHandler}
          deleteHandler={this.deleteHandler}
          apiResponse={this.state.apiResponse}
        />
      </>
    )
  }
}

export default App
