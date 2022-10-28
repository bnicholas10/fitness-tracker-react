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
