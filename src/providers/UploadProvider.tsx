import { Directory, Entry, Manager, Provider as EPROVIDER_TYPE } from '@rsksmart/rif-storage'
import toBuffer from 'blob-to-buffer'
import React, { Component, createContext } from "react";
import {IFile} from "types"

export { EPROVIDER_TYPE}

export interface IUploadProvider {
  state: {
    provider: EPROVIDER_TYPE;
  };
  actions: {
    setProvider: (provider: EPROVIDER_TYPE) => void;
    upload: (files: File[]) => Promise<string>;
    download: (hash: string) => Promise<Buffer | Directory<Buffer>>;
  };
}

const { Provider, Consumer } = createContext<IUploadProvider>({
  state: {
    provider: EPROVIDER_TYPE.IPFS
  },


  actions: {
    download: () => Promise.reject(),
    setProvider: () => {},
    upload: () => Promise.reject(),
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
  private manager: Manager

  constructor(props: object) {
    super(props);
    this.manager = new Manager()

    // TODO: Set some Swarm nodes address here
    this.manager.addProvider(EPROVIDER_TYPE.SWARM, { url: process.env.REACT_APP_SWARM || 'http://localhost:8500' })
    this.manager.addProvider(EPROVIDER_TYPE.IPFS, process.env.REACT_APP_IPFS || '/ip4/127.0.0.1/tcp/5001')
    const provider = EPROVIDER_TYPE.IPFS;
    this.manager.makeActive(provider)
    this.state = { provider };

    this.setProvider = this.setProvider.bind(this);
    this.upload = this.upload.bind(this);
    this.download = this.download.bind(this);
  }

  public setProvider(provider: EPROVIDER_TYPE) {
    this.manager.makeActive(provider)
    this.setState({ provider });
  }

  public async upload(files: File[]) {
    return this.manager.put(await Promise.all(files.map(this.mapFile)));
  }

  public download(hash: string) {
    return this.manager.get(hash)
  }

  public render() {
    const { provider } = this.state;
    const { setProvider, upload, download } = this;

    return (
      <Provider
        value={{

          actions: {
            download,
            setProvider,
            upload,
          },
          state: {
            provider
          }
        }}
      >
        {this.props.children}
      </Provider>
    );
  }

  private async mapFile(file: File): Promise<Entry<Buffer>> {
    const data: Promise<Buffer> = new Promise((resolve, reject) => {
      toBuffer(file, (err, buffer) => {
        if(err){
          reject(err)
        }
        resolve(buffer)
      })
    })

    return {
      data: await data,
      path: (file as IFile).path,
      size: file.size,
    }
  }
}

export default { Consumer, Provider: UploadProvider };
