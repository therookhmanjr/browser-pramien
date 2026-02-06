export async function getData(url: string, body: object, method = "GET") {
    const res = await fetch(url, {method: method, body: JSON.stringify(body), headers: {
      'Content-Type': 'application/json',
  } })
    return res.json();
  }