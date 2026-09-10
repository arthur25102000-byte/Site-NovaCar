import { createServerFn } from "@tanstack/react-start";
import { neon } from "@neondatabase/serverless";
import { z } from "zod";

// A conexão com o banco (Neon/Postgres) vem da env DATABASE_URL, injetada
// automaticamente pela integração de Storage do Vercel.
function db() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL não configurada. Conecte um banco Postgres (Neon) na aba Storage do projeto no Vercel.",
    );
  }
  return neon(url);
}

let schemaReady: Promise<unknown> | null = null;

function ensureSchema() {
  if (!schemaReady) {
    schemaReady = db()`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        carro TEXT NOT NULL,
        nome TEXT NOT NULL,
        telefone TEXT NOT NULL,
        data_inicio DATE,
        data_fim DATE,
        status TEXT NOT NULL DEFAULT 'novo',
        valor NUMERIC,
        origem TEXT NOT NULL DEFAULT 'site'
      )
    `;
  }
  return schemaReady;
}

const leadInput = z.object({
  carro: z.string().min(1),
  nome: z.string().min(1),
  telefone: z.string().min(1),
  dataInicio: z.string().optional(),
  dataFim: z.string().optional(),
});

export const createLead = createServerFn({ method: "POST" })
  .validator((data: unknown) => leadInput.parse(data))
  .handler(async ({ data }) => {
    await ensureSchema();
    await db()`
      INSERT INTO leads (carro, nome, telefone, data_inicio, data_fim)
      VALUES (${data.carro}, ${data.nome}, ${data.telefone}, ${data.dataInicio || null}, ${data.dataFim || null})
    `;
    return { ok: true };
  });

function checkAdmin(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || password !== expected) {
    throw new Error("Senha inválida.");
  }
}

const withPassword = z.object({ password: z.string().min(1) });

export type Lead = {
  id: number;
  created_at: string;
  carro: string;
  nome: string;
  telefone: string;
  data_inicio: string | null;
  data_fim: string | null;
  status: string;
  valor: string | null;
  origem: string;
};

export const getLeads = createServerFn({ method: "POST" })
  .validator((data: unknown) => withPassword.parse(data))
  .handler(async ({ data }): Promise<Lead[]> => {
    checkAdmin(data.password);
    await ensureSchema();
    const rows = await db()`SELECT * FROM leads ORDER BY created_at DESC`;
    return rows as Lead[];
  });

const updateInput = withPassword.extend({
  id: z.number(),
  status: z.string().min(1),
  valor: z.number().nullable(),
});

export const updateLead = createServerFn({ method: "POST" })
  .validator((data: unknown) => updateInput.parse(data))
  .handler(async ({ data }) => {
    checkAdmin(data.password);
    await ensureSchema();
    await db()`
      UPDATE leads SET status = ${data.status}, valor = ${data.valor}
      WHERE id = ${data.id}
    `;
    return { ok: true };
  });
