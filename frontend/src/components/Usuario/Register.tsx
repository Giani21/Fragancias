import { useState } from 'react';
import { Mail, Lock, Sprout, User, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Register = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!nombre || !email || !password || !confirmPassword) {
      setError('Por favor, completa todos los campos.');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setIsLoading(false);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/register', { nombre, email, password });
      alert('Usuario registrado con éxito');
      navigate('/login');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 400) {
        setError(err.response.data.message || 'Error al registrar.');
      } else {
        setError('Hubo un error al registrar al usuario. Intenta de nuevo.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex"
      initial={{ opacity: 0, x: window.innerWidth }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -window.innerWidth }}
      transition={{ duration: 1, ease: 'easeInOut', type: 'tween' }}
    >
      {/* Panel izquierdo */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-4 bg-red-100 rounded-full mb-6">
              <Sprout className="h-10 w-10 text-[#D50032]" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Crear cuenta</h2>
            <p className="mt-3 text-gray-500">Completa tus datos para comenzar</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                Nombre completo
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="nombre"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="pl-10 block w-full border-gray-300 rounded-lg py-3 bg-white border focus:ring-2 focus:ring-[#D50032] focus:border-[#D50032]"
                  placeholder="Tu nombre completo"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 block w-full border-gray-300 rounded-lg py-3 bg-white border focus:ring-2 focus:ring-[#D50032] focus:border-[#D50032]"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 block w-full border-gray-300 rounded-lg py-3 bg-white border focus:ring-2 focus:ring-[#D50032] focus:border-[#D50032]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmar contraseña
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 block w-full border-gray-300 rounded-lg py-3 bg-white border focus:ring-2 focus:ring-[#D50032] focus:border-[#D50032]"
                  placeholder="Repetí tu contraseña"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 bg-gradient-to-r from-[#D50032] to-[#F44336] hover:from-[#F44336] hover:to-[#D50032] text-white rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D50032] disabled:opacity-70"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Registrando...
                </span>
              ) : (
                <span className="flex items-center">
                  Registrarse
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            ¿Ya tenés una cuenta?{' '}
            <a href="/login" className="font-medium text-[#D50032] hover:text-[#F44336]">
              Iniciar sesión
            </a>
          </p>
        </div>
      </div>

      {/* Panel derecho */}
      <div
        className="hidden lg:block lg:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/api/placeholder/800/1200')" }}
      >
        <div className="h-full w-full bg-gradient-to-b from-[#D50032] to-[#F44336] flex flex-col justify-end p-12">
          <h1 className="text-white text-4xl font-bold mb-4">Fragancias Le France</h1>
          <p className="text-white/80 text-xl mb-6">Regístrate y encontrá tu aroma ideal</p>
          <div className="flex space-x-4 mb-12">
            <span className="inline-block w-12 h-1 bg-white rounded-full"></span>
            <span className="inline-block w-4 h-1 bg-white/50 rounded-full"></span>
            <span className="inline-block w-4 h-1 bg-white/50 rounded-full"></span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;