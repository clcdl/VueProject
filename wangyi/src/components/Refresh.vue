<template>
    <div>
        refresh
    </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';

const router = useRouter()
const route = useRoute()
const keywords = route.query.keywords
//console.log(keywords)
router.push({
    name: "/search",
    query: { keywords: keywords }
})
</script>

<style scoped></style>