import bcrypt from 'bcryptjs';
import User from '../models/User';
import * as Yup from 'yup';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const { email, password } = req.body;

    // Verifica se o usuário já existe
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }

    // Cria um hash da senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 8);

    // Cria o usuário no banco de dados
    const user = await User.create({ email, password: hashedPassword });

    return res.json({
      id: user._id,
      email: user.email,
    });
  }
}

export default new UserController();
