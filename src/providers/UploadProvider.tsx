import React, { Component, createContext } from "react";

export enum EPROVIDER_TYPE {
  SWARM = "Swarm",
  IPFS = "IPFS"
}

export interface IUploadProvider {
  state: {
    provider: EPROVIDER_TYPE;
    rifStorage?: any; // TODO: change the type accordingly
  };
  actions: {
    setProvider: (provider: EPROVIDER_TYPE) => void;
    upload: (files: File[]) => Promise<string>;
    download: (hash: string) => void;
  };
}

const { Provider, Consumer } = createContext<IUploadProvider>({
  state: {
    provider: EPROVIDER_TYPE.SWARM
  },

  actions: {
    setProvider: () => {},
    upload: () => new Promise((resolve, reject) => reject()),
    download: () => {}
  }
});

interface IUploadProviderProps {}
interface IUploadProviderState {
  provider: EPROVIDER_TYPE;
}

class UploadProvider extends Component<
  IUploadProviderProps,
  IUploadProviderState
> {
  constructor(props: object) {
    super(props);

    this.state = { provider: EPROVIDER_TYPE.SWARM };

    this.setProvider = this.setProvider.bind(this);
    this.upload = this.upload.bind(this);
    this.download = this.download.bind(this);
  }

  componentDidMount() {
    // TODO: Here you can set the storage provider
    // Use this.setState(rifStorage) once done
  }

  setProvider(provider: EPROVIDER_TYPE) {
    this.setState({ provider });
  }

  upload(files: File[]) {
    // TODO: Add the upload here
    console.log(this.state.provider); // this should give you the provider you are using
    return new Promise<string>(resolve => resolve("<hash>"));
  }

  download(hash: string) {
    // TODO: Add the download here
    console.log(this.state.provider); // this should give you the provider you are using
    console.log(hash);
  }

  render() {
    const { provider } = this.state;
    const { setProvider, upload, download } = this;

    return (
      <Provider
        value={{
          state: {
            provider
          },
          actions: {
            setProvider,
            upload,
            download
          }
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export default { Consumer, Provider: UploadProvider };
