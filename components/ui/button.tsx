import Link from "next/link";
import { clsx } from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  asChild?: boolean;
  href?: string;
};

const variants = {
  primary: "bg-primary text-white hover:bg-teal-800",
  secondary: "border border-border bg-white text-slate-900 hover:bg-slate-50",
  ghost: "text-slate-700 hover:bg-slate-100",
  danger: "bg-red-600 text-white hover:bg-red-700"
};

export function Button({ className, variant = "primary", asChild, href, children, ...props }: ButtonProps) {
  const classes = clsx(
    "inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    className
  );

  if (asChild && href) {
    return <Link href={href} className={classes}>{children}</Link>;
  }

  return <button className={classes} {...props}>{children}</button>;
}
