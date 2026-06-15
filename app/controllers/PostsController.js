const { Post } = require("../models");

module.exports = {
  async list(req, res) {
    try {
      const posts = await Post.findAll();
      res.render("posts/list", { posts });
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro ao carregar as postagens.");
    }
  },

  create(req, res) {
    res.render("posts/create");
  },

  async save(req, res) {
    try {
      const { title, content, publishedAt } = req.body;
      
      await Post.create({
        title,
        content,
        publishedAt
      });
      
      res.redirect("/posts");
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro ao salvar a postagem.");
    }
  },

  async remove(req, res) {
    try {
      const { id } = req.params;
      
      await Post.destroy({
        where: { id }
      });
      
      res.redirect("/posts");
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro ao remover a postagem.");
    }
  }
};
