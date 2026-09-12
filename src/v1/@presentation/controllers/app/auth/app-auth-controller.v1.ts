import { Body, Get, Post, Request, Route, Tags } from "tsoa";
import { MController } from "../../controller-default.v1";
import { IAppAuth } from "../../types/types-controllers.v1";
import { Request as ExpressRequest } from "express";

@Route('app/auth')
@Tags("Routs App Auth")
export class AuthAppController extends MController {

	@Post("signin")
	public async processSignin(
		@Body() body: IAppAuth['auth']['signin']['request'],
		@Request() req: ExpressRequest
	): Promise<IAppAuth['auth']['signin']['response']> {
		console.log("BODY:", body);

		const token = "sssssss";

		const refreshtoken = "refresh-sssssss";
		req.res?.cookie("_rt", refreshtoken, {
			httpOnly: true,
			secure: true,
			sameSite: "none",
			path: "/"
		});

		return this.buildResponse(200, { type: "Bearer", token: "sssssss" });
	}

}