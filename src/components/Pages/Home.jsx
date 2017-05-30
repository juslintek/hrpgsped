import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import {fetchPosts} from '../../actions/';

class Home extends Component{
	// componentDidMount(){
 //    document.title = 'Test';
 //  }

  componentWillMount() {
    this.getPosts(this.props, true);
  }

  componentWillReceiveProps(nextProps) {
    this.getPosts(nextProps);
  }

  getPosts(props, willMount = false) {
    if (willMount) {
      this.props.fetchPosts();
    }
  }

  renderPosts() {
    return this.props.posts.map(post => {
      return (
        <Link key={post.id} to={`/posts/${post.slug}`}>
          <li className="list-group-item">
            {post.title.rendered}
          </li>
        </Link>
      );
    });
  }

	render() {  
		return(
			<div>
        <main>
          <h1>Home</h1>
            <ul>
              {this.renderPosts()}
            </ul>
        </main>
	    </div>
		)
	}
}

function mapStateToProps({posts}) {
    return {posts};
}

export default withRouter(connect(mapStateToProps, {fetchPosts})(Home));