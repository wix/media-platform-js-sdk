import React from 'react';
import classNames from 'classnames';

import style from './image-demo.css';

export default class ImageDemo extends React.Component {
  render() {
    return (
      <div className={style.wrapper}>
        <h2>Image demo</h2>
        <form>
          <input type="file"/>
          <br/>
          <span className={classNames(style.btn, style.upload)}>
            Upload me
          </span>
        </form>
      </div>
    )
  }
}