import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createLead } from "@/lib/leads.server";

type ReservaDialogProps = {
  carro: string | null;
  onOpenChange: (open: boolean) => void;
  whatsNumber: string; // dígitos do WhatsApp, ex: "5573999989200"
};

export function ReservaDialog({ carro, onOpenChange, whatsNumber }: ReservaDialogProps) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [enviando, setEnviando] = useState(false);

  function limpar() {
    setNome("");
    setTelefone("");
    setDataInicio("");
    setDataFim("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!carro) return;
    setEnviando(true);

    // Salvar o lead nunca deve travar o fluxo de reserva: se der erro
    // (ex: banco ainda não configurado), o cliente ainda vai pro WhatsApp.
    try {
      await createLead({
        data: { carro, nome, telefone, dataInicio, dataFim },
      });
    } catch (err) {
      console.error("Não foi possível salvar o lead:", err);
    }

    const linhas = [
      `Olá! Quero reservar o ${carro}.`,
      `Nome: ${nome}`,
      `Telefone: ${telefone}`,
      dataInicio || dataFim ? `Datas: ${dataInicio || "?"} a ${dataFim || "?"}` : null,
    ].filter(Boolean);
    const texto = encodeURIComponent(linhas.join("\n"));
    window.open(`https://wa.me/${whatsNumber}?text=${texto}`, "_blank");

    setEnviando(false);
    limpar();
    onOpenChange(false);
  }

  return (
    <Dialog open={!!carro} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reservar {carro}</DialogTitle>
          <DialogDescription>
            Preencha seus dados e a conversa já abre pronta no WhatsApp.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="reserva-nome">Nome</Label>
            <Input
              id="reserva-nome"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="reserva-telefone">Telefone</Label>
            <Input
              id="reserva-telefone"
              required
              placeholder="(73) 9XXXX-XXXX"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="reserva-inicio">Retirada</Label>
              <Input
                id="reserva-inicio"
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="reserva-fim">Devolução</Label>
              <Input
                id="reserva-fim"
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={enviando}>
            {enviando ? "Enviando..." : "Continuar no WhatsApp"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
