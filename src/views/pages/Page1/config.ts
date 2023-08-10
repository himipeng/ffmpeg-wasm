import { toBlobURL } from '@ffmpeg/util'

const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.1/dist/esm'
const cache = new Map<string, string>()

export const loadConfig = async () => {
    const coreURL =
        cache.get('coreURL') ||
        (await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'))
    cache.set('coreURL', coreURL)
    const wasmURL =
        cache.get('wasmURL') ||
        (await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'))
    cache.set('wasmURL', wasmURL)
    return {
        coreURL,
        wasmURL,
    }
}
