<template>
  <div class="home">
    <h1>新增1.0版本</h1>
    <div id="printTest">
      <p>锄禾日当午</p>
      <p>汗滴禾下土 </p>
    </div>
    <button v-print="'#printTest'">打印</button>
  </div>
</template>

<script>

export default {
    name: 'Home',

};
</script>
