import { ReactNode } from "react";

interface EmbedFrameProps {
  url?: string;
  children?: ReactNode;
  className?: string;
}

export default function EmbedFrame({ url = "app.davidlarrimore.com", children, className = "" }: EmbedFrameProps) {
  return (
    <div className={`ds-embed-frame ${className}`}>
      <div className="ds-embed-chrome">
        <div className="ds-embed-dots">
          <span className="ds-embed-dot" />
          <span className="ds-embed-dot" />
          <span className="ds-embed-dot" />
        </div>
        <div className="ds-embed-url">{url}</div>
      </div>
      <div className="ds-embed-body">{children}</div>
    </div>
  );
}
