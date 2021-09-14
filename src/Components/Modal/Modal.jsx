import { Component } from 'react';

import s from './Modal.style.css';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onSelect();
    }
  };

  handleBackDrop = e => {
    if (e.currentTarget === e.target) {
      this.props.onSelect();
    }
  };

  render() {
    return (
      <div className={s.Overlay} onClick={this.handleBackDrop}>
        <div className={s.Modal}>{this.props.children}</div>
      </div>
    );
  }
}
