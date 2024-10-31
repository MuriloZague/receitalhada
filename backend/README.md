# Receitalhada API 

Para iniciar, siga os passos:
1. Requisitos: 
   - Node LTS
   - MySQL
2. Instale as dependências do projeto:
```
    # Deve estar na pasta backend "~/backend/"
    pwd 
    # Instala todas depêndencias
    npm i 
```
3. Copie o .env.example e crie o seu:
```
    # Copiando o .env.example
    cp .env.example .env
```
4. Faça build do projeto:
```
    # Transpila código para distruibição
    npm run build
    # ===Outros comandos===
    npm run dev  # Ambiente hot reload para desenvolver
    npm run test # Rodar os testes
```
5. Inicie a API
```
    # Inicia a API (padrão: localhost:3000)
    npm run start
```
6. Testando a conectividade da api
```
    GET http://localhost:3000/up
    -> { "message": "Server is up!" }
```

#

Grato!