const UserController = require('../../app/controllers/UsersController');
const User = require('../../app/models/User');
const bcrypt = require('bcrypt');

jest.mock('../../app/models/User');

jest.mock('bcrypt');

describe('UserController - save (Cadastro de Usuários)', () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      body: {
        name: 'Maycon',
        email: 'maycon@example.com',
        password: 'senha123',
        confirm_password: 'senha123'
      }
    };

    res = {
      render: jest.fn(),
      redirect: jest.fn()
    };
  });

  test('Deve cadastrar o usuário com sucesso quando os dados forem válidos', async () => {

    bcrypt.hash.mockResolvedValue('senhaHashed123');

    User.create.mockResolvedValue({
      id: 1,
      name: 'Eduardo',
      email: 'eduardo@email.com',
      password: 'senhaHashed123'
    });

    await UserController.save(req, res);

    expect(bcrypt.hash).toHaveBeenCalledWith('senha123', 10);
    expect(User.create).toHaveBeenCalledWith({
      name: 'Eduardo',
      email: 'eduardo@email.com',
      password: 'senhaHashed123'
    });
    expect(res.redirect).toHaveBeenCalledWith('/users');
    expect(res.render).not.toHaveBeenCalled();
  });

  test('Não deve cadastrar o usuário se as senhas forem diferentes', async () => {
    req.body.confirm_password = 'outraSenha';

    await UserController.save(req, res);

    expect(res.render).toHaveBeenCalledWith('users/create', {
      error: {
        message: 'Os campos senha e confirmar senha são diferentes.'
      }
    });
    expect(bcrypt.hash).not.toHaveBeenCalled();
    expect(User.create).not.toHaveBeenCalled();
    expect(res.redirect).not.toHaveBeenCalled();
  });

  test('Deve registrar erro no console caso a criação falhe no banco', async () => {
    bcrypt.hash.mockResolvedValue('senhaHashed123');

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    const dbError = new Error('Erro ao salvar no banco');
    User.create.mockRejectedValue(dbError);

    await UserController.save(req, res);

    expect(User.create).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(dbError);
    expect(res.redirect).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
