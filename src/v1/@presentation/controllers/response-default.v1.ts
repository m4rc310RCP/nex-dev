export interface IResponseDefault {
  /**
   * Código de status HTTP da resposta.
   * Exemplo: 200
   */
  status?: number;
  /**
   * Mensagem descritiva sobre o resultado da operação.
   * Exemplo: "OK"
   */
  message?: string;
}