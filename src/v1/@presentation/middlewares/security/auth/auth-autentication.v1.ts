import { Request } from "express";
import jwt from "jsonwebtoken";
import { IAuthPayload } from "./payloads/auth-payload.v1";
import { userCacheService } from "./caches/user-cache.v1";

const reportUserAuth = (user: IAuthPayload) => {
  userCacheService.addUser({
		nr_cpfcnpj: user.nr_cpfcnpj,
		nm_pessoa: user.nm_pessoa,
		dt_acesso: user.dt_acesso
  });
};

export async function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[],
): Promise<any> {
  if (securityName !== "jwt") throw new Error("SecurityName inválido.");

  const authHeader = request.headers["authorization"];
  if (!authHeader) throw new Error("Token ausente");

  if (authHeader.startsWith("Bearer ")) {
    const token = authHeader.replace("Bearer ", "");
    try {
			const user = jwt.verify(token, process.env.JWT_SECRET!) as IAuthPayload;
      reportUserAuth(user);
      return user;
    } catch (error) {
      throw new Error("Token inválido");
    }
  } else if (authHeader.startsWith("Test ")) {
    // const token = authHeader.replace("Test ", "");
    // const [cpf, cnpj] = token.split(":");
    // const cpf_user = sanitizeCpfCnpj(cpf);
    // const cnpj_gasstation = sanitizeCpfCnpj(cnpj);
    // return { cnpj_gasstation, cpf_user } as IAuthPayload;
    const token = authHeader.replace("Test", "").trim();
    // const token = `{"cd_posto": 1, "cd_usuario": 1, "cd_operador": 1, "nr_cnpjfilial": "75904383003570"}`

    const user = JSON.parse(token) as IAuthPayload;
    reportUserAuth(user);
    return user;
  }
  throw new Error("Token inválido");
}