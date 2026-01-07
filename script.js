const gOld = document.getElementById("gOld");
const geralOld = document.getElementById("geralOld");
const resultado = document.getElementById("resultado");

geralOld.oninput = () => gOld.innerText = geralOld.value;

// ================= UTIL =================
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(v) {
  return Math.max(0, Math.min(200, v));
}

function getArmasSelecionadas() {
  const armas = [];
  document.querySelectorAll(".armas input:checked")
    .forEach(a => armas.push(a.value));
  return armas;
}

// ================= AJUSTES =================
function ajustePorVersao(base) {
  const v = document.getElementById("versaoFF").value;
  if (v === "MAX") return base - 10;
  if (v === "AMAZON") return base - 5;
  return base;
}

function ajustePorMarca(base) {
  const m = document.getElementById("marca").value;
  if (m === "Xiaomi") return base + 8;
  if (m === "Samsung") return base + 5;
  if (m === "Motorola") return base + 3;
  if (m === "iPhone") return base - 12;
  return base;
}

function ajustePorArma(base) {
  let ajuste = 0;
  getArmasSelecionadas().forEach(a => {
    if (a === "SMG") ajuste += 6;
    if (a === "AR") ajuste += 3;
    if (a === "SHOTGUN") ajuste -= 8;
    if (a === "SNIPER") ajuste -= 18;
    if (a === "DMR") ajuste -= 10;
  });
  return base + ajuste;
}

// ================= GERADOR 100% DO ZERO =================
function gerarDoZero() {
  let base = 90;

  base = ajustePorVersao(base);
  base = ajustePorMarca(base);
  base = ajustePorArma(base);

  if (document.getElementById("usarIA").checked) {
    base -= 6; // correção simulada de overshoot
  }

  const geral = clamp(base + rand(-8, 8));
  const red = clamp(geral + rand(6, 12));
  const mira2x = clamp(geral - rand(6, 10));
  const mira4x = clamp(geral - rand(16, 22));
  const awm = clamp(geral - rand(30, 40));

  resultado.value =
`🔥 SENSIBILIDADE 100% DO ZERO

Geral: ${geral}
Red Dot: ${red}
Mira 2x: ${mira2x}
Mira 4x: ${mira4x}
AWM: ${awm}

Versão: ${versaoFF.value}
Marca: ${marca.value}
Armas: ${getArmasSelecionadas().join(", ") || "Nenhuma"}
IA: ${usarIA.checked ? "ATIVA" : "DESATIVADA"}`;
}

// ================= GERADOR BASEADO NA ANTERIOR =================
function gerarDaAnterior() {
  let base = parseInt(geralOld.value);

  base = ajustePorVersao(base);
  base = ajustePorMarca(base);
  base = ajustePorArma(base);

  if (document.getElementById("usarIA").checked) {
    base -= 4;
  }

  const geral = clamp(base + rand(-6, 6));
  const red = clamp(geral + rand(4, 9));
  const mira2x = clamp(geral - rand(5, 8));
  const mira4x = clamp(geral - rand(12, 18));
  const awm = clamp(geral - rand(25, 35));

  resultado.value =
`🎯 SENS BASEADA NA ANTERIOR

Geral: ${geral}
Red Dot: ${red}
Mira 2x: ${mira2x}
Mira 4x: ${mira4x}
AWM: ${awm}

Sens Antiga: ${geralOld.value}
Armas: ${getArmasSelecionadas().join(", ") || "Nenhuma"}
IA: ${usarIA.checked ? "ATIVA" : "DESATIVADA"}`;
  }
