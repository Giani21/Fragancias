import { Request, Response, RequestHandler, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../../prisma/prismaClient';
import jwt from 'jsonwebtoken';

export const registerUser: RequestHandler = async (req, res, next) => {
  const { nombre, email, password } = req.body;

  try {
    const existingUser = await prisma.usuario.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      res.status(400).json({ message: 'Usuario ya existe' });
      return;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.usuario.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
        rol: 'CLIENTE',
      },
    });

    res.status(201).json({
      message: 'Usuario creado exitosamente',
      user: {
        id: newUser.id,
        nombre: newUser.nombre,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error);  // Aquí pasas el error al middleware de manejo de errores
  }
};

export const loginUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario por el email
    const user = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(401).json({ message: 'Usuario no encontrado' });
      return; // En lugar de return res.status(...) simplemente hacemos return después de res.status(...)
    }

    // Verificar si la contraseña coincide
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Contraseña incorrecta' });
      return; // Mismo patrón aquí
    }

    // Crear un token JWT
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: '1h', // Expira en una hora
    });

    // Enviar el token al cliente
    res.status(200).json({
      message: 'Login exitoso',
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser: RequestHandler = (req, res) => {
  res.status(200).json({ message: 'Logout exitoso' });
};