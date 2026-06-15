const User = require('../models/User');
const bcrypt = require('bcrypt');

function UserController() {

  async function list(req, res) {
    try {
      const data = await User.findAll({ raw: true });
      res.render('users/list', {
        title: "Lista de Usuários",
        users: data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  function create(req, res) {
    res.render('users/create')
  }

  async function save(req, res) {

    const body = req.body;

    if (body.password != body.password_confirmation) {
      return res.render('users/create', {
        error: {
          message: 'Os campos senha e confirmar senha são diferentes.'
        }
      });
    }

    const hashed_password = await bcrypt.hash(req.body.password, 10);

    const user = {
      name: req.body.name,
      email: req.body.email,
      password: hashed_password,
    }

    try {
      await User.create(user);
      res.redirect('/users');
    } catch (error) {
      console.log(error);
    }
  }

  async function remove(req, res) {
    const id = req.params.id;
    try {
      await User.destroy({ where: { id: id } });
      res.redirect('/users');
    } catch (err) {
      console.log(err);
    }
  }

  async function edit(req, res) {
    const id = req.params.id;
    try {
      const data = await User.findOne({ where: { id: id }, raw: true });
      res.render('users/edit', { user: data });
    } catch (err) {
      console.log(err);
    }
  }

  async function update(req, res) {
    console.log(req.body);
    const id = req.body.id;

    const activeStatus = req.body.done === '1';

    const user = {
      name: req.body.name,
      email: req.body.email,
      active: activeStatus
    };

    try {
      await User.update(user, { where: { id: id } });
      res.redirect('/users');
    } catch (err) {
      console.log(err);
    }
  }

  async function updateStatus(req, res) {
    const id = req.params.id;
    const activeStatus = req.body.active === '1' ? false : true;

    try {
      await User.update({ active: activeStatus }, { where: { id: id } });
      res.redirect('/users');
    } catch (err) {
      console.log(err);
    }
  }

  return {
    create,
    save,
    list,
    remove,
    edit,
    update,
    updateStatus,
  }

}

module.exports = UserController();
