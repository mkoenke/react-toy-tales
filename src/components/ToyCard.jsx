import React, { Component } from "react"

class ToyCard extends Component {
  localDeleteHandler = () => {
    this.props.deleteHandler(this.props.toyObj)
  }
  localLikes = () => {
    this.props.likeHandler(this.props.toyObj)
  }
  render() {
    return (
      <div className="card">
        <h2>{this.props.toyObj.name}</h2>
        <img
          src={this.props.toyObj.image}
          alt={this.props.toyObj.name}
          className="toy-avatar"
        />
        <p>{this.props.toyObj.likes} Likes </p>
        <button onClick={this.localLikes} className="like-btn">
          Like {"<3"}
        </button>
        <button onClick={this.localDeleteHandler} className="del-btn">
          Donate to GoodWill
        </button>
      </div>
    )
  }
}

export default ToyCard
