let currentTab = null;
let startTime = null;

chrome.tabs.onActivated.addListener(async activeInfo => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  trackTime(tab.url);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === 'complete') {
    trackTime(tab.url);
  }
});

function trackTime(url) {
  const now = Date.now();

  if (currentTab && startTime) {
    const timeSpent = (now - startTime) / 1000; // seconds
    const hostname = new URL(currentTab).hostname;

    chrome.storage.local.get({ history: {} }, data => {
      const history = data.history;
      if (!history[hostname]) history[hostname] = 0;
      history[hostname] += timeSpent;

      chrome.storage.local.set({ history });
    });
  }

  currentTab = url;
  startTime = now;
}
