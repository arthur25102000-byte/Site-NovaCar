import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getLeads, updateLead, type Lead } from "@/lib/leads.server";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Nova Car" }] }),
  component: AdminPage,
});

const SENHA_KEY = "novacar_admin_password";
const STATUS_OPCOES = ["novo", "em_conversa", "fechou", "nao_fechou"] as const;
const STATUS_LABEL: Record<string, string> = {
  novo: "Novo",
  em_conversa: "Em conversa",
  fechou: "Fechou",
  nao_fechou: "Não fechou",
};

function formatarData(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("pt-BR");
}

function AdminPage() {
  const [senha, setSenha] = useState("");
  const [senhaOk, setSenhaOk] = useState<string | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function carregar(senhaTentativa: string) {
    setCarregando(true);
    setErro(null);
    try {
      const rows = await getLeads({ data: { password: senhaTentativa } });
      setLeads(rows);
      setSenhaOk(senhaTentativa);
      try {
        localStorage.setItem(SENHA_KEY, senhaTentativa);
      } catch {
        // ambiente sem localStorage (ex: preview privado) — sem problema
      }
    } catch {
      setErro("Senha inválida.");
      setSenhaOk(null);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    try {
      const salva = localStorage.getItem(SENHA_KEY);
      if (salva) carregar(salva);
    } catch {
      // ok, sem localStorage disponível
    }
  }, []);

  async function salvarLinha(lead: Lead) {
    if (!senhaOk) return;
    await updateLead({
      data: {
        password: senhaOk,
        id: lead.id,
        status: lead.status,
        valor: lead.valor ? Number(lead.valor) : null,
      },
    });
  }

  function atualizarCampo(id: number, campo: "status" | "valor", valor: string) {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, [campo]: valor } : l)));
  }

  if (!senhaOk) {
    return (
      <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-5">
        <h1 className="text-2xl font-semibold">Área administrativa</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            carregar(senha);
          }}
          className="mt-6 space-y-4"
        >
          <div className="space-y-1.5">
            <Label htmlFor="admin-senha">Senha</Label>
            <Input
              id="admin-senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoFocus
            />
          </div>
          {erro && <p className="text-sm text-destructive">{erro}</p>}
          <Button type="submit" className="w-full" disabled={carregando}>
            {carregando ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Leads — Nova Car</h1>
        <Button variant="outline" onClick={() => carregar(senhaOk)} disabled={carregando}>
          {carregando ? "Atualizando..." : "Atualizar"}
        </Button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Carro</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Datas</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Valor (R$)</TableHead>
              <TableHead>Comissão (10%)</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-muted-foreground">
                  Nenhum lead ainda.
                </TableCell>
              </TableRow>
            )}
            {leads.map((lead) => {
              const valorNum = lead.valor ? Number(lead.valor) : 0;
              return (
                <TableRow key={lead.id}>
                  <TableCell className="whitespace-nowrap">
                    {formatarData(lead.created_at)}
                  </TableCell>
                  <TableCell>{lead.carro}</TableCell>
                  <TableCell>{lead.nome}</TableCell>
                  <TableCell>{lead.telefone}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {formatarData(lead.data_inicio)} → {formatarData(lead.data_fim)}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={lead.status}
                      onValueChange={(v) => atualizarCampo(lead.id, "status", v)}
                    >
                      <SelectTrigger className="w-36">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUS_OPCOES.map((s) => (
                          <SelectItem key={s} value={s}>
                            {STATUS_LABEL[s]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      step="0.01"
                      className="w-28"
                      value={lead.valor ?? ""}
                      onChange={(e) => atualizarCampo(lead.id, "valor", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    {valorNum
                      ? (valorNum * 0.1).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })
                      : "—"}
                  </TableCell>
                  <TableCell>
                    <Button size="sm" onClick={() => salvarLinha(lead)}>
                      Salvar
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
