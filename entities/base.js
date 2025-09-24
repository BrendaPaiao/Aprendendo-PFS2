
export default class Base {

    constructor() {

    }

    // Converte a instância em um objeto JSON automaticamente
    // Percorre as propriedades do prototype e monta um dicionário { prop: valor }
    // ⚠️ Cuidado: pode incluir métodos ou expor dados que você não queira.
    // Normalmente é mais seguro definir manualmente quais atributos expor (ex.: id, nome, email).
    toJSON() {
        // Pega os nomes de todas as propriedades que existem no  "prototype" do objeto atual (prototype = onde ficam os métodos herdados da classe)
        let props = Object.getOwnPropertyNames(Object.getPrototypeOf(this))
        // Objeto vazio que será preenchido
        let json = {};

        // Para cada propriedade encontrada, copia o valor do objeto atual para o json
        for(let prop of props) {
            json[prop] = this[prop]
        }

        // Retorna o objeto pronto no formato JSON
        return json;
    }
}