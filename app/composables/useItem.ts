import type { Item } from "../interfaces";

//全商品取得
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

//idをもとに一つの商品を取得
export const getSingleItem = (id: string) => {
	const config = useRuntimeConfig()
	const { data, pending, error, refresh } = useFetch<Item>(`${config.public.ecMockApiUrl}/item/${id}`)
	return {
		item: data as Ref<Item>,
		error,
		pending
	}
}