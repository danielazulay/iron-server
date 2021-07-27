const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/User.model");

class UserService {
  constructor(user) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.document = user.document;
    this.address = user.address;
    this.birthDate = user.birthDate;
    this.phoneNumber = user.phoneNumber;
    this.role=user.role
  }

  isValid(field, validationRegex) {
    // 1. Validar o email e a senha
    if (!field || !field.match(validationRegex)) {
      return false;
    }

    return true;
  }

  async getUserByEmail(email) {
    const user = await UserModel.findOne({ email: email });
    return user;
  }

  async userExists(email) {
    // 2. Verificar se o usuário já existe

    const user = await this.getUserByEmail(email);

    if (user) {
      return true;
    }

    return false;
  }

  hashPassword(plainTextPassword) {
    // 3. Criptografar a senha

    const saltRounds = 10;

    const salt = bcrypt.genSaltSync(saltRounds);

    const hashedPassword = bcrypt.hashSync(plainTextPassword, salt);

    return hashedPassword;
  }

  async createUser() {
    // 4. Insere o usuário no banco
    return UserModel.create({
      name: this.name,
      email: this.email,
      passwordHash: this.hashPassword(this.password),
      document: this.document,
      address: this.address,
      birthDate: this.birthDate,
      phoneNumber: this.phoneNumber,
      role:this.role
    }).then((insertResult) => insertResult);
  }

  async login() {
    // 1. Buscar o usuário através do email
    const user = await this.getUserByEmail(this.email);

    if (!user) {
      throw new Error("Usuário não cadastrado!"); // throw encerra a execução da função da mesma maneira que o return
    }

    // 2. Comparar a senha recebida da requisição com o hash de senha armazenado no banco
    if (bcrypt.compareSync(this.password, user.passwordHash)) {
      const token = this.generateToken(user);

      return { token: token, user: user };
    }

    return false;
  }

  generateToken(user) {
    // Não esquecer de criar o seu arquivo .env e instalar e configurar o dotenv, porque variáveis de ambiente não são enviadas ao Github por segurança
    const signSecret = process.env.TOKEN_SIGN_SECRET;

    // O token JWT NUNCA pode incluir a senha do usuário pois ele não é criptografado de uma forma irreversível
    delete user.passwordHash;

    // Assina um token JWT
    const token = jwt.sign(user.toJSON(), signSecret, { expiresIn: "6h" });

    return token;
  }
}

module.exports = UserService;