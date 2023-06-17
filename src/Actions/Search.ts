import Cookies from "js-cookie"
import { Request } from "../Requests";
import { NotificationManager } from 'react-notifications';
import { ClearStorage } from "./Logout";


async function Search(query: string): Promise<object | null>{
  const url: string = `/artworks?q=${query}`;
  try {
    const artworks = await Request.get(url);
    return artworks.data;
  }

  catch (error) {
    console.log(error);
  }
  return null;
}

export default Search;