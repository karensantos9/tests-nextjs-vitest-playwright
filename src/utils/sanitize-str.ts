import { getFullEnv } from "@/env/configs";

export function sanitizeStr(s: string): string {
  return !s || typeof s !== 'string' ? '' : s.trim().normalize();
  // se a string estiver vazia ou não for do tipo string - return string vazia
  // else tiver valor e for string - return string faz trim(limpa as pontas esquesda e direita) e normaliza os caracteres
}

const env = getFullEnv()
console.log(env)