import { Component } from "react";

class Carousel extends Component {
  state = {
    images: [],
    active: 0,
  };

  static defaultProps = {
    images: ["http://placecorgi.com/600/600"],
  };

  handleIndexClick = (e) => {
    this.setState({
      active: +e.target.dataset.index,
    });
  };

  render() {
    return (
      <div className="carousel">
        <img src={this.props.images[this.state.active]} alt="animal" />
        <div className="carousel-smaller">
          {this.props.images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              src={photo}
              className={index === this.state.active ? "active" : ""}
              alt="animal thumbnail"
              data-index={index}
              onClick={this.handleIndexClick}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
