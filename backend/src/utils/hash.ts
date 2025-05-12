import bcrypt from 'bcrypt';

export async function encriptar(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparar(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}