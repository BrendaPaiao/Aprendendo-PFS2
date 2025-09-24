
export default class Imovel {

    #id;
    #descricao;
    #cep;
    #endereco;
    #bairro;
    #cidade;
    #valor;
    #disponivel;

    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value;
    }

    get descricao() {
        return this.#descricao;
    }

    set descricao(value) {
        this.#descricao = value;
    }

    get cep() {
        return this.#cep;
    }

    set cep(value) {
        this.#cep = cep;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(value) {
        this.#endereco = value;
    }

    get bairro() {
        return this.#bairro;
    }

    set bairro(value) {
        this.#bairro = bairro;
    }

    get cidade() {
        return this.#cidade;
    }

    set cidade(value) {
        this.#cidade;
    }

    get valor() {
        return this.#valor;
    }

    set valor(value) {
        this.#valor = value;
    }

    get disponivel() {
        return this.#disponivel;
    }

    set disponivel(value) {
        this.#disponivel = value;
    }

    constructor(id, descricao, cep, endereco, bairro, cidade, valor, disponivel) {
        this.#id = id;
        this.#descricao = descricao;
        this.#endereco = endereco;
        this.#cep = cep;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#valor = valor;
        this.#disponivel = disponivel;
    }
}