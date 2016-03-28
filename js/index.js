"use strict";

var _ReactRouter = ReactRouter;
var Router = _ReactRouter.Router;
var Route = _ReactRouter.Route;
var IndexRoute = _ReactRouter.IndexRoute;
var Redirect = _ReactRouter.Redirect;
var Link = _ReactRouter.Link;
var IndexLink = _ReactRouter.IndexLink;

var Header = React.createClass({
  displayName: "Header",

  render: function render() {
    return React.createElement(
      "div",
      { className: "header" },
      React.createElement(
        "h1",
        null,
        React.createElement(
          Link,
          { to: "/", id: "title" },
          "Dulshani Gunawardhana"
        )
      )
    );
  }
});

var About = React.createClass({
  displayName: "About",

  render: function render() {
    return React.createElement(
      "div",
      { className: "header" },
      React.createElement(
        "h3",
        null,
        React.createElement(
          Link,
          { to: "/", id: "title" },
          "Dulshani Gunawardhana's Blog"
        )
      )
    );
  }
});

var App = React.createClass({
  displayName: "App",

  getInitialState: function getInitialState() {
    return { data: [] };
  },
  componentDidMount: function componentDidMount() {
    $.ajax({
      url: "http://dshgna.github.io/posts.json",
      dataType: 'json',
      cache: true,
      success: function (data) {
        this.setState({ data: data.reverse() });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function render() {
    var _this = this;

    var childrenWithProps = React.Children.map(this.props.children, function (child) {
      return React.cloneElement(child, { data: _this.state.data });
    });
    return React.createElement(
      "div",
      { "class": "container-fluid" },
      React.createElement(
        "div",
        { id: "header" },
        React.createElement(Header, null)
      ),
      React.createElement(
        "main",
        null,
        React.createElement(
          "div",
          { id: "content" },
          childrenWithProps
        )
      )
    );
  }
});

var Tag = React.createClass({
  displayName: "Tag",

  render: function render() {
    var tagNodes = this.props.tag.map(function (t) {
      return React.createElement(
        "p",
        { className: "label label-tag" },
        t
      );
    });
    return React.createElement(
      "div",
      { className: "tag" },
      tagNodes
    );
  }
});

var Post = React.createClass({
  displayName: "Post",

  getInitialState: function getInitialState() {
    return { data: [] };
  },
  componentDidMount: function componentDidMount() {
    var id = this.props.params.id;
    var info = this.props.data;
    var path = 'http://dshgna.github.io/posts/' + info[id]["link"];
    $.ajax({
      url: path,
      cache: false,
      success: function (data) {
        this.setState({
          title: info[id]["title"],
          date: info[id]["date"],
          tags: info[id]["tags"],
          data: data
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(path, status, err.toString());
      }.bind(this)
    });
  },
  rawMarkup: function rawMarkup() {
    var rawMarkup = marked(this.state.data.toString(), { sanitize: true });
    return { __html: rawMarkup };
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "post" },
      React.createElement(
        "h2",
        null,
        this.state.title
      ),
      React.createElement(
        "p",
        { className: "date" },
        this.state.date
      ),
      React.createElement("br", null),
      React.createElement("span", { dangerouslySetInnerHTML: this.rawMarkup() })
    );
  }
});

var PostList = React.createClass({
  displayName: "PostList",

  render: function render() {
    var postNodes = this.props.data.map(function (post, index) {
      return React.createElement(
        "div",
        { className: "post" },
        React.createElement(
          "h2",
          { className: "text-center" },
          post.title
        ),
        React.createElement(
          "p",
          { className: "date text-center" },
          post.date
        ),
        React.createElement(Tag, { tag: post.tags }),
        React.createElement(
          "p",
          null,
          post.description,
          React.createElement(
            Link,
            { to: "posts/" + index, id: "read-more" },
            "<- Read More ->"
          )
        )
      );
    });
    return React.createElement(
      "div",
      { className: "content" },
      postNodes
    );
  }
});

ReactDOM.render(React.createElement(
  Router,
  null,
  React.createElement(
    Route,
    { path: "/", component: App },
    React.createElement(IndexRoute, { component: PostList }),
    React.createElement(Route, { path: "posts/:id", component: Post }),
    React.createElement(Route, { path: "about", component: About })
  )
), document.body);