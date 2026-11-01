import fs from "fs";
import path from "path";

const ICONS_FOLDER = "frontend/src/assets/icons/";

function cleanSvg(svg) {
    // Remove XML e DOCTYPE
    svg = svg.replace(/<\?xml[\s\S]*?\?>/g, "");
    svg = svg.replace(/<!DOCTYPE[\s\S]*?>/g, "");

    // Remove atributos desnecessários do Affinity/Illustrator
    svg = svg.replace(/\s+xmlns:serif="[^"]*"/g, "");
    svg = svg.replace(/\s+serif:id="[^"]*"/g, "");
    svg = svg.replace(/\s+xml:space="[^"]*"/g, "");
    svg = svg.replace(/\s+xmlns:xlink="[^"]*"/g, "");

    // Remove grupos vazios
    svg = svg.replace(/<g[^>]*>\s*<\/g>/g, "");

    // Remove o rect invisível
    svg = svg.replace(/<rect[^>]*fill:none;?[^>]*\/>/g, "");

    // Converte stroke-width em style para atributo
    svg = svg.replace(
        /style="([^"]*?)stroke-width:([\d.]+)px;?([^"]*?)"/g,
        (_, before, width, after) => {
            let style = `${before}${after}`
                .replace(/;;+/g, ";")
                .replace(/^;/, "")
                .replace(/;$/, "");

            if (style.trim()) {
                return `style="${style}" stroke-width="2"`;
            }

            return `stroke-width="1"`;
        }
    );

    // Qualquer stroke-width existente passa para 2
    svg = svg.replace(
        /stroke-width="[\d.]+"/g,
        'stroke-width="1"'
    );

    // currentColor
    svg = svg.replace(/stroke:#?[0-9A-Fa-f]{3,6}/g, "stroke:currentColor");

    return svg;
}

function processFile(filePath) {
    const svg = fs.readFileSync(filePath, "utf8");
    fs.writeFileSync(filePath, cleanSvg(svg));
    console.log(`${filePath}`);
}

function walk(folder) {
    const files = fs.readdirSync(folder);

    for (const file of files) {
        const filePath = path.join(folder, file);

        if (fs.statSync(filePath).isDirectory()) {
            walk(filePath);
            continue;
        }

        if (file.endsWith(".svg")) processFile(filePath);        
    }
}

function resolveIconPath(arg) {
    // 1. Caminho direto (relativo ao cwd ou absoluto)
    // 2. Relativo à pasta de ícones
    // 3. Só o nome, com ou sem extensão .svg
    const candidates = [
        arg,
        path.join(ICONS_FOLDER, arg),
        path.join(ICONS_FOLDER, arg.endsWith(".svg") ? arg : `${arg}.svg`),
    ];

    return candidates.find(
        (p) => fs.existsSync(p) && fs.statSync(p).isFile()
    );
}

function main() {
    const arg = process.argv[2];

    // Sem argumentos: processa a pasta toda
    if (!arg) {
        walk(ICONS_FOLDER);
        return;
    }

    const iconPath = resolveIconPath(arg);

    if (!iconPath) {
        console.error(`Ícone não encontrado: "${arg}"`);
        process.exit(1);
    }

    if (!iconPath.endsWith(".svg")) {
        console.error(`O ficheiro não é um SVG: "${iconPath}"`);
        process.exit(1);
    }

    processFile(iconPath);
}

main();