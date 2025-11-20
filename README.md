# 🌟 Neroia - IA Conversacional Inteligente

**Neroia** é uma inteligência artificial conversacional avançada com busca na internet integrada, desenvolvida com as tecnologias mais modernas.

## ✨ Recursos Principais

- **💬 Chat Inteligente**: Conversas naturais em português com contexto completo
- **🌐 Busca na Internet**: Respostas com dados atualizados em tempo real
- **👤 Autenticação Segura**: Login com OAuth integrado
- **💾 Histórico Persistente**: Todas as conversas são salvas no banco de dados
- **📱 Interface Responsiva**: Design moderno e intuitivo para desktop e mobile
- **⚡ Performance Otimizada**: Build otimizado para máxima velocidade

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 19** - Framework UI moderno
- **Tailwind CSS 4** - Estilização responsiva
- **TypeScript** - Tipagem estática
- **Vite** - Build tool rápido
- **shadcn/ui** - Componentes UI profissionais

### Backend
- **Express.js** - Framework web leve
- **tRPC** - RPC type-safe
- **Node.js** - Runtime JavaScript

### Banco de Dados
- **MySQL** - Armazenamento persistente
- **Drizzle ORM** - ORM type-safe

### IA & NLP
- **LLM Integrado** - Modelos de linguagem avançados
- **Busca na Internet** - Integração com APIs de busca

## 🚀 Como Usar

### Instalação

```bash
# Clonar repositório
git clone https://github.com/Kervencaue/Neroia.git
cd Neroia

# Instalar dependências
pnpm install

# Configurar banco de dados
pnpm db:push
```

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
pnpm dev

# Acessar em http://localhost:3000
```

### Build & Deploy

```bash
# Build para produção
pnpm build

# Iniciar servidor de produção
pnpm start
```

## 📁 Estrutura do Projeto

```
neroia/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── pages/         # Páginas principais
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── lib/           # Utilitários e hooks
│   │   └── App.tsx        # Componente raiz
│   └── public/            # Arquivos estáticos
├── server/                # Backend Express
│   ├── routers.ts         # Procedimentos tRPC
│   ├── db.ts              # Funções de banco de dados
│   └── _core/             # Configuração interna
├── drizzle/               # Schema do banco de dados
├── shared/                # Código compartilhado
└── vercel.json            # Configuração Vercel
```

## 🔑 Variáveis de Ambiente

```env
DATABASE_URL=mysql://user:password@host/database
JWT_SECRET=seu_secret_jwt
VITE_APP_TITLE=Neroia
VITE_APP_LOGO=/neroia-logo.png
VITE_OAUTH_PORTAL_URL=https://oauth.example.com
```

## 📚 Funcionalidades Principais

### 1. Chat Inteligente
- Conversas em português natural
- Contexto mantido entre mensagens
- Respostas geradas por LLM avançado

### 2. Busca na Internet
- Detecção automática de perguntas sobre atualidades
- Busca de notícias, preços, clima, etc.
- Integração com resultados em tempo real

### 3. Gerenciamento de Conversas
- Criar múltiplas conversas
- Histórico completo salvo
- Sidebar com lista de conversas

### 4. Autenticação
- Login seguro com OAuth
- Perfil de usuário
- Logout seguro

## 🔧 Configuração Avançada

### Customizar Prompt da IA

Edite `server/routers.ts` para mudar o prompt do sistema:

```typescript
const systemPrompt = `Você é Aetheria, uma inteligência artificial amigável...`;
```

### Adicionar Novos Endpoints

1. Crie um novo procedimento em `server/routers.ts`
2. Use `publicProcedure` ou `protectedProcedure`
3. Chame do frontend com `trpc.feature.useMutation()`

### Estender o Banco de Dados

1. Edite `drizzle/schema.ts`
2. Execute `pnpm db:push`
3. Crie helpers em `server/db.ts`

## 🧪 Testes

```bash
# Rodar testes
pnpm test

# Modo watch
pnpm test:watch
```

## 📝 Licença

MIT

## 👨‍💻 Desenvolvido por

**Manus AI** - Plataforma de IA e Desenvolvimento Web

## 🤝 Contribuindo

Contribuições são bem-vindas! Abra uma issue ou pull request.

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

---

**Neroia** - Conversando com Inteligência ✨
