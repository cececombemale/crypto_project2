export default {
  fileSuffix: ".sheet",
  appName: "Brainbox Author",
  loginRedirect: "./author/",

  backend: {
    shared: {
      get:    file  => `../backend/shared/sheet/get?filePath=${file}`,
      save:            `../backend/shared/sheet/save`,
    },
    user: {
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

  shapes: {
    url: "../shapes/global/",
    version: "0.0.0" // updated during after loading from the index.json file
  },

  color: {
    high: "#C21B7A",
    low:  "#0078F2"
  },

  useradmin: {
    url: "../user"
  },

  designer: {
    url: "../designer/"
  },

  simulator: {
    url: "../circuit/"
  }

}
