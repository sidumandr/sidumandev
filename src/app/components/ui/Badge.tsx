export function Badge({children}:{children:string}) {
  return <span style={{display:"inline-block",background:"var(--yellow)",color:"var(--on-yellow)",border:"1px solid var(--yellow-edge)",borderRadius:"var(--radius-sm)",padding:"1px 6px",font:"500 11px/18px var(--font-mono), monospace",whiteSpace:"nowrap"}}><span aria-hidden="true">* </span>{children}</span>;
}
