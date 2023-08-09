import { FC, useRef, useState } from 'react'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile, toBlobURL } from '@ffmpeg/util'

const App: FC = () => {
    const [loaded, setLoaded] = useState(false)
    const ffmpegRef = useRef(new FFmpeg())
    const videoRef = useRef<HTMLVideoElement>(null)
    const messageRef = useRef<HTMLParagraphElement>(null)

    const load = async () => {
        const ffmpeg = ffmpegRef.current
        ffmpeg.on('log', ({ message }: { message: string }) => {
            messageRef.current && (messageRef.current.innerHTML = message)
            console.log(message)
        })
        const baseURL = 'https://unpkg.com/@ffmpeg/core-mt@0.12.1/dist/umd'
        await ffmpeg.load({
            coreURL: await toBlobURL(
                `${baseURL}/ffmpeg-core.js`,
                'text/javascript'
            ),
            wasmURL: await toBlobURL(
                `${baseURL}/ffmpeg-core.wasm`,
                'application/wasm'
            ),
            workerURL: await toBlobURL(
                `${baseURL}/ffmpeg-core.worker.js`,
                'text/javascript'
            ),
            thread: true,
        })
        setLoaded(true)
    }

    const transcode = async () => {
        const ffmpeg = ffmpegRef.current
        await ffmpeg.writeFile('input.avi', await fetchFile('/video/1.mp4'))
        await ffmpeg.exec(['-i', 'input.avi', 'output.mp4'])
        const data = await ffmpeg.readFile('output.mp4')
        console.log(data)

        videoRef.current &&
            (videoRef.current.src = URL.createObjectURL(
                new Blob([data], { type: 'video/mp4' })
            ))
    }

    return loaded ? (
        <>
            <video ref={videoRef} controls></video>
            <br />
            <button onClick={transcode}>Transcode avi to mp4</button>
            <p ref={messageRef}></p>
        </>
    ) : (
        <button onClick={load}>Load ffmpeg-core</button>
    )
}
export default App
