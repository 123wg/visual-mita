<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
        <div id="hello-world"></div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';

export default Vue.extend({
    components: {
    // HelloWorld,
    },
    created() {
        this.test();
    // console.log(new HelloWorld());
    },
    mounted() {
        new HelloWorld().$mount('#hello-world');
    },
    methods: {
        test() {
            console.log('11111');
        },
    },
});
// import { Component, Vue } from 'vue-property-decorator';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

// @Component({
//   components: {
//     HelloWorld,
//   },
// })
// export default class Home extends Vue {
//   created() {
//     this.test();
//   }

//   test() {
//     console.log('11111');
//   }
// }
</script>
