import { Body, Get, Post, Request, Route, Tags } from "tsoa";
import { MController } from "../controller-default.v1";


interface IAppInfoResponse {
	version:string;
} 

@Route('app')
@Tags("Routs app Genneral")
export class AppController extends MController {

	@Get("version")
	public async getAppVersion() : Promise<IAppInfoResponse> {
		return this.buildResponse(200, {version: "1.0"})
	}
}