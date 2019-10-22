import React, { Component } from 'react';
import { ITitleService } from '../pages';

interface Props {
  title: ITitleService;
}

export class Home extends Component<Props> {
  render() {
    return <div>
      <h1 style={{ textAlign: 'center' }}>
        {this.getTitle()}
      </h1>
      <h2 style={{ textAlign: 'center' }}>
        <button type="button" onClick={this.props.title.refresh}>Refresh</button>
      </h2>
      <h3 style={{ textAlign: 'center' }}>
        <sub>⚡ means SSR data</sub>
      </h3>
    </div>;
  }

  getTitle() {
    const { title } = this.props;

    if (title.state.loading) {
      return <span>...loading</span>;
    }

    return <span>
      {title.state.hydrated && '⚡'}
      Welcome to {title.state.data.title}
      {title.state.hydrated && '⚡'}
    </span>;
  }
}
