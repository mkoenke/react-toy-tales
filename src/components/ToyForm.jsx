import React, { Component } from "react"

class ToyForm extends Component {
  state = {
    name: "",
    image: "",
    likes: 0,
  }

  localChangeHandler = (e) => {
    console.log(e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }
  localSubmitHandler = (e) => {
    e.preventDefault()
    this.props.submitHandler(this.state)
    this.setState({ name: "", image: "" })
  }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.localSubmitHandler}>
          <h3>Create a toy!</h3>
          <input
            type="text"
            name="name"
            placeholder="Enter a toy's name..."
            className="input-text"
            onChange={this.localChangeHandler}
          />
          <br />
          <input
            type="text"
            name="image"
            placeholder="Enter a toy's image URL..."
            className="input-text"
            onChange={this.localChangeHandler}
          />
          <br />
          <input
            type="submit"
            name="submit"
            value="Create New Toy"
            className="submit"
          />
        </form>
      </div>
    )
  }
}

export default ToyForm
