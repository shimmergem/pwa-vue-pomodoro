import {getMusic} from '../api/index'
import { Promise } from 'core-js'

const getPlayer = async () => {
  const music = await getMusic('./music1.mp3')
  return new Promise((resolve, reject) => {
    try {
      let audioCtx = new AudioContext()
      audioCtx.decodeAudioData(music.data, (buffer) => {
        let player = audioCtx.createBufferSource()
        player.buffer = buffer
        player.loop = true;
        player.connect(audioCtx.destination);
        resolve(player)
      })
    } catch(e) {
      reject(e)
    }
  })
}

export default getPlayer


