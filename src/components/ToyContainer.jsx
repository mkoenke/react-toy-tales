import React from "react"
import ToyCard from "./ToyCard"

class ToyContainer extends React.Component {
  arrayOfToys = () => {
    return this.props.apiResponse.map((toy) => (
      <ToyCard
        toyObj={toy}
        deleteHandler={this.props.deleteHandler}
        likeHandler={this.props.likeHandler}
      />
    ))
  }
  render() {
    return <div id="toy-collection">{this.arrayOfToys()}</div>
  }
}

export default ToyContainer
