import { createHash } from "crypto";

function criaHash(senha) {
	return createHash("sha256").update(senha).digest("hex");
}

console.log(criaHash("uma String Qualquer"));

class Usuario {
	constructor(nome, senha) {
		this.nome = nome;
		this.hash = criaHash(senha);
	}
	autentica(nome, senha) {
		if (nome === this.nome && this.hash === criaHash(senha)) {
			console.log("Usuario autenticado com sucesso");
			return true;
		}
		console.log("Usario com senha incorreta");
		return false;
	}
}

const usario = new Usuario("joao manoel", "minhaSenha");
console.log(usario);
usario.autentica('joao manoel', "minhaSenha")
usario.autentica('leandro', "minhaSenha" )
usario.autentica("joao manoel", "minhasenha")
