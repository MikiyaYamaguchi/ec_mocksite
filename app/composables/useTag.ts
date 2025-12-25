interface Tag {
	name: string,
	slug: string
}

export const getTags = () => {
	const config = useRuntimeConfig()

	const { data, pending, error, refresh } = useFetch<Tag[]>(
		`${config.public.ecMockApiUrl}/tag`,
		{
      default: () => [],
    }
	)

	return {
		tags: data as Ref<Tag[]>,
		pending,
		error,
		refresh
	}
}