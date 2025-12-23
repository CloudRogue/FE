import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const FORCE = process.env.POSTINSTALL_FORCE === "1"; // 1이면 기존 파일 덮어씀
const DRY_RUN = process.env.POSTINSTALL_DRY_RUN === "1"; // 1이면 실제 생성 안 하고 로그만
const USE_SRC =
  process.env.NEXT_USE_SRC === "1" || (await exists(path.join(ROOT, "src")));

const SRC_ROOT = USE_SRC ? "src" : ".";

const DIRS = [
  joinp(SRC_ROOT, "_pages"),
  joinp(SRC_ROOT, "widgets"),
  joinp(SRC_ROOT, "features"),
  joinp(SRC_ROOT, "entities"),
  joinp(SRC_ROOT, "shared", "api"),
  joinp(SRC_ROOT, "shared", "ui"),
  joinp(SRC_ROOT, "shared", "lib"),
  joinp(SRC_ROOT, "shared", "config"),
  joinp(SRC_ROOT, "shared", "constants"),
];

await main().catch((err) => {
  console.error("[postinstall] failed:", err);
  process.exitCode = 1;
});

async function main() {
  const pkgJson = path.join(ROOT, "package.json");
  if (!(await exists(pkgJson))) {
    console.warn("[postinstall] package.json not found. skip.");
    return;
  }

  console.log(
    `[postinstall] root=${ROOT} srcRoot=${SRC_ROOT} force=${FORCE} dryRun=${DRY_RUN}`,
  );

  for (const d of DIRS) await ensureDir(path.join(ROOT, d));

  console.log("[postinstall] done");
}

function joinp(...parts) {
  return parts.join(path.posix.sep);
}

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function ensureDir(dirPath) {
  if (DRY_RUN) return void console.log("[dry] mkdir -p", rel(dirPath));
  await fs.mkdir(dirPath, { recursive: true });
}

function rel(p) {
  return path.relative(ROOT, p) || ".";
}
