<script setup>

  import ThreeCanvas from './components/ThreeCanvas.vue';
  import PortfolioContent from './components/PortfolioContent.vue';
  import SocialBar from './components/SocialBar.vue';
  import PortfolioLogo from './components/PortfolioLogo.vue';

</script>

<template >
  <PortfolioLogo />
  <SocialBar />
  <ThreeCanvas id='scene' />
  <PortfolioContent />
</template>
