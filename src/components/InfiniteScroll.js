import React, { Component } from "react";
import Loader from "./Loader";

class InfiniteScroll extends Component {
  componentDidMount() {
    window.addEventListener("scroll", this.handleOnScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleOnScroll);
  }

  handleOnScroll = () => {
    // http://stackoverflow.com/questions/9439725/javascript-how-to-detect-if-browser-window-is-scrolled-to-bottom
    var scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    var scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    var clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    if (scrolledToBottom) {
      this.props.onLoadMore();
    }
  };

  render() {
    if (!this.props.data && this.props.loading) return <Loader />;
    const myData =
      this.props.data.postMany !== undefined
        ? this.props.data.postMany.posts
        : [];

    return (
      <ul>
        {myData.map((item, idx) => (
          <li key={idx}>
            <h3>{item.id}</h3>
            <p>{item.content}</p>
            <p>{item.timeFromToday}</p>
          </li>
        ))}
        {this.props.loading && <Loader />}
      </ul>
    );
  }
}

export default InfiniteScroll;
