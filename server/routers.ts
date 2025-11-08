import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createConversation,
  getConversationsByUserId,
  getConversationById,
  addMessage,
  getMessagesByConversationId,
} from "./db";
import { invokeLLM } from "./_core/llm";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  ai: router({
    // Create a new conversation
    createConversation: publicProcedure
      .input(z.object({ title: z.string().optional() }))
      .mutation(async ({ ctx, input }) => {
        if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });
        return await createConversation(ctx.user.id, input.title);
      }),

    // Get all conversations for the current user
    listConversations: publicProcedure.query(async ({ ctx }) => {
      if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });
      return await getConversationsByUserId(ctx.user.id);
    }),

    // Get messages from a conversation
    getMessages: publicProcedure
      .input(z.object({ conversationId: z.number() }))
      .query(async ({ ctx, input }) => {
        if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });
        const conv = await getConversationById(input.conversationId);
        if (!conv || conv.userId !== ctx.user.id) {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await getMessagesByConversationId(input.conversationId);
      }),

    // Send a message and get AI response
    sendMessage: publicProcedure
      .input(
        z.object({
          conversationId: z.number(),
          message: z.string().min(1),
        })
      )
      .mutation(async ({ ctx, input }) => {
        if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });

        // Verify conversation ownership
        const conv = await getConversationById(input.conversationId);
        if (!conv || conv.userId !== ctx.user.id) {
          throw new TRPCError({ code: "FORBIDDEN" });
        }

        // Save user message
        await addMessage(input.conversationId, "user", input.message);

        // Get conversation history for context
        const history = await getMessagesByConversationId(input.conversationId);

        // Prepare messages for LLM
        const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
          {
            role: "system",
            content:
              "Você é um assistente de IA inteligente e amigável. Responda em português de forma clara e concisa. Ajude o usuário com suas dúvidas e tarefas.",
          },
          ...history.map((msg: any) => ({
            role: (msg.role === "user" ? "user" : "assistant") as "user" | "assistant",
            content: msg.content,
          })),
        ];

        // Get AI response
        const response = await invokeLLM({ messages });
        const aiMessage = typeof response.choices[0].message.content === 'string'
          ? response.choices[0].message.content
          : "Desculpe, não consegui gerar uma resposta.";

        // Save AI response
        await addMessage(input.conversationId, "assistant", aiMessage);

        return {
          userMessage: input.message,
          aiMessage,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
