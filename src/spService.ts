/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const siteUrl = `${import.meta.env.VITE_APP_SITE_SHAREPOINT}`;
const listName = "Tasks";


export async function getListItems(token: string) {
  const res = await axios.get(
    `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json;odata=verbose",
      },
    }
  );
  return res.data.d.results;
}

export async function addListItem(token: string, item: any) {
  console.log(item)
  const url = `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items`
  console.log(url)
  const res = await axios.post(
    url,
    item,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json;odata=verbose",
        "Content-Type": "application/json;odata=verbose",
      },
    }
  );
  return res.data.d;
}

export async function updateListItem(token: string, id: number, item: any) {
  const res = await axios.post(
    `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items(${id})`,
    item,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json;odata=verbose",
        "Content-Type": "application/json;odata=verbose",
        "IF-MATCH": "*",
        "X-HTTP-Method": "MERGE",
      },
    }
  );
  return res.status === 204;
}

export async function deleteListItem(token: string, id: number) {
  const res = await axios.post(
    `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items(${id})`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "IF-MATCH": "*",
        "X-HTTP-Method": "DELETE",
      },
    }
  );
  return res.status === 204;
}
