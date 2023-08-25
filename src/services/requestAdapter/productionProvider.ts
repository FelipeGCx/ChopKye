import { Response } from "@/types";
import { RequestProvider } from "./requestProvider";
import { AUTH_TOKEN, ID_CLIENT } from "@/config";

export class ProductionProvider implements RequestProvider {
  async getRequest(url: string): Promise<Response> {
    const endpoint = `https://api.twitch.tv/helix/${url}`;
    const headers = {
      headers: {
        "Authorization": `Bearer ${AUTH_TOKEN}`,
        "Client-Id": ID_CLIENT,
      },
    };
    const res = await fetch(endpoint, headers);
    const results = res.json();
    return results;
  }
  postRequest(_url: string, _body: Object): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  putRequest(_url: string, _body: Object): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  deleteRequest(_url: string): Promise<Response> {
    throw new Error("Method not implemented.");
  }
}
