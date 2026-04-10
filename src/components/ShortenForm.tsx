"use client";

import { useState } from "react";
import { Link2, Zap, Copy, Check, Loader2 } from "lucide-react";

export default function ShortenForm() {
  const [url, setUrl] = useState("");
  const [shortened, setShortened] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Error al acortar la URL.");
        return;
      }

      // Construir la URL completa
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
      const fullShortUrl = `${baseUrl}/${data.shortUrl}`;
      setShortened(fullShortUrl);
    } catch (error) {
      console.error("Error shortening URL:", error);
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortened);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className=" w-full max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <form onSubmit={handleSubmit} className=" relative group">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 rounded-2xl glass-panel border-border-gray focus-within:border-brand-green/50 transition-all duration-300">
          <div className="flex items-center gap-2 flex-1">
            <div className="pl-4 text-zinc-300">
              <Link2 size={20} />
            </div>
            <input
              type="url"
              placeholder="Pega tu URL aquí..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="flex-1 bg-transparent py-4 px-2 outline-none text-white placeholder:text-zinc-600"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-white text-black font-semibold hover:bg-zinc-300 disabled:opacity-50 transition-all duration-200 active:scale-95 w-full sm:w-auto"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <Zap size={18} fill="currentColor" />
                Acortar
              </>
            )}
          </button>
        </div>
      </form>

      {error && (
        <p className="text-red-400 text-sm text-center animate-in fade-in duration-300">
          {error}
        </p>
      )}
      {shortened && (
        <div className="flex items-center justify-between p-4 rounded-2xl bg-brand-green/10 border border-brand-green/20 animate-in zoom-in-95 duration-300">
          <div className="flex-1 truncate pr-4 text-brand-green font-medium">
            {shortened}
          </div>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-green/20 text-brand-green hover:bg-brand-green/30 transition-colors"
          >
            {copied ? (
              <>
                <Check size={16} />
                <span>Copiado</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
