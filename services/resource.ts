import { StateContainer } from 'react-connect-state';

export type ResourceState<T> = {
  loading: true;
} | {
  loading: false;
  data: T;
};

export abstract class ResourceContainer<T> extends StateContainer<ResourceState<T>> {
  protected constructor(initialData?: T) {
    super();

    if (initialData) {
      this.state = {
        loading: false,
        data: initialData
      };
    } else {
      this.state = { loading: true };
      // Wait for the constructor to finish before calling this.
      setImmediate(() => { this.getData(); });
    }
  }

  protected abstract getData(): Promise<void>;
}
