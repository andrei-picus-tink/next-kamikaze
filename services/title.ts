import fetch from 'isomorphic-unfetch';
import { IStateContainer } from 'react-connect-state';
import { ResourceContainer, ResourceState } from './resource';

export type TitleData = {
  title: string;
};

export interface ITitleService extends IStateContainer<ResourceState<TitleData>> {
  refresh: () => void;
}

export class TitleService extends ResourceContainer<TitleData> implements ITitleService {
  constructor(private apiBase: string, initialData?: TitleData) {
    super(initialData);
  }

  public refresh = () => {
    this.getData();
  };

  protected async getData() {
    this.setState({ loading: true });

    const data: { title: string } = await fetch(`${this.apiBase}/api/demo`)
      .then(r => r.json());

    this.setState({
      loading: false,
      data
    });
  }
}
