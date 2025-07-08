# Let Me Ask

Projeto desenvolvido durante o NLW Agents da [Rocketseat](https://github.com/Rocketseat).

- [Guia do evento](https://efficient-sloth-d85.notion.site/NLW-Agents-Guia-do-evento-21b395da57708061b24cc1aa48c0fb3a)

## Começando

1. Clone o repositório:

   ```sh
   git clone https://github.com/aleferreinert/let-me-ask-api.git
   ```

2. Entre no diretório do projeto:

   ```sh
   cd let-me-ask-api
   ```

3. Instale as dependências:

   ```sh
   npm install
   ```

4. Defina as variáveis de ambiente como em `.env.example`.
5. Inicie o servidor de desenvolvimento:

   ```sh
   npm run dev
   ```

## Scripts disponíveis

| Script          | Descrição                                 |
| :-------------- | :---------------------------------------- |
| `npm run dev`   | Inicia o servidor de desenvolvimento      |
| `npm run start` | Inicia o servidor em ambiente de produção |
| `npx tsc`       | Validação de TypeScript                   |

## Tecnologias Utilizadas

- **Biome:** Ferramenta de lint, formatter e parser unificado para projetos JavaScript/TypeScript.
- **Fastify:** Framework web rápido para Node.js.
- **Husky:** Configuração de hooks Git para validações automáticas.
- **TypeScript:** Um superconjunto do JavaScript que adiciona tipagem estática opcional.
- **Ultracite:** Automatizador de convenções de commits baseado em prompts interativos.
- **Zod:** Validação de esquemas com suporte a TypeScript.
