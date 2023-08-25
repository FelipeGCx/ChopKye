import { Response } from "@/types";

export abstract class RequestProvider {
  abstract getRequest(url: string): Promise<Response>;
  abstract postRequest(url: string, body: Object): Promise<Response>;
  abstract putRequest(url: string, body: Object): Promise<Response>;
  abstract deleteRequest(url: string): Promise<Response>;
}
