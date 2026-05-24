<script setup lang="ts">
import { ref } from "vue"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"

interface BenchEntry {
  id: number
  name: string
  done: boolean
}

const bench = ref<BenchEntry[]>([])

window.ipcRenderer.on("bench-status", (_event: any, champs: BenchEntry[]) => {
  bench.value = champs
})
</script>

<template>
  <div v-if="bench.length > 0" class="overlay">
    <div v-for="champ in bench" :key="champ.id" class="slot">
      <img
        :class="{ greyed: !champ.done }"
        :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${champ.id}.png`"
        :alt="champ.name"
      />
      <div v-if="champ.done" class="check-mark">
        <FontAwesomeIcon :icon="faCheck" />
      </div>
    </div>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.overlay {
  display: inline-flex;
  gap: 6px;
  padding: 6px;
  background: rgba(0, 0, 0, 0.65);
  border: 1px solid #785a28;
  border-radius: 4px;
}

.slot {
  position: relative;
  width: 64px;
  height: 64px;
}

img {
  width: 64px;
  height: 64px;
  border: 1px solid #3c3c41;
  display: block;
}

.greyed {
  filter: brightness(30%);
}

.check-mark {
  position: absolute;
  top: -6px;
  right: -6px;
  background: #0ac8b9;
  border-radius: 50%;
  border: 2px solid black;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  color: black;
}
</style>
