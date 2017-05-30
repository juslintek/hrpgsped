import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import {fetchPost} from '../../actions/';

import RenderSingle from './RenderSingle';

class SinglePage extends Component{
	componentWillMount() {
      this.getPosts(this.props, true);
  }

    componentWillReceiveProps(nextProps) {
      this.getPosts(nextProps);
  }

  getPosts(props, willMount = false) {
  	var slug = this.props.match.path;
  	slug = slug.substring(1);
      if (willMount) {
          this.props.fetchPost('pages', slug);
      }
  }

	render() {  
		return(
		<div>
	        <main>
	          <h1>SinglePage</h1>
	            <RenderSingle posts={this.props.posts} />
	        </main>
	    </div>
		)
	}
}

function mapStateToProps({posts}) {
    return {posts};
}

export default withRouter(connect(mapStateToProps, {fetchPost})(SinglePage));