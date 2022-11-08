import { userRegisterUseCase } from '../../application/use-cases/user-register.usecase.js';

export const userRegisterController = async (req, res, next) => {
  try {
    const { id, name, email, password } = req.body;

    await userRegisterUseCase(id, name, email, password);

    return res.status(201).send();
  } catch (err) {
    next(err);
  }
};
