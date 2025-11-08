import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Plus, MessageSquare } from "lucide-react";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { AIChatBox, Message } from "@/components/AIChatBox";

export default function Home() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingChat, setIsLoadingChat] = useState(false);

  // tRPC queries and mutations
  const listConversations = trpc.ai.listConversations.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const createConvMutation = trpc.ai.createConversation.useMutation({
    onSuccess: (conv) => {
      setSelectedConversation(conv.id);
      setConversations((prev) => [conv, ...prev]);
    },
  });

  const getMessagesMutation = trpc.ai.getMessages.useQuery(
    { conversationId: selectedConversation! },
    { enabled: selectedConversation !== null }
  );

  const sendMessageMutation = trpc.ai.sendMessage.useMutation({
    onSuccess: (response) => {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: response.userMessage },
        { role: "assistant", content: response.aiMessage },
      ]);
      setIsLoadingChat(false);
    },
    onError: () => {
      setIsLoadingChat(false);
    },
  });

  // Update conversations when list loads
  useEffect(() => {
    if (listConversations.data) {
      setConversations(listConversations.data);
    }
  }, [listConversations.data]);

  // Update messages when selected conversation changes
  useEffect(() => {
    if (getMessagesMutation.data) {
      setMessages(
        getMessagesMutation.data.map((msg) => ({
          role: msg.role as "user" | "assistant",
          content: msg.content,
        }))
      );
    }
  }, [getMessagesMutation.data]);

  // Handle new conversation
  const handleNewConversation = () => {
    createConvMutation.mutate({});
  };

  // Handle send message
  const handleSendMessage = (content: string) => {
    if (!selectedConversation) return;
    setIsLoadingChat(true);
    setMessages((prev) => [...prev, { role: "user", content }]);
    sendMessageMutation.mutate({
      conversationId: selectedConversation,
      message: content,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="mb-6">
            {APP_LOGO && <img src={APP_LOGO} alt={APP_TITLE} className="w-16 h-16 mx-auto mb-4" />}
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{APP_TITLE}</h1>
            <p className="text-lg text-gray-600">
              Converse com uma inteligência artificial inteligente e amigável
            </p>
          </div>

          <Card className="p-8 mb-6 shadow-lg">
            <p className="text-gray-700 mb-6">
              Faça login para começar a conversar com a IA. Você pode fazer perguntas, pedir ajuda
              com tarefas e muito mais!
            </p>
            <Button
              onClick={() => (window.location.href = getLoginUrl())}
              size="lg"
              className="w-full"
            >
              Fazer Login
            </Button>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="p-4 bg-white rounded-lg shadow">
              <MessageSquare className="w-6 h-6 text-blue-600 mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Conversas Naturais</h3>
              <p className="text-sm text-gray-600">Converse de forma natural em português</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <Plus className="w-6 h-6 text-blue-600 mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Múltiplas Conversas</h3>
              <p className="text-sm text-gray-600">Crie várias conversas independentes</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <Loader2 className="w-6 h-6 text-blue-600 mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Respostas Rápidas</h3>
              <p className="text-sm text-gray-600">Obtenha respostas inteligentes em segundos</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <Button onClick={handleNewConversation} className="w-full" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Nova Conversa
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedConversation === conv.id
                    ? "bg-blue-100 text-blue-900"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <p className="font-medium truncate">{conv.title}</p>
                <p className="text-xs text-gray-500">
                  {new Date(conv.updatedAt).toLocaleDateString("pt-BR")}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-medium text-gray-900">{user?.name || "Usuário"}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
          <Button onClick={logout} variant="outline" size="sm" className="w-full">
            Sair
          </Button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="flex-1 flex items-center justify-center">
              <AIChatBox
                messages={messages}
                onSendMessage={handleSendMessage}
                isLoading={isLoadingChat}
                placeholder="Digite sua mensagem aqui..."
                height="100%"
                className="w-full"
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <MessageSquare className="w-16 h-16 text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Nenhuma conversa selecionada</h2>
            <p className="text-gray-600 mb-6">
              Selecione uma conversa da lista ou crie uma nova para começar
            </p>
            <Button onClick={handleNewConversation} size="lg">
              <Plus className="w-4 h-4 mr-2" />
              Criar Nova Conversa
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
