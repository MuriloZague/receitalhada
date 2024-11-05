# Tabela de rotas
| Método                         | Rota                              | Header       | Body                                           | Retorno                                                                  | Descrição                                                            |
| ------------------------------ | --------------------------------- | ------------ | ---------------------------------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| **Métodos sem autentificação** |
| **`POST`**                     | **`/users/`**                     | -            | User Info                                      | New User Info (Envia código de autentificação no email)                  | Cria um novo usuário no banco de dados                               |
| **`POST`**                     | **`/users/auth`**                 | -            | email or username and password                 | Bearer Token (JWT Token)                                                 | Autentifica credenciais informada como login do usuário              |
| **`POST`**                     | **`/users/email-auth`**           | -            | email and authentification code                | "User's email has register!"                                             | Autentifica se o código informado é o mesmo que foi enviado no email |
| **`POST`**                     | **`/users/forgot-password`**      | -            | email                                          | "An authentication code was sent to your email, please check your inbox" | Envia código de restauração de senha no email                        |
| **`POST`**                     | **`/users/reset-password`**       | -            | email, forgot_password_code and password (new) | "User's forgot password request was accepted! Password was edited"       | Autentifica o código e se for válido altera a senha                  |
| **Métodos com autentificação** |
| **`GET`**                      | **`/users/`** `?limit&page&order` | Bearer Token | -                                              | Users Info and Page info                                                 | Lista todos os usuário com paginação disponível                      |
| **`GET`**                      | **`/users/signed`**               | Bearer Token | -                                              | User Signed                                                              | Lista os dados do usuário ativo                                      |
| **`GET`**                      | **`/users/:id`**                  | Bearer Token | -                                              | User with this id                                                        | Lista os dados do usuário com id informado                           |
| **`PATCH`**                    | **`/users/`**                     | Bearer Token | User info                                      | User Edited Info                                                         | Edita os dados do usuário ativo                                      |

# Tabela de erros
| Código | Erro                         |
| ------ | ---------------------------- |
| 1      | UNKNOWN_ERROR                |
| 2      | UNKNOWN_PRISMA_ERROR         |
| 3      | VALIDATION_ERROR             |
| 4      | DATABASE_ERROR               |
| 5      | UNIQUE_CONSTRAINT_ERROR      |
| 6      | FOREIGN_KEY_CONSTRAINT_ERROR |
| 7      | RECORD_NOT_FOUND_ERROR       |
| 8      | AUTHORIZATION_ERROR          |