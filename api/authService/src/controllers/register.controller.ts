import express, { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import { BCRYPT_SALT } from "../config/config";

export const registerUser = async (
  req: Request<{}, {}, User>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data: User = req.body;
    if (!data.aadhar_id || !data.email || !data.password || !data.name) {
      res.status(400).json({
        success: false,
        message: "Please provide all data to register",
      });
      return;
    }

    let user = await User.findOne({
      where: {
        email: data.email,
      },
    });
    if (user) {
      res.status(400).json({
        success: false,
        message: "User already exists",
      });
      return;
    }
    // Hash the password
    const password_hash = await bcrypt.hash(data.password, BCRYPT_SALT);
    user = await User.create({
      name: data.name,
      email: data.email,
      password: password_hash,
      aadhar_id: data.aadhar_id,
    });

    res.status(201).json({
      success: true,
      user,
    });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err,
    });
    return;
  }
};
