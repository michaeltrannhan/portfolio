import { cn } from "@/lib/utils";
import type { Social } from "@/lib/site";

type SocialLinkProps = {
  social: Social;
  className?: string;
  iconClassName?: string;
  iconStrokeWidth?: number;
};

/** Anchor for a social link; owns the external target/rel rule once. */
export function SocialLink({
  social,
  className,
  iconClassName,
  iconStrokeWidth,
}: SocialLinkProps) {
  const Icon = social.icon;
  const external = social.href.startsWith("http");

  return (
    <a
      href={social.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={social.name}
      className={className}
    >
      <Icon className={cn(iconClassName)} strokeWidth={iconStrokeWidth} />
    </a>
  );
}
