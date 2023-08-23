import axios from "axios";

export const getFacilitiesAndExclusions = () => {
  return axios.get(
    "https://my-json-server.typicode.com/iranjith4/ad-assignment/db"
  );
};
