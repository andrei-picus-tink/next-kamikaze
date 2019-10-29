import fetch from 'isomorphic-unfetch';
import { IStateContainer, StateContainer } from 'react-connect-state';

export type TitleState = {
  loading: true
} | {
  loading: false;
  data: {
    title: string;
  };
};

export interface ITitleService extends IStateContainer<TitleState> {
  refresh: () => void;
}

export class TitleService extends StateContainer<TitleState> implements ITitleService {
  constructor(private apiBase: string, initialState?: TitleState) {
    super();

    if (initialState) {
      this.state = initialState;
    } else {
      this.state = {
        loading: true
      };
      this.getData();
    }
  }

  public refresh = () => {
    this.getData();
  };

  private async getData() {
    this.setState({ loading: true });

    const data: { title: string } = await fetch(`${this.apiBase}/api/demo`)
      .then(r => r.json());

    // Add a loading effect client side.
    if (typeof window !== 'undefined') {
      await new Promise(resolve => setTimeout(resolve, 250));
    }

    this.setState({
      loading: false,
      data
    });
  }
}
