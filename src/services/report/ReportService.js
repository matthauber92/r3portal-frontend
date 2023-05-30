import api from '../../utils/api';

function createTwitterReport(data) {
    return api.post('twitter/create_twitter_report', data, { withCredentials: true, 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE' })
        .then((response) => response)
        .catch((error) => Promise.reject(error));
  }

function getTwitterReport() {
    return api.get('twitter/get_twitter_report', { withCredentials: true, 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE' })
        .then((response) => response)
        .catch((error) => Promise.reject(error));
}

function getQueueList() {
    return api.get('twitter/get_s3_bucket', { withCredentials: true, 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE' })
        .then((response) => response)
        .catch((error) => Promise.reject(error));
}

function getYoutubeReport() {
    return api.get('youtube/get_youtube_report', { withCredentials: true, 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE' })
        .then((response) => response)
        .catch((error) => Promise.reject(error));
}

function getUserByName(username) {
    return api.post('twitter/get_user_by_name', username, { withCredentials: true, 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE' })
        .then((response) => response)
        .catch((error) => Promise.reject(error));
}

  export {
      createTwitterReport,
      getTwitterReport,
      getYoutubeReport,
      getQueueList,
      getUserByName
  }