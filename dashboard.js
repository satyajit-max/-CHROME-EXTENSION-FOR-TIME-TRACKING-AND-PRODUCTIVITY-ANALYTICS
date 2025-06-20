const productiveSites = ["leetcode.com", "github.com", "stack overflow.com"];
const unproductiveSites = ["facebook.com", "instagram.com", "youtube.com"];

chrome.storage.local.get("history", data => {
  const history = data.history || {};
  let productiveTime = 0, unproductiveTime = 0;

  Object.entries(history).forEach(([site, seconds]) => {
    if (productiveSites.some(p => site.includes(p))) productiveTime += seconds;
    else if (unproductiveSites.some(p => site.includes(p))) unproductiveTime += seconds;
  });

  document.getElementById("report").innerHTML = `
    <p><strong>Productive Time:</strong> ${Math.round(productiveTime / 60)} mins</p>
    <p><strong>Unproductive Time:</strong> ${Math.round(unproductiveTime / 60)} mins</p>
  `;
});
