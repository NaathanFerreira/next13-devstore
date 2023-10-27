import data from '../data.json'

export async function GET() {
  // 2 seconds delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const featuredProducts = data.products.filter((product) => product.featured)

  return Response.json(featuredProducts)
}
