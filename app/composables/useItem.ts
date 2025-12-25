import type { Item } from "../interfaces";

export const getItemAll = () => {
	const config = useRuntimeConfig()

	const { data, pending, error, refresh } = useFetch<Item[]>(
		`${config.public.ecMockApiUrl}/item`,
		{
			default: () => []
		}
	)

	return {
		items: data as Ref<Item[]>,
		error,
		pending
	}
}