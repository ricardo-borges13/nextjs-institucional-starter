
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Validação de rotas com TypeScript
  typedRoutes: true,

  // Otimização automática de componentes React
  reactCompiler: true,

  // Remove o cabeçalho X-Powered-By
  poweredByHeader: false,

  // Acesso ao ambiente de desenvolvimento pela rede local
  allowedDevOrigins: ["192.168.1.*"],
};

export default nextConfig;
