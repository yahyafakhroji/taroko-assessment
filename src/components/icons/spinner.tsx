export default function IconSpinner({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 50 50" {...props}>
      <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
    </svg>
  );
}
