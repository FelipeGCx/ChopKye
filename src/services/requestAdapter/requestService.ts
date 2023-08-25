import { RequestProvider } from "./requestProvider";

export class RequestService {
  constructor(private requestProvider: RequestProvider) {}
  async getRequest(url: string) {
    return await this.requestProvider.getRequest(url);
  }
  async postRequest(url: string, body: Object) {
    return await this.requestProvider.postRequest(url, body);
  }
  async putRequest(url: string, body: Object) {
    return await this.requestProvider.putRequest(url, body);
  }
  async deleteRequest(url: string) {
    return await this.requestProvider.deleteRequest(url);
  }
}
