import React, { Component } from 'react';
import { ITitleService } from '../pages';

interface Props {
  title: ITitleService;
}

export class Home extends Component<Props> {
  render() {
    return <div>
      <h1 style={{ textAlign: 'center' }}>{this.getTitle()}</h1>
    </div>;
  }

  getTitle() {
    const { title } = this.props;

    if (title.state.loading) {
      return '...loading';
    }

    return `Welcome to ${title.state.data.title}`;
  }
}
