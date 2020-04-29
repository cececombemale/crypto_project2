export default {
  appName: "Brainbox Admin",
  loginRedirect: "./user/",

  backend: {
    admin: {
      list:   path  => `../backend/user/sheet/list?path=${path}`,
      get:    file  => `../backend/user/sheet/get?filePath=${file}`,
      image:  file  => `../_common/images/files_markdown.svg`,
      delete:          `../backend/user/sheet/delete`,
      rename:          `../backend/user/sheet/rename`,
      save:            `../backend/user/sheet/save`,
      folder:          `../backend/user/sheet/folder`
    },

    global:{
      list:   path  => `../backend/global/sheet/list?path=${path}`,
      get:    file  => `../backend/global/sheet/get?filePath=${file}`,
      image:  file  => `../_common/images/files_markdown.svg`,
      delete:          `../backend/global/sheet/delete`,
      rename:          `../backend/global/sheet/rename`,
      save:            `../backend/global/sheet/save`,
      folder:          `../backend/global/sheet/folder`
    }
  },


  designer: {
    url: "../designer"
  },

  simulator: {
    url: "../circuit/"
  },

  author: {
    url: "../author/"
  }

}
