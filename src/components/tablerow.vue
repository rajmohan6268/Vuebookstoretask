<template>
  <tr class="text-center divide-x">
    <!-- <th class="w-4">{{index+1}}</th> -->
    <td  class="w-1/6 p-4 text-left truncate">
      {{ row._id || "--" }}
    </td>
    <td class="w-1/6 truncate">{{ row.email || "" }}</td>
    <td class="w-1/6 truncate">
      <span v-if="row.book">{{ row.book.title }}</span>
      <span v-highlight="'red '" v-else> book deleted </span>
    </td>

    <td class="w-1/6 truncate">{{ row.quantity || "--" }}</td>
    <td v-changedateformat="" class="w-1/6 truncate">
      {{ row.createdAt || "--" }}

      <!-- {{ row..createdAt.substr(0, 10) || "--" }} -->
    </td>

    <td class="w-1/6 truncate">{{ row.amount || "--" }}</td>
  </tr>
</template>
<script>
export default {
  props: {
    row: {
      type: Object,
      required: true,
    },
  },
};
</script>
