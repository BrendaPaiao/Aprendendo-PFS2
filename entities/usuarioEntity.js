
// OBS: Como o projeto está usando ESM ("type":"module" no package.json), precisamos usar "export default" nas classes (ex.: Usuario). E "import ... from" é usado nos arquivos que utilizam essas classes.
export default class Usuario {

    #nome;
    #email;

    get nome() {
        return this.#nome;
    }

    set nome(value) {
        this.#nome = value;
    }

    get email() {
        return this.#email;
    }

    set email(value) {
        this.#email = value;
    }

    //Método toJSON():
    //Define quais atributos serão retornados quando o objeto for convertido em JSON.
    //Ex.: evita expor dados sensíveis como 'senha'.
    //Nesse caso, só 'nome' e 'email' serão incluídos no retorno.
    toJSON() {
        return {
            nome: this.#nome,
            email: this.#email
        }
    }
}