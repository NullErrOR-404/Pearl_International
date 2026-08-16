import { SearchX } from "lucide-react"
import { Button } from "./Button"
import Link from "next/link"

interface EmptyStateProps {
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
}

export function EmptyState({ title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center border-2 border-dashed border-brand-navy/10 rounded-2xl bg-brand-navy/5">
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
        <SearchX className="w-8 h-8 text-brand-navy/40" aria-hidden="true" />
      </div>
      <h3 className="font-serif text-2xl text-brand-navy mb-2">{title}</h3>
      <p className="text-brand-charcoal/60 font-sans max-w-md mb-8">{description}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button variant="outline">{actionLabel}</Button>
        </Link>
      )}
    </div>
  )
}
