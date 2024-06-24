import { Component } from 'react';

type Props = {
  name?: string;
};

type State = {
  showName: boolean;
};

export class Hello extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showName: false,
    };
  }

  static defaultProps = {
    name: 'World',
  };

  render() {
    return (
      <>
        <button
          onClick={() => this.setState({ showName: !this.state.showName })}
        >
          Toggle Name
        </button>
        Hello {this.state.showName && this.props.name}
      </>
    );
  }
}
