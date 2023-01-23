import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

function criaHashComSal(senha) {
	const sal = randomBytes(16).toString("hex");

	const senhaHasheada = scryptSync(senha, sal, 64).toString("hex");

	return `${sal}:${senhaHasheada}`;
}

class Usario {
	constructor(nome, senha) {
		this.nome = nome;
		[this.sal, this.hash] = criaHashComSal(senha).split(":");
	}
	autentica(nome, senha) {
		if (nome === this.nome) {
			const testeHash = scryptSync(senha, this.sal, 64);
			const hashReal = Buffer.from(this.hash, "hex");

			const hashesCorrespondem = timingSafeEqual(testeHash, hashReal);

			if (hashesCorrespondem) {
				console.log("usario autenticado com sucesso");
				return true;
			}
		}
		console.log("Usario ou senha incorretos.");
		return false;
	}
}

const jm = new Usario("Joao Manoel", "minhaSenha");
console.log(jm);
jm.autentica("Joao Manoel", "minhaSenha");

