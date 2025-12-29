<script lang="ts" setup>
interface variationsType {
  key: string;
  values: string;
}
type ImageValue = string | File | null;
definePageMeta({
  layout: "admin",
  middleware: ["admin-loggedin-check"],
});

const config = useRuntimeConfig();
const route = useRoute();
const { item, pending } = getSingleItem(route.params.id);

const itemInput = reactive({
  name: item.value?.data?.name,
  price: item.value?.data?.price,
  context: item.value?.data?.context,
  img1: item.value?.data?.img1,
  img2: item.value?.data?.img2,
  img3: item.value?.data?.img3,
  stock: item.value?.data?.stock,
  category: item.value?.data?.category,
  tag: item.value?.data?.tag,
  variations: item.value?.data?.variations,
});
// const pending = ref(false);
// const noServerError = ref(true);
// const errorMessage = ref<string | null>(null);
const { categories } = getCategories();
const { tags } = getTags();

// const onAddItemButtonClick = async (): Promise<void> => {
//   const config = useRuntimeConfig();

//   pending.value = true;
//   noServerError.value = true;

//   const variationsArray = [];

//   const formData = new FormData();
//   formData.append("name", itemInput.name);
//   formData.append("price", String(itemInput.price));
//   formData.append("context", itemInput.context);
//   formData.append("stock", String(itemInput.stock));
//   formData.append("category", itemInput.category);
//   itemInput.tag.forEach((tag) => {
//     formData.append("tag[]", tag);
//   });
//   const variationsPayload = itemInput.variations
//     .filter((v) => v.key.trim() !== "" && v.values.trim() !== "")
//     .map((v) => ({
//       key: v.key,
//       values: v.values.split(",").map((s) => s.trim()),
//     }));

//   formData.append("variations", JSON.stringify(variationsPayload));

//   if (itemInput.img1) formData.append("img1", itemInput.img1);
//   if (itemInput.img2) formData.append("img2", itemInput.img2);
//   if (itemInput.img3) formData.append("img3", itemInput.img3);

//   const asyncData = await useFetch(`${config.public.ecMockApiUrl}/item/`, {
//     method: "POST",
//     body: formData,
//   });

//   if (
//     (asyncData.error.value === null || asyncData.error.value === undefined) &&
//     asyncData.data.value != null
//   ) {
//     alert("商品の登録に成功しました。");
//   } else {
//     const errorCode = (asyncData?.error?.value?.data as any)?.errorCode;

//     switch (errorCode) {
//       case "UPLOAD_ERROR":
//         errorMessage.value = "画像アップロードに失敗しました。";
//         break;
//       case "FILE_SIZE_LIMIT":
//         errorMessage.value = "ファイルサイズが大きすぎます。（上限2MBまで）";
//         break;
//       case "INVALID_FILE_TYPE":
//         errorMessage.value =
//           "このファイル形式ではアップロードができません。（アップロード可能ファイル形式：jpeg・png・webp）";
//         break;
//       default:
//         errorMessage.value =
//           "サーバー処理中に障害が発生しました。もう一度登録を行ってください。";
//     }

//     pending.value = false;
//     noServerError.value = false;
//   }
// };

const onFileChange = (event: Event, key: "img1" | "img2" | "img3") => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    itemInput[key] = target.files[0]!;
  }
};

const imagePreview = (img: ImageValue) => {
  if (!img) return "";
  if (typeof img === "string") {
    return `${config.public.ecMockApiUrl}/uploads/items/${img}`;
  }
  return URL.createObjectURL(img);
};

// const onVariationsInput = (index: number) => {
//   const current = itemInput.variations[index];

//   if (current?.key.trim() !== "" && index === itemInput.variations.length - 1) {
//     itemInput.variations.push({ key: "", values: "" });
//   }
// };
</script>

<template>
  <h1>商品追加</h1>
  <!-- <p v-if="pending">登録中・・・</p>
  <template v-else> -->
  <!-- <p v-if="noServerError">商品情報を入力してください。</p>
    <p v-else>
      {{ errorMessage }}
    </p> -->
  <div class="form-wrap">
    <form>
      <table>
        <tbody>
          <tr>
            <th>商品名<span class="required">必須</span></th>
            <td>
              <input
                name="name"
                type="text"
                v-model="itemInput.name"
                required
              />
            </td>
          </tr>
          <tr>
            <th>金額<span class="required">必須</span></th>
            <td>
              <input
                name="price"
                type="number"
                v-model="itemInput.price"
                required
              />円
            </td>
          </tr>
          <tr>
            <th>商品紹介文</th>
            <td>
              <textarea
                name="context"
                id="context"
                v-model="itemInput.context"
              ></textarea>
            </td>
          </tr>
          <tr>
            <th>画像１<span class="required">必須</span></th>
            <td>
              <img v-if="itemInput.img1" :src="imagePreview(itemInput.img1)" />
              <input
                type="file"
                accept="image/*"
                name="img1"
                @change="onFileChange($event, 'img1')"
                required
              />
            </td>
          </tr>
          <tr>
            <th>画像２</th>
            <td>
              <img v-if="itemInput.img2" :src="imagePreview(itemInput.img2)" />
              <input
                type="file"
                accept="image/*"
                name="img2"
                @change="onFileChange($event, 'img2')"
              />
            </td>
          </tr>
          <tr>
            <th>画像３</th>
            <td>
              <img v-if="itemInput.img3" :src="imagePreview(itemInput.img3)" />
              <input
                type="file"
                accept="image/*"
                name="img3"
                @change="onFileChange($event, 'img3')"
              />
            </td>
          </tr>
          <tr>
            <th>在庫数<span class="required">必須</span></th>
            <td>
              <input
                type="number"
                name="stock"
                v-model="itemInput.stock"
                required
              />個
            </td>
          </tr>
          <tr>
            <th>カテゴリー</th>
            <td>
              <select
                name="category"
                id="category"
                v-model="itemInput.category"
              >
                <option value="">選択する</option>
                <option
                  v-for="category in categories.data"
                  :key="category.slug"
                  :value="category.name"
                >
                  {{ category.name }}
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <th>タグ</th>
            <td>
              <label v-for="tag in tags.data" :for="tag.slug" :key="tag.slug">
                <input
                  type="checkbox"
                  :name="tag.slug"
                  :id="tag.slug"
                  :value="tag.name"
                  v-model="itemInput.tag"
                />
                <span>{{ tag.name }}</span>
              </label>
            </td>
          </tr>
          <tr>
            <th>バリエーション</th>
            <td>
              <div
                v-for="(variation, index) in itemInput.variations"
                :key="index"
              >
                <span>バリエーション名：</span
                ><input
                  type="text"
                  :name="`variations_${index + 1}`"
                  @input="onVariationsInput(index)"
                  v-model="variation.key"
                />
                <span>バリエーション値：</span
                ><input
                  type="text"
                  :name="`variations_${index + 1}_values`"
                  v-model="variation.values"
                />
              </div>
              <p>※バリエーション値はカンマ区切りで入力してください</p>
            </td>
          </tr>
        </tbody>
      </table>
      <input type="submit" value="登録する" />
    </form>
  </div>
  <!-- </template> -->
</template>