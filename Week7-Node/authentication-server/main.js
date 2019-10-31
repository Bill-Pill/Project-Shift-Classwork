const submitApiKey = document.querySelector("button#submitApiKey");
const submitLoginInfo = document.querySelector("button#submitLoginInfo");
const issuesContainer = document.querySelector("#storeIssues");
BASEURL = "http://localhost:3001";

const state = {
  apiKey: "",
  login: {
    username: "",
    password: ""
  },
  stores: [],
  issues: [],
  token: ""
};

// Handle API Key Submission
submitApiKey.addEventListener("click", () => {
  state.apiKey = document.querySelector("input#apiKey").value;
  setStores(`${BASEURL}/api/stores`, state.apiKey)
    .then(data => {
      state.stores = data;
      renderStores(state);
    })
    .catch(err => err);
  $("#apiKey").val("");
});

// Handle User Login Submission

submitLoginInfo.addEventListener("click", () => {
  state.login.username = document.querySelector("#username").value;
  state.login.password = document.querySelector("#password").value;
  userLogin(`${BASEURL}/api/login`, state.login, state.apiKey);
});

document.querySelector("div#storeIssues").addEventListener("click", e => {
  const container = e.target.closest("div");
  const inputs = [...container.querySelectorAll("input")];
  console.log(container);
  const storeId = container.querySelector("h3").id;
  const issues = inputs
    .map(({ checked, value }) => {
      if (checked) {
        return value;
      }
    })
    .filter(value => value !== null);
  console.log(issues);
  updateStoreIssues(state.token, storeId, issues);
});
const setStores = (url, apiKey) =>
  fetch(url, {
    method: "GET",
    headers: {
      "x-authentication": apiKey
    }
  }).then(response =>
    response.ok
      ? (state.stores = response.json())
      : (state.stores = response.statusText)
  );

const userLogin = (url, data, apiKey) =>
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "x-authentication": apiKey,
      "content-type": "application/json"
    }
  })
    .then(response => (response.ok ? response.json() : response.statusText))
    .then(data => {
      state.token = data;
      renderToken();
      state.stores.forEach(store => getStoreIssues(state.token, store.id));
    })
    .catch(err => console.error(err));

const getStoreIssues = (accessToken, storeId) => {
  const url = `${BASEURL}/api/stores/${storeId}/issues?accessToken=${accessToken}`;
  return fetch(url, {
    method: "GET",
    headers: {
      "x-authentication": state.apiKey,
      "content-type": "application/json"
    }
  })
    .then(response => (response.ok ? response.json() : response.statusText))
    .then(data => {
      state.issues.push(data);
      renderIssues(state);
      // render data
    })
    .catch(err => console.log(err));
};

const updateStoreIssues = (accessToken, storeId, issues) => {
  const url = `${BASEURL}/api/stores/${storeId}/issues?accessToken=${accessToken}`;
  return fetch(url, {
    method: "POST",
    headers: {
      "x-authentication": state.apiKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(issues)
  })
    .then(response =>
      response.ok
        ? alert("Issues updated!")
        : alert("oops, something went wrong")
    )
    .catch(err => console.log(err));
};

const renderStores = state => {
  const container = document.querySelector("#apiKeyResponse");
  return stores.length === 1
    ? (container.innerHTML = state.stores)
    : (container.innerHTML = state.stores
        .map(({ id, name, open, issues }) => {
          return `
      <ul>
         <li>id: ${id}</li>
         <li>name: ${name}</li>
         <li>open: ${open}</li>
         <li>issues: ${issues}</li>
      </ul>
      <hr/>
      `;
        })
        .join(""));
};

const renderIssues = state => {
  if (state.issues.length === 4) {
    const storeIssues = i => {
      let issuesHTML = [];
      if (state.issues[i].length > 10) {
        issuesHTML.push(state.issues[i]);
      } else {
        issuesHTML.push(`
						<label>leaky roof</label>
						<input type="checkbox" id="1" value="leaky roof" ${
              state.issues[i] && state.issues[i].includes("leaky roof")
                ? "checked"
                : null
            }> <br>
						<label>no inventory</label>
						<input type="checkbox" id="2" value="no inventory" ${
              state.issues[i] && state.issues[i].includes("no inventory")
                ? "checked"
                : null
            }> <br>
						<label>broken furniture</label>
						<input type="checkbox" id="3" value="broken furniture" ${
              state.issues[i] && state.issues[i].includes("broken furniture")
                ? "checked"
                : null
            }> <br>
						<label>fire damage</label>
						<input type="checkbox" id="4" value="fire damage" ${
              state.issues[i] && state.issues[i].includes("fire damage")
                ? "checked"
                : null
            }> <br>
						<label>no security cameras</label>
						<input type="checkbox" id="5" value="no security cameras" ${
              state.issues[i] && state.issues[i].includes("no security cameras")
                ? "checked"
                : null
            }> <br>
					`);
      }
      return issuesHTML;
    };

    issuesContainer.innerHTML = state.stores
      .map(
        ({ name, id }, i) =>
          `<div id="store-issues">
            <h3 id="${id}">${name}</h3>
            ${storeIssues(i)}
         </div>
           `
      )
      .join(" ");
  }
};

const renderToken = () => {
  const container = document.querySelector("#loginResponse");
  const error = `<p style='color: red'>${state.token}</p>`;
  const success = `<p>${state.token}</p>`;
  state.token === "Invalid username or password"
    ? (container.innerHTML = error)
    : (container.innerHTML = success);
};
