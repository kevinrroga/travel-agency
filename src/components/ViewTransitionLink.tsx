import type { MouseEvent, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type ViewTransitionLinkProps = {
  to: string;
  className?: string;
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  "aria-label"?: string;
};

const supportsViewTransitions = () =>
  typeof document !== "undefined" &&
  typeof (document as unknown as { startViewTransition?: unknown })
    .startViewTransition === "function";

const ViewTransitionLink = ({
  to,
  className,
  children,
  onClick,
  ...rest
}: ViewTransitionLinkProps) => {
  const navigate = useNavigate();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    // Let the browser handle new-tab, downloads, etc.
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return;
    }

    event.preventDefault();

    const doNavigate = () => navigate(to);

    if (supportsViewTransitions()) {
      (
        document as unknown as {
          startViewTransition: (cb: () => void) => unknown;
        }
      ).startViewTransition(() => {
        doNavigate();
      });
      return;
    }

    doNavigate();
  };

  return (
    <a href={to} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};

export default ViewTransitionLink;
