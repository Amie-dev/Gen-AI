"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

type Answer = {
  summary: string;
  confidence: number;
};

function Page() {
  const [query, setQuery] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Request failed");
      }

      setQuery("");
      const { summary, confidence } = data.data as Answer;
      setAnswers(prev => [{ summary, confidence }, ...prev]);
    } catch (err) {
      console.error("Error fetching answer:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh w-full bg-zinc-50">
      <div className="mx-auto flex flex-col px-4 pb-24 min-h-dvh w-full max-w-2xl">
        <header className="py-6">
          <h1 className="text-2xl font-bold">Ask Any</h1>
        </header>

        {answers.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Answer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">No answer yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4 ">
            {answers.map((ans, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle>Answer {answers.length - idx}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-2">{ans.summary}</div>
                  <div className="text-sm text-gray-600">
                    Confidence: {(ans.confidence )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <form onSubmit={handleAsk} className="my-4 flex gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your question..."
            className="flex-1"
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Ask"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Page;
