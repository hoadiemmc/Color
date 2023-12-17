browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.requestContainerName) {
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      const getting = browser.contextualIdentities.get(
        activeTab.cookieStoreId
      );
      getting.then((containerInfo) => {
        const containerName = containerInfo.name;
        browser.tabs.sendMessage(activeTab.id, { containerName: containerName });
      });
    });
  }
});
