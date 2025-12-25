interface Category {
	name: string,
	slug: string
}

export const getCategories = () => {
  const config = useRuntimeConfig()

  const { data, pending, error, refresh } = useFetch<Category[]>(
    `${config.public.ecMockApiUrl}/category`,
		{
      default: () => [],
    }
  )

  return {
    categories: data as Ref<Category[]>,
    pending,
    error,
    refresh,
  }
}
