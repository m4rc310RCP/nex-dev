
//----------------------------------------
export interface IAppAuth {
	auth: {
		signin: {
			request: {
				hash: string
			}
			response: {
				type: "Test" | "Bearer" | "Basic" | string,
				token: string
			}
		}
	}
}
//----------------------------------------