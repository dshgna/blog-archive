"use strict";

var _ReactRouter = ReactRouter;
var Router = _ReactRouter.Router;
var Route = _ReactRouter.Route;
var IndexRoute = _ReactRouter.IndexRoute;
var Redirect = _ReactRouter.Redirect;
var Link = _ReactRouter.Link;
var IndexLink = _ReactRouter.IndexLink;

var SideBar = React.createClass({
  displayName: "SideBar",

  render: function render() {
    return React.createElement(
      "div",
      { className: "sideBar" },
      React.createElement(
        "h1",
        { className: "text-center" },
        React.createElement(
          Link,
          { to: "/", id: "title" },
          "Dulshani Gunawardhana"
        )
      ),
      React.createElement(
        "div",
        { className: "social-media" },
        React.createElement(
          "a",
          { href: "https://www.facebook.com/dulshani.gunawardhana", target: "_blank" },
          React.createElement("i", { className: "fa fa-facebook fa-2x" })
        ),
        React.createElement(
          "a",
          { href: "https://lk.linkedin.com/in/dulshanig", target: "_blank" },
          React.createElement("i", { className: "fa fa-linkedin fa-2x" })
        ),
        React.createElement(
          "a",
          { href: "https://github.com/dshgna", target: "_blank" },
          React.createElement("i", { className: "fa fa-github-alt fa-2x" })
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
      success: (function (data) {
        this.setState({ data: data });
      }).bind(this),
      error: (function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }).bind(this)
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
        "aside",
        { id: "sidebar" },
        React.createElement(SideBar, null)
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
      success: (function (data) {
        this.setState({
          title: info[id]["title"],
          date: info[id]["date"],
          data: data
        });
      }).bind(this),
      error: (function (xhr, status, err) {
        console.error(path, status, err.toString());
      }).bind(this)
    });
  },
  rawMarkup: function rawMarkup() {
    console.log(this.state);
    var rawMarkup = marked(this.state.data.toString(), { sanitize: true });
    return { __html: rawMarkup };
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "post" },
      React.createElement(
        "h1",
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
    var postNodes = this.props.data.reverse().map(function (post, index) {
      return React.createElement(
        "div",
        { className: "post" },
        React.createElement(
          "h1",
          null,
          post.title
        ),
        React.createElement(
          "p",
          { className: "date" },
          post.date
        ),
        React.createElement("br", null),
        React.createElement(
          "p",
          null,
          post.description
        ),
        React.createElement(
          Link,
          { to: "posts/" + index },
          "Read More->"
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
    React.createElement(Route, { path: "posts/:id", component: Post })
  )
), document.body);