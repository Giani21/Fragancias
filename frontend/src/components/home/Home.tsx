import { useState } from 'react';
import {
  Sprout,
  LogIn,
  Search,
  ShoppingBag,
  Heart,
  Star,
  Menu,
  X,
  ChevronRight,
  LogOut,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  ArrowRight,
  Truck,
  Package,
  CreditCard,
  Users
} from 'lucide-react';
import { useAuth } from '../../context/authContext'; // Asegúrate de que esta ruta sea correcta

const Home = () => {
  const { isLoggedIn, logout } = useAuth(); // Obtenemos el estado de autenticación
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Datos de productos destacados (podrían venir de una API)
  const featuredProducts = [
    {
      id: 1,
      name: "La Elegancia Nocturna",
      description: "Notas de jazmín, sándalo y vainilla con un toque de ámbar.",
      price: 89.99,
      rating: 5,
      image: "/api/placeholder/400/400?text=Elegancia", // Usar URL de imagen real
      category: "Premium",
      isNew: true,
      discount: null
    },
    {
      id: 2,
      name: "Brisa Marina",
      description: "Aroma cítrico y fresco con notas de bergamota y neroli.",
      price: 75.99,
      originalPrice: 95.99,
      rating: 4,
      image: "/api/placeholder/400/400?text=Brisa",    // Usar URL de imagen real
      category: "Distintivo",
      isNew: false,
      discount: "20%"
    },
    {
      id: 3,
      name: "Misterio Nocturno",
      description: "Fragancia amaderada y sensual con notas de sándalo y pachulí.",
      price: 69.99,
      rating: 5,
      image: "/api/placeholder/400/400?text=Misterio",  // Usar URL de imagen real
      category: "Clásico",
      isNew: false,
      discount: null
    },
    {
      id: 4,
      name: "Jardín Secreto",
      description: "Delicada fragancia floral con rosas, lilas y un toque de mandarina.",
      price: 79.99,
      rating: 4,
      image: "/api/placeholder/400/400?text=Jardin",    // Usar URL de imagen real
      category: "Premium",
      isNew: true,
      discount: null
    }
  ];

  // Datos de categorías (podrían venir de una API)
  const categories = [
    {
      name: "Para Ella",
      description: "Fragancias elegantes y sofisticadas",
      image: "/api/placeholder/400/300?text=Mujer"  // Usar URL de imagen real
    },
    {
      name: "Para Él",
      description: "Aromas intensos y masculinos",
      image: "/api/placeholder/400/300?text=Hombre" // Usar URL de imagen real
    },
    {
      name: "Colección Lujo",
      description: "Nuestra selección más exclusiva",
      image: "/api/placeholder/400/300?text=Lujo"   // Usar URL de imagen real
    },
    {
      name: "Estuches de Regalo",
      description: "Sets especiales para regalo",
      image: "/api/placeholder/400/300?text=Regalos" // Usar URL de imagen real
    }
  ];

  // Componente para el logo
  const Logo = () => (
    <div className="flex items-center">
      <Sprout className="text-blue-600 h-7 w-7" />
      <div className="ml-2 flex items-end">
        <span className="text-xl font-bold text-blue-600">Fragancias</span>
        <span className="text-xl font-bold text-white mx-1.5">Le</span>
        <span className="text-xl font-bold text-red-600">France</span>
      </div>
    </div>
  );

  const handleLogout = () => {
    logout(); // Llamamos a la función logout del contexto
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login'; // Redirigimos al login después de cerrar sesión
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Barra superior de información */}
      <div className="bg-gray-900 text-white py-2.5 text-center text-sm font-medium">
        <p>Envío gratuito en pedidos superiores a 80€ | Código: BIENVENIDA</p>
      </div>

      {/* Barra de navegación */}
      <nav className="w-full px-4 md:px-6 py-4 bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Botón menú móvil */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-600"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 bg-gray-900 px-4 py-2 rounded">
              <Logo />
            </div>

            {/* Menú de navegación de escritorio */}
            <div className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-800 hover:text-blue-600 font-medium">Novedades</a>
              <a href="#" className="text-gray-800 hover:text-blue-600 font-medium">Para Ella</a>
              <a href="#" className="text-gray-800 hover:text-blue-600 font-medium">Para Él</a>
              <a href="#" className="text-gray-800 hover:text-blue-600 font-medium">Colecciones</a>
              <a href="#" className="text-gray-800 hover:text-blue-600 font-medium">Sobre Nosotros</a>
            </div>

            {/* Acciones de usuario de escritorio */}
            <div className="hidden md:flex items-center space-x-4">
              <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 text-gray-600 hover:text-blue-600">
                <Search size={20} />
              </button>
              <a href="#" className="p-2 text-gray-600 hover:text-blue-600">
                <Heart size={20} />
              </a>
              <a href="#" className="p-2 text-gray-600 hover:text-blue-600">
                <ShoppingBag size={20} />
              </a>

              {/* Botón de Iniciar sesión / Cerrar sesión */}
              {!isLoggedIn ? (
                <a href="/login" className="text-gray-800 hover:text-blue-600 font-medium">
                  <LogIn size={20} className="inline mr-1" /> Iniciar Sesión
                </a>
              ) : (
                <button onClick={handleLogout} className="text-gray-800 hover:text-blue-600 font-medium flex items-center">
                  <LogOut size={20} className="inline mr-1" /> Cerrar Sesión
                </button>
              )}
            </div>

            {/* Acciones de usuario en móvil */}
            <div className="flex md:hidden items-center space-x-3">
              <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 text-gray-600">
                <Search size={20} />
              </button>
              <a href="#" className="p-2 text-gray-600">
                <ShoppingBag size={20} />
              </a>

              {/* Botón de Iniciar sesión / Cerrar sesión en móvil */}
              {!isLoggedIn ? (
                <a href="/login" className="text-gray-800 hover:text-blue-600 font-medium flex items-center">
                  <LogIn size={16} className="mr-2" /> Iniciar Sesión
                </a>
              ) : (
                <button onClick={handleLogout} className="text-gray-800 hover:text-blue-600 font-medium flex items-center">
                  <LogOut size={16} className="mr-2" /> Cerrar Sesión
                </button>
              )}
            </div>
          </div>

          {/* El resto del contenido de la página */}
        </div>
      </nav>


      {/* Sección de cabecera (hero) */}
      <section className="relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/api/placeholder/1920/800?text=Fragancia" // Usar URL de imagen real
            alt="Perfume de lujo"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-transparent z-0"></div>

        <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 lg:py-40 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-6">
              Descubre el Arte de la <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-white to-red-500">Perfumería</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
              Despierta tus sentidos con fragancias exquisitas que cuentan una historia y evocan emociones inolvidables.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#nueva-coleccion" className="bg-white hover:bg-gray-100 text-gray-900 font-medium py-3 px-8 rounded-md shadow-md transition-all duration-300 text-center">
                Nueva Colección
              </a>
              <a href="#mas-vendidos" className="bg-transparent hover:bg-white/10 text-white border border-white font-medium py-3 px-8 rounded-md transition-all duration-300 text-center">
                Más Vendidos
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de beneficios de compra */}
      <section className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-8">
            <div className="flex items-center justify-center md:justify-start space-x-4">
              <div className="bg-blue-50 p-3 rounded-full">
                <Truck className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Envío Express</h3>
                <p className="text-sm text-gray-500">En 24-48 horas</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start space-x-4">
              <div className="bg-blue-50 p-3 rounded-full">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Muestras Gratis</h3>
                <p className="text-sm text-gray-500">Con cada pedido</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start space-x-4">
              <div className="bg-blue-50 p-3 rounded-full">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Pago Seguro</h3>
                <p className="text-sm text-gray-500">100% Garantizado</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start space-x-4">
              <div className="bg-blue-50 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Asesoría Experta</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de categorías destacadas */}
      <section className="py-16 bg-neutral-50" id="categories">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
            <div>
              <h2 className="text-sm uppercase tracking-wider text-blue-600 font-semibold mb-2">Nuestras Colecciones</h2>
              <h3 className="text-3xl font-light text-gray-900">
                Encuentra Tu <span className="font-bold">Fragancia Perfecta</span>
              </h3>
            </div>
            <a href="#" className="hidden md:flex items-center text-blue-600 font-medium hover:text-blue-800 mt-4 md:mt-0">
              Ver todas las categorías <ArrowRight size={16} className="ml-2" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={category.image}  // Usar URL de imagen real
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-medium text-white mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-200 mb-4">{category.description}</p>
                  <button className="bg-white/90 hover:bg-white text-gray-900 text-sm font-medium py-2 px-4 rounded-md flex items-center transition-all duration-300">
                    Explorar <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex md:hidden justify-center mt-8">
            <a href="#" className="flex items-center text-blue-600 font-medium hover:text-blue-800">
              Ver todas las categorías <ArrowRight size={16} className="ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* Banner promocional de nueva colección */}
      <section className="py-16 relative overflow-hidden bg-gray-900 text-white" id="nueva-coleccion">
        <div className="absolute inset-0 z-0">
          <img
            src="/api/placeholder/1920/600?text=Nuevo"  // Usar URL de imagen real
            alt="Nueva Colección"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/50 z-0"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="md:max-w-lg lg:max-w-2xl">
            <span className="inline-block px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full mb-4">
              NUEVA COLECCIÓN
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-white leading-tight mb-6">
              Descubre <span className="font-bold">Aromas Exclusivos</span>, <br />nuestra nueva línea premium
            </h2>
            <p className="text-lg text-gray-100 mb-8 leading-relaxed">
              Inspirada en la naturaleza y la sofisticación, esta colección te transportará a un mundo de sensaciones únicas.
            </p>
            <button className="bg-white hover:bg-gray-100 text-gray-900 font-medium py-3 px-8 rounded-md shadow-md transition-all duration-300">
              Descubrir Ahora
            </button>
          </div>
        </div>
      </section>

      {/* Sección de productos más vendidos */}
      <section className="py-16 bg-white" id="mas-vendidos">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
            <div>
              <h2 className="text-sm uppercase tracking-wider text-blue-600 font-semibold mb-2">Selección Exclusiva</h2>
              <h3 className="text-3xl font-light text-gray-900">
                Nuestros <span className="font-bold">Más Vendidos</span>
              </h3>
            </div>
            <a href="#" className="hidden md:flex items-center text-blue-600 font-medium hover:text-blue-800 mt-4 md:mt-0">
              Ver catálogo completo <ArrowRight size={16} className="ml-2" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative">
                  {/* Etiquetas de producto (nuevo, descuento, etc.) */}
                  <div className="absolute top-4 left-4 z-10 flex gap-2">
                    {product.isNew && (
                      <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
                        NUEVO
                      </span>
                    )}
                    {product.discount && (
                      <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                        -{product.discount}
                      </span>
                    )}
                    {product.category === "Premium" && (
                      <span className="bg-gray-900 text-white text-xs font-semibold px-2 py-1 rounded">
                        PREMIUM
                      </span>
                    )}
                  </div>

                  {/* Botón de añadir a favoritos */}
                  <button className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-sm transition-all duration-300">
                    <Heart size={18} className="text-gray-500 hover:text-red-500" />
                  </button>

                  {/* Imagen del producto */}
                  <div className="h-64 overflow-hidden">
                    <img
                      src={product.image}  // Usar URL de imagen real
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Detalles del producto */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      {product.category}
                    </span>
                    {/* Estrellas de valoración */}
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < product.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                  {/* Precio y botón de añadir al carrito */}
                  <div className="flex items-center justify-between">
                    <div>
                      {product.originalPrice ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-semibold text-gray-900">${product.price}</span>
                          <span className="text-sm line-through text-gray-500">${product.originalPrice}</span>
                        </div>
                      ) : (
                        <span className="text-xl font-semibold text-gray-900">${product.price}</span>
                      )}
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-300">
                      <ShoppingBag size={16} /> Añadir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enlace para ver todos los productos en móvil */}
          <div className="flex md:hidden justify-center mt-8">
            <a href="#" className="flex items-center text-blue-600 font-medium hover:text-blue-800">
              Ver catálogo completo <ArrowRight size={16} className="ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* Banner de suscripción al boletín */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-light mb-4">
                Únete a nuestra <span className="font-bold">Comunidad</span>
              </h2>
              <p className="text-blue-100 mb-4 leading-relaxed">
                Recibe actualizaciones sobre nuevos lanzamientos, ofertas exclusivas y consejos sobre el mundo
                de la perfumería directamente en tu correo.
              </p>
              <div className="flex items-center">
                <div className="mr-4 bg-blue-500 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <p className="text-blue-100 text-sm">
                  +15.000 suscriptores ya forman parte de nuestra comunidad
                </p>
              </div>
            </div>

            {/* Formulario de suscripción */}
            <div>
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="flex-grow px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  className="bg-white text-blue-600 font-medium px-6 py-3 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Suscribirme
                </button>
              </form>
              <p className="text-blue-100 text-sm mt-4">
                Al suscribirte, aceptas nuestra política de privacidad. Nunca compartiremos tu correo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de testimonios de clientes */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-sm uppercase tracking-wider text-blue-600 font-semibold mb-2">
              Testimonios
            </h2>
            <h3 className="text-3xl font-light text-gray-900">
              Lo que dicen nuestros <span className="font-bold">Clientes</span>
            </h3>
          </div>

          {/* Testimonios (datos dinámicos desde el backend) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < 5 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                  />
                ))}
              </div>
              <p className="text-gray-700 italic mb-6">"Este es un testimonio de ejemplo. Aquí aparecerán las opiniones de nuestros clientes."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-lg font-semibold text-gray-700">C</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Cliente Ejemplo</h4>
                  <p className="text-sm text-gray-600">Cliente desde 2023</p>
                </div>
              </div>
            </div>
            <div className="bg-neutral-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < 4 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                  />
                ))}
              </div>
              <p className="text-gray-700 italic mb-6">"Otro testimonio para mostrar cómo se verá esta sección con datos reales."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-lg font-semibold text-gray-700">O</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Otro Cliente</h4>
                  <p className="text-sm text-gray-600">Cliente desde 2022</p>
                </div>
              </div>
            </div>
            <div className="bg-neutral-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < 5 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                  />
                ))}
              </div>
              <p className="text-gray-700 italic mb-6">"Un testimonio más para completar la visualización de esta sección."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-lg font-semibold text-gray-700">T</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Tercer Cliente</h4>
                  <p className="text-sm text-gray-600">Cliente desde 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de feed de Instagram */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-sm uppercase tracking-wider text-blue-600 font-semibold mb-2">
              #FraganciasLeFrance
            </h2>
            <h3 className="text-3xl font-light text-gray-900">
              Síguenos en <span className="font-bold">Instagram</span>
            </h3>
          </div>

          {/* Feed de Instagram (imágenes de ejemplo) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {[...Array(6)].map((_, index) => (
              <a
                key={index}
                href="#"
                className="group block aspect-square overflow-hidden rounded-lg relative"
              >
                <img
                  src={`/api/placeholder/300/300?text=Instagram+${index + 1}`}  // Usar URLs de imágenes reales de Instagram
                  alt={`Publicación de Instagram ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/30 flex items-center justify-center transition-all duration-300">
                  <Instagram
                    size={24}
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </a>
            ))}
          </div>

          {/* Enlace a Instagram */}
          <div className="flex justify-center mt-8">
            <a
              href="https://instagram.com"  // Reemplazar con URL real de Instagram
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 font-medium hover:text-blue-800"
            >
              Ver más en Instagram <ArrowRight size={16} className="ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* Pie de página */}
      <footer className="bg-gray-900 text-gray-400">
        {/* Contenido principal del pie de página */}
        <div className="max-w-7xl mx-auto pt-16 pb-8 px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
            {/* Sección de logo y descripción */}
            <div className="md:col-span-1">
              <div className="bg-gray-800 px-4 py-2 rounded inline-block mb-6">
                <Logo />
              </div>
              <p className="mb-6">
                Tu destino para descubrir fragancias exquisitas que despiertan emociones y evocan recuerdos inolvidables.
              </p>
              {/* Enlaces a redes sociales */}
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter size={20} />
                </a>
              </div>
            </div>

            {/* Sección de enlaces rápidos */}
            <div>
              <h4 className="text-white font-medium mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">Inicio</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Catálogo</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Novedades</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Ofertas</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sobre Nosotros</a></li>
              </ul>
            </div>

            {/* Sección de categorías */}
            <div>
              <h4 className="text-white font-medium mb-4">Categorías</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">Para Ella</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Para Él</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Colección Lujo</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Estuches de Regalo</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Ediciones Limitadas</a></li>
              </ul>
            </div>

            {/* Sección de información de contacto */}
            <div>
              <h4 className="text-white font-medium mb-4">Contacto</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <MapPin size={18} className="mr-2 mt-0.5 flex-shrink-0" />
                  <span>Ciudad Autónoma de Buenos Aires, Argentina</span>
                </li>
                <li className="flex items-center">
                  <Phone size={18} className="mr-2 flex-shrink-0" />
                  <span>+54 11 1234 5678</span>
                </li>
                <li className="flex items-center">
                  <Mail size={18} className="mr-2 flex-shrink-0" />
                  <span>contacto@fraganciaslefrance.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Derechos de autor y enlaces legales */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm mb-4 md:mb-0">
                © {new Date().getFullYear()} Fragancias Le France. Todos los derechos reservados.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a>
                <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
                <a href="#" className="hover:text-white transition-colors">Política de Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;