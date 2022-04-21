import ListView from "./ListView.vue"
import bus from "../utils/bus.js"

export default function createListView(name){
  return {
    name:name,
    created(){
      bus.$emit("start:spinner");
      setTimeout(()=> {
        this.$store.dispatch('FETCH_LIST', this.$routes.name)
          .then(()=> {
            console.log('fetched');
            bus.$emit('end:spinner');
          })
          .catch((error)=> {
            console.log(error)
          })
      }, 2000)
    }
  }
  render(createElement){
    return createElement(ListView)
  }
}