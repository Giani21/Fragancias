import { useState } from 'react';
import { Mail, Lock, Sprout, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Error en el login');
        return;
      }

      login(data.token, { id: data.user.id, name: data.user.name });
      navigate('/');
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setError('Error al conectar con el servidor');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="flex h-screen"
      initial={{ opacity: 0, x: -window.innerWidth }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: window.innerWidth }}
      transition={{ duration: 1, ease: 'easeInOut', type: 'tween' }}
    >
      {/* Sección azul (izquierda) */}
      <div
        className="hidden lg:flex w-1/2 items-center justify-center bg-[#002654] relative"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#002654]/90 via-[#002654]/60 to-transparent p-12 flex flex-col justify-end">
          <h1 className="text-white text-4xl font-bold mb-4">Fragancias Le France</h1>
          <p className="text-white/80 text-xl mb-6">Descubre la fragancia que refleja tu personalidad</p>
          <div className="flex space-x-4 mb-12">
            <span className="inline-block w-12 h-1 bg-white rounded-full"></span>
            <span className="inline-block w-4 h-1 bg-white/50 rounded-full"></span>
            <span className="inline-block w-4 h-1 bg-white/50 rounded-full"></span>
          </div>
        </div>
      </div>

      {/* Sección formulario con trama roja */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white relative p-8 overflow-hidden">
        {/* Trama roja de puntos */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,#EF413533_1px,transparent_1px)] bg-[size:20px_20px] opacity-40 pointer-events-none"></div>

        {/* Caja del formulario */}
        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-4 bg-[#EF4135]/10 rounded-full mb-6">
              <Sprout className="h-10 w-10 text-[#EF4135]" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Bienvenido de nuevo</h2>
            <p className="mt-3 text-gray-500">Ingresa a tu cuenta y descubre nuestras nuevas fragancias</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 block w-full border-gray-300 rounded-lg py-3 bg-white border focus:ring-2 focus:ring-[#EF4135] focus:border-[#EF4135]"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                <button type="button" className="text-sm text-[#EF4135] hover:text-[#c53030]">¿Olvidaste tu contraseña?</button>
              </div>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 block w-full border-gray-300 rounded-lg py-3 bg-white border focus:ring-2 focus:ring-[#EF4135] focus:border-[#EF4135]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#EF4135] focus:ring-[#EF4135] border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">Recordarme</label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 bg-gradient-to-r from-[#EF4135] to-[#ff6b61] hover:from-[#e6322c] hover:to-[#ff4949] text-white rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EF4135] disabled:opacity-70"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Iniciando sesión...
                </span>
              ) : (
                <span className="flex items-center">
                  Iniciar sesión
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </form>

          <div className="mt-10">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">O continúa con</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                Google
              </button>
              <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                Facebook
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            ¿No tienes una cuenta?{' '}
            <a href="/register" className="font-medium text-[#EF4135] hover:text-[#c53030]">
              Regístrate para descubrir tu aroma
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
