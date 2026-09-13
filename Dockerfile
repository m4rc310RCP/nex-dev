# Etapa 1: Build da aplicação
FROM node:20-slim AS builder

# Criar um usuário e grupo no container
RUN groupadd -r appuser && useradd -r -g appuser appuser

WORKDIR /app

# Copia os arquivos de dependência
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./

# Instala o pnpm
RUN npm install -g pnpm

# Instala as dependências
RUN pnpm install

# Copia o restante da aplicação
COPY . .

# Dar permissão ao usuário
RUN chown -R appuser:appuser /app

# Trocar para o novo usuário
USER appuser

# Build da aplicação
RUN pnpm build

# Expõe a porta
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["node", "-r", "module-alias/register", "dist/v1/@presentation/server.js"]