define(['persist/persistenceManager', 'persist/persistenceStoreManager', 'persist/defaultResponseProxy', 'persist/pouchDBPersistenceStoreFactory', 'persist/persistenceUtils', 'persist/fetchStrategies', 'persist/simpleJsonShredding'], function (persistenceManager, persistenceStoreManager, defaultResponseProxy, pouchDBPersistenceStoreFactory, persistenceUtils, fetchStrategies, simpleJsonShredding) {

  const checkNetworkStatus = () => {
    let content = document.getElementById('network-info');
    let textContent = `Your network status is ${navigator.onLine ? "Online" : "Offline"} `;
    content.textContent = textContent;
  }
  // checkNetworkStatus();
  let userUrl = "https://jsonplaceholder.typicode.com/todos";
  persistenceStoreManager.registerDefaultStoreFactory(pouchDBPersistenceStoreFactory);
  persistenceManager.init().then(function () {
    persistenceManager.register({
      scope: '/todos'
    })
    .then(function (registration) {
      let responseProxy = defaultResponseProxy.getResponseProxy({
        jsonProcessor:
          {
              shredder: simpleJsonShredding.getShredder('todos', 'id'),
              unshredder:  simpleJsonShredding.getUnshredder()
          }
      });
      let fetchListener = responseProxy.getFetchEventListener();
      registration.addEventListener('fetch', fetchListener);;
    });
  });

  let userButton = document.getElementById('user');
  let responseTable = document.getElementById('response');

  userButton.addEventListener('click', ev => {
    checkNetworkStatus();
    fetch(userUrl)
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data);
      Object.keys(data).forEach(item => {
        let template = `<tr><td>${data[item].id}</td><td>${data[item].title}</td></tr>`;
        responseTable.insertAdjacentHTML("beforeEnd", template);
      })
    });
  });
});