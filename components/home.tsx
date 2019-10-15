import React, { Component } from 'react';

interface Props {
  title: string
}

export class Home extends Component<Props> {
  render() {
    return <div>
      <h1 className="title">Welcome to {this.props.title}</h1>

      <style jsx>{`
          .title {
            margin: 0;
            width: 100%;
            padding-top: 80px;
            line-height: 1.15;
            font-size: 48px;
          }
          .title,
          .description {
            text-align: center;
          }
        `}</style>
    </div>;
  }
}
