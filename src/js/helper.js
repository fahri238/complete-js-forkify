// contain functions that we are gonna reuse over and over
// in out project
import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    // const res = await Promise.race([fetch(`${url}`), timeout(10)]); // magic values : someone that saw our code, and dont know where value coming from
    const res = await Promise.race([fetch(`${url}`), timeout(TIMEOUT_SEC)]); // better way using config. so everyone can understand where value coming from
    // const res = await fetch(`${url}`);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} ${res.status}`);
    return data;
  } catch (error) {
    throw error;
  }
};
