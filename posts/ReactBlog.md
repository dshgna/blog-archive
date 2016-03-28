Building my blog from scratch was on my todo list for a very long time. Finally, I made it and learnt ReactJS in the process!

The majority of Github bloggers use Jekyll, the static site generator that powers Github. While I enjoyed the overall experience of Jekyll, I wanted it a bit too complex for my needs and wanted to experiment with building my own blog, grounds up. I initially used a simple one paged site using an amalgam of Bootstrap, Javascript and JQuery. Then I decided I wanted something more robust, and learnt React JS in the process.

### Prototyping
 - Visual Design - My UI design was inspired by another [blog](http://dillinger.io/) and was minimalistic, consisting of a sidebar and content area.
 - Post Creation - I wanted to edit my blog posts online, and used [Dillinger](http://dillinger.io/), an online markdown editor that supports importing and exporting from Github.

### Diving In

React is a frontend Javascript library developed by Facebook and used extensively in their codebase. Unlike fully-fledged frameworks such as AngularJS, it focuses on just two functionalities.
- Rendering UI components to the DOM
- Event Handling

The main advantages of React are its speed, devlarative bindings and composabilit, all which I'll go into more detail in this post.

React breaks down the user interface into a hierarchy of components, each which corresponds to a DOM element. Components can be nested within each other, where a nested component corresponds to a nested element in the DOM. 

Now lets look at how I used components in my blog application. It contains a root component `App` which consists of three nested components: `sidebar`, `post list` and `post page`. 

#### Including external libraries

Before starting, lets include the required libraries. Apart from React, I have used three additional libraries.
 - JQuery was used for the AJAX calls required to get the post list and posts
 - React-router was used to provide the routing functionality required to display individual posts.
 - Marked was used to parse the Markdown posts to HTML

Additionally, I dlownloaded and included the Babel library to aid writing my components using the [JSX synthax](https://facebook.github.io/react/docs/jsx-in-depth.html).

```javascript
<script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
<script src='http://cdnjs.cloudflare.com/ajax/libs/react/0.14.6/react.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/react/0.14.6/react-dom.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.2/marked.min.js'></script>
<script src='http://ryanflorence.com/ReactRouter.min.js'></script>
```

#### Initializing React-Router

```javascript
const { Router, Route, IndexRoute, Redirect, Link, IndexLink} = ReactRoute
```

#### Sidebar

Lets understand the anatomy of a component by looking at the sidebar, the simplest component. It contains the username and FontAwesome icons for social media profiles. The component is created by calling ```createClass``` which has a render function that returns the HTML content. While optional, I have used the JSX synthax instead of vanilla HTML for greater readability. 

```javascript
var SideBar = React.createClass({
  render: function() {
    return (
      <div className="sideBar">
        <h1>Your Name</h1>
        <div className="social-media">
          <a href="https://www.facebook.com/username"><i className="fa fa-facebook fa-2x"></i></a>
          <a href="https://lk.linkedin.com/in/username"><i className="fa fa-linkedin fa-2x"></i></a>
          <a href="https://github.com/username"><i className="fa fa-github-alt fa-2x"></i></a>
        </div>
      </div>
    );
  }
});
```

#### App

This is the root component of the app that handles the overall design and data. Unlike the static sidebar with pre-defined HTML, the app is dynamic: adjusting according to the data it receives. 

This web app contains two data sources.
1. ```posts.json``` contains the title, date and summary description of all posts.
2. ```postName.md``` contains the entire post and is editted via Dillinger.

The App component constitutes of the static sidebar component and a dynamic content area which may contain either the post list or an individual post. It calls to ```posts.json``` which it then passes to its dynamic child.

```javascript
const App = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    $.ajax({
      url: "http://your.domain/posts.json",
      dataType: 'json',
      cache: true,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() { 
    var childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, { data: this.state.data });
    });
    return (
      <div class="container-fluid">
        <aside id ="sidebar"><SideBar /></aside>
        <main><div id="content">{childrenWithProps}</div></main>
      </div>
  )}
});
```

The trickiest part of this component was the data flow from root to child, which I achieved by cloning the child element and passing in the data.

```javascript
var childrenWithProps = React.Children.map(this.props.children, (child) => {
  return React.cloneElement(child, { data: this.state.data });
});
```

### Handling Routing

So far, we have only created the components. Now lets display them visually. For this we use the ```ReactDOM```. The root is set to the App component and by default displays the post list. If the url is of the format of  ```your.domain/posts/:id``` it will direct to the relevant post component.

```javascript
ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={PostList}/>
      <Route path="posts/:id" component={Post}/>
    </Route>
  </Router>
), document.body)
```

#### Post List

This component receives the data passed in from the root component using ```this.props.data``` and iterates over it. It uses React Router's ```<Link>``` to connect to the relevant post.

```javascript
const PostList = React.createClass({
  render: function() { 
    var postNodes = this.props.data.reverse().map(function(post, index){
      return (
        <div className="post">
          <h1>{post.title}</h1>
          <p className='date'>{post.date}</p><br/>
          <p>{post.description}</p>
          <Link to={`posts/${index}`}>Read More-></Link>
        </div>
        );});   
    return (
      <div className="content">{postNodes}</div>
    );}
});
```

#### Post

This is a relatively simple component which uses an AJAX call to get the content of each post. The addition is that the posts are in Markdown format. I used the Marked library to parse the content.

```javascript
rawMarkup: function() {
    console.log(this.state)
    var rawMarkup = marked(this.state.data.toString(), {sanitize: true});
    return { __html: rawMarkup };
  }
```

React's security features does not allow us to directly pass the parsed HTML, so we have to use the special tag, ```dangerouslySetInnerHTML```, to achieve this goal.

Now, lets take a look at the complete component.

```javascript
const Post = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    const id = this.props.params.id;
    const info = this.props.data;
    var path = 'http://your.domain/posts/' + info[id]["link"];
    $.ajax({
      url: path,
      cache: false,
      success: function(data) {
        this.setState({
          title: info[id]["title"],
          date: info[id]["date"],
          data: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(path, status, err.toString());
      }.bind(this)
    });
  },
  rawMarkup: function() {
    console.log(this.state)
    var rawMarkup = marked(this.state.data.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },
  render: function() {
    return (
      <div className="post">
        <h1>{this.state.title}</h1>
        <p className='date'>{this.state.date}</p><br/>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});
```

### Winding Up

Learning React while building my blog was a wonderful experience that forced me to get my hands dirty and develop a 'hacking' mindset. And while I love my initial prototype, there's a few more functionality I hope to add in future.
1. Currently I jave to manually edit the json file to include data for each new post. This can be made easier by hosting an instance of Dillinger on Heroku and using node.js to automate updating the json file. 
2. Integrate Disqus comments and Google webmaster tools for more interactivity.