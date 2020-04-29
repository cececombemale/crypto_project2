import axios from 'axios'

class BackendStorage {

  /**
   * @constructor
   *
   */
  constructor(conf) {
    this.conf = conf
  }

  getFiles(path, scope) {
    return axios.get(this.conf.backend[scope].list(path))
      .then((response) => {
        // happens in "serverless" mode on the gh-pages/docs installation
        //
        let files = []
        if (typeof response === "string")
          files = JSON.parse(response).data.files
        else
          files = response.data.files

        // sort the result
        // Directories are always on top
        //
        files.sort(function (a, b) {
          if (a.type === b.type) {
            if (a.name.toLowerCase() < b.name.toLowerCase())
              return -1
            if (a.name.toLowerCase() > b.name.toLowerCase())
              return 1
            return 0
          }
          if (a.type === "dir") {
            return -1
          }
          return 1
        })
        return files
      })
  }


  saveFile(json, fileName, scope) {
    let data = {
      filePath: fileName,
      content: JSON.stringify(json, undefined, 2)
    }
    return axios.post(this.conf.backend[scope].save, data)
  }


  deleteFile(fileName, scope) {
    let data = {
      filePath: fileName
    }
    return axios.post(this.conf.backend[scope].delete, data)
  }


  createFolder(folderName, scope) {
    let data = {
      filePath: folderName
    }
    return axios.post(this.conf.backend[scope].folder, data)
  }

  loadUrl(url) {
    return axios.get(url)
      .then((response) => {
        // happens in "serverless" mode on the gh-pages/docs installation
        //
        if (typeof response === "string")
          return JSON.parse(response).data

        return response.data
      })
  }

  sanitize(file) {
    let sanitize = require("sanitize-filename")
    file = sanitize(file, "_")
    file = file.replace(this.conf.fileSuffix, "")
    // I don't like dots in the name to
    file = file.replace(RegExp("[.]", "g"), "_")
    return file
  }

}

export default conf => new BackendStorage(conf)
