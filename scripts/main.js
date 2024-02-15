requirejs.config({
  paths: {
    'pouchdb': '../libs/offline-persistence-toolkit/dist/debug/pouchdb-browser-7.2.2',
    'pouchfind': '../libs/offline-persistence-toolkit/dist/debug/pouchdb.find',
    'persist': '../libs/offline-persistence-toolkit/dist/debug'
  }
});
requirejs(["app"]);