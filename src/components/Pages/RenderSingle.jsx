import React, { Component } from 'react';

import Single from './Single';
// import { Link } from 'react-router-dom';

export default class RenderSingle extends Component{

  // getImgSlider() {
  //       if (this.props.featuredImage) {
  //           return this.props.isSingle ? this.props.featuredImage.large : this.props.featuredImage.full;
  //       } else {
  //           return '';
  //       }
  //   }

  renderPosts(posts) {
    return posts.map(post => {
      return(
        <Single key={post.id}
          acf={post.acf || []}
          type={post.type}
          pId={post.id}
          title={post.title.rendered}
          content={post.content.rendered}
          date={post.date}
          formattedDate={post.formatted_date}
          link={post.link}
          featuredImage={post.featured_image_url}
          categories={post.categories}
          tags={post.tags || []}/>
      )
    });
  }

  render() {
    return(
      <div>
        <main>
            {this.renderPosts(this.props.posts)}
        </main>
      </div>
    )
  }
}