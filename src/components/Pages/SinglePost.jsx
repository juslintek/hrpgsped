import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import {fetchPost} from '../../actions/';

import RenderSingle from './RenderSingle';

class SinglePost extends Component{
	componentWillMount() {
      this.getPosts(this.props, true);
  }

    componentWillReceiveProps(nextProps) {
      this.getPosts(nextProps);
  }

  getPosts(props, willMount = false) {
      if (willMount) {
          this.props.fetchPost('posts', this.props.match.params.slug);
      }
  }

	render() {  
		return(
		<div>
	        <main>
	          <h1>SinglePost</h1>
	            <RenderSingle posts={this.props.posts} />
	        </main>
	    </div>
		)
	}
}

function mapStateToProps({posts}) {
    return {posts};
}

export default withRouter(connect(mapStateToProps, {fetchPost})(SinglePost));