# Pokédex - Bootcamp II

## Autor
Rafael Elmiro – Matrícula 22350151

## Descrição
Uma aplicação web frontend simples que consulta a Pokédex pública para exibir informações técnicas e visuais sobre Pokémon pesquisados pelo usuário.

## API utilizada
- **Nome da API:** PokeAPI (https://pokeapi.co/)
- **Endpoint consumido:** `https://pokeapi.co/api/v2/pokemon/{nome_ou_id}`

## Funcionalidades
- Pesquisa de Pokémon por nome ou número de ID.
- Exibição da imagem frontal, ID formatado, nome, tipos primário/secundário, altura (metros) e peso (quilogramas).
- Tratamento de erro com mensagem amigável para Pokémon não localizados ou falhas de rede.

## Como executar localmente
1. Clone este repositório: `git clone https://github.com/rafaelelmiroo/bootcamp2-app.git`
2. Abra o arquivo `index.html` diretamente em seu navegador web.

## Links
- **Aplicação no ar (GitHub Pages):** https://rafaelelmiroo.github.io/bootcamp2-app/
- **Repositório:** https://github.com/rafaelelmiroo/bootcamp2-app

# Pokédex - Bootcamp II (Etapa 02)

## Autor
[Rafael Elmiro de Lima] – Matrícula [22350151]

## Links do Projeto
- **Aplicação no ar (GitHub Pages):** https://rafaelelmiroo.github.io/bootcamp2-app/
- **Repositório GitHub:** https://github.com/rafaelelmiroo/bootcamp2-app
- **Repositório Docker Hub:** https://hub.docker.com/r/rafaelelmiroo/bootcamp2-app

## Comando para execução imediata via Docker
```bash
docker run -d -p 8080:80 rafaelelmiroo/bootcamp2-app:latest

Persistência de Dados
Banco Utilizado: Supabase (PostgreSQL).

Estrutura da Tabela (time_pokemon):

id (int8, chave primária)

criado_em (timestamptz, valor padrão now())

nome_item (text - Nome do Pokémon)

dados_extra (text - ID/Número formatado e Tipo do Pokémon)

Funcionalidades CRUD:

Create: Adiciona o Pokémon pesquisado ao time salvo no Supabase.

Read: Carrega e exibe a lista do time salvo ao iniciar a página.

Delete: Permite remover Pokémon individuais do time no banco.

Limitação Conhecida: As políticas de segurança de acesso (RLS) foram configuradas para permitir permissão de leitura e escrita pública para o perfil anon, possibilitando o gerenciamento diretamente via frontend sem necessidade de sistema de login.

Sidequests Obrigatórias
SQ1 · .dockerignore
Foi criado o arquivo .dockerignore excluindo diretórios e arquivos desnecessários para o ambiente de execução em produção (como .git, README.md e capturas de tela). Isso reduz o tamanho final da imagem e torna o processo de build do Docker mais ágil e limpo.

SQ2 · Versionamento de Imagem
Foram geradas e publicadas com sucesso no Docker Hub três tags diferentes:

1.0 (primeira versão estável conteinerizada)

1.1 (versão otimizada)

latest (aponta para a versão mais recente da aplicação)

SQ3 · Descrição no Docker Hub
O repositório no Docker Hub (rafaelelmiroo/bootcamp2-app) foi devidamente documentado na seção Overview, contendo o resumo da aplicação, o comando docker run pronto para execução e o link direto para o repositório no GitHub.

SQ4 · Explorando a Orquestração
Foram iniciados dois containers simultâneos da mesma imagem em portas de rede diferentes (8080 e 8081). A evidência do comando docker ps foi salva no arquivo de imagem sq4-print.png, commitado no repositório.

Reflexão sobre Orquestração:
Se eu tivesse 100 containers, como gerenciaria?

Gerenciar centenas de containers manualmente através da linha de comando do Docker é inviável e propenso a falhas. Em cenários reais de grande escala, utiliza-se um orquestrador como o Kubernetes (ou Docker Swarm). O Kubernetes automatiza o ciclo de vida das aplicações, gerenciando clusters, pods e réplicas. Ele oferece recursos essenciais como balanceamento de carga (Load Balancing), autorrecuperação (Self-healing, reiniciando automaticamente containers com falha) e dimensionamento automático (Auto-scaling), garantindo alta disponibilidade sem intervenção manual contínua.