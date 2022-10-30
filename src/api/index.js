export const BASE_URL = "http://fitnesstrac-kr.herokuapp.com/api/";

export const fetchRoutines = async (token) => {
  try {
    const url = `${BASE_URL}/routines`;

    const response = await fetch(url, {
      headers: token
        ? {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        : { "Content-Type": "application/json" },
    });
    const info = await response.json();

    // console.log("INFO: ", info);
    return info;
  } catch (error) {
    console.error(error);
  }
};

export const fetchActivities = async (token) => {
  try {
    const url = `${BASE_URL}/activities`;

    const response = await fetch(url, {
      headers: token
        ? {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        : { "Content-Type": "application/json" },
    });
    const info = await response.json();

    // console.log("INFO: ", info);
    return info;
  } catch (error) {
    console.error(error);
  }
};

export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const result = await response.json();
    // console.log("RESULT: ", result)
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const createActivity = async (token, name, description) => {
  try {
    const response = await fetch(`${BASE_URL}/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
      }),
    });
    const info = await response.json();
    return info;
  } catch (error) {
    console.error(error);
  }
};

export const createRoutine = async (token, name, goal, isPublic) => {
  try {
    const response = await fetch(`${BASE_URL}/routines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        goal,
        isPublic,
      }),
    });
    const info = await response.json();
    return info;
  } catch (error) {
    console.error(error);
  }
};
