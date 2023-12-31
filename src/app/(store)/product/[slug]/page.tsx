import { AddToCartButton } from '@/components/AddToCartButton'
import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { Metadata } from 'next'
import Image from 'next/image'

interface ProductPageProps {
  params: {
    slug: string
  }
}

async function getProductBySlug(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })
  const product = await response.json()

  return product
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug)

  return {
    title: product.title,
  }
}

// generate this static page in the build
export async function generateStaticParams() {
  const response = await api('/products/featured')
  const products: Product[] = await response.json()

  // return [{ slug: 'sweatshirt-never-stop-learning' }]
  return products.map((product) => {
    return {
      slug: product.slug,
    }
  })
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug)

  return (
    <div className="relative grid max-h-[860px] grid-cols-3 =">
      <div className="col-span-2 overflow-hidden">
        <Image
          src={product.image}
          alt=""
          width={1000}
          height={1000}
          quality={100}
        />
      </div>
      <div className="flex flex-col justify-center px-12">
        <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>

        <p className="mt-2 leading-relaxed text-zinc-400">
          {product.description}
        </p>

        <div className="mt-8 flex items-center gap-3">
          <span className="inline-block px-5 py-2.5 font-semibold rounded-full bg-violet-500">
            {product.price.toLocaleString('en-US', {
              style: 'currency',
              currency: 'usd',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
          <span className="text-small text-zinc-400">
            In 12 interest-free installments of (
            {(product.price / 12).toLocaleString('en-US', {
              style: 'currency',
              currency: 'usd',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
            )
          </span>
        </div>

        <div className="mt-8 space-y-4">
          <span className="block font-semibold">Sizes</span>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              P
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              M
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              G
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              GG
            </button>
          </div>
        </div>

        <AddToCartButton productId={product.id} />
      </div>
    </div>
  )
}
