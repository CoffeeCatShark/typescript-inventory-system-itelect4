
import { useState } from "react";
import {
    sendChatMessage,
    type ChatMessage
} from "@/api/client";

export default function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);

    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            role: "model",
            content: "Hello! I'm your AI Inventory Assistant. How can I help you today?"
        }
    ]);

    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const message = input.trim();

        if (!message || isLoading) return;

        const history = [...messages];

        setMessages((previous) => [
            ...previous,
            { role: "user", content: message }
        ]);

        setInput("");
        setIsLoading(true);
        setError("");

        try {
            const result = await sendChatMessage(message, history);

            setMessages((previous) => [
                ...previous,
                {
                    role: "model",
                    content: result.response
                }
            ]);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong."
            );
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">

            {/* Floating Chat Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="rounded-full bg-blue-600 px-5 py-4 text-white shadow-lg hover:bg-blue-700"
                >
                    AI Assistant
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="flex h-[500px] w-[350px] flex-col overflow-hidden rounded-xl border bg-white shadow-xl">

                    {/* Header */}
                    <div className="flex items-center justify-between bg-blue-600 p-4 text-white">
                        <div>
                            <h2 className="font-semibold">
                                AI Inventory Assistant
                            </h2>
                            <p className="text-xs text-blue-100">
                                Powered by Gemini
                            </p>
                        </div>

                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-xl"
                        >
                            ×
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex flex-1 flex-col gap-3 overflow-y-auto bg-gray-50 p-4">

                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`max-w-[85%] whitespace-pre-wrap rounded-lg p-3 text-sm ${
                                    message.role === "user"
                                        ? "self-end bg-blue-600 text-white"
                                        : "self-start bg-white text-gray-800 shadow-sm"
                                }`}
                            >
                                {message.content}
                            </div>
                        ))}

                        {isLoading && (
                            <div className="self-start rounded-lg bg-white p-3 text-sm text-gray-500 shadow-sm">
                                Thinking...
                            </div>
                        )}

                        {error && (
                            <p className="text-sm text-red-600">
                                {error}
                            </p>
                        )}
                    </div>

                    {/* Message Input */}
                    <form
                        onSubmit={handleSubmit}
                        className="flex gap-2 border-t bg-white p-3"
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about your inventory..."
                            disabled={isLoading}
                            className="min-w-0 flex-1 rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500"
                        />

                        <button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            Send
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
