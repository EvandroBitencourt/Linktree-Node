import Profile from "../models/Profile";
import * as Yup from 'yup';

class ProfileController {

  async index(req, res) {
    const { user_id } = req.headers;

    try {
      const profiles = await Profile.find({ user: user_id });
      return res.json(profiles);
    } catch (error) {
      console.error("Erro ao listar links:", error);
      return res.status(500).json({ error: "Erro ao listar links" });
    }
  }

  async show(req, res) {
    const { user_id } = req.headers;
    const { profile_id } = req.params;

    try {
      const profile = await Profile.findOne({ _id: profile_id, user: user_id });
      
      if (!profile) {
        return res.status(404).json({ error: "Link não encontrado" });
      }

      return res.json(profile);
    } catch (error) {
      console.error("Erro ao buscar link:", error);
      return res.status(500).json({ error: "Erro ao buscar link" });
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required("Nome é obrigatório"),
      url: Yup.string().url("Deve ser uma URL válida").required("URL é obrigatória"),
      bg: Yup.string(), // Adicionado para validação de cor de fundo
      color: Yup.string(), // Adicionado para validação de cor do texto
    });

    const { name, url, bg = "#323232", color = "#f1f1f1" } = req.body; // Valores padrão para bg e color
    const { user_id } = req.headers;
    const image = req.file ? req.file.filename : null;

    if (!(await schema.isValid({ name, url, bg, color }))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    try {
      const profile = await Profile.create({
        user: user_id,
        name,
        url,
        image,
        bg,
        color,
      });

      return res.json(profile);
    } catch (error) {
      console.error("Erro ao criar link:", error);
      return res.status(500).json({ error: "Erro ao criar link" });
    }
  }

  async destroy(req, res) {
    const { profile_id } = req.params;
    const { user_id } = req.headers;

    try {
      const profile = await Profile.findById(profile_id);
      if (!profile || String(profile.user) !== String(user_id)) {
        return res.status(401).json({ error: 'Não autorizado' });
      }

      await Profile.deleteOne({ _id: profile_id });
      return res.json({ message: "Link excluído com sucesso" });
    } catch (error) {
      console.error("Erro ao excluir link:", error);
      return res.status(500).json({ error: "Erro ao excluir link" });
    }
  }
}

export default new ProfileController();
