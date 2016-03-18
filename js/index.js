const { Router, Route, IndexRoute, Redirect, Link, IndexLink} = ReactRouter

var Header = React.createClass({
  render: function() {
    return (
      <div className="header">
        <h1><Link to={`/`} id="title">Dulshani Gunawardhana</Link></h1>
      </div>
    );
  }
});

var About = React.createClass({
  render: function() {
    return (
      <div className="header">
        <h3><Link to={`/`} id="title">Dulshani Gunawardhana</Link></h3>
      </div>
    );
  }
});

const App = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    $.ajax({
      url: "http://dshgna.github.io/posts.json",
      dataType: 'json',
      cache: true,
      success: function(data) {
        this.setState({data: data.reverse()});
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
        <div id ="sidebar"><Header /></div>
        <main><div id="content">{childrenWithProps}</div></main>
      </div>
  )}
});

const Tag = React.createClass({
  render: function() {
    var tagNodes = this.props.tag.map(function(t) {
      return(
        <p className='label label-success'>{t}</p>
      );});
    return (
      <div className='tag'>{tagNodes}</div>
    );}
});

const Post = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    const id = this.props.params.id;
    const info = this.props.data;
    var path = 'http://dshgna.github.io/posts/' + info[id]["link"];
    $.ajax({
      url: path,
      cache: false,
      success: function(data) {
        this.setState({
          title: info[id]["title"],
          date: info[id]["date"],
          tags: info[id]["tags"],
          data: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(path, status, err.toString());
      }.bind(this)
    });
  },
  rawMarkup: function() {
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


const PostList = React.createClass({
  render: function() { 
    var postNodes = this.props.data.map(function(post, index){
      return (
        <div className="post">
          <h2 className='text-center'>{post.title}</h2>
          <Tag tag={post.tags}/>
          <p className='date text-center'>{post.date}</p><br/>
          <p>{post.description}</p>
          <Link to={`posts/${index}`} id="read-more">Read More-></Link>
        </div>
        );});
    return (
      <div className="content">{postNodes}</div>
    );}
});


ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={PostList}/>
      <Route path="posts/:id" component={Post}/>
      <Route path="about" component={About}/>
    </Route>
  </Router>
), document.body)