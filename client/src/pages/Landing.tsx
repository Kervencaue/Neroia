import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";
import { MessageCircle, Zap, Globe, Brain, ArrowRight } from "lucide-react";

export default function Landing() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={APP_LOGO} alt={APP_TITLE} className="w-10 h-10 rounded-lg" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {APP_TITLE}
            </span>
          </div>
          <div className="flex gap-4">
            {isAuthenticated ? (
              <Link href="/chat">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Ir para Chat
                </Button>
              </Link>
            ) : (
              <a href={getLoginUrl()}>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Começar Agora
                </Button>
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Converse com <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Aetheria</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Uma inteligência artificial conversacional que entende você, aprende com você e responde suas perguntas com informações atualizadas da internet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Link href="/chat">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg">
                  Abrir Chat <ArrowRight className="ml-2" />
                </Button>
              </Link>
            ) : (
              <a href={getLoginUrl()}>
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg">
                  Começar Gratuitamente <ArrowRight className="ml-2" />
                </Button>
              </a>
            )}
            <Button size="lg" variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400/10 px-8 py-6 text-lg">
              Saber Mais
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Por que escolher <span className="text-purple-400">Aetheria</span>?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <Card className="bg-slate-700/50 border-purple-500/30 hover:border-purple-500/60 transition p-6">
              <div className="mb-4 p-3 bg-purple-500/20 rounded-lg w-fit">
                <Brain className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">IA Inteligente</h3>
              <p className="text-gray-300">
                Powered por LLM avançado com compreensão profunda de linguagem natural.
              </p>
            </Card>

            {/* Feature 2 */}
            <Card className="bg-slate-700/50 border-purple-500/30 hover:border-purple-500/60 transition p-6">
              <div className="mb-4 p-3 bg-purple-500/20 rounded-lg w-fit">
                <Globe className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Busca na Internet</h3>
              <p className="text-gray-300">
                Acesso a informações atualizadas em tempo real para respostas precisas.
              </p>
            </Card>

            {/* Feature 3 */}
            <Card className="bg-slate-700/50 border-purple-500/30 hover:border-purple-500/60 transition p-6">
              <div className="mb-4 p-3 bg-purple-500/20 rounded-lg w-fit">
                <MessageCircle className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Conversas Naturais</h3>
              <p className="text-gray-300">
                Diálogos fluidos e contextualizados que mantêm o histórico de conversas.
              </p>
            </Card>

            {/* Feature 4 */}
            <Card className="bg-slate-700/50 border-purple-500/30 hover:border-purple-500/60 transition p-6">
              <div className="mb-4 p-3 bg-purple-500/20 rounded-lg w-fit">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Rápida e Confiável</h3>
              <p className="text-gray-300">
                Respostas instantâneas com alta taxa de acurácia e confiabilidade.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            O que os usuários dizem
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <Card className="bg-slate-700/50 border-purple-500/30 p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-300 mb-4">
                "Aetheria é incrivelmente útil! Sempre tem respostas precisas e atualizadas para minhas perguntas."
              </p>
              <p className="text-purple-400 font-semibold">João Silva</p>
              <p className="text-gray-400 text-sm">Desenvolvedor</p>
            </Card>

            {/* Testimonial 2 */}
            <Card className="bg-slate-700/50 border-purple-500/30 p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-300 mb-4">
                "A interface é intuitiva e a IA entende perfeitamente o contexto das minhas conversas."
              </p>
              <p className="text-purple-400 font-semibold">Maria Santos</p>
              <p className="text-gray-400 text-sm">Pesquisadora</p>
            </Card>

            {/* Testimonial 3 */}
            <Card className="bg-slate-700/50 border-purple-500/30 p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-300 mb-4">
                "Melhor assistente de IA que já usei. Rápido, confiável e sempre atualizado!"
              </p>
              <p className="text-purple-400 font-semibold">Carlos Oliveira</p>
              <p className="text-gray-400 text-sm">Empreendedor</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-t border-purple-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para conversar com Aetheria?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Comece agora gratuitamente. Sem cartão de crédito necessário.
          </p>
          {isAuthenticated ? (
            <Link href="/chat">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg">
                Abrir Chat Agora <ArrowRight className="ml-2" />
              </Button>
            </Link>
          ) : (
            <a href={getLoginUrl()}>
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg">
                Começar Gratuitamente <ArrowRight className="ml-2" />
              </Button>
            </a>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-purple-500/20 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">Neroia</h3>
              <p className="text-gray-400 text-sm">
                IA conversacional inteligente com busca na internet.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-purple-400">Features</a></li>
                <li><a href="#" className="hover:text-purple-400">Preços</a></li>
                <li><a href="#" className="hover:text-purple-400">Segurança</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-purple-400">Sobre</a></li>
                <li><a href="#" className="hover:text-purple-400">Blog</a></li>
                <li><a href="#" className="hover:text-purple-400">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-purple-400">Privacidade</a></li>
                <li><a href="#" className="hover:text-purple-400">Termos</a></li>
                <li><a href="#" className="hover:text-purple-400">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-purple-500/20 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Neroia. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
