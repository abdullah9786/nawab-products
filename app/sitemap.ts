import { MetadataRoute } from 'next'

// In production, these would come from the database
const products = [
  { slug: 'kashmiri-saffron', updatedAt: new Date() },
  { slug: 'afghan-mamra-almonds', updatedAt: new Date() },
  { slug: 'royal-garam-masala', updatedAt: new Date() },
  { slug: 'iranian-pistachios', updatedAt: new Date() },
  { slug: 'wild-forest-honey', updatedAt: new Date() },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nawabkhana.com'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Product pages
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticPages, ...productPages]
}

