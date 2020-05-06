import {
  Directory,
  Entry,
  Manager,
  Provider as EPROVIDER_TYPE,
} from '@rsksmart/rif-storage'
import toBuffer from 'blob-to-buffer'
import React, { Component, createContext } from 'react'
import { FileWithPath } from 'types'

export { EPROVIDER_TYPE }

export interface UploadProviderInterface {
  state: {}
  actions: {
    upload: (files: File[]) => Promise<string>
    download: (hash: string) => Promise<Buffer | Directory<Buffer>>
  }
}
const { Provider, Consumer } = createContext<UploadProviderInterface>({
  state: {},

  actions: {
    download: () => Promise.reject(),
    upload: () => Promise.reject(),
  },
})


interface UploadProviderState {
  provider: EPROVIDER_TYPE
}

async function mapFile(file: File): Promise<Entry<Buffer>> {
  const data: Promise<Buffer> = new Promise((resolve, reject) => {
    toBuffer(file, (err: Error, buffer: Buffer) => {
      if (err) {
        reject(err)
      }
      resolve(buffer)
    })
  })

  return {
    data: await data,
    path: (file as FileWithPath).path,
    size: file.size,
  }
}

class UploadProvider extends Component<
  {},
  UploadProviderState
> {
  private manager: Manager;

  constructor(props: object) {
    super(props)
    this.manager = new Manager()

    this.manager.addProvider(
      EPROVIDER_TYPE.IPFS,
      process.env.REACT_APP_IPFS || '/ip4/127.0.0.1/tcp/5001',
    )
    const provider = EPROVIDER_TYPE.IPFS
    this.manager.makeActive(provider)
    this.state = { provider }

    this.upload = this.upload.bind(this)
    this.download = this.download.bind(this)
  }

  public async upload(files: File[]) {
    const buffer = await Promise.all(files.map(mapFile))
    // TODO: this sort should not be here
    const fls = buffer.sort((a, b) => (a.path < b.path ? 1 : -1))
    return this.manager.put(fls)
  }

  public download(hash: string) {
    return this.manager.get(hash)
  }

  public render() {
    const { children } = this.props
    const { provider } = this.state
    const { upload, download } = this

    return (
      <Provider
        value={{
          actions: {
            download,
            upload,
          },
          state: {
            provider,
          },
        }}
      >
        {children}
      </Provider>
    )
  }
}

export default { Consumer, Provider: UploadProvider }
