import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PostList extends Component{

  renderPosts(posts) {
    return posts.map(post => {
      return(
        <Link key={post.id} to={`/posts/${post.slug}`}>
          <li className="list-group-item">
            {post.title.rendered}
          </li>
        </Link>
      )
    });
  }

  render() {
    return(
      <div>
        <main>
          <h2>PostList</h2>
            <ul>
              {this.renderPosts(this.props.posts)}
            </ul>
        </main>
      </div>
    )
  }
}