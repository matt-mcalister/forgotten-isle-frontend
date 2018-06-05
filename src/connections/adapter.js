import { API_ROOT, HEADERS } from "./constants.js"

export class RestfulAdapter {
  static indexFetch(route) {
    return fetch(`${API_ROOT}/${route}`, getRequest()).then(responseHandler);
  }
  static showFetch(route, id) {
    return fetch(`${API_ROOT}/${route}/${id}`, getRequest()).then(
      responseHandler
    );
  }
  static createFetch(route, body) {
    return fetch(`${API_ROOT}/${route}`, postRequest(body)).then(
      responseHandler
    );
  }
  static editFetch(route, id, body) {
    return fetch(`${API_ROOT}/${route}/${id}`, patchRequest(body)).then(
      responseHandler
    );
  }
  static deleteFetch(route, id) {
    return fetch(`${API_ROOT}/${route}/${id}`, {
      method: "DELETE",
      headers: HEADERS()
    }).then(responseHandler);
  }
  static createFetchToChannel(route, body) {
    return fetch(`${API_ROOT}/${route}`, postRequest(body));
  }
  static editFetchToChannel(route, id, body) {
    return fetch(`${API_ROOT}/${route}/${id}`, patchRequest(body));
  }
}

function getRequest() {
  return {
    headers: HEADERS()
  };
}

function patchRequest(body) {
  return {
    method: "PATCH",
    headers: HEADERS(),
    body: JSON.stringify(body)
  };
}

function postRequest(body) {
  return {
    method: "POST",
    headers: HEADERS(),
    body: JSON.stringify(body)
  };
}

function responseHandler(response) {
  if (response.ok) {
    return response.json()
  } else {
    console.log("ERROR", response.json());
  }
}
