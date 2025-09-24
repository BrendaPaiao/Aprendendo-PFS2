
// OBS: Como o projeto está usando ESM ("type":"module" no package.json), precisamos usar "export default" nas classes (ex.: Usuario). E "import ... from" é usado nos arquivos que utilizam essas classes.
export default class Usuario {

    #id;
    #nome;
    #email;
    #senha;
    #ativo;
    #perfil;

    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value;
    }

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

    get senha() {
        return this.#senha;
    }

    set senha(value) {
        this.#senha = value;
    }

    get ativo() {
        return this.#ativo;
    }

    set ativo(value) {
        this.#ativo = value;
    }

    get perfil() {
        return this.#perfil;
    }

    set perfil(value) {
        this.#perfil = value;
    }

    // O constructor é chamado automaticamente quando usamos "new Usuario(...)"
    // Ele inicializa os atributos privados da classe com os valores passados.
    constructor(id, nome, email, senha, ativo, perfil) {
        this.#id = id;
        this.#nome = nome;
        this.#email = email;
        this.#senha = senha;
        this.#ativo = ativo;
        this.#perfil = perfil;
    }

    //Método toJSON():
    //Define quais atributos serão retornados quando o objeto for convertido em JSON.
    //Ex.: evita expor dados sensíveis como 'senha'.
    //Nesse caso, só 'nome' e 'email' serão incluídos no retorno.
    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            email: this.#email,
            ativo: this.#ativo,
            perfil: this.#perfil
        }
    }
}