import axios from 'axios'

const getMusic = (url) => {
  return axios({
    method: 'get',
    url,
    responseType: 'arraybuffer'
  })
}

const getAllTask = () => getAllTaskFromDB()

export {getMusic}