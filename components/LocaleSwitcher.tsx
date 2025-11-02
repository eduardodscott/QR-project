'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'

export default function LocaleSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: string) => {
    // Remove current locale from pathname
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, '')
    // Add new locale
    const newPath = `/${newLocale}${pathnameWithoutLocale}`
    router.push(newPath)
  }

  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={() => switchLocale('en')}
        className={`px-3 py-1 rounded text-sm ${
          locale === 'en'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => switchLocale('es')}
        className={`px-3 py-1 rounded text-sm ${
          locale === 'es'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        ES
      </button>
    </div>
  )
}

