import Config from "../models/Config";
import * as Yup from 'yup';

class ConfigController {

  async index(req, res) {
    try {
      const configs = await Config.find();
      return res.json(configs);
    } catch (error) {
      console.error("Erro ao listar configurações:", error);
      return res.status(500).json({ error: "Erro ao listar configurações" });
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      phrase: Yup.string().required(),
    });

    const { title, phrase } = req.body;
    const { user_id } = req.headers;

    const logomarca = req.files['logomarca'] ? req.files['logomarca'][0].filename : null;
    const banner = req.files['banner'] ? req.files['banner'][0].filename : null;

    if (!(await schema.isValid({ title, phrase }))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const config = await Config.create({
      user: user_id,
      logomarca,
      banner,
      title,
      phrase,
    });

    return res.json(config);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      phrase: Yup.string().required(),
    });

    const { config_id } = req.params;
    const { title, phrase } = req.body;
    const { user_id } = req.headers;

    const logomarca = req.files['logomarca'] ? req.files['logomarca'][0].filename : null;
    const banner = req.files['banner'] ? req.files['banner'][0].filename : null;

    const config = await Config.findById(config_id);
    if (!config || String(config.user) !== String(user_id)) {
      return res.status(401).json({ error: 'Não autorizado' });
    }

    if (!(await schema.isValid({ title, phrase }))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    config.title = title;
    config.phrase = phrase;
    config.logomarca = logomarca || config.logomarca;
    config.banner = banner || config.banner;

    await config.save();
    return res.json(config);
  }

  async destroy(req, res) {
    const { config_id } = req.body;
    const { user_id } = req.headers;

    const config = await Config.findById(config_id);
    if (!config || String(config.user) !== String(user_id)) {
      return res.status(401).json({ error: 'Não autorizado' });
    }

    await Config.deleteOne({ _id: config_id });
    return res.json({ message: "Excluído com sucesso" });
  }
}

export default new ConfigController();
