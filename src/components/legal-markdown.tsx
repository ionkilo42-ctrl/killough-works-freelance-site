import Link from "next/link";
import type { ReactNode } from "react";

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let index = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(
        <strong key={`${keyPrefix}-strong-${index}`}>{token.slice(2, -2)}</strong>,
      );
    } else {
      const linkMatch = /\[([^\]]+)\]\(([^)]+)\)/.exec(token);
      if (linkMatch) {
        const [, label, href] = linkMatch;
        if (href.startsWith("/")) {
          nodes.push(
            <Link key={`${keyPrefix}-link-${index}`} href={href} className="text-link">
              {label}
            </Link>,
          );
        } else {
          nodes.push(
            <a
              key={`${keyPrefix}-link-${index}`}
              href={href}
              className="text-link"
              target="_blank"
              rel="noreferrer"
            >
              {label}
            </a>,
          );
        }
      }
    }

    lastIndex = match.index + token.length;
    index += 1;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length ? nodes : [text];
}

function MarkdownTable({ lines }: { lines: string[] }) {
  const rows = lines
    .filter((line) => line.trim().startsWith("|"))
    .map((line) =>
      line
        .trim()
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((cell) => cell.trim()),
    );

  if (rows.length < 2) {
    return null;
  }

  const [header, , ...body] = rows;

  return (
    <div className="legal-table-wrap">
      <table className="legal-table">
        <thead>
          <tr>
            {header.map((cell) => (
              <th key={cell}>{renderInline(cell, "th")}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td key={`cell-${rowIndex}-${cellIndex}`}>{renderInline(cell, `td-${rowIndex}`)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function LegalMarkdown({ content }: { content: string }) {
  const lines = content.split("\n");
  const blocks: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (line.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (index < lines.length && lines[index].startsWith("> ")) {
        quoteLines.push(lines[index].slice(2));
        index += 1;
      }
      blocks.push(
        <blockquote key={`quote-${index}`} className="legal-quote">
          {quoteLines.map((quoteLine) => (
            <p key={quoteLine}>{renderInline(quoteLine, `quote-${index}`)}</p>
          ))}
        </blockquote>,
      );
      continue;
    }

    if (line.trim() === "---") {
      blocks.push(<hr key={`hr-${index}`} className="legal-divider" />);
      index += 1;
      continue;
    }

    if (line.startsWith("# ")) {
      blocks.push(
        <h1 key={`h1-${index}`} className="legal-h1">
          {line.slice(2)}
        </h1>,
      );
      index += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push(
        <h2 key={`h2-${index}`} className="legal-h2">
          {line.slice(3)}
        </h2>,
      );
      index += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push(
        <h3 key={`h3-${index}`} className="legal-h3">
          {line.slice(4)}
        </h3>,
      );
      index += 1;
      continue;
    }

    if (line.trim().startsWith("|")) {
      const tableLines: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        tableLines.push(lines[index]);
        index += 1;
      }
      blocks.push(<MarkdownTable key={`table-${index}`} lines={tableLines} />);
      continue;
    }

    if (/^[-*] /.test(line.trim())) {
      const items: string[] = [];
      while (index < lines.length && /^[-*] /.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^[-*] /, ""));
        index += 1;
      }
      blocks.push(
        <ul key={`ul-${index}`} className="legal-list">
          {items.map((item) => (
            <li key={item}>{renderInline(item, `li-${index}`)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    const paragraphLines: string[] = [];
    while (
      index < lines.length &&
      lines[index].trim() &&
      !lines[index].startsWith("#") &&
      !lines[index].startsWith("> ") &&
      !lines[index].trim().startsWith("|") &&
      lines[index].trim() !== "---" &&
      !/^[-*] /.test(lines[index].trim())
    ) {
      paragraphLines.push(lines[index]);
      index += 1;
    }

    blocks.push(
      <p key={`p-${index}`} className="legal-paragraph">
        {renderInline(paragraphLines.join(" "), `p-${index}`)}
      </p>,
    );
  }

  return <div className="legal-markdown">{blocks}</div>;
}