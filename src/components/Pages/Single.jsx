import React, { Component } from 'react';
import Slider from 'react-slick';

// import { Link } from 'react-router-dom';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default class Single extends Component{

  gotSlider(slider){
    if (slider) {
      return(
        <Slider>
          {this.getImgSlider(slider)}
        </Slider>
      )
    } else {
      return false;
    }
  }


  getImgSlider(slider) {
    return slider.map(img => {
      return(
        <div key={img.ID}><img src={img.sizes.medium} alt={this.props.title}/></div>
      )
    });
  }

  render() {
    return(
      <div>
        <h2>{this.props.title}</h2>
          {this.gotSlider(this.props.acf.slider)}
        <div className="card-text" dangerouslySetInnerHTML={ {__html: this.props.content} }/>
      </div>
    )
  }
}